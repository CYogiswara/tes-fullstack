import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import CreatePage from "./pages/createPage.jsx"
import CartPage from "./pages/cartPage.jsx"
import AdminHomePage from "./pages/adminHomePage.jsx"
import OrderDetailsPage from "./pages/orderDetailsPage.jsx"

function AppRoute(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/create" element={<CreatePage/>}></Route>
                <Route path="/cart" element={<CartPage/>}></Route>
                <Route path="/orders" element={<AdminHomePage/>}></Route>
                <Route path="/orderDetails/:id" element={<OrderDetailsPage/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoute