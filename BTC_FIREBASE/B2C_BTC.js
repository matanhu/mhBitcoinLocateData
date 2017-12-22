
var firebase = require('../DB/firebase'); //reference of dbconnection.js  
var B2C_Firebase = {
    getLastRate: function (currencyName) {
        return firebase.database().ref('/' + currencyName).orderByKey().limitToLast(1).once('value');
    },
    addRate: function (currencyName, Rate) {
        Rate.date = new Date().getTime();
        Rate.dateString = new Date().toString();
        Rate.order = (new Date().getTime())*(-1);
        return firebase.database().ref(currencyName + '/').push(Rate);
    },
    addMessageNotification: function(cryptoType, newRate, lastRate) {
        var messageRates = {
            cryptoType: cryptoType,
            newRateBuyPrice: newRate.buyPrice,
            newRateSellPrice: newRate.sellPrice,
            lastRateBuyPrice: lastRate.buyPrice,
            lastRateSellPrice: lastRate.sellPrice,
            date: new Date().getTime(),
            order: (new Date().getTime())*(-1)
        }
        return firebase.database().ref('MessageNotification/').push(messageRates);
    },
    addReportNotification: function(btc, bch, ltc, btg) {
        var report = {
            btc: btc,
            bch: bch,
            ltc: ltc,
            btg: btg,
            date: new Date().getTime(),
            order: (new Date().getTime())*(-1)
        }
        return firebase.database().ref('ReportNotification/').push(report);
    }
};
module.exports = B2C_Firebase; 