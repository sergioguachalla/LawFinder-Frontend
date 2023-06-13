import { BrowserRouter, Routes, Route, Navigate, Redirect} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Role from './components/Role';
import CaseInformation from './components/CaseInformation';
import RegisterFile from './components/RegisterFile';
import PrivateRoute from './utils/PrivateRoute';
import Home from './components/Home';



function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Role" element={<Role />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/CaseDetails/:id" element={<CaseInformation />} />

          {/* <Route element={<PrivateRoute/>}>
            <Route path="/Home" element={<Home/>} />
          </Route> */}
          
          
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
