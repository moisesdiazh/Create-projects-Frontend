import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import FormTaskModal from "../components/FormTaskModal";
import DeleteTaskModal from "../components/ModalDeleteTask";
import Task from "../components/Task";
import Alert from "../components/Alert";
import Collaborator from "../components/Collaborator";
import ModalDeleteCollaborator from "../components/ModalDeleteCollaborator";
import useAdmin from "../hooks/useAdmin";


const Project = () => {
  const params = useParams(); //capturamos lo que mandamos por get

  const { getProject, project, loading, handleModalTask, alert } = useProjects();

  const admin = useAdmin(); //hook para verificar quien es el admin del proyecto
  // console.log(admin);


  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  // console.log(project);

  if (loading) return "Cargando...";

  const { msg } = alert;

  // console.log(project);

  return  (

    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">{name}</h1>

      {admin && ( //en caso que sea el admin solo el puede editar
        <div className="flex items-center gap-2 bg-sky-600 text-white text-sm p-3 rounded-md uppercase font-bold cursor-pointer hover:bg-sky-700 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>

          <Link
            to={`/proyectos/editar/${params.id}`}
            className="font-bold uppercase"
          >
            Editar
          </Link>
        </div>
        )}{/* en caso que sea el admin puede editar */}
        
      </div>

      {admin && ( //solo el admin

      <button
        onClick={handleModalTask} //colocamos el callback para abrir modal
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-600 text-white text-center mt-5 flex gap-2 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Añadir tarea
      </button>
      )} {/* solo el admin */}
      

      <p className="font-bold text-xl mt-10">Tareas</p>

      <div className="bg-white  shadow mt-10 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas asignadas en este proyecto
          </p>
        )}
      </div>

      {admin && (
      <>
      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl mt-10">Colaboradores</p>
        <Link
          to={`/proyectos/nuevo-colaborador/${project._id}`}
          className="bg-sky-600 text-white text-sm p-3 rounded-md uppercase font-bold cursor-pointer hover:bg-sky-700 transition-colors"
        >
          Añadir colaborador
        </Link>
      </div>

      <div className="bg-white  shadow mt-10 rounded-lg">
        {project.collaborators?.length ? (
          project.collaborators?.map((collaborator) => <Collaborator key={collaborator._id} collaborator={collaborator}/>)
        ) : (
          <p className="text-center my-5 p-10">
            No se encontraron colaboradores
          </p>
        )}
      </div>
      </>
      )}

      <FormTaskModal />

      <DeleteTaskModal />

      <ModalDeleteCollaborator />

    </>
  )
  

};

export default Project;
