import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from "axios"

//components
import HomePage from './Components/HomePage'
import NavbarComponent from "./Components/Nav"
import Cart from './Components/Cart'


export default function App() {

    const [products, setProducts] = useState([])

    //to access the products information
    useEffect(()=>{
        (async()=>{
            try{
                const respone = await axios.get("http://localhost:3089/api/products")
                setProducts(respone.data.data)
            }catch(err){
                console.log(err)
                alert(err.message)
            }
        })();
    }, [])

    return (
        <>
            <NavbarComponent />
            <Routes>
                <Route path="/" element={<HomePage products={products} />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </>
    )
}