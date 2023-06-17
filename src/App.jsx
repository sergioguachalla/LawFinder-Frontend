import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Role from './components/Role';
import CaseInformation from './components/CaseInformation';
import Home from './components/Home';
import LaywerRegistration from './components/LawyerRegistration';
import CaseFile from './components/CaseFile';



function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Role" element={<Role />} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/CaseDetails/:id" element={<CaseInformation />} />
          <Route path="/LawyerRegistration" element={<LaywerRegistration />} />
          {/* <Route element={<PrivateRoute/>}>
            <Route path="/Home" element={<Home/>} />
          </Route> */}
          <Route path="/CaseDetails/:id/CaseFile" element={<CaseFile />} />
          
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
