import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { routes } from "../../Routes/routes";

import { Search } from '../Icon';
import axios from 'axios';

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


    
    // const urlProductos = `http://localhost:80/productos`
    

    // useEffect(() => {
    //   try{
    //     axios.get(urlProductos)
    //     .then(response => {
    //       console.log(response.data)
    //       setDetalle(response.data)
    //     })
    //   } catch (error) {
    //     console.error("error al obtener productos")
    //   }
    // },[urlProductos])

    

    const [carouselVisible, setCarouselVisible] = useState("none")
    // const [dimensions, setDimensions] = useState(window.innerWidth)

    function handleResize() {
        if(window.innerWidth >= 780 ) {
            setCarouselVisible("none")
        } else{
        setCarouselVisible("block")
        }
    }
    
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        window.addEventListener("load",handleResize)
        
    },[])


    const [categorias, setCategorias] = useState([{}])
    const urlCategorias = 'http://localhost:80/categorias/listar'
    

    useEffect(() => {
        try{
            axios.get(urlCategorias)
            .then(response => {
                console.log(response.data)
                setCategorias(response.data)
            })
        }   catch (error) {
            console.error("error al obtener categorias")
        }

    },[urlCategorias])


    // const categoriaCards = [
    //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     categoria: "categoria 1"},
    //     { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     categoria: "categoria 2"},
    //     { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     categoria: "categoria 3"},
    //     { imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     categoria: "categoria 4"}
    // ]

        const categoriasImagenes = [
            "https://acdn.mitiendanube.com/stores/008/089/products/_campera-pragmatico-oxido_081-83e6bde4313e1cde2d16904126922417-640-0.webp",
            "https://acdn.mitiendanube.com/stores/008/089/products/_pantalon-gollic-gris_011-3777820bf7b7dab9e316856674617159-640-0.webp",
            "https://acdn.mitiendanube.com/stores/008/089/products/_camisa-nazgul-negro_071-9fdb49f56179eac55a16771641208498-640-0.webp",
            "https://acdn.mitiendanube.com/stores/008/089/products/_cartera-chain-b-negro_011-e4c3d9205f09b625f216878911243673-640-0.webp"
    ]

    
    // const productoAleatorio = [
    //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     titulo: "Product Name",
    //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
    //     },
    //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     titulo: "Product Name",
    //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
    //     },
    //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     titulo: "Product Name",
    //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
    //     },
    //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     titulo: "Product Name",
    //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
    //     },
    //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     titulo: "Product Name",
    //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
    //     },
    //     {imagen: "https://vcp.com.ar/cdn/shop/products/VCP7marzo_22-191.jpg?v=1646746906",
    //     titulo: "Product Name",
    //     desc:"Lorem ipsum dolor sit amet   consectetur adipisicing elit.     Aspernatur delectus quasi recusandae"
    //     },
    // ]

    const [productosAleatorios, setProductosAleatorios] = useState([{}])
    const urlProductosAleatorios = 'http://localhost:80/productos/listaAleatoria'
    

    useEffect(() => {
        try{
            axios.get(urlProductosAleatorios)
            .then(response => {
                console.log(response.data)
                setProductosAleatorios(response.data)
            })
        }   catch (error) {
            console.error("error al obtener productos aleatorios")
        }

    },[urlProductosAleatorios])

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
            {categorias.map((categoria, index) => (
                <div key={index}>
                    <img src={categoriasImagenes[index]} alt={`Imagen ${categoria.idCategoria}`}/>
                    
                <div>
                    <h4>{categoria.nombreCategoria}</h4>
                </div>
            </div>
            ))}
        </div>

        
        <Carousel className={"d-" + carouselVisible} 
        data-bs-theme="dark"
        style={{width:"80%"}}>
            {categorias.map((categoria, index) => (
                <Carousel.Item key={index}>
                <img 
                    src={categoriasImagenes[index]}
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
                    {categoria.nombreCategoria}</h4>
                </Carousel.Caption>
                
                
                </Carousel.Item>
                
            ))}
        </Carousel>
        
        <div className={styles.producAleatorioBox}>
            <h2>PRODUCTOS ALEATORIOS</h2>
            <div className={styles.producAleatorio}>
                {productosAleatorios.map((producto, index) => (
                    <Link to={routes.detail} key={index} className={styles.productoItem}>
                        <div>
                            <img src={producto.imagen} alt={`Product ${index}`} />
                        </div>
                        <div className={styles.textoProduct}>
                            <h5 className={styles.productoTitulo}>{producto.nombre}</h5>
                            <h5>{producto.detalle}</h5>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        
        
    </div>
    )
}

export default Home
