import { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";

function HomePage() {
  const [menus, setMenu] = useState([]);
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMenu(data);
      })
      .catch(err => console.error("Fetch error:", err));

      const savedUser = localStorage.getItem("user")
      if(savedUser){
        setUser(JSON.parse(savedUser))
      }
  }, [])


  return (
    <>
    <Navbar user={user} setUser={setUser}></Navbar>
    <div style={{ padding: "20px" }}>
      <h1>Menu Libro Cafe</h1>
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <tbody>
          {menus.map(menu => (
            <tr key={menu.id}>
              <td>{menu.nama_menu}</td>
              <td>{menu.harga}</td>
              <td>{menu.available}</td>
              <td><button>Add to Cart</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </>
  );
}

export default HomePage;
