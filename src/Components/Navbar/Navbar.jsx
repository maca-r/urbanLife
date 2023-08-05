import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../Routes/routes'
import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav>
            <Link to={routes.home} className={styles.logo}>
                <img src="./images/logo.png" alt="logo Urban Life"/>
                <h6>lema</h6>
            </Link>

            <div className={styles.rutas}>
                <Link to={routes.signUp} className={styles.crearCuenta}>Crear cuenta</Link>
                <Link to={routes.logIn} className={styles.iniciarSesion}>Iniciar sesión</Link>

            </div>
        </nav>
    )
}

export default Navbar
