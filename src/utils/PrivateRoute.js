import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = () => {
   let auth = localStorage.getItem('token') || null
   return (
      auth != null ? <Outlet/> : <Navigate to="/"/>
   )
}

export default PrivateRoute