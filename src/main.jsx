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
import RegisterFile from "./components/RegisterFile";
import CaseInformation from "./components/CaseInformation";
import Invitation from "./components/Invitation";
import LaywerRegistration from "./components/LawyerRegistration";
import ArchivedCases from "./components/ArchivedCases";
import RegisterAudience from "./components/RegisterAudience";
import Calendaruser from "./components/Calendaruser";
import Users from "./components/Users";

import CaseFile from "./components/CaseFile";
import { Calendar } from "react-big-calendar";


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
    path: "RegisterFile/:id",
    element: <RegisterFile/>,
  },

  {
    path: "CaseDetails/:id",
    element: <CaseInformation/>,
  },
  {
    path: "Invitation/",
    element: <Invitation/>,
  },
  {
    path: "LawyerRegistration/",
    element: <LaywerRegistration/>,
  },
  {
    path: "RegisterAudience/:id",
    element: <RegisterAudience/>,
  },
  {
    path: "CaseDetails/:id/CaseFile",
    element: <CaseFile/>,
  },
  {
    path: "ArchivedCases/",
    element: <ArchivedCases/>,
  },
  {
    path: "Calendar/",
    element: <Calendaruser/>,
  },
  {
    path: "Users/",
    element: <Users/>,
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);