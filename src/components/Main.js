import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Home from './Home';

import A404 from './404';
import About from './About';
import Account from './Account';
import Login from './Login';
import Register from './Register';
//import Analytics from './Analytics';
//import { Link } from "react-router-dom";
/*
 <Route path='/account' element={<Account/>} />   
      <Route path='/account/*' element={<Analytics/>} />   
      <Route path='/login/*' element={<Login/>} />   
      <Route path='/register/*' element={<Register/>} />   
      <Route path='/Admin/*' element={<Account/>}/>
*/
const Main = (props) => {

  return (    
    <Routes basename={props.base}> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<Home base={props.base}/>} />      
      <Route path='/about-us/*' element={<About base={props.base}/>} />        
      <Route path='/login/*' element={<Login base={props.base}/>} />        
      <Route path='/register/*' element={<Register base={props.base}/>} />        
      <Route path='/account/*' element={<Account base={props.base}/>} />        
      <Route path="/*" element={<A404 base={props.base}/>} />
    </Routes>
  );
}

export default Main;