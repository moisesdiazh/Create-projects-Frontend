import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const ProjectPreview = ({ project }) => {

  const { auth } = useAuth(); //usamos el hook de useAuth
  const { name, _id, client, owner } = project;
  return (
    <div className="border-b p-5 flex justify-between">
      
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {name}

          <span className="text-sm text-gray-500">
            {""} - {client}
          </span>
        </p>

        {auth._id !== owner && (
          <p className="p-1 text-xs rounded-lg text-white bg-sky-600 font-bold uppercase">Colaborador</p>
        )}
      </div>

      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
        Ver
      </Link>
    </div>
  );
};

export default ProjectPreview;
