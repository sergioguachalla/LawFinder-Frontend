import React, { useState, useEffect } from "react";
import { useRegisterRolesStore } from "../store/registerRoles";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../styles/RegisterRoles.css';

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
      let privileges = selectedPrivileges.map(i => Number(i));
      console.log(privileges);
      await createRole({ roleName, privileges });
      navigate('/RolesAdmin');
    } catch (error) {
      console.error("Error al registrar el rol:", error);
    }
  };

  const handlePrivilegeChange = async (e) => {
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
      <div className="roles-container">
        <h1 className="Audience-title">Registrar Nuevo Rol</h1>
        <form onSubmit={handleRoleSubmit} className="form-container">
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
            <table className="privileges-table">
              <thead>
                <tr>
                  <th>Privilegio</th>
                  <th>Check</th>
                </tr>
              </thead>
              <tbody>
                {privileges.map(privilege => (
                  <tr key={privilege.privilegeId}>
                    <td>{privilege.privilege}</td>
                    <td>
                      <input
                        type="checkbox"
                        id={`privilege_${privilege.privilegeId}`}
                        value={privilege.privilegeId}
                        onChange={handlePrivilegeChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="submit" className="add-role-button">Registrar Rol</button>
          <button className="add-role-button" onClick={()=>{navigate("/RolesAdmin")}}>Cancelar</button>

        </form>
      </div>
    </>
  );
};

export default RegisterRoles;
