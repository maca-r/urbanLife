import React from 'react'
import { createContext, useContext, useEffect, useReducer} from "react";
import axios from 'axios';


export const initialState = {
    productos: [],
    producto: {}
}

export const ContextGlobal = createContext(undefined);



const GlobalContext = () => {
  return (
    <div>
      
    </div>
  )
}

export default GlobalContext
