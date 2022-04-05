
import * as React from 'react';
import Helmet from 'react-helmet';
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import '../../css/fonts.css';

import $ from 'jquery';

//import { render } from '@testing-library/react';
//import {Button,ButtonGroup,ButtonToolbar,Modal,ModalBody,ModalCOntext,ModalDialog,ModalFooter,ModalHeader,ModalTitle} from 'react-bootstrap';
import {Button,Modal} from 'react-bootstrap';
import { Toast, ToastContainer} from 'react-bootstrap';
import * as api from '../../api';


function Template1(props) { 
  

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

   //console.log(props.data)
  const [userSettings,setUserSettings]=useState({});
  const [education,setEducation]=useState('');
  const [experience,setExperience]=useState('');
  const [skill,setSkill]=useState('');
  const [project,setProject]=useState('');
  const [certification,setCertification]=useState('');
  const [referee,setReferee]=useState('');
  const [resumeUrl,setResumeUrl]=useState('');
  const[print,setPrint]=useState("false");
  const [color,setColor]=useState('');
  

 
  useEffect(()=>{             
    var ur=(window.location.href).split("#")
    if(ur[1]!=undefined){
      $(".download").hide();
    }

   loadCv()    
  
   
  },[]); 

  const cleanUl=(st)=>{
    var n=st.slice(1,st.length);    
    return n
  }

  const loadCv=async()=>{
    if(props.data.colorScheme==undefined){
      setColor("#0563bb");
    }
    else{
      setColor(props.data.colorScheme);
    }
    
    var settings=await api.getUserSettingsApi(props.data.email);
    setUserSettings(settings.data);
    var setting=settings.data;
    
    var rurl=await api.getSiteSettingsApi("server");
    setResumeUrl(rurl.value+props.pathname);

    if(setting.download!="true"){
      $(".download").hide();
    }
    //EDUCATION
    if(setting.education=="true"){
      const educ=await api.getEducationApi(props.data.email);
      
      const edu=(educ.data).map((val,index)=>
        <div className="resume-item col-xl-6 col-md-6">                
                <h4>{val.certificate}</h4>
                <h5>{val.startDate} - {val.endDate}</h5>
                <p><em>{val.school}</em></p>
                <p dangerouslySetInnerHTML={{__html:val.others}}>        
                </p>
        </div>        
      );
      
      setEducation(edu);
    }
    else{
      $(".education").hide();
    }

    //EXPERIENCE    
    if(setting.experience=="true"){
      const exp=await api.getExperienceApi(props.data.email);
      const ex=(exp.data).map((val,index)=>          
          <div className="resume-item col-xl-6 col-md-6 ">
              <h4>{val.role}</h4>
              <h5>{val.startDate} - {val.endDate}</h5>
              <p><em>{val.company}</em></p>
              <p dangerouslySetInnerHTML={{__html:val.others}}>        
              </p>
            </div>            
      );
      setExperience(ex);

    }
    else{
      $(".experience").hide();
    }

    //Project   
    if(setting.project=="true"){
      const pro=await api.getProjectApi(props.data.email);
      const pr=(pro.data).map((val,index)=>          
          <div className="resume-item col-xl-6 col-md-6 ">
              <h4>{val.name}</h4>              
              <a href={val.link}><em>{val.link}</em></a>
              <p dangerouslySetInnerHTML={{__html:val.description}}>        
              </p>
            </div>            
      );
      setProject(pr);

    }
    else{
      $(".project").hide();
    }


     //SKILL   
     if(setting.skill=="true"){
      const ski=await api.getSkillApi(props.data.email);
      const sk=(ski.data).map((val,index)=>          
        <div className="progress col-lg-6">
          <span className="skill">{val.skill} <i className="val">{val.level}</i></span>
          <div className="progress-bar-wrap">
              <div className="progress-bar" style={{width:val.level+"%","--color":color}} role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      );
      setSkill(sk);

    }
    else{
      $(".skill").hide();
    }

     //Certification    
     if(setting.certification=="true"){
      const cer=await api.getCertificationApi(props.data.email);
      const ce=(cer.data).map((val,index)=>          
        <li>
          <b>{val.name}</b> at {val.organization}, <a href={val.link}>{val.link}</a> 
        </li>
      );
      setCertification(ce);

    }
    else{
      $(".certification").hide();
    }

     //Referee   
     if(setting.referee=="true"){
      const ref=await api.getRefereeApi(props.data.email);
      const re=(ref.data).map((val,index)=>          
         <div className="resume-item col-md-6 col-lg-6">
            <b>{val.name}</b><br/>
              {val.description}<br/>
              {val.phone}<br/>
              <a href={"mailto:"+val.email}>{val.email}</a>
              <br/><br/>
            </div>
      );
      setReferee(re);

    }
    else{
      $(".referee").hide();
    }
    
  }

  const [src,setSrc]=useState('')

  const download=()=>{
    var objFra = document.getElementById('cvv');
    objFra.contentWindow.focus();
    objFra.contentWindow.print();                         
  }
  
  return (
    <>
      <Helmet>
          <title>{props.data.lastName} {props.data.firstName}</title>
          <meta name='description' content={props.data.bio}></meta>
        </Helmet>

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

    <button style={{float:"right"}} className="btn btn-success download" onClick={download}>Save</button>
    <iframe id="cvv"  src="#cv_document" style={{width: "100%", height:"400px",display:"none"}}></iframe>
    
    <div id="cv_document">            
            
      {/*<img style={{width:"6%", marginLeft:"50px", float:"left"}} src="assets/charlie.JPG">*/}
      
      <div className="container px-0 mt-2" id="cv_heading" style={{textAlign:"center"}}> 

        <h1 className="" >{props.data.firstName} {props.data.middleName} {props.data.lastName}</h1>
        <p style={{fontSize:"larger",textAlign:"center"}}>{props.data.location}<br/>
            <a style={{"--color":color}} href={"tel:"+props.data.phone}>{props.data.phone}</a><br/>            
            <a style={{"--color":color}} href={"mailto:"+props.data.email}>{props.data.email}</a>
        </p>
    
    

      </div>

      <div id="resume" style={{"--color":color}} className="container-fluid resume mt-4 mx-0">                                     
        <div className="container-fluid mx-3">
          <h3 className="resume-title">Professional Sumary</h3>
          <div className="resume-item pb-0">
            <h4>{props.data.lastName} {props.data.firstName}</h4>
            <p>
                {props.data.bio}
            </p>            
          </div>

          <h3 className="resume-title education mt-5">Education</h3>
          <div className="row education" id="educationSection"> 
            {education}
          </div>
         
          <h3 className="resume-title experience mt-5">Professional Experience</h3>
          <div className="row experience">
              {experience}                 
          </div>   

          

          <h3 class="resume-title skill mt-5">Professional Skills</h3>
          <div className="row skill skills skills-content" style={{"--color":color}}>                                                         
            {skill}
          </div>

          <h3 class="resume-title project mt-5">Projects</h3>
          <div className="row project">
             {project}
          </div>

          <h3 className="resume-title certification mt-5">Certifications </h3>
          <div className="resume-item certification">
            <ol>
                {certification}
            </ol>
          </div>

          <h3 className="resume-title referee mt-5">Referees</h3>
          <div className="row referee">
                {referee}
          </div>
      
          
        </div>


        <div style={{textAlign:"center"}}>
            A copy of this resume can be found at <a href={resumeUrl}>{resumeUrl}</a>
        </div>
                                  
        </div>

    </div>

   
  </>
  );
 
}




export default Template1;
