
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Role from './components/Role'
import CaseInformation from './components/CaseInformation'
import RegisterFile from './components/RegisterFile'

import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Role" element={<Role />} />
          <Route path="CaseDetails/:id" element={<CaseInformation />} />
          <Route path="RegisterFile/:id" element={<RegisterFile />} />

        </Routes>
      </BrowserRouter>
      </ChakraProvider>

      
  )
}

export default App
