var FCM = require('fcm-push');

var serverKey = 'AAAAcEgFqfQ:APA91bGfR1qOkiWHUTUhc7Vk1-Qn6-hx7Cb_Ir-koWYUG7cly4TkpJTFgWdXw4QcUcCmWv7RahO_mw1W9VVcrWlb5BuOneJMfUzBTeSqICGkfYlyP9SXPtWpM1dfMg2cgfE4micoe6oP';
var fcm = new FCM(serverKey);

var FcmSender = {
    sendFcm: function (cryptoType, newRate, lastRate, callback) {
        var message = {
            to: "dxu4TU_o7rY:APA91bGq7M8gAzk7utAhHWdGOARJ2mpEmyB1FvVsXZOBQsBBr3fRSfhCsj9QXnt8jrFJ6fNI6xfQUOc6ggI5GMWL5K3UOXhJrtFKeaPLHJj5FxK6pQphEcv2tV5FgPtgBkRRM0VRU2wx",
            priority: "high",
            content_available: true,
            notification: {
                body: "מחיר חדש קנייה: " + newRate.buyPrice + " מחיר חדש מכירה: " + newRate.sellPrice + '\n' + "מחיר ישן קנייה: " + lastRate.buyPrice + " מחיר ישן מכירה: " + lastRate.sellPrice,
                title: "שינוי ב " + cryptoType,
                icon: "new",
                sound: ""
            },
            data: {
                volume: "3.21.15",
                contents: "מחיר חדש קנייה: " + newRate.buyPrice + " מחיר חדש מכירה: " + newRate.sellPrice + '\n' + "מחיר ישן קנייה: " + lastRate.buyPrice + " מחיר ישן מכירה: " + lastRate.sellPrice
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