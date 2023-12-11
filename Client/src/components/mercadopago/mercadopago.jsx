import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/actions";
import axios from "axios";
const {ACCESS_TOKEN}=  process.env;
const URL = "https://quirkz.up.railway.app/"
// const URL = "http://localhost:3001"


const mercadopagoPurchase = () => {
    const dispatch = useDispatch()
    const allProducts = useSelector((state) => state.allProducts)
    const [preferenceId, setPreferenceId] = useState()
    initMercadoPago(ACCESS_TOKEN)

    useEffect(() =>{
        dispatch(getProducts())
    }, [])

    const postMercadopago = async () => {
        try {
            // const response = await axios.post(`${URL}/purchase`,{
                //pasar informacion de producto
                const response = await axios.post(`${URL}/purchase`,
                {
            })

            window.location.href = response.data.init_point;
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async () => {
        const id = await postMercadopago();
        if(id){
            setPreferenceId(id)
        }
      };

    console.log(allProducts);

    return(
        <div>
            {allProducts.map((e) =>{
                <div>
                    <img src={e.image} />
                    <p>{e.name}</p>
                    <p>{e.price}</p>
                    <p>{e.colour}</p>
                    <p>{e.brands}</p>
                    <button onClick={handleSubmit}>Buy</button>
                    {preferenceId && <Wallet initialization={{ preferenceId }} />}
                </div>                
            })}
        </div>
    )
}

export default mercadopagoPurchase