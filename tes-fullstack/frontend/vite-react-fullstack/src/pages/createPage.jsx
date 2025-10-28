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
    const [startingPrice, setStartingPrice] = useState("")

    const handleCreate = async (e) => {
        e.preventDefault()
        let user = JSON.parse(localStorage.getItem("user"))
        const username = user.username
        const carNameConcat = selectedBrands + " " + selectedModel
        const carName = carNameConcat.toUpperCase()

        try{
            const res = await fetch("http://localhost:3000/create", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username ,carName, transmission: selectedTransmission, startingPrice }),
            })
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login gagal");
            }

            navigate("/") 

        }catch(err){
            console.error(err)
            alert("Error creating your auction")
        }
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
                        <option value="">Select transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="Sequential">Sequential</option>
                    </select>

                    <label>Starting price</label>
                    <input type="number" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)}></input>
                    <button type="submit">Auction Now</button>
                </form>
            </div>
        </>
    )
}

export default CreatePage