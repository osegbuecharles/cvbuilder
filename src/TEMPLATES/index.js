import React, {useState, useEffect} from 'react';

import * as api from '../api';
import Helmet from 'react-helmet';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

function Template(props){
    const [ch,setCh]=useState(props.data);
    const [pathname,setPathname]=useState(props.pathname);
    const [temp,setTemp]=useState(props.temp)
    const [res,setRes]=useState(
        <div style={{textAlign:"center"}}>
          
          
        </div>
      );
    const [li,setLi]=useState('');
    useEffect(()=>{
      var ur=(window.location.href).split("#")
      if(ur[1]!=undefined){
        setPathname(pathname+"&p=true");
        $(".download").hide();
        $("#bod").css({
          "overflow":"visible",
          "height":"100vh"
        })
        window.scrollTo(0, document.querySelector("#cv_document").scrollHeight);
        window.focus();
      }
      loadTemp()      

    },[]);

    const loadTemp=async()=>{
      
      if(pathname=="sample"){              
        if(temp!=undefined){
          var t=(await api.getTemplatesApi(temp)).data[0];

          setLi(t.link+"?c="+pathname);
          setRes(
            <iframe id="myFrame"  src={t.link+"?c="+pathname} style={{width: "100%", height:"100vh", overflow:"visible"}} allowFullScreen></iframe>
          )
        }
        else{
          var t=(await api.getTemplatesApi(ch.data.template)).data[0];
          var ll=t.link+"?c="+pathname
          setLi(t.link+"?c="+pathname);
          setRes(
            <iframe id="myFrame"  src={t.link+"?c="+pathname} style={{width: "100%", height:"100vh", overflow:"visible"}} allowFullScreen></iframe>
          )
        //  $("#cv_document").html(ob);
        }
      }

      else{
        var t=(await api.getTemplatesApi(ch.data.template)).data[0];
        setLi(t.link+"?c="+pathname);
        setRes(
          <iframe id="myFrame"  src={t.link+"?c="+pathname} style={{width: "100%", height:"100vh", overflow:"visible"}} allowFullScreen></iframe>
        )
        }
       

    }


      const download=()=>{
        var objFra = document.getElementById('cvv');
        objFra.contentWindow.focus();
       // objFra.contentWindow.print();  
        window.focus();
        window.print();
      }
      

      return(        
        <div id="bod" style={{height:"100vh",overflowY:"visible"}}>
          <Helmet>
          <title>{ch.data.lastName} {ch.data.firstName}</title>
          <meta name='description' content={ch.data.bio}></meta>
        </Helmet>
         
          <iframe id="cvv"  src="#cv_document" style={{width: "100%",display:"none",overflow:"visible"}}></iframe>
    
          <div id="cv_document" style={{height:"100%",overflow:"hidden"}}>   
            {res}
          </div>         
        </div>
      )
}

export default Template;