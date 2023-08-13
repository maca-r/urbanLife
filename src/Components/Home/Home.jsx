import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { routes } from "../../Routes/routes";

import { Search } from '../Icon';

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

    

    const [carouselVisible, setCarouselVisible] = useState("block")
    const [dimensions, setDimensions] = useState(window.innerWidth)

    useEffect(() => {
    function handleResize() {
        if(dimensions >= 780) {
            setCarouselVisible("none")
            setDimensions(window.innerWidth)
    } else{

    setCarouselVisible("block")
        }

        }
        window.addEventListener("resize", handleResize)
        window.addEventListener("load",handleResize)
        

    },[dimensions])

    const categoriaCards = [
        {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
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
            <div className={styles.Search}>
                <figure><Search /></figure>
                <input
                    type="text"
                    placeholder="Buscar"
                    value={searchText}
                    onChange={handleChange} 
                >
                </input>
            </div>
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

        <Carousel className={"d-" + carouselVisible} 
        data-bs-theme="dark"
        style={{width:"80%"}}>
            {categoriaCards.map((categoriaCards, index) => (
                <Carousel.Item key={index}>
                <img 
                    src={categoriaCards.imagen}
                    style={{width: "100%",
                    height: "50%",
                    cursor: "pointer",
                }}
                />
                
                <Carousel.Caption>
                    <h4 style={{color:"#2B2B28", 
                    textAlign:"center",
                    textTransform: "uppercase",
                    fontSize: "1rem"}}>
                    {categoriaCards.categoria}</h4>
                </Carousel.Caption>
                
                
                </Carousel.Item>
                
            ))}
        </Carousel>
        
        <div className={styles.producAleatorioBox}>
            <h2>PRODUCTOS ALEATORIOS</h2>
            <div className={styles.producAleatorio}>
                {productoAleatorio.map((producto, index) => (
                    <Link to={routes.detail} key={index} className={styles.productoItem}>
                        <div>
                            <img src={producto.imagen} alt={`Product ${index}`} />
                        </div>
                        <div className={styles.textoProduct}>
                            <h5 className={styles.productoTitulo}>{producto.titulo}</h5>
                            <h5>{producto.desc}</h5>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        
        
    </div>
    )
}

export default Home
