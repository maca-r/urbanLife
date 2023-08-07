import React, { useState } from 'react'
import styles from './Home.module.css'

const Home = () => {
    const [searchText, setSearchText] = useState('');

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // realizariamos las solicitudes a la API.
        console.log('Texto de búsqueda:', searchText);
    };  
    return (
        <div className={styles.body}>

        {/* BUSCADOR */}

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Buscar..."
                value={searchText}
                onChange={handleChange}
            />
            {/* <button type="submit">Buscar</button> */}
        </form>

        {/* CATEGORIA */}

        <h2>CATEGORIAS</h2>
        <div className={styles.categoria}>
            <div>
                <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                <h4>Categoria 1</h4>
                <p>$$$$</p>
            </div>
            <div>
                <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                <h4>Categoria 2</h4>
                <p>$$$$</p>
            </div>
            <div>
                <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                <h4>Categoria 3</h4>
                <p>$$$$</p>
            </div>
            <div>
                <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                <h4>Categoria 4</h4>
                <p>$$$$</p>
            </div>
        </div>

        {/* PRODUCTOS ALEATORIOS */}
        <h2>PRODUCTOS ALEATORIOS</h2>
        <div  className={styles.producAleatorio}>
            <div>
                <div>
                    <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</p>
                    </div>
                </div>
                <div>
                    <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</p>
                    </div>
                </div>
                <div>
                    <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</p>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</p>
                    </div>
                </div>
                <div>
                    <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</p>
                    </div>
                </div>
                <div>
                    <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                    <div>
                        <p>Product Name</p>
                        <p>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</p>
                    </div>
                </div>
            </div>
            
        </div>
    
    </div>
        
    )
}

export default Home
