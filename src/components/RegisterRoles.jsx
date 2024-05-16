import React, { useState, useEffect } from "react";
import { useRegisterRolesStore } from "../store/RegisterRolesStore";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/Home.css';

const RegisterRoles = () => {
  const navigate = useNavigate();
  const { createRole, getPrivileges, privileges } = useRegisterRolesStore();
  const [roleName, setRoleName] = useState("");
  const [selectedPrivileges, setSelectedPrivileges] = useState([]);

  useEffect(() => {
    getPrivileges();
  }, [getPrivileges]);

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (!roleName || selectedPrivileges.length === 0) {
      alert("Por favor, complete todos los campos");
      return;
    }
    try {
      await createRole({ roleName, privileges: selectedPrivileges });
      navigate('/roles');
    } catch (error) {
      console.error("Error al registrar el rol:", error);
    }
  };

  const handlePrivilegeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPrivileges([...selectedPrivileges, value]);
    } else {
      setSelectedPrivileges(selectedPrivileges.filter(privilege => privilege !== value));
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
            <label>Privilegios:</label>
            {privileges.map(privilege => (
              <div key={privilege.privilegeId}>
                <input
                  type="checkbox"
                  id={`privilege_${privilege.privilegeId}`}
                  value={privilege.privilege}
                  onChange={handlePrivilegeChange}
                />
                <label htmlFor={`privilege_${privilege.privilegeId}`}>{privilege.privilege}</label>
              </div>
            ))}
          </div>
          <button type="submit">Registrar Rol</button>
        </form>
      </div>
    </>
  );
};

export default RegisterRoles;
