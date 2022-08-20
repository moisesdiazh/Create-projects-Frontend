import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";
import Busqueda from "./Busqueda";


const Header = () => {

  const {handleBuscador, logoutSesion} = useProjects();
  
  const {logoutSesionAuth} = useAuth();

  const handleLogoutSession = () => {
    logoutSesionAuth();
    logoutSesion();
    localStorage.removeItem('token');
  }

  return (
    
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
      
        <h2 className="text-4xl text-sky-600 font-black mb-5 md:mb-0">OrganizerApp</h2>


        
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link to="/proyectos" className="text-gray-600 hover:text-gray-800 uppercase font-bold">
            Proyectos
          </Link>
          <button type="button" className="bg-sky-600 text-white text-sm p-3 rounded-md uppercase font-bold cursor-pointer hover:bg-sky-700 transition-colors" onClick={handleBuscador}>
            Buscar proyecto
          </button>

          <button
            type="button"
            className="bg-sky-600 text-white text-sm p-3 rounded-md uppercase font-bold cursor-pointer hover:bg-sky-700 transition-colors"
            onClick={handleLogoutSession}
          >
            Cerrar sesión
          </button>

          <Busqueda/>

          

          
        </div>
      </div>
      
    </header>

    
  );
};

export default Header;
