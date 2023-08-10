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

//  },[dimensions])

    const categoriaCards = [{
        imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        categoria: "categoria 1"},
        { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        categoria: "categoria 2"},
        { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        categoria: "categoria 3"},
        { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        categoria: "categoria 4"}
    ]
    const productoAleatorio = [
        {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        titulo: "Product Name",
        desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
        },
        {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        titulo: "Product Name",
        desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
        },
        {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        titulo: "Product Name",
        desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
        },
        {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        titulo: "Product Name",
        desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
        },
        {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        titulo: "Product Name",
        desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
        },
        {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
        titulo: "Product Name",
        desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
        },
    ]

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
        </form>

        <h2>CATEGORIAS</h2>
        <div className={styles.categoria}>
            {categoriaCards.map((i, index) => (
                <div key={index}>
                    <img src={i.imagen} alt={`Imagen ${index}`}/>
                <div>
                    <h4>{i.categoria}</h4>
                </div>
            </div>
            ))}
        </div>
        
        <div className={styles.producAleatorioBox}>
            <h2>PRODUCTOS ALEATORIOS</h2>
            <div className={styles.producAleatorio}>
                {productoAleatorio.map((producto, index) => (
                    <div key={index} className={styles.productoItem}>
                        <div>
                            <img src={producto.imagen} alt={`Product ${index}`} />
                        </div>
                        <div className={styles.textoProduct}>
                            <h5 className={styles.productoTitulo}>{producto.titulo}</h5>
                            <h5>{producto.desc}</h5>
                        </div>
                    </div>
                ))}
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
