import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import FormTaskModal from "../components/FormTaskModal";
import DeleteTaskModal from "../components/ModalDeleteTask";
import Task from "../components/Task";
import Alert from "../components/Alert";

const Project = () => {
  const params = useParams(); //capturamos lo que mandamos por get

  const { getProject, project, loading, handleModalTask, alert } =
    useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  if (loading) return "Cargando...";

  const { msg } = alert;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">{name}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
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
      </div>

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

      <p className="font-bold text-xl mt-10">Tareas</p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/4 lg:w-1/2">
          {msg && <Alert alert={alert} />}
        </div>
      </div>

      <div className="bg-white  shadow mt-10 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10">
            No hay tareas asignadas en este proyecto
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-10">
        <p className="font-bold text-xl mt-10">Colaboradores</p>
        <Link
          to={`/proyectos/nuevo-colaborador/${project._id}`}
          className="text-gray-400 hover:text-black  uppercase font-bold"
        >
          Añadir colaborador
        </Link>
      </div>

      <FormTaskModal />

      <DeleteTaskModal />
    </>
  );
};

export default Project;
