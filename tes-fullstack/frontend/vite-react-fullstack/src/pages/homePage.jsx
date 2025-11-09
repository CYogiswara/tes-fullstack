import { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";

function HomePage() {
  const [menus, setMenu] = useState([]);
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

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
      const savedCart = localStorage.getItem("cart")
      if(savedUser){
        setUser(JSON.parse(savedUser))
      }

      if(savedCart){
        setCart(JSON.parse(savedCart))
      }
  }, [])

  function addToCart(menu) {
    //GET THE EXISTING CART FIRST:
    const existingCart = JSON.parse(localStorage.getItem("cart")) || []
    if (existingCart && existingCart !== "undefined" && existingCart !== "null") {
      try {
        setCart(JSON.parse(existingCart));
      } catch (err) {
        console.error("Invalid cart data:", err);
        setCart([]);
      }
    }

    //FIND IF THE MENU CLICKED IS ALREADY IN CART:
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

    //ADD TO LOCALSTORAGE:
    localStorage.setItem("cart", JSON.stringify(existingCart))
    setCart(existingCart)

    alert(`${menu.nama_menu} added to cart`)
  }


  return (
    <>
    <Navbar user={user} setUser={setUser}></Navbar>
    <div style={{ padding: "20px" }}>
      <h1>Menu Libro Cafe</h1>
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
