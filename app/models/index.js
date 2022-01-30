const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
// https://stackoverflow.com/questions/9146980
// here mongoose is a variable u r passing to tutorial.model.js
db.users = require("./user.model.js")(mongoose);
db.enrollments = require("./enrollment.model.js")(mongoose);

module.exports = db;