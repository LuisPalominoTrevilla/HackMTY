const mysql = require('mysql');
const conf = require('./db-config');

var pool = mysql.createPool(conf);

module.exports = pool;