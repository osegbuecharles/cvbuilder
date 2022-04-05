import * as React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,ButtonGroup,ButtonToolbar,Modal,ModalBody,ModalCOntext,ModalDialog,ModalFooter,ModalHeader,ModalTitle} from 'react-bootstrap';

export function Modall(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>        
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/*
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
            */}
          </Modal.Footer>
        </Modal>        
      </>
    );
}
  
  
export default Modall