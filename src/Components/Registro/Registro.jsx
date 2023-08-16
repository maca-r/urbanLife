import { useState } from 'react';
import styles from "./Registro.module.css";

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [apellidoError, setApellidoError] = useState('');
  const [gmailError, setGmailError] = useState('')
  const [passwordError, setPasswordError] = useState('');

  const handleNombreChange = (event) => {
    const inputValue = event.target.value;
    if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(inputValue)) {
      const formattedValue =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
      setNombre(formattedValue);
      setNombreError('');
    } else {
      setNombre('');
      setNombreError('El nombre debe contener solo letras y la primera letra en mayúscula.');
    }
  };

  const handleApellidoChange = (event) => {
    const inputValue = event.target.value;
    if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(inputValue)) {
      const formattedValue =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
      setApellido(formattedValue);
      setApellidoError('');
    } else {
      setApellido('');
      setApellidoError('El apellido debe contener solo letras y la primera letra en mayúscula.');
    }
    // if (apellido.length < 2){
    //   setApellidoError('El apellido debe tener por lo menos 3 letras')
    // }else{
    //   setApellidoError('')
    // }
  };

  const handleGmailChange = (event) => {
    
    
    setGmail(event.target.value);
    
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (newPassword.length < 5) {
      setPasswordError('La contraseña debe tener al menos 5 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);

    if(emailRegex.test(gmail)){
      setGmail(gmail)
      console.log('Nombre:', nombre);
      console.log('Apellido:', apellido);
      console.log('Correo electrónico:', gmail);
      console.log('Contraseña:', password);

      const userData = { nombre, apellido, gmail, password };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setNombre('');
      setApellido('');
      setGmail('');
      setPassword('');
    } else {
      
      setGmail('')
      setGmailError('El mail no es válido')
    }
    
  };

  return (
    <form className={styles.formLogin} onSubmit={handleSubmit}>
      <div className={styles.div}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={handleNombreChange} required/>
        {nombreError && <p className={styles.errorMessage}>{nombreError}</p>}
      </div>
      <div className={styles.div}>
        <label>Apellido:</label>
        <input type="text" value={apellido} onChange={handleApellidoChange} required/>
        {apellidoError && <p className={styles.errorMessage}>{apellidoError}</p>}
      </div>
      <div className={styles.div}>
        <label>Correo electrónico:</label>
        <input type="email" value={gmail} onChange={handleGmailChange} required/>
        {gmailError && <p className={styles.errorMessage}>{gmailError}</p>}
      </div>
      <div className={styles.div}>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={handlePasswordChange} required/>
        {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
      </div>
      <button className={styles.boton} type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;