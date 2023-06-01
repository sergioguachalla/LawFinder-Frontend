
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Role from './components/Role'
import { Provider } from 'react-redux'


function App() {

  return (
    <Provider>

      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Role" element={<Role />} />
        </Routes>
      </BrowserRouter>

      
    </Provider>
  )
}

export default App
