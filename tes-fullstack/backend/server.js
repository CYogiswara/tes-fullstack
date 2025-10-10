const http = require("http");
const url = require("url");
const db = require("./connection");
const express = require("express");
const cors = require("cors");


const app = express();
const PORT = 3000;

app.use(cors());              
app.use(express.json());      

// Endpoint GET /auctions
app.get("/auctions", (req, res) => {
  db.query("SELECT * FROM auctions", (err, rows) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

// Endpoint GET /login
app.post("/login", (req, res)=> {
  const {username, password} = req.body

  db.query("SELECT * FROM accounts WHERE username = ? AND password = ?", [username, password],(err, rows) => {
    if(err){
      return res.status(500).json({ error: "Database error" });
    }
    if(rows.length === 0){
      return res.status(401).json({error: "username atau password salah"})
    }
  })
})

// Default route
app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
