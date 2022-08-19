import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProjects from "../hooks/useProjects";
import Search from "./Search";


const Header = () => {

  const {handleSearcher, logoutSesion} = useProjects();
  
  const {logoutSesionAuth} = useAuth();

  const handleLogoutSession = () => {
    logoutSesionAuth();
    logoutSesion();
    localStorage.removeItem('token');
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black mb-5 md:mb-0">UpTask</h2>


        <div className="flex flex-col md:flex-row items-center gap-4">
          <button type="button" className="font-bold uppercase" onClick={handleSearcher}>
            Buscar proyecto
          </button>
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>

          <button
            type="button"
            className="bg-sky-600 text-white text-sm p-3 rounded-md uppercase font-bold cursor-pointer hover:bg-sky-700 transition-colors"
            onClick={handleLogoutSession}
          >
            Cerrar sesión
          </button>

          <Search/>
        </div>
      </div>
    </header>
  );
};

export default Header;
