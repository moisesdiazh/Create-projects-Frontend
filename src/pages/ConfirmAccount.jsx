import { useEffect, useState } from "react"; //useEffect para leer la url y se ejecute una sola vez
import {useParams, Link} from "react-router-dom";
// import axios from "axios";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";

const ConfirmAccount = () => {

  //colocamos la alerta
  const [alert, setAlert] = useState({});
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  //leemos el parametro de la url
  const params = useParams();
  const {id} = params; //desestructuramos el id de params

  useEffect(() => {
    const confirmAccount = async () => {

      try {
  
        const url = `/users/confirmar/${id}`;
        const {data} = await clientAxios(url);

  
        setAlert({
          msg: data.msg,
          error: false,
        });
        setAccountConfirmed(true);
  
      }catch(error){
        setAlert({
  
          msg: error.response.data.msg,
          error: true
        });
      }
    }
    confirmAccount();

  }, []); //el id se ejecuta solo una vez

  const {msg} = alert;



  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Confirma tu cuenta{" "}
        
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
          {msg && <Alert alert={alert}/>}

          {accountConfirmed && ( //si accountConfirmed es true entonces retorna el link para volver al inicio
            <Link
            to="/"
            className="block text-center text-sky-600 font-bold text-sm"
          >
            Inicia sesión
          </Link>
          )}
      </div>
    </>
  );
};

export default ConfirmAccount;
