import FormProject from "../components/FormProject";
import { Link } from "react-router-dom";



const NewProject = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear proyecto</h1>
      <div className="mt-2">
        <Link to="/proyectos" className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
        </svg>
        </Link>
      </div>
      
      

      <div className="mt-10 flex justify-center">
        <FormProject/>
      </div>
    </>
  )
}

export default NewProject