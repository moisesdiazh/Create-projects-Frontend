import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import axios from "axios";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";


const NewPassword = () => {
  const [password, setPassword] = useState(""); //para manejar el password

  const [passwordModified, setPasswordModified] = useState(false);

  const [tokenConfirmed, setTokenConfirmed] = useState(false);

  const [alert, setAlert] = useState({});

  const params = useParams(); //para leer el parametro en la url

  const { token } = params; //obtenemos el token

  useEffect(() => {
    const confirmTokenPassword = async () => {
      try {
        await clientAxios(`/users/olvide-password/${token}`);
        setTokenConfirmed(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmTokenPassword();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "La contraseña debe ser minimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/users/olvide-password/${token}`;

      const { data } = await clientAxios.post(url, { password });
      //pasamos la url y la password que obtenemos del input
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPasswordModified(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Reestablecer contraseña
      </h1>

      {msg && <Alert alert={alert} />}

      {tokenConfirmed && ( //si el token esta confirmado, entonces muestra el formulario
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="password"
              className="text-xl block text-sky-600 font-bold mt-2"
            >
              Nueva contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              placeholder="Coloque su nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Cambiar contraseña"
            className="w-full mt-5 p-3 bg-sky-600 text-white font-bold rounded-xl 
          hover:cursor-pointer hover:bg-sky-700 transition-colors"
          />
        </form>

        

        // fin de validacion
      )}

      {passwordModified && ( //si accountConfirmed es true entonces retorna el link para volver al inicio
        <Link
          to="/"
          className="block text-center text-sky-600 font-bold text-sm"
        >
          Inicia sesión
        </Link>
      )}

    </>
  );
};

export default NewPassword;
