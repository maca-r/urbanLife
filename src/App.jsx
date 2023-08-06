import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { routes } from './Routes/routes'
import Layout from "./Components/Layout"
import Home from './Components/Home/Home'
import Detail from './Components/ProductDetail/Detail'
import NotFound from "./Routes/NotFound"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



function App({children}) {
  

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route path={routes.home} element={<Home/>}/>
              <Route path={routes.detail} element={<Detail/>}/>
              <Route path={routes.notFound} element={<NotFound/>}/>
            </Route>
          </Routes>
        </LocalizationProvider>
    </>

  )
}

export default App
