import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [client, setClient] = useState("");

  const { showAlert, alert, submitProject } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, description, finishDate, client].includes("")) {
      showAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }
    await submitProject({ name, description, finishDate, client }); //mandamos como objeto al provider

    setName("");
    setDescription("");
    setFinishDate("");
    setClient("");
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="name"
        >
          Nombre del proyecto
        </label>
        <input
          type="text"
          id="name"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del proyecto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="description"
        >
          Descripción
        </label>
        <textarea
          id="description"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Escribe una breve descripción del proyecto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="finish-date"
        >
          Fecha de entrega
        </label>
        <input
          type="date"
          id="finish-date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={finishDate}
          onChange={(e) => setFinishDate(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="client"
        >
          Nombre del cliente
        </label>
        <input
          type="text"
          id="client"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del cliente"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Crear proyecto"
        className="bg-sky-600 w-full rounded-lg p-3 text-white uppercase font-bold block mt-5 text-center rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProject;
