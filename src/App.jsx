import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'; //importamos AuthLayout
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />} >
          <Route index element={<Login />} />
          <Route path='registrar' element={<Register />} />
          <Route path='olvide-password' element={<ForgetPassword />} />
          <Route path='olvide-password/:token' element={<NewPassword />} />
          <Route path='confirmar/:id' element={<ConfirmAccount />} />



        </Route>

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
