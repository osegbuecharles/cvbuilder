import Main from './Main';
import "aos/dist/aos.css";
import React, {useState, useEffect} from 'react';
import AOS from 'aos';
import * as api from '../api';
import Helmet from 'react-helmet';
import Template from '../TEMPLATES/index';


function App(props) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  var path = window.location.pathname //returns the current url minus the domain name
  
   var pathname=(path.replace(props.base,"")).replace("/","");   
   var temp="";
    if(pathname.substring(0,6)=="sample"){      
      var temp=pathname[6]
      pathname="sample"
    }
  
   

    const [link,setLink]=useState('');
    const [ren,setRen]=useState('');
    
    useEffect(()=>{
             
      if(!link){
        getLink();        
      }     
      
      
    });  

    const getLink= async()=>{
      
      var ch=await api.getUserApi(pathname);      
      if(ch.error==true){
          setRen( <div className="App">      
          <Main base={props.base}/>        
        </div>)
      }
      else{        
          sessionStorage.setItem("email",ch.data.email);
          sessionStorage.setItem("lastName",ch.data.lastName);
          sessionStorage.setItem("firstName",ch.data.firstName);
          sessionStorage.setItem("middleName",ch.data.middleName);
          sessionStorage.setItem("phone",ch.data.phone);
          sessionStorage.setItem("template",ch.data.template);   
          
          setRen(<>
            <Template  data={ch} pathname={pathname} temp={temp}/> 
          </>)
      }
    }
  
  
/*
  if(link.data.length==0){
    console.log("No link");
  }
*/
  /*
  return (
    <div className="App">      
      <Main />
      <Footer />
    </div>
  );
  */
  return(
    <div>          
   
     {ren}     
    </div>
  )
}

export default App;