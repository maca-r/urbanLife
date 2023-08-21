import { useState } from 'react';
import styles from "./Login.module.css";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('prueba submit');

    }
    
    return (
        <div>
            <form className={styles.formLogin} onSubmit={handleSubmit}>
                <div  className={styles.input}>
                    <label>Correo electrónico:</label>
                    <input 
                        type="text"
                        name='email'
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.input}>
                    <label>Contraseña:</label>
                    <input 
                        type="password"
                        name='password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </div >
                    
                <button className={styles.boton} type="submit" >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    )
}

export default Login