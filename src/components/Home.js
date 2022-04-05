
import '../App.css';
import * as React from 'react';

import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import '../css/fonts.css';
import '../css/home.css';
import $ from 'jquery';

//import { render } from '@testing-library/react';
//import {Button,ButtonGroup,ButtonToolbar,Modal,ModalBody,ModalCOntext,ModalDialog,ModalFooter,ModalHeader,ModalTitle} from 'react-bootstrap';
import {Button,Modal} from 'react-bootstrap';
import { Toast, ToastContainer} from 'react-bootstrap';
import * as api from '../api';
import Footer from './Footer';

function Home(props) { 
  
  const [newLink,setNewLink]=useState('');
  var handleLink=(e)=>{    
    setNewLink(e.target.value);
  }

  //THIS HANDLES THE MODAL
  const [show, setShow] = useState(false);  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[modalHead,setModalHead]=useState("Link Click");
  const changeModalHead=(val)=>setModalHead(val);

  const[modalBody,setModalBody]=useState("Link Click");
  const changeModalBody=(val)=>setModalBody(val);
  

  //THIS HANDLES THE TOAST
  const [notification, setNotification] = useState(false);
  const handleNotification = () => setNotification(true);
  
  const[notificationHead,setNotificationHead]=useState("");
  const changeNotificationHead=(val)=>setNotificationHead(val);

  const[notificationSmallHead,setNotificationSmallHead]=useState("");
  const changeNotificationSmallHead=(val)=>setNotificationSmallHead(val);

  const[notificationMessage,setNotificationMessage]=useState("");
  const changeNotificationMessage=(val)=>setNotificationMessage(val);



  //SETTIN FORM EMAIL AND PASSWORD
//const [email,setEmail]=useState('');
 // var changeEmail=(e)=>{setEmail(e.target.value)};
  /*
  useEffect(()=>{    
    console.log(email)
  },[email]);
  */
  //const [password,setPassword]=useState('');
  //var changePassword=(e)=>{setPassword(e.target.value)};
  

  //
  
  
  return (
    <>
   <div className="home-page">  
       <ToastContainer className="p-3" position='top-end'>
          <Toast  className="" onClose={() => setNotification(false)} show={notification} >
            <Toast.Header closeButton={true}>            
              <strong className="me-auto">{notificationHead}</strong>
              <small>{notificationSmallHead}</small>
              </Toast.Header>
            <Toast.Body className="text-dark">{notificationMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
     {/* <Notification head='Head' smallhead='small herad' message='Message' bg="default" />*/}
     <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalHead}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
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
    Your custom CV is just one step ahead.
     <div className='row'>
            
            <div className='col-md-4'>
              <div className="card sect">
                <div className="card-header">
                    LOGIN
                </div>
                <div className="card-body">
                    Already have an account you can login here and customize your CV
                </div>
                <div className="card-footer">
                  <a href={props.base+"/login"} className="btn btn-sucess" style={{backgroundColor:"rgb(238, 111, 8)"}}><b>Login</b></a>
                </div>
              </div>
            </div>
              
            <div className='col-md-4'>
              <div className="card sect">
                <div className="card-header">
                    Register
                </div>
                <div className="card-body">
                    Don't have an account what are you waiting for. Join the train and register now!
                </div>
                <div className="card-footer">
                  <a href={props.base+"/register"} className="btn btn-sucess" style={{backgroundColor:"rgb(238, 111, 8)"}}><b>Register</b></a>
                </div>
              </div>
            </div>

            
     </div>

   </div>
   <Footer />
  </>
  );
 
}




export default Home;
