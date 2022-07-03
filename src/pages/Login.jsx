import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();

    if([email, password].includes('')){ //validacion por si se encuentra vacio
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      return;
    }

    try {                                  //api y objeto con email y password
      const {data} = await clientAxios.post('/users/login', {email, password});
      setAlert({})
      // console.log(data);
      localStorage.setItem("token", data.token); //para enviar el token al localStorage
    }catch(error){
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  };

  const {msg} = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Inicia sesión y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="email"
            className="text-xl block text-sky-600 font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full mt-3 p-3 mb-5 border rounded-xl bg-gray-50"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-xl block text-sky-600 font-bold mt-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar sesión"
          className="w-full mt-5 p-3 bg-sky-600 text-white font-bold rounded-xl 
          hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/registrar"
          className="block text-center text-sky-600 font-bold text-sm"
        >
          ¿Aun no estas registrado? Pulsa para registrarte
        </Link>

        <Link
          to="/olvide-password"
          className="block text-center text-sky-600 font-bold text-sm"
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  );
};

export default Login;
