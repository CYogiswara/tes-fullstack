import { useParams } from "react-router-dom"


const OrderDetailsPage = () => {
    const {id} = useParams()

    useEffect(() => {
            fetch(`http://localhost:3000/ordersDetails/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrders(data)
            })
            .catch(err => console.error("Fetch error:", err))
        }, [])
    return(
        <>
            <div>
            </div>
        </>
    )
}

export default OrderDetailsPage