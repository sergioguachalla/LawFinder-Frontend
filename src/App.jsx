
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Role from './components/Role'


function App() {

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Role" element={<Role />} />
        </Routes>
      </BrowserRouter>

      
  )
}

export default App
