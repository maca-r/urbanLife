import { useState } from "react";
import axios from "axios"; // Importa Axios
import styles from "./Registro.module.css";
import fondo from "../../Images/fondo.jpg"

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
  });

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registro =
      privateUrl != ""
        ? `${privateUrl}:80/api/v1/auth/register`
        : `${publicUrl}:80/api/v1/auth/register`;

    try {
      const response = await axios.post(registro, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Usuario registrado con éxito");
        window.location.href = "http://52.90.49.166:443/";
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al registrar usuario", error);
    }
  };

  return (
    <div  className={styles.containerRegister}>
        <img className={styles.fondo}
        src={fondo}
        alt="" />
        <div className={styles.contenedorRegistro}>
          <div  className={styles.formRegister}>
            <h2>Registro de Usuario</h2>
            <div>
              <form onSubmit={handleSubmit}>
              <div className={styles.inputForm}>
                <label>
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div  className={styles.inputForm}>
                <label>
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </div>
              <div  className={styles.inputForm}>
                <label>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div  className={styles.inputForm}>
                <label>
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div  className={styles.inputForm}>
                <label>
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.containerBoton}>
                <button className={styles.botonReg}>
                Registrar
                </button>

              </div>

            </form>
          </div>
          
        </div>
        </div>


    </div>
  );
}

export default Registro;
