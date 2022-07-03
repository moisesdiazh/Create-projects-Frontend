import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 5) {
      setAlert({
        msg: "El correo es obligatorio",
        error: true,
      });
    }

    try {
      const { data } = await clientAxios.post(`/users/olvide-password`, { email });
                      //simplificamos la url en clienteAxios
      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  //extraemos el mensaje
  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Recuperar contraseña
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

        <input
          type="submit"
          value="Enviar para recuperar"
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
          to="/registrar"
          className="block text-center text-sky-600 font-bold text-sm"
        >
          ¿Aun no estas registrado? Pulsa para registrarte
        </Link>
      </nav>
    </>
  );
};

export default ForgetPassword;
