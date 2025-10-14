import React from "react";
import { Link, useNavigate } from "react-router-dom";



function Navbar({user, setUser}){

    const navigate = useNavigate()

    function handleLogout(){
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

    return(
        <>
        <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#000000ff",
      }}
    >
      <h2>Car Auction</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        {!user ? (
          <Link to="/login">
            <button>Login</button>
          </Link>
        ) : (
          <>
            <Link to="/create">
              <button>Sell a car</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
            <span>Hi, {user.username}</span>
          </>
        )}
      </div>
    </nav>
        </>
    )
}

export default Navbar