import React, { createContext, useEffect, useState } from 'react'

import axios from './axios';
export const Productcontext = createContext();
function Context(props) {

    const [products,setproducts] =useState(JSON.parse(localStorage.getItem('product')) ||null);

    const getproducts = async() =>{
        try{
            const {data} = await axios('/products')
            setproducts(data);
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(() =>{
        getproducts();
    },[])
    console.log(products);
  return (
    <Productcontext.Provider value={[products,setproducts]}>{props.children}</Productcontext.Provider>
  )
}

export default Context
