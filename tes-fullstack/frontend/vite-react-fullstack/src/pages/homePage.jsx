import { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";

function HomePage() {
  const [auctions, setAuctions] = useState([]);
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3000/auctions")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAuctions(data);
      })
      .catch(err => console.error("Fetch error:", err));

      const savedUser = localStorage.getItem("user")
      if(savedUser){
        setUser(JSON.parse(savedUser))
      }
  }, [])

  function handleLogout(){
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  return (
    <>
    {!user ? (<Link to="/login">
      <button>Login</button>
      </Link>) : 
      (
        <>
        <button onClick={handleLogout}>Logout</button>
        <h1>Halo, {user.username}</h1>
        </>
      )}
    <div style={{ padding: "20px" }}>
      <h1>Mobil yang bisa kamu lelang:</h1>

      
      
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
    </>
  );
}

export default HomePage;
