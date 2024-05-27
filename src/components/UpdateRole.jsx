import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateRoleStore } from "../store/updateRoleStore";
import Navbar from "./Navbar";
import '../styles/RegisterRoles.css';

const UpdateRoles = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { privileges, getRoleDetails, updateRole, setRoleId, setPrivilegeStatus } = useUpdateRoleStore();

  useEffect(() => {
    setRoleId(id);
    getRoleDetails(id);
  }, [getRoleDetails, setRoleId, id]);

  const handleRoleUpdate = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm("¿Estás seguro de que quieres actualizar este rol?");
    if (confirmUpdate) {
      try {
        await updateRole();
        navigate("/RolesAdmin");
      } catch (error) {
        console.error("Error updating role:", error);
      }
    }
  };

  const handlePrivilegeStatusChange = (e) => {
    const { checked } = e.target;
    const privilegeId = parseInt(e.target.id.split('_')[1]);
    setPrivilegeStatus(privilegeId, checked);
  };

  const handleCancel = () => {
    navigate("/RolesAdmin");
  };

  return (
    <>
      <Navbar />
      <div className="roles-container">
        <h1 className="Audience-title">Actualizar Rol</h1>
        <form onSubmit={handleRoleUpdate} className="form-container">
          <div className="form-group">
            <label>Privilegios:</label>
            {privileges.map(privilege => (
              <div key={privilege.privilegeId}>
                <input
                  type="checkbox"
                  id={`privilege_${privilege.privilegeId}`}
                  checked={privilege.status}
                  onChange={handlePrivilegeStatusChange}
                />
                <label htmlFor={`privilege_${privilege.privilegeId}`}>{privilege.privilege}</label>
              </div>
            ))}
          </div>
          <br />
          <button type="submit">Actualizar Rol</button>
          <br />
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
      </div>
    </>
  );
};

export default UpdateRoles;
