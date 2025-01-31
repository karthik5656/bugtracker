import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addNewProject } from '../Features/ProjectsSlice';
import {useNavigate} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Home.css';
const ProjectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };
  const NavigateBackClick = () => {
       navigate(`/`);
   };

  const handleSubmit = (event) => {
    const data = {
        projectname: projectName,
    };
    dispatch(addNewProject(data));
    console.log(projectName);
    handleCloseModal();
  };

  return (
    <div>
      <FaArrowLeft onClick={NavigateBackClick}/> &nbsp;&nbsp;&nbsp;
      <Button className="addprojectbt" onClick={handleOpenModal}>Add Project</Button>

      <Modal isOpen={isOpen} toggle={handleCloseModal}>
        <ModalHeader  className="modal-header" toggle={handleCloseModal}>Project Details</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
              <label>Project Name:
              <input type="text" value={projectName} onChange={handleInputChange} style={{marginLeft:"10px"}} />
              </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className="addprojectbt" onClick={handleSubmit}>Submit</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProjectButton;
