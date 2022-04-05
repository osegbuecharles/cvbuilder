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
     

       const [tableData,setTableData]=useState(<div className="spinner-border text-primary"></div>);
       const [pageSize,setPageSize]=useState(10);
       const [pageNum,setPageNum]=useState(1);
       const [pageLen,setPageLen]=useState();
       const [pagination,setPagination]=useState('')

     
       const [error,setError]=useState('')

       useEffect(()=>{  
           loadAnalytics()                    
         
        
      },[pageNum,pageSize]); 


      const updatePageSize=(e)=>{     
        var val=e.target.value;
        if(pageSize!=val){            
            setPageSize(val);
        }
     }
     

     const returnLink=()=>{
        //sessionStorage.setItem("viewLinkId",id);
        
        $("#ViewLinks").hide(function(){
            $("#Links").show();                    
        });
    }
     
      const loadAnalytics= async()=>{ 
          
        var path = window.location.pathname //returns the current url minus the domain name
  
        var idd=path.replace("/account/","");          
          
        var data=await api.getLinkAnalyticsApi(email,password,idd,pageNum,pageSize);
        
        if(data.data.length<1){
            setTableData(<div style={{textAlign:"center",width:"100%"}}>Your link has not gotten any interaction!</div>);
        }
        else{
            const ht=data.data.map((val,index)=>
               <tr style={{textAlign:"center"}}>
                   <td>{(pageNum-1)*pageSize+(index+1)}</td>
                   <td>{val.ip}</td>
                   <td>{val.device}</td>
                   <td>{val.brand}</td>
                   <td>{val.name}</td>
                   <td>{val.os}</td>
                   <td>{val.country}</td>
                   <td>{val.date}</td>
                   <td>{val.time}</td>
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
           <li onClick={()=>setPageNum(val)}  key={index+"vl"} className={pageNum==val?'active disabled page-item':'page-item'}><a style={{cursor:"pointer"}} className="page-link">{val}</a></li>
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
                  <a class="btn btn-danger" href='/account' style={{float:"right"}}>Back</a>
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
                    <h3 style={{color:"black",textAlign:"center"}}>Analytics</h3>                  
                  </div>
                    {/*DESKTOP VERSION*/}
                    <table className='table table-sm desktop-only  table-borderless table-primary rounded'>
                        <thead style={{textAlign:"center"}}>
                            <th>S/N</th>
                            <th>IP</th>
                            <th>Device</th>
                            <th>Brand</th>
                            <th>Name</th>                            
                            <th>Os</th>
                            <th>Country</th>
                            <th>Date</th>
                            <th>Time</th>
                        </thead>
                        <tbody className="tableData">
                            {tableData}
                        </tbody>
                    </table> 

                    {/*MOBILE VERSION*/}    
                    <table className='table table-sm table-responsive mobile-only  table-borderless table-primary rounded'>
                        <thead style={{textAlign:"center"}}>
                            <th className='px-2'>S/N</th>
                            <th className='px-2'>IP</th>
                            <th className='px-2'>Device</th>
                            <th className='px-2'>Brand</th>
                            <th className='px-2'>Name</th>
                            <th className='px-2'>Os</th>
                            <th className='px-2'>Country</th>
                            <th className='px-2'>Date</th>
                            <th className='px-2'>Time</th>
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


export default Analytics;