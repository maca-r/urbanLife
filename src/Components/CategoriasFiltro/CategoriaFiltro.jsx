import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContextoGlobal } from '../GlobalContext';
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';
import styles from "./CategoriaFiltro.module.css";


const CategoriaFiltro = () => {

    const [categoria,setCategoria] = useState()

    const { dataState } = useContextoGlobal();

    const productosCategoria = []

    const params = useParams()

    const id = params.id

    //console.log(`http://localhost/categorias/${id}`);
    useEffect(() => {
        try {
            axios.get(`http://localhost/categorias/${id}`).then((response) => {
                console.log(response.data);
                setCategoria(response.data);
                
            });
            } catch (error) {
                console.error("error al obtener categorias");
            }
    },[`http://localhost/categorias/${id}`])

    const filtradoProducto = () => {
        (dataState.productos).forEach(producto => {
            
            if (producto.categorias.idCategoria == id) {
                //console.log(producto);
                productosCategoria.push(producto)
                
            }
            
        });
    }

    filtradoProducto()

    
    return (
    <div className={styles.categorias}>
    {categoria?.titulo && <h4 className={styles.tituloFiltroCat}>{categoria.titulo}</h4>}
    <div
    className={styles.gridProductos}>
        {productosCategoria.map((producto, index) => (
                <Card data={producto} key={index}>
            
                </Card>
            ))}
    </div>

    </div>
    )
}

export default CategoriaFiltro
