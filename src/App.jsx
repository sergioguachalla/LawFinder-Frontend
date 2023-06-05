
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Role from './components/Role'
import CaseInformation from './components/CaseInformation'


function App() {

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Role" element={<Role />} />
          <Route path="CaseDetails/:id" element={<CaseInformation />} />
        </Routes>
      </BrowserRouter>

      
  )
}

export default App
