import { useEffect } from "react";
import CollaboratorForm from "../components/CollaboratorForm";
import useProjects from "../hooks/useProjects";
import { useParams } from "react-router-dom"; //para obtener el id por parametros de la url
import { Link } from "react-router-dom";


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

      <div className="mt-2">
        <Link
              to={`/proyectos/${params.id}`}
              className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        >
                  {/* stroke-linecap="round"       stroke-linejoin="round"                                                                  stroke-width="2" */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
        </svg>  
        </Link>
      </div>
      

      <div className="mt-10 flex justify-center">
        <CollaboratorForm />
      </div>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : (
        collaborator?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
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
