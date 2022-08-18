import ProjectPreview from "../components/ProjectPreview";
import useProjects from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects(); //obtenemos los proyectos del hook de useProjects y lo realizado en ProjectProvider

  //console.log(projects);  para ver que trae los projects
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map(project => (
            <ProjectPreview key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            No hay proyectos disponibles
          </p>
        )}
      </div>
    </>
  );
};

export default Projects;
