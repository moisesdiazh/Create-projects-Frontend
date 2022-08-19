import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

const AuthContext = createContext(); //creamos el context

//children es el componente que queremos que renderice
const AuthProvider = ({ children }) => {
  //donde vienen los datos

  //
  const [auth, setAuth] = useState({}); //el state para el auth
  const [loading, setLoading] = useState(true); //el state para el loading

  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        //pasamos el bearer token
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios("/users/perfil", config);
        //pasamos el bearer token del usuario
        setAuth(data);
        navigate('/proyectos');
      } catch (error) {

        setAuth({});
      }
      setLoading(false);
    };
    authUser();
  }, []);

  const logoutSesionAuth = () => {
      setAuth({})
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading, logoutSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
