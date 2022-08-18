import useProjects from "../hooks/useProjects";

const Collaborator = ({ collaborator }) => {

  const { handleModalDeleteCollaborator } = useProjects();

  // console.log(collaborator);
  const { nombre, email } = collaborator;
  return (

  <div className="border-b p-5 flex justify-between items-center">

    <div>
        <p className="font-bold text-gray-800">{nombre}</p>
        <p className="font-bold text-gray-800">{email}</p>
    </div>

    <div>
        <button type="button" className="bg-red-500 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={() => handleModalDeleteCollaborator(collaborator)}>
            Eliminar
        </button>
    </div>
  </div>
  );
};

export default Collaborator;
