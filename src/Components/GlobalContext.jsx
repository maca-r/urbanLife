import React from 'react'
import { createContext, useContext, useEffect, useReducer} from "react";
import axios from 'axios';


export const initialState = {
    productos: [],
    producto: {},
    favs: JSON.parse(localStorage.getItem('favs')) || [],
}

export const GlobalContext = createContext(undefined);

const dataReducer = (state,action) => {
  switch(action.type){
    case "LIKE":
    return {...state, favs: [action.payload,...state.favs]}
    case "DISLIKE":
      return {...state, favs: state.favs.filter(fav => fav.idProducto !== action.payload.idProducto)};
    case "GET_PRODUCTS":
      return{...state, productos: action.payload}
    case "GET_A_PRODUCT":
      return {...state, producto: action.payload}
    default:
      throw new Error()
  }
}

export const ContextProvider = ({children}) => {

  const [dataState, dataDispatch] = useReducer(dataReducer, initialState)

    useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(dataState.favs))
  },[dataState.favs])


  // const urlProductos = "http://localhost:80/productos/listaproductos-all"

  
  // useEffect(() => {

  //   try{
  //     axios.get(urlProductos)
  //     .then(response => {
  //     console.log(response.data)
  //     dataDispatch(({type: "GET_PRODUCTS", payload: response.data}))
  //   })
  //   }catch (error){
  //     console.error(error);
  //   }
    
  // },[urlProductos])


  return (
    
    <GlobalContext.Provider value={{
      dataState, dataDispatch
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useContextoGlobal = () => useContext(GlobalContext)