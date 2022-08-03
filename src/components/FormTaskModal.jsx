import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";
import { useParams } from "react-router-dom";


// ES EL ENUM QUE TENEMOS EN EL MODELO DE TASK EN EL BACKEND
const PRIORITY = ["Baja", "Media", "Alta"];

const FormTaskModal = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [finishDate, setFinishDate] = useState("");

  const params = useParams();


  const { formTaskModal, handleModalTask, showAlert, alert, submitTask, task } = useProjects();

  useEffect(() => {
    if(task?._id) { //si estamos editando una tarea
      setId(task._id); //colocamos el nombre en caso que vaya a editar
      setName(task.name); //colocamos el nombre en caso que vaya a editar
      setDescription(task.description);
      setPriority(task.priority);
      setFinishDate(task.finishDate?.split("T")[0]);
      return

    }
    setId("");
    setName(""); //en caso que no, lo dejaremos vacio
    setDescription("");
    setPriority("");
    setFinishDate("");

  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([name, description, priority, finishDate].includes('')){
        showAlert({
            msg: "Todos los campos son obligatorios",
            error: true
        })
        return
    }

    await submitTask({id, name, description, priority, finishDate, project: params.id});

    //para limpiar el formulario una vez sea enviado
    setId("");
    setName("");
    setDescription("");
    setPriority("");
    setFinishDate("");

  }

  const {msg} = alert;

  return (
    <Transition.Root show={formTaskModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTask}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleModalTask}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-bold text-gray-900"
                  >
                    {id ? "Editar tarea" : "Agregar tarea"}
                    {/* en caso de que exista un id, editar tarea y sino agregar tarea */}
                  </Dialog.Title>

                  {msg && <Alert alert={alert} />}

                  <form className="my-10" onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Nombre de la tarea"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="description"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Descripción
                      </label>
                      <textarea
                        id="description"
                        placeholder="Coloque una descripción"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="finishDate"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Fecha de entrega
                      </label>
                      <input
                        type="date"
                        id="finishDate"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={finishDate}
                        onChange={(e) => setFinishDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="priority"
                        className="text-gray-700 uppercase font-bold text-sm"
                      >
                        Prioridad
                      </label>
                      <select
                        id="priority"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="">-- Seleccione una prioridad --</option>
                        {/* es el ENUM en el modelo de TASK EN EL BACKEND */}
                        {PRIORITY.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="submit"
                      value={id ? "Editar tarea" : "Agregar tarea"}
                      className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default FormTaskModal;
