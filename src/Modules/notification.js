import * as React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, ToastContainer} from 'react-bootstrap';

export function Notification(props){
    const [notification, setNotification] = useState(true);
  
    if(props.bg=="danger"){
      var bg="bg-danger"
      var fg="text-light"
    }

    if(props.bg=="primary"){
      var bg="bg-primary"
      var fg="text-light"
    }

    if(props.bg=="success"){
      var bg="bg-success"
      var fg="text-light"
    }

    if(props.bg=="warning"){
      var bg="bg-warning"
      var fg="text-light"
    }

    if(props.bg=="default"){
      var bg=" "
      var fg=" "
    }


    var theme=bg+" "+fg;

    return (    
        <ToastContainer className="p-3" position='top-end'>
          <Toast  className={theme} onClose={() => setNotification(false)} show={notification} delay={3000} autohide>
            <Toast.Header closeButton={false}>            
              <strong className="me-auto">{props.head}</strong>
              <small>{props.smallhead}</small>
              </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
          </Toast>
        </ToastContainer>
        )
}

export default Notification