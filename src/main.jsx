import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./components/Login";
import Role from "./components/Role";
import Home from "./components/Home";
import Confirmation from "./components/Confirmation";
import RegisterUser from "./components/RegisterUser";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegisterCase from "./components/RegisterCase";
import UploadForm from "./components/UploadForm";

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
  {
    path: "RegisterCase/",
    element: <RegisterCase/>,
  },
  {
    path:'Home/',
    element: <Home/>,
  },
  {
    path: "UploadForm/",
    element: <UploadForm/>,
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);