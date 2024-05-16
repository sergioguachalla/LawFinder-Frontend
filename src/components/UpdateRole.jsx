import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateRoleStore } from "../store/updateRoleStore";
import Navbar from "./Navbar";
import '../styles/Home.css';

const UpdateRoles = () => {
  const { roleId } = useParams();
  const { roleDetails, privileges, getRoleDetails, updateRole } = useUpdateRoleStore();
  const [updatedRole, setUpdatedRole] = useState({ roleName: '', privileges: [] });

  useEffect(() => {
    getRoleDetails(roleId);
  }, [getRoleDetails, roleId]);

  useEffect(() => {
    if (roleDetails) {
      setUpdatedRole({
        roleName: roleDetails.roleName,
        privileges: roleDetails.privileges.map(privilege => privilege.privilege)
      });
    }
  }, [roleDetails]);

  const handleRoleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateRole();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handlePrivilegeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setUpdatedRole(prevState => ({
        ...prevState,
        privileges: [...prevState.privileges, value]
      }));
    } else {
      setUpdatedRole(prevState => ({
        ...prevState,
        privileges: prevState.privileges.filter(privilege => privilege !== value)
      }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="update-role-container">
        <h1>Actualizar Rol</h1>
        <form onSubmit={handleRoleUpdate}>
          <div className="form-group">
            <label htmlFor="roleName">Nombre del Rol:</label>
            <input
              type="text"
              id="roleName"
              value={updatedRole.roleName}
              onChange={(e) => setUpdatedRole({ ...updatedRole, roleName: e.target.value })}
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
                  checked={updatedRole.privileges.includes(privilege.privilege)}
                  onChange={handlePrivilegeChange}
                />
                <label htmlFor={`privilege_${privilege.privilegeId}`}>{privilege.privilege}</label>
              </div>
            ))}
          </div>
          <button type="submit">Actualizar Rol</button>
        </form>
      </div>
    </>
  );
};

export default UpdateRoles;
