// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { routes } from "../../Routes/routes";

// import styles from "./Login.module.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   const { email, password } = user;

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (user.email === localStorage.getItem("userData").gmail) {
//       console.log(user.email);
//       console.log(localStorage.getItem("userData").gmail);
//     }
//     console.log(user);
//     localStorage.getItem("userData").gmail;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevCredentials) => ({
//       ...prevCredentials,
//       [name]: value,
//     }));
//   };

//   const handleSubmitInicioSesion = () => {
//     if (JSON.stringify(user) === JSON.stringify({ email: "", password: "" })) {
//       return <p>¡Error! No se encontraron datos de usuario.</p>;
//     } else {
//       localStorage.setItem("user", JSON.stringify(user));
//       navigate("/");
//       window.location.reload();
//     }
//   };

//   return (
//     <div>
//       <form className={styles.formLogin} onSubmit={handleSubmit}>
//         <div className={styles.input}>
//           <label>Correo electrónico:</label>
//           <input
//             type="text"
//             name="email"
//             value={user.email}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className={styles.input}>
//           <label>Contraseña:</label>
//           <input
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button
//           className={styles.boton}
//           type="submit"
//           onClick={() => {
//             {
//               handleSubmitInicioSesion();
//             }
//           }}
//         >
//           Iniciar sesión
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const backendURL = "http://34.229.181.144/api/v1/auth/authenticate";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendURL, user);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        console.log(response);
        console.log(response.data);
        navigate("/");
        window.location.reload();
      } else {
        console.error("Error de inicio de sesión");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
