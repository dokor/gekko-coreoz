// Let's create our own strategy
var _ = require('lodash');
var log = require('../core/log.js');
var strat = {};
var watchPrice = 0.0;
var lowestPrice = 0.0;
var sellPrice = 0.0;
var buyPrice = 0.0;
var adviced = false;

// Prepare everything our strat needs
strat.init = function () {
  this.requiredHistory = this.tradingAdvisor.historySize;
};

// What happens on every new candle?
strat.update = function (candle) {
  // your code!
};

// For debugging purposes.
strat.log = function () {

};

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function (candle) {
  if (watchPrice === 0) {
    watchPrice = candle.close * 0.97;
  }
  if (candle.close <= watchPrice) {
    lowestPrice = candle.close;
  }
  if (candle.close > lowestPrice && !adviced) {
    this.advice("long");
    sellPrice = candle.close * 1.05;
    adviced = true;
  }
  if(candle.close > sellPrice && watchPrice !== 0 && lowestPrice !== 0){
    this.advice("short");
    watchPrice = 0.0;
    lowestPrice = 0.0;
    sellPrice = 0.0;
    buyPrice = 0.0;
    adviced = false;
  }
};

// Optional for executing code
// after completion of a backtest.
// This block will not execute in
// live use as a live gekko is
// never ending.
strat.end = function () {
  log.debug('END');
};

module.exports = strat;
