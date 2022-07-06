import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const navigate = useNavigate(); //para poder redireccionar
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState([]);
  //se va a llenar una vez hagamos la consulta axios

  useEffect(() => {
    const getProjects = async () => {
      try {

        const token = localStorage.getItem("token"); //obtenemos el token
        if (!token) {
          return; //en caso que no exista el token, no se puede hacer la peticion
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const {data} = await clientAxios.get("/proyectos", config);
        // console.log(data);
        setProjects(data); //le pasamos data para que este en el state esos proyectos

      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({}); //reseteamos la alert a los 4s
    }, 4000);
  };

  const submitProject = async (project) => {
    //tomara el proyecto
    // console.log(project);
    try {
      const token = localStorage.getItem("token"); //obtenemos el token
      if (!token) {
        return; //en caso que no exista el token, no se puede hacer la peticion
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      //pasamos la url de la api, el formulario que enviamos por FormProject y el token
      const { data } = await clientAxios.post("/proyectos", project, config);
      setAlert({
        msg: "Proyecto creado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlert({});
        navigate("/proyectos");
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, showAlert, alert, submitProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
