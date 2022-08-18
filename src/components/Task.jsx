import { formatDate } from "../helpers/formatDate";
import useAdmin from "../hooks/useAdmin";
import useProjects from "../hooks/useProjects";

const Task = ({ task }) => {
  const { handleModalEditTask, handleDeleteTask, completeTask } = useProjects();

  const { description, name, priority, finishDate, status, _id } = task;

  const admin = useAdmin(); //hook para verificar quien es el admin del proyecto

  return (
    <>
      <div className="border-b p-5 flex justify-between items-center">
        <div>
          <p className="text-xl mb-1">{name}</p>
          <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
          <p className="text-sm mb-1">{formatDate(finishDate)}</p>
          <p className="text-gray-500 mb-1">{priority}</p>
        </div>

        <div className="flex gap-2">
          {admin && (
            <button
              className="bg-indigo-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
              onClick={() => handleModalEditTask(task)}
            >
              Editar
            </button>
          )}

            <button
              className={`${status ? 'bg-sky-500' : 'bg-gray-300'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
              onClick={() => completeTask(_id)}
            >
              {status ? "Completado" : "Incompleta"}
            </button>

          {admin && (
            <button
              className="bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
              onClick={() => handleDeleteTask(task)}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Task;
