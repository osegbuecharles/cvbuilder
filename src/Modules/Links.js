import '../css/style.css'
import logo from '../assets/logo.png'
import $ from 'jquery';
import {Button,ButtonGroup,ButtonToolbar,Modal,ModalBody,ModalCOntext,ModalDialog,ModalFooter,ModalHeader,ModalTitle} from 'react-bootstrap';
import { Toast, ToastContainer} from 'react-bootstrap';
import * as api from '../api';
import {useState, useEffect} from 'react';
import QRCode from "react-qr-code";

function Links(props){
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

       //TABLE DATA
       const [tableData,setTableData]=useState(<div className="spinner-border text-primary"></div>);
       const [pageSize,setPageSize]=useState(10);
       const [pageNum,setPageNum]=useState(1);
       const [pageLen,setPageLen]=useState();
       const [pagination,setPagination]=useState('')


       

       const [error,setError]=useState('')

       useEffect(()=>{             
        loadLinks();                        
        
        
      },[pageNum,pageSize]); 
      
      

     const updatePageSize=(e)=>{     
        var val=e.target.value;
        if(pageSize!=val){            
            setPageSize(val);
        }
     }
     

      const customize= async(e)=>{
          e.preventDefault();          
          setError("");
          var li=$("#customize-input").val();          
          console.log(li);
            var d=await api.customizeLinkApi(email,password,sessionStorage.getItem('cid'),li);            
            $(d).ready(function(){
                if(d.error==true){
                    $(".error-message").html(d.message)
                }
                else{
                    setNotificationHead("Custom Link")
                    setNotificationSmallHead("success")
                    setNotificationMessage("Link customization successful!")
                    setShow(false);
                    setNotification(true);
                    loadLinks();
                }
            });
      }

      const customizeLink=async(id,link,custom)=>{
          sessionStorage.setItem("cid",id) 
          
          var d=await api.getSettingsApi("server");
          var server=d.value;
        setModalHead("Customize Link")
        var form=(
            <>
            <p style={{color:"black"}}>Customize Link for {link}</p>
            <form method='POST' onSubmit={customize}>
                <div className='form-group'>
                    <span>{server}</span><input id="customize-input" placeholder="Custom link"  required/>
                </div>
                <div className="error-message" style={{color:"red"}}></div>
                <button className="btn btn-success" type="submit">Customize</button>
            </form>
            </>
        );
        setModalBody(form)
        setShow(true);
      }


      const update= async(e)=>{
        e.preventDefault();          
        setError("");
        var li=$("#customize-input").val();          
        console.log(li);
          var d=await api.updateLinkApi(email,password,sessionStorage.getItem('cid'),li);            
          $(d).ready(function(){
              if(d.error==true){
                  $(".error-message").html(d.message)
              }
              else{
                  setNotificationHead("Update Link")
                  setNotificationSmallHead("success")
                  setNotificationMessage("Link updated successful!")
                  setShow(false);
                  setNotification(true);
                  loadLinks();
              }
          });
    }

    const updateLink=async(id,link,custom)=>{
        sessionStorage.setItem("cid",id) 
        
        
      setModalHead("Update Link")
      var form=(
          <>
          <p style={{color:"black"}}>Update Link for {link}</p>
          <form method='POST' onSubmit={update}>
              <div className='form-group'>
                  <input type="url" id="customize-input" placeholder="Updated link"  required/>
              </div>
              <div className="error-message" style={{color:"red"}}></div>
              <button className="btn btn-success" type="submit">Update</button>
          </form>
          </>
      );
      setModalBody(form)
      setShow(true);
    }

    const qr=async(l)=>{        
        var s=await api.getSettingsApi("server");
        var server=s.value
        var q=server+l
        setModalHead("QrCode")
        setModalBody(
            <>
            <QRCode value={q} bgColor="white" fgColor="blueviolet" title={q} />
            <h5><a href={q}>{q}</a></h5>
            </>
        );
        setShow(true);
    }

 
      const loadLinks= async()=>{        
        var data=await api.getLinkApi(email,pageNum,pageSize);             
        if(data.data.length<1){
            setTableData(<div style={{textAlign:"center",width:"100%"}}>You have not created any links!</div>);
        }
        else{            
            const ht=data.data.map((val,index)=>            
               <tr style={{textAlign:"center"}}>
                   <td>{(pageNum-1)*pageSize+(index+1)}</td>
                   <td>{val.shortlink}</td>
                   <td style={{cursor:"pointer"}} onClick={()=>customizeLink(val.id,val.link,val.customlink)}>{val.customlink!=null?val.customlink:<button  className="btn btn-primary"><i className="fa fa-pencil"></i></button>}</td>
                   <td style={{cursor:"pointer"}} onClick={()=>updateLink(val.id,val.link,val.customlink)}>{val.link}</td>
                   <td>{val.clickCount!=null?val.clickCount:"-"}</td>
                   <td>                       
                       <a className="btn btn-primary" href={"/account/"+val.id}><i className="fa fa-eye"></i></a>
                       <button className="btn btn-danger" onClick={()=>deleteLin(val.id)}><i className="fa fa-trash"></i></button>
                       <button className="btn btn-primary" onClick={()=>qr(val.customlink!=null?val.customlink:val.shortlink)}><i className="fa fa-qrcode"></i></button>
                   </td>
               </tr>
            );
            setTableData(ht);                 
            const pgl=Math.ceil(data.length/pageSize)
            setPageLen(pgl);
           if(pgl>1){
               loadPagination(pgl);
           }
           else{
               setPagination("");
           }
            
        }
    }


    const loadPagination= async(len)=>{                                                 
        const le=[...Array(len+1).keys()].slice(1);                       
       const num=le.map((val,index)=>                
           <li onClick={()=>setPageNum(val)}  key={index} className={pageNum==val?'active disabled page-item':'page-item'}><a style={{cursor:"pointer"}} className="page-link">{val}</a></li>
       );
       const pg=(
           <nav aria-label="...">
               <ul className="pagination">
                   {num}
               </ul>
           </nav>
       );
       setPagination(pg);
    }

    const deleteLin =(id)=>{
        setModalHead("Delete Link")
        var b=(
            <>
                <p style={{color:"black"}}>Are you sure you want to delete this link?</p>
                <button class="btn btn-success" onClick={()=>deleteLink(id)}>Yes, Continue</button>                
            </>
        )
        setModalBody(b);
        setShow(true)
    }
    const deleteLink= async(id)=>{
        console.log(email,password,id)
            var d= await api.deleteLinkApi(email,password,id);
            $(d).ready(function(){
                setNotificationHead("Delete Link")
                setNotificationSmallHead("success")
                setNotificationMessage("Link Deleted!")
                setShow(false);
                setNotification(true);
                loadLinks();
            })
    }

    const createLink =async(e)=>{
        e.preventDefault();
        var newLink=$("#newLink").val();
        var dat=await api.newLinkApi(email,password,newLink);
        if(dat.error=="FALSE"){
            setNotificationHead("New Short Link");
            setNotificationSmallHead("success");
            setNotificationMessage(<div>
                Short link created. See here <a href={dat.data.share}>{dat.data.share}</a>
                </div>);       
                setNotification(true);
                setShow(false);
                loadLinks();
        }
        else{
            setNotificationHead("New Short Link");
            setNotificationSmallHead("error");
            setNotificationMessage(<div>
                {dat.message}
            </div>);
            setNotification(true);
        }
        
    }

    const newLinkk= ()=>{
        setModalHead("New Link")
        var body=(
            <form method="POST" onSubmit={createLink}>
                <input type="url" className='form-control' id="newLink" placeholder="https://example.com" required/>
                <button className='btn btn-primary mt-2' type="submit">Create</button>
            </form>
        )
        setModalBody(body);
        setShow(true);
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
              <div className="content">
                  <div className='pb-2'>
                    <button class="btn btn-primary" onClick={newLinkk} style={{float:"right"}}>New+</button>
                    <div className='form-group px-3 pt-1' style={{float:"right"}}>
                        View:&nbsp;&nbsp;
                        <select id="ps" onClick={updatePageSize} className=''>
                            <option value="10">10</option>
                            <option value="9">9</option>
                            <option value="8">8</option>
                            <option value="7">7</option>
                            <option value="6">6</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                        </select>
                    </div>
                    <h3 style={{color:"black",textAlign:"center"}}>Links</h3>                  
                  </div>
                    {/*DESKTOP VERSION*/}
                    <table className='table table-sm desktop-only  table-borderless table-primary rounded'>
                        <thead style={{textAlign:"center"}}>
                            <th>S/N</th>
                            <th>Short Link</th>
                            <th>Custom Link</th>
                            <th>Link</th>
                            <th>Clicks</th>
                            <th>Action</th>
                        </thead>
                        <tbody className="tableData">
                            {tableData}
                        </tbody>
                    </table> 

                    {/*MOBILE VERSION*/}    
                    <table className='table table-sm table-responsive mobile-only  table-borderless table-primary rounded'>
                        <thead style={{textAlign:"center"}}>
                            <th className='px-2'>S/N</th>
                            <th className='px-2'>Short Link</th>
                            <th className='px-2'>Custom Link</th>
                            <th className='px-2'>Link</th>
                            <th className='px-2'>Clicks</th>
                            <th className='px-2'>Action</th>
                        </thead>
                        <tbody className="tableData">
                            {tableData}
                        </tbody>
                    </table>     


                    <div>
                        {pagination}
                    </div>                    
                </div>
        </>
    )
}


export default Links;