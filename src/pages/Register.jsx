import { useState } from "react"; //import React from "react"
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const Register = () => {

  const [nombre, setNombre] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [repetPassword, setRepetPassword] = useState(""); 
  const [alert, setAlert] = useState({}); //agarramos el objeto con la alerta


  const handleSubmit = async e => {

    e.preventDefault();

    // validamos que los campos no esten vacios
    if([nombre, email, password, repetPassword].includes("")){
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetPassword){
      setAlert({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlert({
        msg: 'Debe agregar minimo 6 caracteres',
        error: true
      })
      return
    }

    setAlert({}) //limpiamos el objeto alerta

    //crear el usuario en la api
    try {
      //obtenemos la data solamente, mandamos nombre, email y password 
      const {data} = await clientAxios.post(`/users`, {nombre, email, password});
                    //factorizamos la url en clienteAxios
      setAlert({
        msg: data.msg,
        error: false
      })

      setNombre("");
      setEmail("");
      setPassword("");
    }catch(error){
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const {msg} = alert; //extraemos el mensaje de la alerta con desestructuracion


  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Crea tu cuenta
      </h1>

      {msg && <Alert alert={alert}/>}{/* si mensaje existe y alert tiene alguna alerta  */}

      <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="nombre"
            className="text-xl block text-sky-600 font-bold mb-2"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            className="w-full mt-3 p-3 mb-5 border rounded-xl bg-gray-50"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>


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
            Contraseña
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

        <div>
          <label
            htmlFor="password2"
            className="text-xl block text-sky-600 font-bold mt-2"
          >
            Repetir contraseña
          </label>
          <input
            id="password2"
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            placeholder="Repite tu contraseña"
            value={repetPassword}
            onChange={(e) => setRepetPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Registrar"
          className="w-full mt-5 p-3 bg-sky-600 text-white font-bold rounded-xl 
          hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center text-sky-600 font-bold text-sm"
        >
          ¿Te encuentras registrado? Inicia sesión
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

export default Register;
