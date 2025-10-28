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
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM accounts WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    // login berhasil
    const user = rows[0];
    res.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  });
});

// Endpoint POST /create
app.post("/create", (req, res) => {
  const {username ,carName, transmission, startingPrice} = req.body

  const query = "INSERT INTO auctions (`owner`, `car`, `transmission`, `startingPrice`) VALUES (?, ?, ?, ?)"

  db.query(query, [username, carName, transmission, startingPrice], (err, rows) => {
      if(err) return res.json("error")
        return res.json(rows)
  })
})

// Default Route / Error
app.use((req, res) => {
  res.status(404).json({message: "Not Found"});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
