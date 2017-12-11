var FCM = require('fcm-push');
var b2c = require('../BTC_FIREBASE/B2C_BTC');

var serverKey = 'AAAAcEgFqfQ:APA91bGfR1qOkiWHUTUhc7Vk1-Qn6-hx7Cb_Ir-koWYUG7cly4TkpJTFgWdXw4QcUcCmWv7RahO_mw1W9VVcrWlb5BuOneJMfUzBTeSqICGkfYlyP9SXPtWpM1dfMg2cgfE4micoe6oP';
var fcm = new FCM(serverKey);

var FcmSender = {
    sendFcm: function (cryptoType, newRate, lastRate, callback) {
        var message = {
            to: "cx8bgqgLubU:APA91bH_oNbs1izNAGFIcoHzolySVLz6qO7x9QlXKoTxIvzINiPrE6psGXwvvwlQZrcGGgLR5MqEUdVODG1p1Wn2ZbE7-hqs667Au22uEL-t5k1EsvSVw2nre4HMfiYvoQ8GYkxYKXeq",
            priority: "high",
            content_available: true,
            notification: {
                body: "מחיר חדש קנייה: " + newRate.buyPrice + " מחיר חדש מכירה: " + newRate.sellPrice + '\n' + "מחיר ישן קנייה: " + lastRate.buyPrice + " מחיר ישן מכירה: " + lastRate.sellPrice,
                title: "שינוי ב " + cryptoType,
                icon: "new",
                sound: "",
                click_action: "FCM_PLUGIN_ACTIVITY"
            },
            data: {
                volume: "3.21.15",
                "cryptoType": "NisBtc",
                "date": new Date(),
                "contentsNew": "מחיר חדש קנייה: " + newRate.buyPrice + " מחיר חדש מכירה: " + newRate.sellPrice,
                "contentsLast": "מחיר ישן קנייה: " + lastRate.buyPrice + " מחיר ישן מכירה: " + lastRate.sellPrice
            }
        };

        fcm.send(message)
            .then(function (response) {
                console.log("Successfully sent with response: ", response);
                b2c.addMessageNotification(cryptoType, newRate, lastRate).then(
                    (res)=> {
                        callback();
                    }, (error) => {
                        console.error("b2c.addMessageNotification Error: " + error);
                    });
            })
            .catch(function (err) {
                console.log("Something has gone wrong!");
                console.error(err);
            })
    },

    sendFcmReport: function (btc, bch, ltc, btg, callback) {
        var message = {
            to: "cx8bgqgLubU:APA91bH_oNbs1izNAGFIcoHzolySVLz6qO7x9QlXKoTxIvzINiPrE6psGXwvvwlQZrcGGgLR5MqEUdVODG1p1Wn2ZbE7-hqs667Au22uEL-t5k1EsvSVw2nre4HMfiYvoQ8GYkxYKXeq",
            priority: "high",
            content_available: true,
            notification: {
                body: "BTC: קנייה: " + btc.buyPrice + " מכירה: " + btc.sellPrice + '\n' + 
                        "BCH: קנייה: " + bch.buyPrice + " מכירה: " + bch.sellPrice + '\n' + 
                        "LTC: קנייה: " + ltc.buyPrice + " מכירה: " + ltc.sellPrice + '\n' +
                        "BTG: קנייה: " + btg.buyPrice + " מכירה: " + btg.sellPrice + '\n',
                title: "דוח Bit2C",
                icon: "new",
                sound: ""
            },
            data: {
                volume: "3.21.15",
                contents: "BTC: קנייה: " + btc.buyPrice + " מכירה: " + btc.sellPrice + '\n' + 
                            "BCH: קנייה: " + bch.buyPrice + " מכירה: " + bch.sellPrice + '\n' + 
                            "LTC: קנייה: " + ltc.buyPrice + " מכירה: " + ltc.sellPrice + '\n' +
                            "BTG: קנייה: " + btg.buyPrice + " מכירה: " + btg.sellPrice + '\n',
            }
        };

        fcm.send(message)
            .then(function (response) {
                console.log("Successfully sent with response: ", response);
                callback();
            })
            .catch(function (err) {
                console.log("Something has gone wrong!");
                console.error(err);
            })
    }
}


module.exports = FcmSender;