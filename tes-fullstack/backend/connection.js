const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",     // ganti sesuai database kamu
  user: "root",          // user MySQL
  password: "",          // password MySQL
  database: "auctiondb"  // nama database
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected...");
});

module.exports = db;
