import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import CreatePage from "./pages/createPage.jsx"

function AppRoute(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/create" element={<CreatePage/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoute