import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./components/Login";
import Role from "./components/Role";
import Confirmation from "./components/Confirmation";
import RegisterUser from "./components/RegisterUser";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {store} from "./store/store";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "Role/",
    element: <Role />,
  },
  {
    path: "Confirmation/",
    element: <Confirmation/>,
  },
  {
    path: "RegisterUser/",
    element: <RegisterUser/>,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>
);