import '../css/style.css'
import logo from '../assets/logo.png'
import $ from 'jquery';
import {Button,ButtonGroup,ButtonToolbar,Modal,ModalBody,ModalCOntext,ModalDialog,ModalFooter,ModalHeader,ModalTitle} from 'react-bootstrap';
import { Toast, ToastContainer} from 'react-bootstrap';
import * as api from '../api';
import {useState, useEffect} from 'react';



function Analytics(props){

        
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

       const [email,setEmail]=useState(sessionStorage.getItem("email"));
       const [password,setPassword]=useState(sessionStorage.getItem("password"));
       const [id,setId]=useState(sessionStorage.getItem("id"));
       const [lastSeen,setLastSeen]=useState(sessionStorage.getItem("lastSeen"));
       const [dateCreated,setDateCreated]=useState(sessionStorage.getItem("dateCreated"));
       const [timeCreated,setTimeCreated]=useState(sessionStorage.getItem("timeCreated"));
     

       const [clicks,setClicks]=useState(0);
       const [linkNo,setLinkNo]=useState(0);



       useEffect(()=>{             
             loadAnalytics();                
             setInterval(loadAnalytics,2000);
      },[]); 

      
      
      
      const loadAnalytics=async()=>{
          var d= await api.getAnalyticsApi(email,password);
          $(d).ready(function(){
              setClicks(d.data.clicks);
              setLinkNo(d.data.links);              
          });
      }
   

    return(
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
              <div className="content row mb-4 desktop-only">
                        <div className="col-md-3 card px-2 rounded text-light" style={{textAlign:"center",backgroundColor:"blueviolet"}}>
                         <h2 className="mb-3 pb-0">{linkNo}</h2><h3>Links</h3>
                        </div>
                        <div className="col-md-3 card px-2 rounded text-light mx-3" style={{textAlign:"center",backgroundColor:"limegreen"}}>
                        <h2 className="mb-3 pb-0">{clicks}</h2><h3>Clicks</h3>
                        </div>
                </div>

                <div className="content mb-4 mobile-only">
                        <div className="card px-2 rounded text-light" style={{textAlign:"center",backgroundColor:"blueviolet"}}>
                         <h2 className="mb-3 pb-0">{linkNo}</h2><h3 >Links</h3>
                        </div>
                        <div className="card px-2 rounded text-light mt-2" style={{textAlign:"center",backgroundColor:"limegreen"}}>
                        <h2 className="mb-3 pb-0">{clicks}</h2><h3>Clicks</h3>
                        </div>
                </div>
        </>
    )
}


export default Analytics;