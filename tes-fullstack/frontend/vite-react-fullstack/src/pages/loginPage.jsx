import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]= useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json(); 

    if (!res.ok) {
      throw new Error(data.error || "Login gagal");
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/");
  } catch (err) {
    setMessage(err.message);
  }
};


  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Masuk</button>
      </form>

      {message}
    </div>
  );
}

export default LoginPage;
