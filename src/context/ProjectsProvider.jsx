import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const navigate = useNavigate(); //para poder redireccionar
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false); //el state de loading
  const [formTaskModal, setFormTaskModal] = useState(false); //modal
  const [task, setTask] = useState({}); //para poder editar la tarea
  const [modalDeleteTask, setModalDeleteTask] = useState(false); //modal de eliminar
  const [collaborator, setCollaborator] = useState({}); //para manejar el estado del colaborador
  const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false); //para manejar el estado del colaborador
  

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

        const { data } = await clientAxios.get("/proyectos", config);
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

    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  const editProject = async (project) => {
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
      //api, proyecto a actualizar y la config
      const { data } = await clientAxios.put(
        `/proyectos/${project.id}`,
        project,
        config
      );
      // console.log(data);

      //sicronizamos el state
      //hacemos un mapeo de los proyectos y igualamos el id de los proyectos mapeado es exacto a la data._id
      // entonces retorna la data o sino dejalo como esta
      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      // console.log(updatedProjects);
      setProjects(updatedProjects); //colocamos un nuevo valor del state de Proyectos con la nueva data

      setAlert({
        msg: "Proyecto editado correctamente",
        error: false,
      });

      setTimeout(() => {
        //colocamos que la alerta se limpie en 4 segundos y redirija
        setAlert({});
        navigate("/proyectos");
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
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

      setProjects([...projects, data]); //agregamos una copia de los proyectos a la data para que se muestren siempre

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

  const getProject = async (id) => {
    //para obtener proyecto

    setLoading(true);
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

      const { data } = await clientAxios.get(`/proyectos/${id}`, config); //obtenemos la data de la api
      setProject(data); //colocamos lo obtenido por la data en el state
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
    setLoading(false);
  };

  const deleteProject = async (id) => {
    //eliminando proyecto
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
      const { data } = await clientAxios.delete(`/proyectos/${id}`, config);

      //sincronizamos el state
      const updatedProjects = projects.filter(
        (projectState) => projectState._id !== id
      );
      // console.log(updatedProjects);
      setProjects(updatedProjects); //colocamos un nuevo valor del state de Proyectos con la nueva data

      //alerta
      setAlert({
        msg: "Proyecto eliminado correctamente",
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

  const handleModalTask = () => {
    //pasando el modal en el context
    setFormTaskModal(!formTaskModal);
    setTask({}); //reiniciamos el formulario
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await newTask(task);
    }
  };

  const newTask = async (task) => {
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

      const { data } = await clientAxios.post("/tasks", task, config);
      console.log(data);

      // agrega la tarea al state
      const updatedTasks = { ...project };
      updatedTasks.tasks = [...project.tasks, data];

      setProject(updatedTasks); //agregamos las tareas nuevas y actualizados al state
      setAlert({}); //limpiamos la alerta en caso que sea actualizado el state
      setFormTaskModal(false); //cerramos el modal una vez sea insertado la tarea
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
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

      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

      //sincronizamos el state
      const projectUpdated = { ...project };
      projectUpdated.tasks = projectUpdated.tasks.map((taskState) =>
        taskState._id === data._id ? data : taskState
      );
      //si taskState._id es igual a data._id que es la respuesta de la api lo que actualizamos,
      // entonces reescribe el taskState o sino retonra el taskState
      setProject(projectUpdated); //colocamos un nuevo valor del state de Proyectos con la nueva data

      setAlert({}); //limpiamos la alerta en caso que sea actualizado el state
      setFormTaskModal(false); //cerramos el modal una vez sea insertado la tarea
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditTask = (task) => {
    // console.log(task);

    setTask(task);
    setFormTaskModal(true);
  };

  const handleDeleteTask = (task) => {
    setTask(task); //pasamos la tarea a el context
    setModalDeleteTask(!modalDeleteTask); //abrimos el modal
  };

  const deleteTask = async () => {
    try{
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

      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false
      }); 

      //sincronizamos el state
      const projectUpdated = { ...project };
      projectUpdated.tasks = projectUpdated.tasks.filter(taskState => taskState._id !== task._id)
      //filtramos las tareas que no sean la que se elimino

      setProject(projectUpdated); //colocamos un nuevo valor del state de Proyectos con la nueva data

      setModalDeleteTask(false); //cerramos el modal una vez sea insertado la tarea
      setTask({}); //limpiamos el objeto de tarea
      setTimeout(() => {
        setAlert({});
      }, 3200);
    }catch(error){
      console.log(error);
    }
  }

  const submitCollaborator = async (email) => {

    setLoading(true); //activamos el loading
    try{
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
                                      //pasamos la url, el email y la config
      const { data } = await clientAxios.post('/proyectos/colaboradores', {email}, config);

      setCollaborator(data); //colocamos el colaborador en el state
      setAlert({});  //limpiamos la alerta en caso que sea actualizado el state
    }catch(error){
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    } finally {
      setLoading(false); //desactivamos el loading
    }
  }

  const addCollaborator = async (email) => {
    try{
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

      const { data } = await clientAxios.post(`/proyectos/colaboradores/${project._id}`, email, config);

      setAlert({
        msg: data.msg,
        error: false
      })


    }catch(error){
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const handleModalDeleteCollaborator = (collaborator) => {

    setModalDeleteCollaborator(!modalDeleteCollaborator); //abrimos el modal

    setCollaborator(collaborator); //pasamos el colaborador al state

  }

  const deleteCollaborator = async () => {

    try{

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

      const { data } = await clientAxios.post(`/proyectos/eliminar-colaborador/${project._id}`, {id: collaborator._id }, config);

      const projectUpdated = { ...project };
      
      //actualizamos el state
      projectUpdated.collaborators = projectUpdated.collaborators.filter(collaboratorState => collaboratorState._id !== collaborator._id)

      setProject(projectUpdated); //colocamos un nuevo valor del state de Proyectos con la nueva data
      setAlert({
        msg: data.msg,
        error: false
      })

      setCollaborator({}); //limpiamos el colaborador
      setModalDeleteCollaborator(false); //limpiamos el modal de colaborador
      setAlert({}); //limpiamos la alerta en caso que sea actualizado el state
    }catch(error){
      console.log(error.response);
    }

    setAlert({
      msg: data.msg,
      error: false
    })

    setCollaborator({}); //limpiamos el colaborador


  }
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        showAlert,
        alert,
        submitProject,
        getProject,
        project,
        loading,
        deleteProject,
        formTaskModal,
        handleModalTask,
        submitTask,
        handleModalEditTask,
        task,
        modalDeleteTask,
        handleDeleteTask,
        deleteTask,
        submitCollaborator,
        collaborator,
        addCollaborator,
        handleModalDeleteCollaborator,
        modalDeleteCollaborator,
        deleteCollaborator
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export { ProjectsProvider };

export default ProjectsContext;
