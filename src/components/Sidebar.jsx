import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"; //accedemos a useAuth para manejar la autenticacion

const Sidebar = () => {
  const { auth } = useAuth(); //desestructuramos el usuario autenticado para sacar el nombre

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold ">Hola {auth.nombre}</p>

      <Link
        to="crear-proyecto"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg cursor-pointer hover:bg-sky-700 transition-colors"
      >
        Nuevo proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
