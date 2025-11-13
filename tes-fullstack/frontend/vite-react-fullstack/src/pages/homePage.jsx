import { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";

function HomePage() {
  const [menus, setMenu] = useState([]);
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  const navigate = useNavigate()

  // Helper aman untuk parse JSON dari localStorage
  function safeJSONParse(raw, fallback = null) {
    if (raw === null || raw === undefined) return fallback;
    if (typeof raw !== "string") return fallback;
    const trimmed = raw.trim();
    if (!trimmed || trimmed === "undefined" || trimmed === "null") return fallback;
    try {
      return JSON.parse(trimmed);
    } catch (err) {
      console.error("Invalid data in localStorage:", err, raw);
      return fallback;
    }
  }

  //FETCH MENU
  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMenu(data);
      })
      .catch(err => console.error("Fetch error:", err));

      const savedUserRaw = localStorage.getItem("user")
      const savedCartRaw = sessionStorage.getItem("cart")
      
      const parsedUser = safeJSONParse(savedUserRaw, null)
      if (parsedUser){
        setUser(parsedUser)
      }
      const parsedCart = safeJSONParse(savedCartRaw, [])
      setCart(Array.isArray(parsedCart) ? parsedCart : [])
  }, [])

  function addToCart(menu) {
    // Ambil raw string lalu parse dengan aman
    const raw = sessionStorage.getItem("cart")
    const existing = safeJSONParse(raw, [])
    const existingCart = Array.isArray(existing) ? existing : []

    // FIND IF THE MENU CLICKED IS ALREADY IN CART:
    const menuIsInCart = existingCart.find((item) => item.id_menu === menu.id_menu)

    //USE menuIsInCart:
    if(menuIsInCart){
      menuIsInCart.quantity += 1
    }else{
      existingCart.push({
        id_menu: menu.id_menu,
        nama_menu: menu.nama_menu,
        quantity: 1,
        harga: menu.harga
      })
    }

    //ADD TO SESSIONSTORAGE:
    sessionStorage.setItem("cart", JSON.stringify(existingCart))
    setCart([...existingCart]) // clone agar state berubah

    alert(`${menu.nama_menu} added to cart`)
  }


  return (
    <>
    <Navbar user={user} setUser={setUser}></Navbar>
    <div style={{ padding: "20px" }}>
      <h1>Menu Libro Cafe</h1>
      <Link to="/cart">
        <button>View Cart</button>
      </Link>
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <tbody>
          {menus.map(menu => (
            <tr key={menu.id_menu}>
              <td>{menu.nama_menu}</td>
              <td>{menu.harga}</td>
              <td>{menu.available}</td>
              <td><button onClick={() => addToCart(menu)}>Add to Cart</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default HomePage;
