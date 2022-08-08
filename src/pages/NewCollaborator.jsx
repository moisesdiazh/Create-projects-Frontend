import { useEffect } from "react";
import CollaboratorForm from "../components/CollaboratorForm";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom"; //para obtener el id por parametros de la url

const NewCollaborator = () => {
  const { getProject, project, loading, collaborator, addCollaborator, alert } =
    useProjects();
  const params = useParams();

  useEffect(() => {
    getProject(params.id); //obtenemos el proyecto mediante el id enviado por la url
  }, []);

  if(!project?._id) return <Alert alert={alert} />

  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir colaborador a {project.name}
      </h1>

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        collaborator?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
              <h2 className="text-center mb-10 text-2xl font-bold">
                Resultado:
              </h2>

              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800">{collaborator.nombre}</p>

                <button
                  type="button"
                  className="bg-sky-600 hover:bg-sky-700 p-3 text-white text-sm uppercase font-bold cursor-pointer transition-colors rounded-lg"
                  onClick={() =>
                    addCollaborator({
                      email: collaborator.email,
                    })
                  }
                >
                  Agregar al proyecto
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewCollaborator;
