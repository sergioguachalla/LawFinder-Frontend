import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Role from './components/Role';
import CaseInformation from './components/CaseInformation';
import RegisterFile from './components/RegisterFile';
import useAuthStore from './store/authStore';

// Componente de ruta privada que verifica si el usuario está autenticado
const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/Login" />;
};

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Role" element={<Role />} />
          <PrivateRoute path="/CaseDetails/:id" element={<CaseInformation />} />
          <PrivateRoute path="/RegisterFile/:id" element={<RegisterFile />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
