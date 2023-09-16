import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import styles from "./Registro.module.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [telefono, setTelefono] = useState()
  const [telefonoError, setTelefonoError] = useState("");

  const handleNombreChange = (event) => {
    const inputValue = event.target.value;
    if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(inputValue)) {
      const formattedValue =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
      setNombre(formattedValue);
      setNombreError("");
    } else {
      setNombre("");
      setNombreError(
        "El nombre debe contener solo letras y la primera letra en mayúscula."
      );
    }
  };

  const handleApellidoChange = (event) => {
    const inputValue = event.target.value;
    if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(inputValue)) {
      const formattedValue =
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();
      setApellido(formattedValue);
      setApellidoError("");
    } else {
      setApellido("");
      setApellidoError(
        "El apellido debe contener solo letras y la primera letra en mayúscula."
      );
    }
    // if (apellido.length < 2){
    //   setApellidoError('El apellido debe tener por lo menos 3 letras')
    // }else{
    //   setApellidoError('')
    // }
  };

  const handleMailChange = (event) => {
    setMail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (newPassword.length < 5) {
      setPasswordError("La contraseña debe tener al menos 5 caracteres.");
    } else {
      setPasswordError("");
    }
  };

  const handleTelefonoChange = (event) => {
    const newTelefono = event.target.value;
    setTelefono(newTelefono);
    if (newTelefono.length < 10) {
      setTelefonoError("El telefono debe constar de 10 números}.");
    } else {
      setTelefonoError("");
    }
  };

  const handleSubmit = () => {
    // event.preventDefault();

    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    );

    if (emailRegex.test(mail)) {
      setMail(mail);
      console.log("Nombre:", nombre);
      console.log("Apellido:", apellido);
      console.log("Correo electrónico:", mail);
      console.log("Contraseña:", password);
      console.log("Telefono:", telefono);

      const userData = { nombre, apellido, mail, password, telefono };
      localStorage.setItem("userData", JSON.stringify(userData));

      setNombre("");
      setApellido("");
      setMail("");
      setPassword("");
      setTelefono("")

      handleSubmitInicioSesion();
    } else {
      setMail("");
      setMailError("El mail no es válido");
    }

    //REDIRIJO
    // handleSubmitInicioSesion();
  };

  // REDIRIJO A HOME (CON LOS CAPOS CORRECTOS)

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE

  const urlRegistro = 
    privateUrl != "" ? 
    `"http://${privateUrl}:80/Auth/register"` :
    `"http://${publicUrl}:80/Auth/register"`;


  async function registrarUsuario() {
    try {
      const response = await fetch(urlRegistro, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, nombre, apellido, password }),
    })
      if (response.status === 200){
        console.log("USUARIO REGISTRADO");
      }
    } catch (error) {
      console.error("Error al registrar usuario")
      
    }
  }

  useEffect(() => {
    registrarUsuario()
  })

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userData"));
    if (items) {
      setItems(items);
    }
  }, []);

  const handleSubmitInicioSesion = () => {
    console.log(items);
    // if (items !== []) {
    if (!items == []) {
      return navigate("/");
    } else {
      console.log(false);
    }
  };

  return (
    <form className={styles.formLogin} onSubmit={handleSubmit}>
      <div className={styles.div}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={handleNombreChange}
          required
        />
        {nombreError && <p className={styles.errorMessage}>{nombreError}</p>}
      </div>
      <div className={styles.div}>
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={handleApellidoChange}
          required
        />
        {apellidoError && (
          <p className={styles.errorMessage}>{apellidoError}</p>
        )}
      </div>
      <div className={styles.div}>
        <label>Telefono:</label>
        <input
          type="number"
          value={telefono}
          onChange={handleTelefonoChange}
          required
        />
        {telefonoError && (
          <p className={styles.errorMessage}>{telefonoError}</p>
        )}
      </div>
      <div className={styles.div}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={mail}
          onChange={handleMailChange}
          required
        />
        {mailError && <p className={styles.errorMessage}>{mailError}</p>}
      </div>
      <div className={styles.div}>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {passwordError && (
          <p className={styles.errorMessage}>{passwordError}</p>
        )}
      </div>
      
      <button
        className={styles.boton}
        type="submit"
        onClick={() => {
          handleSubmit();
        }}
      >
        Registrarse
      </button>
    </form>
  );
};

export default Registro;
