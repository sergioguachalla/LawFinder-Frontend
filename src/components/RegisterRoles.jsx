import React, { useState } from "react";
import { useRegisterRolesStore } from "../store/RegisterRolesStore";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/Home.css';

const RegisterRoles = () => {
  const navigate = useNavigate();
  const { createRole } = useRegisterRolesStore();
  const [roleName, setRoleName] = useState("");
  const [privileges, setPrivileges] = useState("");

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (!roleName || !privileges) {
      alert("Por favor, complete todos los campos");
      return;
    }
    try {
      await createRole({ roleName, privileges: privileges.split(",") });
      navigate('/roles');
    } catch (error) {
      console.error("Error al registrar el rol:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-roles-container">
        <h1>Registrar Nuevo Rol</h1>
        <form onSubmit={handleRoleSubmit}>
          <div className="form-group">
            <label htmlFor="roleName">Nombre del Rol:</label>
            <input
              type="text"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="privileges">Privilegios (separados por comas):</label>
            <input
              type="text"
              id="privileges"
              value={privileges}
              onChange={(e) => setPrivileges(e.target.value)}
            />
          </div>
          <button type="submit">Registrar Rol</button>
        </form>
      </div>
    </>
  );
};

export default RegisterRoles;
