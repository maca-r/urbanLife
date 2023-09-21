import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://52.90.49.166:443/api/v1/auth/authenticate",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      console.log(response.data);

      if (response.status === 200 || response.status === 202) {
        // Inicio de sesión exitoso, guarda el token en el localStorage
        localStorage.setItem("token", response.data.access_token);

        // Redirige al usuario a la página deseada según el email
        if (formData.email === "admin@mail.com") {
          window.location.href = "http://52.90.49.166:443/admin";
        } else {
          window.location.href = "http://52.90.49.166:443/";
        }
      } else {
        // Manejar errores de inicio de sesión aquí
        console.error("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión", error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
