import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormProject from "../components/FormProject";
import useProjects from "../hooks/useProjects";
import { Link } from "react-router-dom";



const EditProject = () => {
  const params = useParams();
  const { getProject, project, loading, deleteProject } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const handleDelete = () => {
    if (confirm("¿Deseas eliminar el proyecto?")) {
      deleteProject(params.id); //pasamos el id del proyecto 
    }
  };

  const { name } = project;

  if (loading) return "Cargando..";

  return (
    <>
      <div className="flex justify-between">
        <div className="font-black text-4xl">
          Editar proyecto: {name}
          
          <div className="mt-2">

              <Link
                to={`/proyectos/${params.id}`}
                className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
              >
                
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>  
              </Link>
              
              
          </div>
          
          
        </div>
        
        

        <div className="flex items-center gap-2 ">
          
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <button className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold" onClick={handleDelete}>
            Eliminar
          </button>
          
        </div>

        
      </div>

      <div className="mt-10 flex justify-center">
        <FormProject />

        
      </div>
    </>
  );
};
export default EditProject;
