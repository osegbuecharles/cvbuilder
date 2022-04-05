import '../css/style.css'
import logo from '../assets/logo.png'
import $ from 'jquery';
//import {Button,ButtonGroup,ButtonToolbar,Modal,ModalBody,ModalCOntext,ModalDialog,ModalFooter,ModalHeader,ModalTitle} from 'react-bootstrap';
import {Button,Modal} from 'react-bootstrap';
import { Toast, ToastContainer} from 'react-bootstrap';
import * as api from '../api';
import {useState} from 'react';

function Login(props) { 
        //THIS HANDLES THE MODAL
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[modalHead,setModalHead]=useState("Link Click");    
    const[modalBody,setModalBody]=useState("Link Click");
    


    //THIS HANDLES THE TOAST
    const [notification, setNotification] = useState(false);
    const handleNotification = () => setNotification(true);
    const[notificationHead,setNotificationHead]=useState("");
    const[notificationSmallHead,setNotificationSmallHead]=useState("");    
    const[notificationMessage,setNotificationMessage]=useState("");
    
    
    var name="Link Click";
    var text="link click";

    const loginUser = async(e)=>{
            e.preventDefault();
            var email=$("#loginEmail").val();
            var password=$("#loginPassword").val();
            var loader=(<div className="spinner-border text-primary"></div>);
            setModalHead("Login...");
            setModalBody(loader);
            handleShow();         
            var data=await api.loginApi(email,password);
            if(data.error==false){
                var message=(<><h4>Login successful</h4><br/>Redirecting...</>);
                setModalBody(message);
                sessionStorage.setItem("logged",true);
                sessionStorage.setItem("email",email);
                sessionStorage.setItem("password",password);
                sessionStorage.setItem("id",data.data.id);
                sessionStorage.setItem("lastName",data.data.lastName);
                sessionStorage.setItem("firstName",data.data.firstName);
                sessionStorage.setItem("middleName",data.data.middleName);
                sessionStorage.setItem("phone",data.data.phone);
                sessionStorage.setItem("template",data.data.template);
                sessionStorage.setItem("lastSeen",data.data.lastSeen);
                sessionStorage.setItem("dateCreated",data.data.dateCreated);
                sessionStorage.setItem("timeCreated",data.data.timeCreated);
                window.location.href=props.base+"/account";
            }
            else{
                var message=(<><h4>Login failed</h4><br/>{data.message}</>);
                setModalBody(message);
            }
    }
  return (
      <>
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
    <div className="Page">
        <h3 className="pt-5">Login</h3>
        <div className="Login px-2">
            <div className="row box p-0">
                
                <div className="col-lg-7 form-container mt-2">
                        <form id="loginForm" onSubmit={loginUser}>
                            <div className="form-group">
                                <input className="form-control" id="loginEmail" placeholder="Email" type="email" required/>
                            </div>
                            <br/><br/>
                            <div className="form-group">
                                <input className="form-control" id="loginPassword" placeholder="Password" type="password" required/>
                            </div>
                            <br/><br/>
                            <button className="btn btn-block btn-primary" style={{width:"100%",fontSize:"larger"}}>Login</button>

                        </form>
                        <br/><br/>
                        <p style={{color:"white"}}>
                            Don't have an account? <a href="./register" className="btn btn-primary">Register</a>
                        </p>
                </div>

             

            </div>
        </div>
        
    </div>
    </>
  );
}

export default Login;
