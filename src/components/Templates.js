import '../css/style.css'

import $ from 'jquery';
import {Button,Modal} from 'react-bootstrap';
import { Toast, ToastContainer} from 'react-bootstrap';
import * as api from '../api';
import {useState, useEffect} from 'react';



function Templates(props){
    //THIS HANDLES THE MODAL
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    
    const[modalHead,setModalHead]=useState("Link Click");    
    const[modalBody,setModalBody]=useState("Link Click");
    


    //THIS HANDLES THE TOAST
    const [notification, setNotification] = useState(false);
    
    const[notificationHead,setNotificationHead]=useState("");
    const[notificationSmallHead,setNotificationSmallHead]=useState("");    
    const[notificationMessage,setNotificationMessage]=useState("");

    const [email,setEmail]=useState(sessionStorage.getItem("email"));
    const [password,setPassword]=useState(sessionStorage.getItem("password"));
  
    
    const [template,setTemplate]=useState(sessionStorage.getItem("template"));
    
    const [body,setBody]=useState('');

   
    useEffect(()=>{      
        getTemplates();
        //setInterval(viewLink,1000);
        

        loadTemplates();
     

    },[template,body]); 

    const getTemplates=async()=>{
        var data=(await api.getAllTemplatesApi()).data;
        var bod=data.map((val,index)=>
            <div class="col mt-3" onClick={()=>changeTemplate(val.code)}>
            <div id={"template"+val.code} class="template" style={{background:`url('${val.image}')`,backgroundSize:"contain",backgroundRepeat:"no-repeat"}}>
                <a href={"./sample"+val.code} target="blank" className='btn btn-primary' style={{float:"right"}} ><i class="fa fa-eye"></i></a>
            </div>
            <b class="mt-3">Template {val.code}</b>
        </div>
        );
        setBody(bod)
    }

    const loadTemplates=async()=>{ 
        var userDetails=(await api.getUserApi(email)).data;
        setTemplate(userDetails.template);
                
        $(".template").css({
            border:"",
            boxShadow:""
        })
        $(`#template`+`${template}`).css({
            border:"solid thin rgb(224, 192, 6)",
            boxShadow:" 1px 1px 3px #dfc905, -1px -1px 3px #dfc905"
        });
    }

     
    const changeTemplate=(val)=>{
        setModalBody(
            <>
              <p>
                  Do you want to switch to template {val}
              </p>
              <button class="btn btn-success" onClick={()=>switchTemplate(val)}>Continue</button>
            </>
            );
        setModalHead("Changing Template...")
        setShow(true);
  }

  const switchTemplate=async(val)=>{
      var data= await api.updateTemplateApi(email,password,val);        
      if(data.error==false){
          setTemplate(val);
          setShow(false);
      }
          
      
  }

  const previewTemplate=async(val)=>{
      var redrt="./sample"+val+"/#cvdocument";
      setModalBody(
          <iframe id="cvv"  src={redrt} style={{width: "100%", height:"400px"}}></iframe>
      )
      setModalHead("Template "+val);
      setShow(true);
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

        <div className="container-fluid templates section content p-3 mt-4">
            
            <div className="section">                                                
                <h4 className="section">Templates</h4>
            </div>
            <hr/>
            
            <div class="row">
                       {body}                                                                                    
            </div>

        </div>
    </>
  )
}

export default Templates