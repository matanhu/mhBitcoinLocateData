var bit2c = require('bit2c');
// var B2C_BTC = require('./B2C/B2C_BTC');
var B2C_Firebase = require('./BTC_FIREBASE/B2C_BTC');
// var B2C_BCH = require('./B2C/B2C_BCH');
// var B2C_LTC = require('./B2C/B2C_LTC');
var EmailFactory = require('./Factories/emailFactory');
var FcmSender = require('./Factories/FCM');

var express = require('express'); // for Heroku
var app = express(); // for Heroku

// getting current ticker

let price = 25000;
var count = 1;
var isSendFcm = true;

var http = require("http");
setInterval(function() {
    http.get("http://mh-bitcoin-locate-data.herokuapp.com/");
}, 300000); // every 5 minutes (300000)

app.get('/', function(req, res) {
    res.send('Hello World');
})

/*
function getB2C_BTC() {
    bit2c.getTicker('BtcNis', function (error, ticker) {

        try {
            if (error) {
                console.error('bit2c.getTicker error BtcNis: ' + error  + ' ' + new Date());
            } else {
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    date: new Date()
                };
                B2C_BTC.getLastRate(function (err, rows) {
                    if (err) {
                        console.error('B2C_BTC.getLastRate error is: ' + err + ' ' + new Date());
                    } else {
                        // if(rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                        if (rows && !rows.length || (Math.abs(rows[0].sellPrice - rate.sellPrice) > 10 || Math.abs(rows[0].buyPrice - rate.buyPrice) > 10)) {
                            B2C_BTC.addRate(rate, function () { console.log('B2C_BTC.addRate BtcNis: Databes Inserted ' + new Date()); });
                            if (rows[0]) {
                                checkTwoNumbers('BtcNis', rows[0], rate);
                            }
                        }
                    }
                });
            }
        } catch (ex) {
            console.error('bit2c.getTicker exeption BtcNis: ' + ex  + ' ' + new Date());
        }

    });
}
*/

function getB2C_BTC() {
    bit2c.getTicker('BtcNis', function (error, ticker) {

        try {
            if (error) {
                console.error('bit2c.getTicker error BtcNis: ' + error + ' ' + new Date());
                setTimeout(getB2C_BTC, 5000);
                return;
            } else {
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    volume: ticker.a,
                    avarage: ticker.av,
                    date: new Date()
                };
                B2C_Firebase.getLastRate('BTC').then((snapshot) => {
                    var arraySnapshot = snapshotToArray(snapshot);
                    // if(rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                    if (arraySnapshot && !arraySnapshot.length || (Math.abs(arraySnapshot[0].sellPrice - rate.sellPrice) > 10 || Math.abs(arraySnapshot[0].buyPrice - rate.buyPrice) > 10)) {
                        B2C_Firebase.addRate('BTC', rate).then((value) => {
                            console.log('B2C_BTC.addRate BtcNis: Databes Inserted ' + new Date());
                            setTimeout(getB2C_BTC, 5000);
                        }, (err) => {
                            console.error("B2C_BTC.addRate(rate) Error: " + err + ' ' + new Date());
                            setTimeout(getB2C_BTC, 5000);
                            return;
                        });
                        if (arraySnapshot.length > 0) {
                            checkTwoNumbers('BtcNis', arraySnapshot[0], rate);
                        }
                    } else {
                        setTimeout(getB2C_BTC, 5000);
                        return;
                    }
                }, (err)=> {
                    console.error("B2C_BTC.getLastRate() Error: " + err + ' ' + new Date());
                    setTimeout(getB2C_BTC, 5000);
                    return;
                });
            }
        } catch (ex) {
            console.error('bit2c.getTicker exeption BtcNis: ' + ex + ' ' + new Date());
        }

    });
}

/*
function getB2C_BCH() {
    bit2c.getTicker('BchNis', function (error, ticker) {

        try {
            if (error) {
                console.error('bit2c.getTicker error BchNis: ' + error + ' ' + new Date());
            } else {
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    date: new Date()
                };
                B2C_BCH.getLastRate(function (err, rows) {
                    if (err) {
                        console.error('B2C_BCH.getLastRate error is: ' + err + ' ' + new Date());
                    } else {
                        // if (rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                        if (rows && !rows.length || (Math.abs(rows[0].sellPrice - rate.sellPrice) > 10 || Math.abs(rows[0].buyPrice - rate.buyPrice) > 10)) {
                            B2C_BCH.addRate(rate, function () { console.log('B2C_BCH.addRate BchNis: Databes Inserted ' + new Date()); });
                            if (rows[0]) {
                                checkTwoNumbers('BchNis', rows[0], rate);
                            }
                        }
                    }
                });
            }
        } catch (ex) {
            console.error('bit2c.getTicker exeption BchNis: ' + ex + ' ' + new Date());
        }

    });
}
*/

function getB2C_BCH() {
    bit2c.getTicker('BchNis', function (error, ticker) {

        try {
            if (error) {
                console.error('bit2c.getTicker error BchNis: ' + error + ' ' + new Date());
                setTimeout(getB2C_BCH, 5000);
                return;
            } else {
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    volume: ticker.a,
                    avarage: ticker.av,
                    date: new Date()
                };
                B2C_Firebase.getLastRate('BCH').then((snapshot) => {
                    var arraySnapshot = snapshotToArray(snapshot);
                    // if(rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                    if (arraySnapshot && !arraySnapshot.length || (Math.abs(arraySnapshot[0].sellPrice - rate.sellPrice) > 10 || Math.abs(arraySnapshot[0].buyPrice - rate.buyPrice) > 10)) {
                        B2C_Firebase.addRate('BCH', rate).then((value) => {
                            console.log('B2C_BCH.addRate BchNis: Databes Inserted ' + new Date());
                            setTimeout(getB2C_BCH, 5000);
                        }, (err) => {
                            console.error("B2C_BCH.addRate(rate) Error: " + err + ' ' + new Date());
                            setTimeout(getB2C_BCH, 5000);
                            return;
                        });
                        if (arraySnapshot.length > 0) {
                            checkTwoNumbers('BchNis', arraySnapshot[0], rate);
                        }
                    } else {
                        setTimeout(getB2C_BCH, 5000);
                        return;
                    }
                }, (err)=> {
                    console.error("B2C_BCH.getLastRate() Error: " + err + ' ' + new Date());
                    setTimeout(getB2C_BCH, 5000);
                    return;
                });
            }
        } catch (ex) {
            console.error('bit2c.getTicker exeption BchNis: ' + ex + ' ' + new Date());
        }

    });
}

/*
function getB2C_LTC() {
    bit2c.getTicker('LtcNis', function (error, ticker) {

        try {
            if (error) {
                console.error('bit2c.getTicker error LtcNis: ' + error + ' ' + new Date());
            } else {
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    date: new Date()
                };
                B2C_LTC.getLastRate(function (err, rows) {
                    if (err) {
                        console.error('B2C_LTC.getLastRate error is: ' + err + ' ' + new Date());
                    } else {
                        // if (rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                        if (rows && !rows.length || (Math.abs(rows[0].sellPrice - rate.sellPrice) > 10 || Math.abs(rows[0].buyPrice - rate.buyPrice) > 10)) {
                            B2C_LTC.addRate(rate, function () { console.log('B2C_LTC.addRate LtcNis: Databes Inserted ' + new Date()); });
                            if (rows[0]) {
                                checkTwoNumbers('LtcNis', rows[0], rate);
                            }
                        }
                    }
                });
            }
        } catch (ex) {
            console.error('bit2c.getTicker exeption LtcNis: ' + ex + ' ' + new Date());
        }

    });
}
*/

function getB2C_LTC() {
    bit2c.getTicker('LtcNis', function (error, ticker) {

        try {
            if (error) {
                console.error('bit2c.getTicker error LtcNis: ' + error + ' ' + new Date());
                setTimeout(getB2C_LTC, 5000);
                return;
            } else {
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    volume: ticker.a,
                    avarage: ticker.av,
                    date: new Date()
                };
                B2C_Firebase.getLastRate('LTC').then((snapshot) => {
                    var arraySnapshot = snapshotToArray(snapshot);
                    // if(rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                    if (arraySnapshot && !arraySnapshot.length || (Math.abs(arraySnapshot[0].sellPrice - rate.sellPrice) > 10 || Math.abs(arraySnapshot[0].buyPrice - rate.buyPrice) > 10)) {
                        B2C_Firebase.addRate('LTC', rate).then((value) => {
                            console.log('B2C_LTC.addRate LtcNis: Databes Inserted ' + new Date());
                            setTimeout(getB2C_LTC, 5000);
                        }, (err) => {
                            console.error("B2C_LTC.addRate(rate) Error: " + err + ' ' + new Date());
                            setTimeout(getB2C_LTC, 5000);
                            return;
                        });
                        if (arraySnapshot.length > 0) {
                            checkTwoNumbers('LtcNis', arraySnapshot[0], rate);
                        }
                    } else {
                        setTimeout(getB2C_LTC, 5000);
                        return;
                    }
                }, (err)=> {
                    console.error("B2C_LTC.getLastRate() Error: " + err + ' ' + new Date());
                    setTimeout(getB2C_LTC, 5000);
                    return;
                });
            }
        } catch (ex) {
            console.error('bit2c.getTicker exeption LtcNis: ' + ex + ' ' + new Date());
        }

    });
}

function getB2C_BTG() {
    bit2c.getTicker('BtgNis', function (error, ticker) {

        try {
            if (error) {
                console.error('bit2c.getTicker error BtgNis: ' + error + ' ' + new Date());
                setTimeout(getB2C_BTG, 5000);
                return;
            } else {
                var rate = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    volume: ticker.a,
                    avarage: ticker.av,
                    date: new Date()
                };
                B2C_Firebase.getLastRate('BTG').then((snapshot) => {
                    var arraySnapshot = snapshotToArray(snapshot);
                    // if(rows && !rows.length || (rows[0].sellPrice != rate.sellPrice || rows[0].buyPrice != rate.buyPrice)) {
                    if (arraySnapshot && !arraySnapshot.length || (Math.abs(arraySnapshot[0].sellPrice - rate.sellPrice) > 10 || Math.abs(arraySnapshot[0].buyPrice - rate.buyPrice) > 10)) {
                        B2C_Firebase.addRate('BTG', rate).then((value) => {
                            console.log('B2C_BTG.addRate BtgNis: Databes Inserted ' + new Date());
                            setTimeout(getB2C_BTG, 5000);
                        }, (err) => {
                            console.error("B2C_BTG.addRate(rate) Error: " + err + ' ' + new Date());
                            setTimeout(getB2C_BTG, 5000);
                            return;
                        });
                        if (arraySnapshot.length > 0) {
                            checkTwoNumbers('BtgNis', arraySnapshot[0], rate);
                        }
                    } else {
                        setTimeout(getB2C_BTG, 5000);
                        return;
                    }
                }, (err)=> {
                    console.error("B2C_BTG.getLastRate() Error: " + err + ' ' + new Date());
                    setTimeout(getB2C_BTG, 5000);
                    return;
                });
            }
        } catch (ex) {
            console.error('bit2c.getTicker exeption BtgNis: ' + ex + ' ' + new Date());
        }

    });
}

function checkTwoNumbers(cryptoType, lastRate, newRate) {
    if (lastRate.buyPrice > 10000 || newRate.buyPrice > 10000 || lastRate.sellPrice > 10000 || newRate.sellPrice > 10000) {
        if ((Math.floor(lastRate.buyPrice / 1000) != Math.floor(newRate.buyPrice / 1000)) ||
            (Math.floor(lastRate.sellPrice / 1000) != Math.floor(newRate.sellPrice / 1000))) {
            // EmailFactory.sendEmailWithLink(cryptoType, lastRate, newRate);
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

function sendReport() {
    bit2c.getTicker('BtcNis', function (error, ticker) {
        try {
            if (error) {
                console.log(error);
            } else {
                var btc = {
                    sellPrice: ticker.l,
                    buyPrice: ticker.h,
                    date: new Date()
                };
            }
        } catch (ex) {
            console.error(ex);
        }
        bit2c.getTicker('BchNis', function (error, ticker) {
            try {
                if (error) {
                    console.log(error);
                } else {
                    var bch = {
                        sellPrice: ticker.l,
                        buyPrice: ticker.h,
                        date: new Date()
                    };
                }
            } catch (ex) {
                console.error(ex);
            }
            bit2c.getTicker('LtcNis', function (error, ticker) {
                try {
                    if (error) {
                        console.log(error);
                    } else {
                        // console.log(ticker);
                        var ltc = {
                            sellPrice: ticker.l,
                            buyPrice: ticker.h,
                            date: new Date()
                        };
                    }
                } catch (ex) {
                    console.error(ex);
                }
                bit2c.getTicker('BtgNis', function (error, ticker) {
                    try {
                        if (error) {
                            console.log(error);
                        } else {
                            // console.log(ticker);
                            var btg = {
                                sellPrice: ticker.l,
                                buyPrice: ticker.h,
                                date: new Date()
                            };
                            FcmSender.sendFcmReport(btc, bch, ltc, btg, function () {
                                console.log('Report sent');
                            });
                        }
                    } catch (ex) {
                        console.error(ex);
                    }
                })
            })
        })
    })
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

// setInterval(getB2C_BTCH 5000);
setTimeout(getB2C_BTC, 5000);

// setInterval(getB2C_BCH, 5000);
setTimeout(getB2C_BCH, 5000);

// setInterval(getB2C_LTC, 5000);
setTimeout(getB2C_LTC, 5000);

setInterval(sendReport, 3600000);

var port = Number(process.env.PORT || 3000);
app.listen(port);