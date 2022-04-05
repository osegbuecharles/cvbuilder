//import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import React from 'react';
import App from './components/App';
import "./assets/fontawesome/css/font-awesome.min.css";
import reportWebVitals from './reportWebVitals';
import "./assets/boxicons/css/boxicons.min.css";
//import { connect, Provider } from 'react-redux';
//import { createStore, combineReducers } from 'redux';
//import './Counter';



import 'bootstrap/dist/css/bootstrap.min.css';

/*
// You can choose your kind of history here (e.g. browserHistory)
import { Router, hashHistory as history } from 'react-router';
// Your routes.js file
import routes from './routes';
*/

import { BrowserRouter } from 'react-router-dom';









var base="/cvbuilder";



ReactDOM.render((
    <BrowserRouter basename={base}>
      <App base={base}/> {/* The various pages will be displayed by the `Main` component. */}
    </BrowserRouter>
    ), 
    document.getElementById('root')
);


//setInterval(show,1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
