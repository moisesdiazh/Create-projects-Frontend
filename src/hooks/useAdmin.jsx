import useAuth from "./useAuth";
import useProjects from "./useProjects";

const useAdmin = () => { //hook para verificar quien es el admin del proyecto

    const {project} = useProjects();

    const {auth} = useAuth();

    return project.owner === auth._id
}

export default useAdmin;