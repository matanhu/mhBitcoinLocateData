var bit2c = require('bit2c');
var B2C_BTC = require('./B2C/B2C_BTC');
var B2C_BCH = require('./B2C/B2C_BCH');
var B2C_LTC = require('./B2C/B2C_LTC');
var EmailFactory = require('./Factories/emailFactory');
var FcmSender = require('./Factories/FCM');

// getting current ticker

let price = 25000;
var count = 1;
var isSendFcm = true;

function getB2C_BTC() {
    bit2c.getTicker('BtcNis', function (error, ticker) {

        try {
            console.log('BtcNis Start at: ' + new Date());
            if (error) {
                console.log(error);
            } else {
                // console.log(ticker);
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    date: new Date()
                };
                B2C_BTC.getLastRate(function (err, rows) {
                    // console.log(rows);
                    if (err) {
                        console.error('error is: ' + err);
                    } else {
                        // if(rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                        if (rows && !rows.length || (Math.abs(rows[0].sellPrice - rate.sellPrice) > 10 || Math.abs(rows[0].buyPrice - rate.buyPrice) > 10)) {
                            B2C_BTC.addRate(rate, function () { console.log('Databes Inserted'); });
                            if (rows[0]) {
                                checkTwoNumbers('BtcNis', rows[0], rate);
                            }
                        }
                    }
                });
                if (ticker.h < price) {
                    console.log(' The Price to Buy is: ' + ticker.h + ' Low of: ' + price);
                }
                if (ticker.h > price) {
                    console.log(' The Price to Buy is: ' + ticker.h + ' Over of: ' + price);
                }
                if (ticker.l < price) {
                    console.log(' The Price to Sell is: ' + ticker.l + ' Low of: ' + price);
                }
                if (ticker.l > price) {
                    console.log(' The Price to Sell is: ' + ticker.l + ' Over of: ' + price);
                }
                console.log('End at: ' + new Date());
                console.log('');
                console.log('');
            }
        } catch (ex) {
            console.error('BtcNis Exception: ' + ex);
        }

    });
}

function getB2C_BCH() {
    bit2c.getTicker('BchNis', function (error, ticker) {

        try {
            console.log('BchNis Start at: ' + new Date());
            if (error) {
                console.log(error);
            } else {
                // console.log(ticker);
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    date: new Date()
                };
                B2C_BCH.getLastRate(function (err, rows) {
                    // console.log(rows);
                    if (err) {
                        console.error('error is: ' + err);
                    } else {
                        // if (rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                            if(rows && !rows.length || (Math.abs(rows[0].sellPrice - rate.sellPrice) > 10 || Math.abs(rows[0].buyPrice - rate.buyPrice) > 10)) {
                            B2C_BCH.addRate(rate, function () { console.log('Databes Inserted'); });
                            if (rows[0]) {
                                checkTwoNumbers('BchNis', rows[0], rate);
                                // FcmSender.sendFcm('BchNis', rows[0], rate);
                            }
                        }
                    }
                });
                if (ticker.h < price) {
                    console.log(' The Price to Buy is: ' + ticker.h + ' Low of: ' + price);
                }
                if (ticker.h > price) {
                    console.log(' The Price to Buy is: ' + ticker.h + ' Over of: ' + price);
                }
                if (ticker.l < price) {
                    console.log(' The Price to Sell is: ' + ticker.l + ' Low of: ' + price);
                }
                if (ticker.l > price) {
                    console.log(' The Price to Sell is: ' + ticker.l + ' Over of: ' + price);
                }
                console.log('BchNis End at: ' + new Date());
                console.log('');
                console.log('');
            }
        } catch (ex) {
            console.error('Exception: ' + ex);
        }

    });
}

function getB2C_LTC() {
    bit2c.getTicker('LtcNis', function (error, ticker) {

        try {
            console.log('LtcNis Start at: ' + new Date());
            if (error) {
                console.log(error);
            } else {
                // console.log(ticker);
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    date: new Date()
                };
                B2C_LTC.getLastRate(function (err, rows) {
                    // console.log(rows);
                    if (err) {
                        console.error('error is: ' + err);
                    } else {
                        // if (rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                            if(rows && !rows.length || (Math.abs(rows[0].sellPrice - rate.sellPrice) > 10 || Math.abs(rows[0].buyPrice - rate.buyPrice) > 10)) {
                            B2C_LTC.addRate(rate, function () { console.log('Databes Inserted'); });
                            if (rows[0]) {
                                checkTwoNumbers('LtcNis', rows[0], rate);
                                // FcmSender.sendFcm('LtcNis', rows[0], rate);
                            }
                        }
                    }
                });
                if (ticker.h < price) {
                    console.log(' The Price to Buy is: ' + ticker.h + ' Low of: ' + price);
                }
                if (ticker.h > price) {
                    console.log(' The Price to Buy is: ' + ticker.h + ' Over of: ' + price);
                }
                if (ticker.l < price) {
                    console.log(' The Price to Sell is: ' + ticker.l + ' Low of: ' + price);
                }
                if (ticker.l > price) {
                    console.log(' The Price to Sell is: ' + ticker.l + ' Over of: ' + price);
                }
                console.log('LtcNis End at: ' + new Date());
                console.log('');
                console.log('');
            }
        } catch (ex) {
            console.error('Exception: ' + ex);
        }

    });
}

function checkTwoNumbers(cryptoType, lastRate, newRate) {
    if (lastRate.buyPrice > 10000 || newRate.buyPrice > 10000 || lastRate.sellPrice > 10000 || newRate.sellPrice > 10000) {
        if ((Math.floor(lastRate.buyPrice / 1000) != Math.floor(newRate.buyPrice / 1000)) ||
            (Math.floor(lastRate.sellPrice / 1000) != Math.floor(newRate.sellPrice / 1000))) {
            EmailFactory.sendEmailWithLink(cryptoType, lastRate, newRate);
            if (isSendFcm) {
                FcmSender.sendFcm(cryptoType, newRate, lastRate, function () {
                    isSendFcm = false;
                    setTimeout(function () {
                        isSendFcm = true;
                    }, 600000);
                });
            }
        }
        return;
    }
    if (lastRate.buyPrice > 1000 || newRate.buyPrice > 1000 || lastRate.sellPrice > 1000 || newRate.sellPrice > 1000) {
        if ((Math.floor(lastRate.buyPrice / 100) != Math.floor(newRate.buyPrice / 100)) ||
            (Math.floor(lastRate.sellPrice / 100) != Math.floor(newRate.sellPrice / 100))) {
            EmailFactory.sendEmailWithLink(cryptoType, lastRate, newRate);
            if (isSendFcm) {
                FcmSender.sendFcm(cryptoType, newRate, lastRate, function () {
                    isSendFcm = false;
                    setTimeout(function () {
                        isSendFcm = true;
                    }, 600000);
                });
            }
        }
        return;
    }

    if (lastRate.buyPrice > 100 || newRate.buyPrice > 100 || lastRate.sellPrice > 100 || newRate.sellPrice > 100) {
        if ((Math.floor(lastRate.buyPrice / 10) != Math.floor(newRate.buyPrice / 10)) ||
            (Math.floor(lastRate.sellPrice / 10) != Math.floor(newRate.sellPrice / 10))) {
            EmailFactory.sendEmailWithLink(cryptoType, lastRate, newRate);
            if (isSendFcm) {
                FcmSender.sendFcm(cryptoType, newRate, lastRate, function () {
                    isSendFcm = false;
                    setTimeout(function () {
                        isSendFcm = true;
                    }, 600000);
                });
            }
        }
        return;
    }
}

setInterval(getB2C_BTC, 1000);
setInterval(getB2C_BCH, 1000);
setInterval(getB2C_LTC, 1000);