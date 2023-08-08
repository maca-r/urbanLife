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


//     const [carouselVisible, setCarouselVisible] = useState("block")
//     const [dimensions, setDimensions] = useState(window.innerWidth)

//     useEffect(() => {
//     function handleResize() {
//         if(dimensions >= 480) {
//             setCarouselVisible("none")
//             setDimensions(window.innerWidth)
//     } else{

//         setCarouselVisible("block")
//     }

//     }
//     window.addEventListener("load",handleResize)
//     window.addEventListener("resize", handleResize)

//   },[dimensions])



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

        <h2>CATEGORIAS</h2>
        <div className={styles.categoria}>
            <div>
                <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                <div>
                    <h4>Categoria 1</h4>
                </div>
            </div>
            <div>
                <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                <div>
                    <h4>Categoria 2</h4>
                </div>
            </div>
            <div>
                <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                <div>
                    <h4>Categoria 3</h4>
                </div>
            </div>
            <div>
                <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                <div>
                    <h4>Categoria 4</h4>
                </div>
            </div>
        </div>


        <div className={styles.producAleatorioBox}>
            <h2>PRODUCTOS ALEATORIOS</h2>
            <div  className={styles.producAleatorio}>
                <div>
                    <div>
                        <div>
                            <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                        </div>
                        <div className={styles.textoProduct}>
                            <h5>Product Name</h5>
                            <h5>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</h5>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                        </div>
                        <div  className={styles.textoProduct}>
                            <h5>Product Name</h5>
                            <h5>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</h5>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                        </div>
                        <div  className={styles.textoProduct}>
                            <h5>Product Name</h5>
                            <h5>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</h5>
                        </div>
                    </div>
                </div>

                <div>
                    <div>
                        <div>
                            <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                        </div>
                        <div  className={styles.textoProduct}>
                            <h5>Product Name</h5>
                            <h5>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</h5>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                        </div>
                        <div  className={styles.textoProduct}>
                            <h5>Product Name</h5>
                            <h5>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</h5>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906" alt="" />
                        </div>
                        <div  className={styles.textoProduct}>
                            <h5>Product Name</h5>
                            <h5>Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <Carousel className={"d-" + carouselVisible} style={{width:"80%"}}>
            {images.map((image, index) => (
                <Carousel.Item key={index}>
                <img 
                    src={image}
                    style={{width: "100%",
                    height: "auto",
                    cursor: "pointer",
                }}
                />
                </Carousel.Item>
                
            ))}
        </Carousel> */}
        
    </div>
    )
}

export default Home
