import { useState } from 'react';
import {  useNavigate} from "react-router-dom";
// import { routes } from "../../Routes/routes";

import styles from "./Login.module.css";


const Login = () => {
    
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    }

    const handleSubmitInicioSesion = () => {
        if (JSON.stringify(user) === JSON.stringify({ email: '', password: '' })) {
            return <p>¡Error! No se encontraron datos de usuario.</p>;
        } else {
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/");
        }
    }

   
    


    
    return (
        <div>
            <form className={styles.formLogin} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <label>Correo electrónico:</label>
                    <input 
                        type="text"
                        name='email'
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.input}>
                    <label>Contraseña:</label>
                    <input 
                        type="password"
                        name='password'
                        value={user.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button className={styles.boton} type="submit"  
                onClick={()=>{
                    {handleSubmitInicioSesion()}
                }}>
                    Iniciar sesión
                </button>
            </form>
        </div>
    )
}

export default Login;