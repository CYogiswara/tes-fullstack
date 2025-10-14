import React, { useState } from "react";
import carData from "../resource/carBrands.json"
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

function CreatePage(){
    const navigate = useNavigate()
    const [selectedBrands, setSelectedBrands] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [selectedTransmission, setSelectedTransmission] = useState("")

    const handleCreate = (e) => {
        e.preventDefault()

    }

    return(
        <>
        <Link to="/">
            <button>Back</button>
        </Link>
            <div>
                <h3>Your car information:</h3>
                <form onSubmit={(e) => handleCreate(e)}>
                    <label>Brand</label> 
                    <select value={selectedBrands} onChange={(e) => setSelectedBrands(e.target.value)}>
                        <option value="">Choose brand</option>
                        {carData.brands.map((brand, index) => {
                            return(
                            <option value={brand} key={index}>
                                {brand}
                            </option>
                            )
                        })}
                    </select>
                    
                    <label>Make</label> 
                    <input type="text" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}></input>
                    
                    <label>Transmission</label>
                    <select value={selectedTransmission} onChange={(e) => setSelectedTransmission(e.target.value)}>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="Sequential">Sequential</option>
                    </select>
                    <button type="submit">Auction Now</button>
                </form>
            </div>
        </>
    )
}

export default CreatePage