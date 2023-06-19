import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {useCaseStore} from '../store/caseRegistrationStore';
import { useModalStore } from '../store/modalStore';
const InstanceModal = () => {
  const [selectedInstance, setSelectedInstance] = useState('');
  const {isOpen, setModalOpen,instances, getInstances, handleChange, updateRequest} = useModalStore();

  const caseId = localStorage.getItem('caseId');

  useEffect(() => {
      getInstances();
   }, [getInstances]);
  

  

  const handleSubmit = () => {
    // Aquí puedes realizar alguna acción con los datos del modal
    console.log('Instancia:', selectedInstance);
    console.log('Fecha de inicio:', startDate);
    console.log('Fecha de fin:', endDate);

    // Cerrar el modal después de realizar la acción
  };

  return (
    <div>
      <Button onClick={()=>setModalOpen(true)}>Actualizar Instancia</Button>

      <Modal show={isOpen} onHide={() => {setModalOpen(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Instancia:</label>
            <select  onChange={(e) => {handleChange('instanceId', e)}}>
              <option value="">Seleccionar</option>
               {instances.map((instance) => (
               <option key={instance.instanceId} value={instance.instanceId}>
                   {instance.instanceName}
               </option>
               ))}
            </select>
          </div>
          <div>
            <label>Fecha de inicio:</label>
            <input
              type="date"
              
              onChange={(e)=> {handleChange('startDate',e)}}
            />
          </div>
          <div>
            <label>Fecha de fin de plazo:</label>
            <input type="date"  onChange={(e) => {handleChange('endDate',e)}} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setModalOpen(false)}}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={()=> {updateRequest(caseId)}}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InstanceModal;
