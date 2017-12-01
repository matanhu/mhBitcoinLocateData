var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyD5vLtjEh6h3vjXkjtBoqx0CMovGwjUJFE",
    authDomain: "mhbitcoin-4d1c9.firebaseapp.com",
    databaseURL: "https://mhbitcoin-4d1c9.firebaseio.com",
    projectId: "mhbitcoin-4d1c9",
    storageBucket: "mhbitcoin-4d1c9.appspot.com",
    messagingSenderId: "482244667892"
  };

firebase.initializeApp(config); 

module.exports = firebase;