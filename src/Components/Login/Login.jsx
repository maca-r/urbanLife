import { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const publicUrl = import.meta.env.VITE_API_URL_PUBLIC;
  const privateUrl = import.meta.env.VITE_API_URL_PRIVATE;

  const logeo =
    privateUrl != ""
      ? `${privateUrl}:80/api/v1/auth/authenticate`
      : `${publicUrl}:80/api/v1/auth/authenticate`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(logeo, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 202) {
        localStorage.setItem("token", response.data.access_token);

        if (formData.email === "admin@mail.com") {
          window.location.href = "http://52.90.49.166:443/admin";
        } else {
          window.location.href = "http://52.90.49.166:443/";
        }
      } else {
        console.error("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión", error);

      if (error.response && error.response.status === 403) {
        setErrorMessage("Cuenta inexistente o datos ingresados incorrectos");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}
      </form>
    </div>
  );
}

export default Login;
