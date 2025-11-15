const http = require("http");
const url = require("url");
const db = require("./connection");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());              
app.use(express.json());      

// Endpoint GET /menu
app.get("/menu", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM menu_items");
    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Endpoint POST /order
app.post("/order", async (req, res) => {
  const {cart, id_accounts, total} = req.body
  const randomNumber  = Math.floor(Math.random() * 900) + 100
  const randomID = "OD" + randomNumber

  try{
    const [queryResults] = await db.query(
      "INSERT INTO orders (total_harga, order_code, id_accounts, status) VALUES (?, ?, ?, 'preparing')",
      [total, randomID, id_accounts]
    )
    const id_order = queryResults.insertId

    await Promise.all(
      cart.map(item => 
        db.query(
          "INSERT INTO order_items (quantity, id_order, id_menu) VALUES (?, ?, ?)",
          [item.quantity, id_order, item.id_menu]
        )
      )
    )

    res.json({
      id_order: id_order,
      order_code: randomID,
      message: "Your order has been successfully created!"
    })
  }catch (err){
    console.error("Order error:", err)
    res.status(500).json({message: "Error creating this order!"})
  }
})

// Endpoint POST /login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Username atau password salah" });
    }

    // login berhasil
    const user = rows[0];
    res.json({
      message: "Login berhasil",
      user: {
        id_accounts: user.id_accounts,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

// Default Route / Error
app.use((req, res) => {
  res.status(404).json({message: "Not Found"});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
