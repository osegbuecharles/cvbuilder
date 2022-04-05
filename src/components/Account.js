import '../css/style.css'
import logo from '../assets/logo.png'
import temp1 from '../assets/template1.jpg';
import $, { cssNumber } from 'jquery';
import {Button,ButtonGroup,ButtonToolbar,Modal,ModalBody,ModalCOntext,ModalDialog,ModalFooter,ModalHeader,ModalTitle} from 'react-bootstrap';
import { Toast, ToastContainer} from 'react-bootstrap';
import * as api from '../api';
import {useState, useEffect} from 'react';
import Templates from './Templates';
import QRCode from "react-qr-code";
import Editor from './Editor';

function Account(props) { 

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

         const [lastName,setLastName]=useState(sessionStorage.getItem("lastName"));
       
         const [firstName,setFirstName]=useState(sessionStorage.getItem("firstName"));
         const [middleName,setMiddleName]=useState(sessionStorage.getItem("middleName"));
         const [phone,setPhone]=useState(sessionStorage.getItem("phone"));
         
         const [lastSeen,setLastSeen]=useState(sessionStorage.getItem("lastSeen"));
         const [dateCreated,setDateCreated]=useState(sessionStorage.getItem("dateCreated"));
         const [timeCreated,setTimeCreated]=useState(sessionStorage.getItem("timeCreated"));



         //USER INFORMATION
         const [bio,setBio]=useState('');
         const [location, setLocation]=useState('');
         const [education,setEducation]=useState('');
         const [experience,setExperience]=useState('');
         const [skill,setSkill]=useState('');
         const [project,setProject]=useState('');
         const [certification,setCertification]=useState('');
         const [referee,setReferee]=useState('');
         const [server,setServer]=useState('');
        const [colorScheme,setColorScheme]=useState('');
        const [custom,setCustom]=useState('');
        const [others,setOthers]=useState();

        
         useEffect(()=>{                         
           //setInterval(viewLink,1000);
           

           loadAccount();
            loadEducation();
            loadExperience();
            loadProject();
            loadSkill();
            loadCertification();
            loadReferee();

        },[lastName,others,colorScheme,custom,server,bio,location,server]); 

       const handleOthers=(val)=>{  
           
            setOthers(val);
        }


    var path = window.location.pathname //returns the current url minus the domain name

    if(sessionStorage.getItem("logged")!='true'){
        window.location.href=props.base+'/login';
    }
   
    const logout= ()=>{
        sessionStorage.clear();
        window.location.href=props.base+'/login';
    }        


    const loadAccount=async()=>{ 
        var serve=await api.getSiteSettingsApi("server");
        setServer(serve.value);

        var userDetails=(await api.getUserApi(email)).data;
        

        var userSettings=(await api.getUserSettingsApi(email)).data;

        setLocation(userDetails.location);
        setBio(userDetails.bio);
        setColorScheme(userDetails.colorScheme);
        $("#formColorScheme").val(userDetails.colorScheme);

        if(userDetails.link==null){
            setCustom("")
        }
        else{
            setCustom(userDetails.link);
        }
       
        if(userSettings.education=="true"){
            document.getElementById("education-checkbox").checked=true;
        }
        if(userSettings.download=="true"){
            document.getElementById("download-checkbox").checked=true;
        }
        if(userSettings.experience=="true"){
            document.getElementById("experience-checkbox").checked=true;
        }
        if(userSettings.skill=="true"){
            document.getElementById("skill-checkbox").checked=true;
        }
        if(userSettings.project=="true"){
            document.getElementById("project-checkbox").checked=true;
        }
        if(userSettings.referee=="true"){
            document.getElementById("referee-checkbox").checked=true;
        }
        if(userSettings.certification=="true"){
            document.getElementById("certification-checkbox").checked=true;
        }
        
    }

    const remove=(id,info,name)=>{
        setModalHead("Delete "+info);
        if(info=="skill"){
            setModalBody(
                <div>
                    You are about to delete ({name})
                    <br/><br/>
                    <button class="btn btn-success" onClick={()=>removeSkill(name)}>Proceed</button>
                </div>
            )
        }
        else{
            setModalBody(
                <div>
                    You are about to delete ({name})
                    <br/><br/>
                    <button class="btn btn-success" onClick={()=>removeInfo(id,info,name)}>Proceed</button>
                </div>
            )
        }
        
        setShow(true);
    }

    const removeInfo=async(id,info,name)=>{
        var data=await api.removeInfoApi(email,password,info,id);
        $(data).ready(function(){
            setNotificationHead("Delete "+info);
            if(data.error==false){
                setNotificationSmallHead("sucess");
                setNotificationMessage(name+" deleted!")
            }
            else{
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });        
        setShow(false);
        setNotification(true);
        if(info=="education"){
            loadEducation();
        }
        if(info=="experience"){
            loadExperience();
        }
        if(info=="project"){
            loadProject();
        }
        if(info=="certification"){
            loadCertification();
        }
        if(info=="referee"){
            loadReferee();
        }
    }

    const removeSkill=async(name)=>{
        var data=await api.removeSkillApi(email,password,name);
        $(data).ready(function(){
            setNotificationHead("Delete skill");
            if(data.error==false){
                setNotificationSmallHead("sucess");
                setNotificationMessage(name+" deleted!")
                loadSkill();
            }
            else{
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    }

    const loadEducation=async()=>{
        var data= (await api.getEducationApi(email)).data;
        var body=data.map((val,index)=>            
                <div className="ml-2 mt-2 col-md-4">
                    <div className="card ">
                        <div className="card-header">
                            {val.certificate}
                        </div>
                        <div className="card-body">
                            <em><b>{val.school}</b></em><br/>
                            {val.startDate} - {val.endDate}
                            <hr/>
                            <span dangerouslySetInnerHTML={{__html:val.others}}>

                            </span>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={()=>editEducation(val.id,val.certificate,val.school,val.startDate,val.endDate,val.others)}><i class="fa fa-pencil"></i></button>
                            &nbsp;&nbsp;
                            <button className="btn btn-primary" onClick={()=>remove(val.id,"education",val.certificate)}><i class="fa fa-trash"></i></button>
                        </div>
                    </div>            
                </div>
        );
        setEducation(
            <div class="row">
                {body}
            </div>
        );
    }

    const editEducation=(id,cert,school,start,end,others)=>{
        setModalHead("Edit Education");
        setModalBody(
            <form onSubmit={updateEducation}>
                    <input defaultValue={id} id="formId" style={{display:"none"}} />
                    <div class="form-group">
                        <label>Certificate (BSc., MSc., Bachelors Degree)</label>
                        <input class="form-control" id="formCertificate" defaultValue={cert} required/>
                    </div>
                    
                    <div class="form-group mt-3">
                        <label>School/Institution</label>
                        <input class="form-control" id="formSchool" defaultValue={school} required/>
                    </div>

                    <div class="row mt-3">
                        <div class="form-group col-md-6">
                            <label>When did you start: (Jan 2020, 2020, 1 Jan 2020)</label>
                            <input class="form-control" type="text" id="formStart" defaultValue={start} required/>
                        </div>
                        <div class="form-group col-md-6">
                            <label>When did you end: (Jan 2021, 2021, 1 Jan 2021)</label>
                            <input class="form-control" type="text" id="formEnd" defaultValue={end} required/>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <label>Summary (What else would you like to add)</label>                            
                        <Editor editor={handleOthers} default={others}/>

                    </div>

                    <button class="btn btn-primary mt-3" type="submit">Update</button>

            </form>

        )
        setShow(true);
    }

    const loadExperience=async()=>{

        var data= (await api.getExperienceApi(email)).data;
        var body=data.map((val,index)=>            
                <div className="ml-2 mt-2 col-md-4">
                    <div className="card ">
                        <div className="card-header">
                            {val.role}
                        </div>
                        <div className="card-body">
                            <em><b>{val.company}</b></em><br/>
                            {val.startDate} - {val.endDate}
                            <hr/>
                            <span dangerouslySetInnerHTML={{__html:val.others}}>

                            </span>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={()=>editExperience(val.id,val.role,val.company,val.startDate,val.endDate,val.others)}><i class="fa fa-pencil"></i></button>
                            &nbsp;&nbsp;
                            <button className="btn btn-primary" onClick={()=>remove(val.id,"experience",val.role)}><i class="fa fa-trash"></i></button>
                        </div>
                    </div>            
                </div>
        );
        setExperience(
            <div class="row">
                {body}
            </div>
        );
    }

    const editExperience=(id,role,company,start,end,others)=>{
        setModalHead("Edit Education");
        setModalBody(
            <form onSubmit={updateExperience}>
                    <input defaultValue={id} id="formId" style={{display:"none"}} />
                    <div class="form-group">
                        <label>Certificate (BSc., MSc., Bachelors Degree)</label>
                        <input class="form-control" id="formRole" defaultValue={role} required/>
                    </div>
                    
                    <div class="form-group mt-3">
                        <label>School/Institution</label>
                        <input class="form-control" id="formCompany" defaultValue={company} required/>
                    </div>

                    <div class="row mt-3">
                        <div class="form-group col-md-6">
                            <label>When did you start: (Jan 2020, 2020, 1 Jan 2020)</label>
                            <input class="form-control" type="text" id="formStart" defaultValue={start} required/>
                        </div>
                        <div class="form-group col-md-6">
                            <label>When did you end: (Jan 2021, 2021, 1 Jan 2021)</label>
                            <input class="form-control" type="text" id="formEnd" defaultValue={end} required/>
                        </div>
                    </div>

                    <div class="form-group mt-3">
                        <label>Summary (What else would you like to add)</label>                            
                        <Editor editor={handleOthers} default={others}/>

                    </div>

                    <button class="btn btn-primary mt-3" type="submit">Update</button>

            </form>

        )
        setShow(true);
    }

    const loadSkill=async()=>{
          var data= (await api.getSkillApi(email)).data;
        var body=data.map((val,index)=>            
                <div className="ml-2 mt-2 col-md-4">
                    <div className="card ">
                        <div className="card-header">
                            {val.skill}
                        </div>
                        <div className="card-body">                            
                            {val.level}%
                        </div>
                        <div className="card-footer">                                                    
                            <button className="btn btn-primary text-dark" onClick={()=>remove(val.id,"skill",val.skill)}><i class="fa fa-trash text-black"></i></button>
                        </div>
                    </div>            
                </div>
        );
        setSkill(
            <div class="row">
                {body}
            </div>
        );
    }
    
    const loadProject=async()=>{
        var data= (await api.getProjectApi(email)).data;
        var body=data.map((val,index)=>            
                <div className="ml-2 mt-2 col-md-4">
                    <div className="card ">
                        <div className="card-header">
                            {val.name}
                        </div>
                        <div className="card-body">
                            <em><b><a href={val.link}>{val.link}</a></b></em><br/>                            
                            <hr/>
                            <span dangerouslySetInnerHTML={{__html:val.description}}>

                            </span>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={()=>editProject(val.id,val.name,val.link,val.description)}><i class="fa fa-pencil"></i></button>
                            &nbsp;&nbsp;
                            <button className="btn btn-primary" onClick={()=>remove(val.id,"project",val.name)}><i class="fa fa-trash"></i></button>
                        </div>
                    </div>            
                </div>
        );
        setProject(
            <div class="row">
                {body}
            </div>
        );
    }

      const editProject=(id,name,link,description)=>{
        setModalHead("Edit Project");
        setModalBody(
            <>
                <form onSubmit={updateProject}>
                    
                    <input defaultValue={id} id="formId" style={{display:"none"}} />

                        <div class="form-group">
                            <label>Name (What is the name/aim of the project)</label>
                            <input class="form-control" id="formName" defaultValue={name} required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>Link (Is there a link to this project)</label>
                            <input class="form-control" id="formLink" type="url" defaultValue={link} />
                        </div>

                        <div class="form-group mt-3">
                            <label>Summary (What else would you like to add) </label>                            
                            <Editor editor={handleOthers} default={description}/>

                        </div>

                        <button class="btn btn-primary mt-3" type="submit">Update</button>

                </form>
            </>
        )
        setShow(true)
    }


    const loadCertification=async()=>{
        var data= (await api.getCertificationApi(email)).data;
        var body=data.map((val,index)=>            
                <div className="ml-2 mt-2 col-md-4">
                    <div className="card ">
                        <div className="card-header">
                            {val.name}
                        </div>
                        <div className="card-body">
                            <em><b><a href={val.link}>{val.link}</a></b></em><br/>                            
                            {val.organization}

                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={()=>editCertification(val.id,val.name,val.link,val.organization)}><i class="fa fa-pencil"></i></button>
                            &nbsp;&nbsp;
                            <button className="btn btn-primary" onClick={()=>remove(val.id,"certification",val.name)}><i class="fa fa-trash"></i></button>
                        </div>
                    </div>            
                </div>
        );
        setCertification(
            <div class="row">
                {body}
            </div>
        );
    }

    const editCertification=(id,name,link,organization)=>{
        setModalHead("Update Certification");
        setModalBody(
            <>
                <form onSubmit={updateCertification}>

                    <input defaultValue={id} id="formId" style={{display:"none"}} />
                
                        <div class="form-group">
                            <label>Name (Certification Name/Title)</label>
                            <input class="form-control" id="formName" defaultValue={name} required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>Link (Enter the link to your certificate/certificate organization if any)</label>
                            <input class="form-control" id="formLink" defaultValue={link} />
                        </div>

                        <div class="form-group mt-3">
                            <label>Organization (Which organization/institution awarded you this certificate)</label>
                            <input class="form-control" id="formOrganization" defaultValue={organization} required/>
                        </div>

                        <button class="btn btn-primary mt-3" type="submit">Update</button>

                </form>
            </>
        )
        setShow(true)
    }

    const loadReferee=async()=>{
        var data= (await api.getRefereeApi(email)).data;
        var body=data.map((val,index)=>            
                <div className="ml-2 mt-2 col-md-4">
                    <div className="card ">
                        <div className="card-header">
                            {val.name}
                        </div>
                        <div className="card-body">
                            <em><b><a href={val.email}>{val.email}</a></b></em><br/>                            
                            {val.phone}
                            <hr/>
                            <span dangerouslySetInnerHTML={{__html:val.description}}>

                            </span>

                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary" onClick={()=>editReferee(val.id,val.name,val.email,val.phone,val.description)}><i class="fa fa-pencil"></i></button>
                            &nbsp;&nbsp;
                            <button className="btn btn-primary" onClick={()=>remove(val.id,"referee",val.name)}><i class="fa fa-trash"></i></button>
                        </div>
                    </div>            
                </div>
        );
        setReferee(
            <div class="row">
                {body}
            </div>
        );
    }

    const editReferee=(id,name,emaill,phone,description)=>{
        setModalHead("Add Referee");
        setModalBody(
            <>
                <form onSubmit={updateReferee}>

                        <input defaultValue={id} id="formId" style={{display:"none"}} />

                        <div class="form-group">
                            <label>Referee Email</label>
                            <input class="form-control" id="formEmail" type="email" defaultValue={emaill} required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>Referee Name</label>
                            <input class="form-control" id="formName" defaultValue={name} required/>
                        </div>
     
                        <div class="form-group mt-3">
                            <label>Referee Phone Number (Optional)</label>
                            <input class="form-control" id="formPhone" defaultValue={phone} type="tel" />
                        </div>
     
                        <div class="form-group mt-3">
                            <label>Description (Briefly Describe your referee)</label>
                            <input class="form-control" id="formDesc" defaultValue={description} />
                        </div>                                         

                        <button class="btn btn-primary mt-3" type="submit">Update</button>

                </form>
            </>
        )
        setShow(true)
    }
   
    const toggleSection=async(val,name)=>{
        
        if(document.getElementById(val).checked==false){
           var data= await api.updateUserSettingsApi(email,password,name,"false");
        }
        else{
           var data= await api.updateUserSettingsApi(email,password,name,"true");
        }
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Toggling "+name);
                setNotificationSmallHead("success");
                if(document.getElementById(val).checked==false){                    
                    setNotificationMessage(name+" has been turned off")
                }
                else{
                    setNotificationMessage(name+" has been turned on")
                }
            }
            else{
                setNotificationHead("Toggling "+name);
                setNotificationSmallHead("error");
                setNotificationMessage("Could not toggle "+name)
            }
            setNotification(true);
        })
        
    }

    const changePassword=()=>{
        setModalHead("Change Password")
        setModalBody(
            <>
                <form method="post" onSubmit={changPw}>
                    <div class="form-group">
                        <input class="form-control" type="password" placeholder='Old Password' id="oldPassword" required/>
                    </div>
                    <br/>
                    <div class="form-group">
                        <input class="form-control" type="password" placeholder='New Password' id="newPassword" required/>
                    </div>
                    <br/>
                    <button class="btn btn-success" type="submit">Submit</button>
                </form>
            </>            
        )
        setShow(true);
    }

    const changPw=async(e)=>{
        e.preventDefault();
        var opw=$("#oldPassword").val();
        var npw=$("#newPassword").val();
        var data=await api.changePasswordApi(email,opw,npw)
        $(data).ready(function(){
            setShow(false)
            if(data.error==false){
                setNotificationHead("Change Password");
                setNotificationSmallHead("success");
                setNotificationMessage("Password has been changed")
                logout();

            }
            else{
                setNotificationHead("Change Password");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
            setNotification(true)
        })
    }

    const updateProfile=()=>{
        setModalHead("Change Password")
        setModalBody(
            <>
                <form method="post" onSubmit={updateP}>
                    <div class="form-group">
                        <label>Last Name: </label>
                        <input class="form-control" type="text" placeholder='Last Name'  defaultValue={lastName} id="formLastName" required/>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label>Middle Name: </label>
                        <input class="form-control" type="text" placeholder='Middle Name' id="formMiddleName" defaultValue={middleName} required/>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label>First Name: </label>
                        <input class="form-control" type="text" placeholder='First Name' id="formFirstName" defaultValue={firstName} required/>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label>Phone: </label>
                        <input class="form-control" type="tel" placeholder='Phone' id="formPhone" defaultValue={phone} required/>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label>Location: </label>
                        <input class="form-control" type="text" placeholder='Location' id="formLocation" defaultValue={location} required/>
                    </div>
                    <br/>                   
                    <button class="btn btn-success" type="submit">Submit</button>
                </form>
            </>            
        )        
        setShow(true);
        $("#formLastName").val(lastName)
    }

    const updateP=async(e)=>{
        e.preventDefault();
        var ln=$("#formLastName").val();
        var mn=$("#formMiddleName").val();
        var fn=$("#formFirstName").val();
        var ph=$("#formPhone").val();
        var lo=$("#formLocation").val();
        var data=await api.updateProfileApi(email,password,ln,fn,mn,ph,lo,bio);
        $(data).ready(function(){
            setShow(false)
            if(data.error==false){
                setNotificationHead("Update Profile");
                setNotificationSmallHead("success");
                setNotificationMessage("Profile updated")
                setLastName(ln);
                setFirstName(fn);
                setMiddleName(mn);
                setPhone(ph);
                setLocation(lo);

            }
            else{
                setNotificationHead("Update Profile");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
            setNotification(true)
            setShow(false);
        })
    }

    const updateColorScheme=async(e)=>{
        e.preventDefault();
        var color=$("#formColorScheme").val();
        var data=await api.updateColorSchemeApi(email,password,color);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Color Scheme");
                setNotificationSmallHead("success");
                setNotificationMessage("Color Scheme Updated");
                setColorScheme(color);
            }
            else{
                setNotificationHead("Color Scheme");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message);
            }            
        });
        setNotification(true);
    }

    const customizeLink=()=>{
        setModalHead("Customize Link");
        setModalBody(
            <form onSubmit={updateCustom}>
                <div class="row">
                    <div class="form-group col-xs-6">
                        <span style={{fontSize:"larger"}}>{server}</span>
                        <input class="form-control" type="text" id="formCustom" defaultValue={custom} />
                        <button type="submit" className="btn btn-primary mt-2">Update</button>
                    </div>                                                                                                               
                </div>
            </form>
        )
        setShow(true);
    }

    const updateCustom=async(e)=>{
        e.preventDefault();
        var cu=$("#formCustom").val();
        var data=await api.updateLinkApi(email,password,cu);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Customize Link");
                setNotificationSmallHead("success");
                setNotificationMessage("Link Customized");
                setCustom(cu);
            }
            else{
                setNotificationHead("Customize Link");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message);
            }            
        });
        setShow(false);
        setNotification(true);
    }

    const qr=(l)=>{                        
        var q=server+l
        setModalHead("QrCode")
        setModalBody(
            <>
            <QRCode value={q} bgColor="white" fgColor={colorScheme} title={q} />
            <h5><a href={q}>{q}</a></h5>
            </>
        );
        setShow(true);
    }

    const editBio=()=>{
        setModalHead("Edit Bio");
        setModalBody(
            <form method="POST" onSubmit={updateBio}>
                <div className="form-group">
                    <textarea id="formBio" class="form-control" rows={6}>
                        {bio}
                    </textarea>    
                </div>
                <button class="btn btn-primary mt-3">Update</button>
            </form>
        )
        setShow(true)
    }

    const updateBio=async(e)=>{
        e.preventDefault();
        var b=$("#formBio").val();
        var data=await api.updateProfileApi(email,password,lastName,firstName,middleName,phone,location,b);
        console.log(data);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Edit Bio");
                setNotificationSmallHead("sucess");
                setNotificationMessage("Bio updated!")
                setBio(b);
            }
            else{
                setNotificationHead("Edit Bio");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    }
   
    
    const addEducation=()=>{
        setModalHead("Add Education");
        setModalBody(
            <>
                <form onSubmit={newEducation}>
                        <div class="form-group">
                            <label>Certificate (BSc., MSc., Bachelors Degree)</label>
                            <input class="form-control" id="formCertificate" required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>School/Institution</label>
                            <input class="form-control" id="formSchool" required/>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-6">
                                <label>When did you start: (Jan 2020, 2020, 1 Jan 2020)</label>
                                <input class="form-control" type="text" id="formStart" required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label>When did you end: (Jan 2021, 2021, 1 Jan 2021)</label>
                                <input class="form-control" type="text" id="formEnd" required/>
                            </div>
                        </div>

                        <div class="form-group mt-3">
                            <label>Summary (What else would you like to add)</label>                            
                            <Editor editor={handleOthers} />

                        </div>

                        <button class="btn btn-primary mt-3" type="submit">Add</button>

                </form>
            </>
        )
        setShow(true)
    }

    const newEducation=async(e)=>{
        e.preventDefault();
        var cert=$("#formCertificate").val();
        var school=$("#formSchool").val();
        var start=$("#formStart").val();
        var end=$("#formEnd").val();                
        var data=await api.addEducationApi(email,password,cert,start,end,school,sessionStorage.getItem("others"));
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Add Education");
                setNotificationSmallHead("sucess");
                setNotificationMessage("New Education added!")
                loadEducation();
            }
            else{
                setNotificationHead("Add Education");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }

    const updateEducation=async(e)=>{
        e.preventDefault();
        var id=$("#formId").val();
        var cert=$("#formCertificate").val();
        var school=$("#formSchool").val();
        var start=$("#formStart").val();
        var end=$("#formEnd").val();                
        var data=await api.updateEducationApi(email,password,cert,start,end,school,sessionStorage.getItem("others"),id);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Update Education");
                setNotificationSmallHead("sucess");
                setNotificationMessage("Education updated!")
                loadEducation();
            }
            else{
                setNotificationHead("Update Education");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }

    const addExperience=()=>{
        setModalHead("Add Experience");
        setModalBody(
            <>
                <form onSubmit={newExperience}>
                        <div class="form-group">
                            <label>Role (Product Manager, Receptionist, Engineer)</label>
                            <input class="form-control" id="formRole" required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>Company/Organization</label>
                            <input class="form-control" id="formCompany" required/>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-6">
                                <label>When did you start: (Jan 2020, 2020, 1 Jan 2020)</label>
                                <input class="form-control" type="text" id="formStart" required/>
                            </div>
                            <div class="form-group col-md-6">
                                <label>When did you end: (Jan 2021, 2021, 1 Jan 2021, present)</label>
                                <input class="form-control" type="text" id="formEnd" required/>
                            </div>
                        </div>

                        <div class="form-group mt-3">
                            <label>Summary (What else would you like to add)</label>                            
                            <Editor editor={handleOthers} />

                        </div>

                        <button class="btn btn-primary mt-3" type="submit">Add</button>

                </form>
            </>
        )
        setShow(true)
    }

    const newExperience=async(e)=>{
        e.preventDefault();
        var role=$("#formRole").val();
        var company=$("#formCompany").val();
        var start=$("#formStart").val();
        var end=$("#formEnd").val();                
        var data=await api.addExperienceApi(email,password,role,start,end,company,sessionStorage.getItem("others"));
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Add Experience");
                setNotificationSmallHead("sucess");
                setNotificationMessage("New Experience added!")
                loadExperience();
            }
            else{
                setNotificationHead("Add Experience");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }

    const updateExperience=async(e)=>{
        e.preventDefault();
        var id=$("#formId").val();
        var role=$("#formRole").val();
        var company=$("#formCompany").val();
        var start=$("#formStart").val();
        var end=$("#formEnd").val();                
        var data=await api.updateExperienceApi(email,password,role,start,end,company,sessionStorage.getItem("others"),id);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Update Experience");
                setNotificationSmallHead("sucess");
                setNotificationMessage("Experience updated!")
                loadExperience();
            }
            else{
                setNotificationHead("Update Experience");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }

    const addSkill=()=>{
        setModalHead("Add Skill");
        setModalBody(
            <>
                <form onSubmit={newSkill}>
                        <div class="form-group">
                            <label>Skill (Team Work, Design, Communication, Excel)</label>
                            <input class="form-control" id="formSkill" required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>Skill Level (0-100)</label>
                            <input style={{width:"100%"}} type="range"  id="formLevel" min="0" max="100" required/>
                        </div>


                        <button class="btn btn-primary mt-3" type="submit">Add</button>

                </form>
            </>
        )
        setShow(true)
    }

    const newSkill=async(e)=>{
        e.preventDefault();
        var sk=$("#formSkill").val();
        var lvl=$("#formLevel").val();        
        var data=await api.addSkillApi(email,password,sk,lvl);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Add Skill");
                setNotificationSmallHead("sucess");
                setNotificationMessage("New Skill added!")
                loadSkill();
            }
            else{
                setNotificationHead("Add Skill");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }

    const addProject=()=>{
        setModalHead("Add Project");
        setModalBody(
            <>
                <form onSubmit={newProject}>
                        <div class="form-group">
                            <label>Name (What is the name/aim of the project)</label>
                            <input class="form-control" id="formName" required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>Link (Is there a link to this project)</label>
                            <input class="form-control" id="formLink" type="url" defaultValue={""} />
                        </div>

                        <div class="form-group mt-3">
                            <label>Summary (What else would you like to add)</label>                            
                            <Editor editor={handleOthers} />

                        </div>

                        <button class="btn btn-primary mt-3" type="submit">Add</button>

                </form>
            </>
        )
        setShow(true)
    }

    const newProject=async(e)=>{
        e.preventDefault();
        var name=$("#formName").val();
        var lnk=$("#formLink").val()!=""?$("#formLink").val():" ";
        
        var data=await api.addProjectApi(email,password,name,lnk,sessionStorage.getItem("others"));
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Add Project");
                setNotificationSmallHead("sucess");
                setNotificationMessage("New project added!")
                loadProject();
            }
            else{
                setNotificationHead("Add Project");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }
    
    const updateProject=async(e)=>{
        e.preventDefault();
        var id=$("#formId").val();
        var name=$("#formName").val();
        var lnk=$("#formLink").val()!=""?$("#formLink").val():" ";
        
        var data=await api.updateProjectApi(email,password,name,lnk,sessionStorage.getItem("others"),id);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Update Project");
                setNotificationSmallHead("sucess");
                setNotificationMessage("project updated!")
                loadProject();
            }
            else{
                setNotificationHead("Update Project");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }

    const addCertification=()=>{
        setModalHead("Add Certification");
        setModalBody(
            <>
                <form onSubmit={newCertification}>
                        <div class="form-group">
                            <label>Name (Certification Name/Title)</label>
                            <input class="form-control" id="formName" required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>Link (Enter the link to your certificate/certificate organization if any)</label>
                            <input class="form-control" id="formLink" defaultValue={""} />
                        </div>

                        <div class="form-group mt-3">
                            <label>Organization (Which organization/institution awarded you this certificate)</label>
                            <input class="form-control" id="formOrganization" defaultValue={""} required/>
                        </div>

                        <button class="btn btn-primary mt-3" type="submit">Add</button>

                </form>
            </>
        )
        setShow(true)
    }

    const newCertification=async(e)=>{
        e.preventDefault();
        var name=$("#formName").val();
        var lnk=$("#formLink").val()!=""?$("#formLink").val():" ";
        var org=$("#formOrganization").val();
        
        var data=await api.addCertificationApi(email,password,name,lnk,org);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Add Certification");
                setNotificationSmallHead("sucess");
                setNotificationMessage("New Certification added!")
                loadCertification();
            }
            else{
                setNotificationHead("Add Certification");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }

    const updateCertification=async(e)=>{
        e.preventDefault();
        var id=$("#formId").val();
        var name=$("#formName").val();
        var lnk=$("#formLink").val()!=""?$("#formLink").val():" ";
        var org=$("#formOrganization").val();
        
        var data=await api.updateCertificationApi(email,password,name,lnk,org,id);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Update Certification");
                setNotificationSmallHead("sucess");
                setNotificationMessage("Certification updated!")
                loadCertification();
            }
            else{
                setNotificationHead("Update Certification");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }


    const addReferee=()=>{
        setModalHead("Add Referee");
        setModalBody(
            <>
                <form onSubmit={newReferee}>
                        <div class="form-group">
                            <label>Referee Email</label>
                            <input class="form-control" id="formEmail" type="email" required/>
                        </div>
                        
                        <div class="form-group mt-3">
                            <label>Referee Name</label>
                            <input class="form-control" id="formName" required/>
                        </div>
     
                        <div class="form-group mt-3">
                            <label>Referee Phone Number (Optional)</label>
                            <input class="form-control" id="formPhone" defaultValue={""} type="tel" />
                        </div>
     
                        <div class="form-group mt-3">
                            <label>Description (Briefly Describe your referee)</label>
                            <input class="form-control" id="formDesc" defaultValue={""} />
                        </div>                                         

                        <button class="btn btn-primary mt-3" type="submit">Add</button>

                </form>
            </>
        )
        setShow(true)
    }

    const newReferee=async(e)=>{
        e.preventDefault();
        var name=$("#formName").val();
        var rem=$("#formEmail").val();
        var pho=$("#formPhone").val()!=""?$("#formPhone").val():" ";
        var desc=$("#formDesc").val()!=""?$("#formDesc").val():" ";                
        var data=await api.addRefereeApi(email,password,rem,name,pho,desc);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Add Referee");
                setNotificationSmallHead("sucess");
                setNotificationMessage("New referee added!")
                loadReferee();
            }
            else{
                setNotificationHead("Add Referee");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
    }

    const updateReferee=async(e)=>{
        e.preventDefault();
        var id=$("#formId").val();
        var name=$("#formName").val();
        var rem=$("#formEmail").val();
        var pho=$("#formPhone").val()!=""?$("#formPhone").val():" ";
        var desc=$("#formDesc").val()!=""?$("#formDesc").val():" ";                
        var data=await api.updateRefereeApi(email,password,rem,name,pho,desc,id);
        $(data).ready(function(){
            if(data.error==false){
                setNotificationHead("Update Referee");
                setNotificationSmallHead("sucess");
                setNotificationMessage("referee updated!")
                loadReferee();
            }
            else{
                setNotificationHead("Update Referee");
                setNotificationSmallHead("error");
                setNotificationMessage(data.message)
            }
        });
        setShow(false);
        setNotification(true);
    
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

        <div className='Page'>
            <div className="Account scrollable rounded px-3 py-3">
                
                <header className="pb-0 mb-0">
                    <div style={{float:"right"}}>
                        <button className="btn btn-danger" onClick={logout}><i className="bx bx-log-out"></i></button>
                    </div>
                    <h5>{lastName} {middleName} {firstName}</h5>
                   
                </header>
                <hr/>
                
                <span style={{color:"red"}}>Note: You can toggle what sections you want to show/hide on your cv with the toggle buttons (</span>
                &nbsp;&nbsp;
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>
                &nbsp;&nbsp;
                <span style={{color:"red"}}>)</span>

                {/*GENERAL SECTION*/}
                <div className="container-fluid section content p-3 mt-3">
                    <div className="section">
                        <h4 className="section">General</h4>
                    </div>
                    <hr/>

                    <div class="row">

                        <div class="col-md-6">
                            <span style={{fontSize:"larger"}}>Show Download Button: </span>
                            <span>
                                <label class="switch">
                                    <input type="checkbox" onClick={()=>toggleSection("download-checkbox","download")} id="download-checkbox"/>
                                    <span class="slider round"></span>
                                </label>
                            </span>
                        </div>

                        <div class="col-md-6">
                            <span style={{fontSize:"larger"}}>Phone:</span>&nbsp;&nbsp;
                            <span style={{cursor:"pointer",fontSize:"larger"}}>{phone}</span> 
                        </div>

                        <div class="col-md-12 mt-4">
                            <span style={{fontSize:"larger"}}>Location:</span>&nbsp;&nbsp;
                            <span style={{cursor:"pointer",fontSize:"larger"}}>{location}</span> 
                        </div>

                        <div class="col-md-12 mt-4">
                            <a style={{fontSize:"larger"}} class="btn btn-primary" onClick={()=>changePassword()}>Change Password</a>
                            &nbsp;&nbsp;
                            <a style={{fontSize:"larger"}} class="btn btn-primary" onClick={()=>updateProfile()}>Update Profile</a>
                        </div>

                        <div class="col-md-12 mt-4 rounded py-2" style={{border:"solid rgb(240, 235, 235) thin",backgroundColor:"rgb(240, 235, 235)"}}>
                            <h5>Color Scheme</h5>
                            <span style={{color:"red"}}>You can set the color scheme of your CV</span>
                            <form onSubmit={updateColorScheme}>
                                <div class="row">
                                    <div class="form-group col-xs-6">
                                        <input class="form-control" type="color" id="formColorScheme" defaultValue={colorScheme} />
                                        <button type="submit" className="btn btn-primary mt-2">Update</button>
                                    </div>                                                                                                               
                                </div>
                            </form>
                        </div>

                        <div class="col-md-12 mt-4 rounded py-2" style={{border:"solid rgb(255, 255, 255) thin",backgroundColor:"rgb(255, 255, 255)"}}>
                            <h5>Link</h5>
                            <span style={{color:"red"}}>You can set a custom link to access your CV. You may visit <a href="https://c-l.link">https://c-l.link</a> if you want even more customization</span>
                            <br/>                            
                            <p style={{fontSize:"larger"}}><a href={custom!=""?(server+custom):(server+email)}>{custom!=""?(server+custom):(server+email)}</a></p>
                            <button class="btn btn-primary" onClick={customizeLink}>Update</button>
                            &nbsp;&nbsp;
                            <button class="btn btn-primary" onClick={()=>qr(custom)}>QR CODE <i className="fa fa-qrcode"></i></button>
                        </div>

                    </div>
                </div>

                {/*BIO SECTION*/}
                <div className="container-fluid bio section content p-3 mt-4">
                    <div className="section">                        
                        <span class="toggle px-3">---</span>
                        <button class="btn btn-primary newItem" onClick={editBio}><i class="fa fa-pencil"></i></button>
                        <h4 className="section">Bio</h4>
                    </div>
                    <hr/>
                    <div>
                        {bio}
                    </div>
                </div>


                {/*EDUCATION SECTION*/}
                <div className="container-fluid education section content p-3 mt-4">
                    <div className="section">                        
                        <span class="toggle px-3">
                            <label class="switch">
                                <input type="checkbox" onClick={()=>toggleSection("education-checkbox","education")} id="education-checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </span>
                        <button class="btn btn-primary newItem " onClick={addEducation}><b>Add</b></button>
                        <h4 className="section">Education</h4>
                    </div>
                    <hr/>
                    <div>
                        {education}
                    </div>
                </div>

                {/*EXPERIENCE SECTION*/}
                <div className="container-fluid experience section content p-3 mt-4">
                    <div className="section">                        
                        <span class="toggle px-3">
                            <label class="switch">
                                <input type="checkbox" onClick={()=>toggleSection("experience-checkbox","experience")} id="experience-checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </span>
                        <button class="btn btn-primary newItem " onClick={addExperience}><b>Add</b></button>
                        <h4 className="section">Experience</h4>
                    </div>
                    <hr/>
                    <div>
                        {experience}
                    </div>
                </div>
            
                {/*SKILL SECTION*/}
                <div className="container-fluid skill section content p-3 mt-4">
                    <div className="section">                        
                        <span class="toggle px-3">
                            <label class="switch">
                                <input type="checkbox" onClick={()=>toggleSection("skill-checkbox","skill")} id="skill-checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </span>
                        <button class="btn btn-primary newItem" onClick={addSkill}><b>Add</b></button>
                        <h4 className="section">Skills</h4>
                    </div>
                    <hr/>
                    <div>
                        {skill}
                    </div>
                </div>

                {/*PROJECT SECTION*/}
                <div className="container-fluid project section content p-3 mt-4">
                    <div className="section">                        
                        <span class="toggle px-3">
                            <label class="switch">
                                <input type="checkbox" onClick={()=>toggleSection("project-checkbox","project")} id="project-checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </span>
                        <button class="btn btn-primary newItem" onClick={addProject}><b>Add</b></button>
                        <h4 className="section">Projects</h4>
                    </div>
                    <hr/>
                    <div>
                        {project}
                    </div>
                </div>

                {/*CERTIFICATION SECTION*/}
                <div className="container-fluid certification section content p-3 mt-4">
                    <div className="section">                        
                        <span class="toggle px-3">
                            <label class="switch">
                                <input type="checkbox" onClick={()=>toggleSection("certification-checkbox","certification")} id="certification-checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </span>
                        <button class="btn btn-primary newItem" onClick={addCertification}><b>Add</b></button>
                        <h4 className="section">Certifications</h4>
                    </div>
                    <hr/>
                    <div>
                        {certification}
                    </div>
                </div>

                {/*REFEREE SECTION*/}
                <div className="container-fluid referee section content p-3 mt-4">
                    <div className="section">                        
                        <span class="toggle px-3">
                            <label class="switch">
                                <input type="checkbox" onClick={()=>toggleSection("referee-checkbox","referee")} id="referee-checkbox"/>
                                <span class="slider round"></span>
                            </label>
                        </span>
                        <button class="btn btn-primary newItem" onClick={addReferee}><b>Add</b></button>
                        <h4 className="section">Referees</h4>
                    </div>
                    <hr/>
                    <div>
                        {referee}
                    </div>
                </div>


                <Templates />
                
            

            </div>
        </div>
    </>
    
  );
  
}

export default Account;
