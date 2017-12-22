const FCM = require('fcm-node');
// Replace these with your own values.
const apiKey = 'AAAAcEgFqfQ:APA91bGfR1qOkiWHUTUhc7Vk1-Qn6-hx7Cb_Ir-koWYUG7cly4TkpJTFgWdXw4QcUcCmWv7RahO_mw1W9VVcrWlb5BuOneJMfUzBTeSqICGkfYlyP9SXPtWpM1dfMg2cgfE4micoe6oP';
const deviceID = "cx8bgqgLubU:APA91bH_oNbs1izNAGFIcoHzolySVLz6qO7x9QlXKoTxIvzINiPrE6psGXwvvwlQZrcGGgLR5MqEUdVODG1p1Wn2ZbE7-hqs667Au22uEL-t5k1EsvSVw2nre4HMfiYvoQ8GYkxYKXeq";
const fcm = new FCM(apiKey);


FcmSender = {
    test: function() {
        const message = {
            registration_ids: [deviceID],
            data: {
                title: "Default",
                message: "Plays default notification sound",
                sound: "default"
            }
        }
        fcm.send(message, (err, response) => {
            if (err) {
              console.log(err);
              console.log("Something has gone wrong!");
            } else {
              console.log("Successfully sent with response: ", response);
            }
          });
    }
}

module.exports = FcmSender;
