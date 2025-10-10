import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/auctions")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAuctions(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Lelang Mobil</h1>
      <Link to="/login">
      <button>Login</button>
      </Link>
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Mobil</th>
            <th>Pemilik</th>
            <th>Harga Awal</th>
            <th>Penawaran Tertinggi</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map(a => (
            <tr key={a.id}>
              <td>{a.car}</td>
              <td>{a.owner}</td>
              <td>{a.startingPrice}</td>
              <td>{a.currentBid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
