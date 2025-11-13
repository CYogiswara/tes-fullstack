import { useEffect, useState } from "react"
import { Link , useNavigate} from "react-router-dom";

function CartPage(){
    const [cart, setCart] = useState([])

    // Helper aman untuk parse JSON dari localStorage
    function safeJSONParse(raw, fallback = null) {
        if (raw === null || raw === undefined) return fallback;
        if (typeof raw !== "string") return fallback;
        const trimmed = raw.trim();
        if (!trimmed || trimmed === "undefined" || trimmed === "null") return fallback;
        try {
        return JSON.parse(trimmed);
        } catch (err) {
        console.error("Invalid data in sessionStorage:", err, raw);
        return fallback;
        }
    }

    useEffect(() => {
        const cartInfoRaw = sessionStorage.getItem("cart")
        const parsedCartInfo = safeJSONParse(cartInfoRaw, [])
        setCart(Array.isArray(parsedCartInfo) ? parsedCartInfo : [])
    }, [])

    const total = cart.reduce((acc, item) => acc + item.harga * item.quantity, 0)

    return(
        <>
            <Link to="/">
                <button>Return</button>
            </Link>
            <div>
                <h1>Your Cart</h1>
                {cart.length === 0 ? (<p>Your cart is empty</p>) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Menu</th>
                                <th>Quantity</th>
                                <th>Harga/pcs</th>
                                <th>Total/pcs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item)=>(
                                <tr key={item.id_menu}>
                                    <td>{item.nama_menu}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.harga}</td>
                                    <td>{item.harga * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <h3>Total Pesanan: {total}</h3>
                <button>Checkout</button>
            </div>
        </>
    )
}

export default CartPage