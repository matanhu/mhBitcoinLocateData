var db = require('../DB/dbconnection'); //reference of dbconnection.js  
var B2C_BTC = {  
    getAllRates: function(callback) {  
        return db.connectDB("Select * from B2C_BTC", callback);  
    },  
    getRateById: function(id, callback) {  
        return db.connectDB("select * from B2C_BTC id=?", [id], callback);  
    },
    getLastRate: function(callback) {  
        return db.connectDB("select * from B2C_BTC order by date DESC LIMIT 1", callback);  
    },    
    getRateByRates: function(Rate, callback) {  
        return db.connectDB("select * from B2C_BTC where sellPrice=? and buyPrice=?", 
        [Rate.sellPrice, Rate.buyPrice], callback);  
    },  
    addRate: function(Rate, callback) {  
        return db.connectDB("Insert into B2C_BTC (sellPrice, buyPrice, date) values(?,?,?)", 
        [Rate.sellPrice, Rate.buyPrice, Rate.date], callback);  
    },  
    deleteRate: function(id, callback) {  
        return db.connectDB("delete from B2C_BTC where Id=?", [id], callback);  
    },  
    updateRate: function(id, Rate, callback) {  
        return db.connectDB("update B2C_BTC set sellPrice=?,buyPrice=? where Id=?", 
        [Rate.sellPrice, Rate.buyPrice, id], callback);  
    }  
};  
module.exports = B2C_BTC; 