import React from 'react'
import styles from './Home.module.css'

const Home = () => {
    return (
        <div className={styles.body}>

            <div className={styles.categorias}>
                <form action="">
                    <select name="" id="">
                        <option selected>Categorias</option>
                        <option value="uno">uno</option>
                        <option value="dos">dos</option>
                        <option value="tres">tres</option>
                    </select>
                    
                </form>
                <img src="" alt="" />
            </div>
        
            <div className={styles.buscador}>
                <p>Buscar...</p>
            </div>

            <div className={styles.imagenCategoria}>
                <img src="" alt="" />
            </div>

            
        </div>
    )
}

export default Home
