import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AdminHomePage = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/orders")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setOrders(data)
        })
        .catch(err => console.error("Fetch error:", err))
    }, [])

    return(
        <>
        <div style={{ padding: "20px" }}>
      <h1>Orders</h1>
      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
            <tr>
                <th>Order Code</th>
                <th>Price</th>
                <th>Status</th>
                <th>Created at</th>
                <th>Customer</th>
            </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id_order}>
              <td>{order.order_code}</td>
              <td>{order.total_harga}</td>
              <td>{order.status}</td>
              <td>{order.time_created}</td>
              <td>{order.id_accounts}</td>
              <td>
                <Link to={`/update/${order.id_order}`}>
                    <button>Details</button>
                </Link>
              </td>
              <td>
                <Link>
                    <button>Ready</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    )
}

export default AdminHomePage