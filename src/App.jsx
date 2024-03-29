import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout"; //importamos AuthLayout
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";
import NewCollaborator from "./pages/NewCollaborator";


import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
              <Route path="olvide-password" element={<ForgetPassword />} />
              <Route path="olvide-password/:token" element={<NewPassword />} />
              <Route path="confirmar/:id" element={<ConfirmAccount />} />
            </Route>

            <Route path="/proyectos" element={<ProtectedRoute />}>
              <Route index element={<Projects />} />
              <Route path="crear-proyecto" element={<NewProject />} />
              <Route path="nuevo-colaborador/:id" element={<NewCollaborator />} />
              <Route path=":id" element={<Project />} />
              <Route path="editar/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
