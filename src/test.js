import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { connect, Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './Counter';
import $ from 'jquery';
import * as api from './api';


import 'bootstrap/dist/css/bootstrap.min.css';



$(document).ready(async function(){
  var d= await api.loginApi("osegbuecharles@gmail.com","ebmUv6CO")
  //console.log(d);
});

var action={ 
  type: 'ADD_CONTACT', 
  name: 'James' 
}

function addContact(person) {
  return {
    type: 'ADD_CONTACT',
    payload: person
  }
}

/*
const contactsApp = combineReducers({
  addContacts,
  doSomething
})
*/

function contactsAppp(state, action) {
  switch (action.type) {
    case 'ADD_CONTACT':
      return [ ...state,  action.person ]
    default:
      return state
  }
}

function contactsAp(state, action) {
  if (action.type === 'ADD_CONTACT') {
    return [ ...state,  action.name ]
  } else {
    return state
  }
}

var name="charles";
var user=[{"id":"3","name":"Charles"},{"id":"1","name":"Josh"}];


//function components    
function GetName(props){//has to be props
  const [name, setName]=useState(user[props.index].name);
  return <u>{name}</u>;
}




const initialState = {
  count: 4
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { count: state.count + action.num };
    default:
      return state;
  }
}

const store = createStore(reducer);




//const Counte = connect(mapStateToProps, mapDispatchToProps)(Counterr);

//class components
class FetchName extends React.Component{
  state = {
    name: "Jack"
  }
  render(){
    return <Provider store={store}>
      <div>
      <u>{this.props.name}</u>
      <br/>
      <u>{this.state.name}</u>
      <br/>
      <GetName index="0"/>
      <br/>
      <GetName index="1"/>
      <br/>
        <Counter />    
      <br/>
      <Converter />
      <br/>
      <Form />
      <br/>
      <List dat={list}/>
      <br/>
      <ContactManager contacts={contacts}/>
      </div>
      </Provider>;
  }
}


class Counter extends React.Component {
  state = {
    counter: 0,
    clicks:0
  }

  componentDidMount() {
    this.setState({counter: 42});
  }

  componentWillUnmount() {
    this.setState({counter: 42});
  }
  componentDidUpdate() {
    console.log("Number of clicks: " + this.state.clicks);
  }
  increment = () => {
    this.setState({
     counter: this.state.counter+1,
     clicks:this.state.clicks+1
    });
  }

  render() {
    return <div>
    <p>{this.state.counter}</p>
    <button className="btn btn-primary" onClick={this.increment}>Increment</button>
    </div>;
  }
} 
 
class Converter extends React.Component{
  
  state={
    "km":0
  }
  
  handleChange = (e) => {
    this.setState({
      "km":e.target.value
    });
  }

  convert = (km) => {
    return (km/1.609).toFixed(2);
  }


  render(){
    return <div>
       <input type="text" value={this.state.km} onChange={this.handleChange} />
       <p> {this.state.km} km is {this.convert(this.state.km)} miles </p>
  </div>;
  }

}

class Form extends React.Component{
  state={
    "sum":0,
    "num":0
  }
  
  handleChange = (e) =>{
    this.setState({
      "num":e.target.value
    });
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    this.setState({
      "sum":this.state.sum+Number(this.state.num)
    });
  }

  render(){
    return <form onSubmit={this.handleSubmit}>
    <input type="number" value={this.state.num} onChange={this.handleChange} />
    <input className="btn btn-primary" type="submit" value="Add" />
    <p> Sum is {this.state.sum} </p>
    </form>
  }

}



//CONTACT MANAGER

const contacts = ["James Smith", "Thomas Anderson", "Bruce Wayne"];


class ContactManager extends React.Component{
  state={
    "contacts":this.props.contacts
  }
  addPerson = (name) =>{    
    this.setState({
      "contacts": [...this.state.contacts,name]
    });    
  }

  render(){
    return <div>
      <AddPersonForm handleSubmit={this.addPerson} />
      <PeopleList dataaa={this.state.contacts} />
    </div>
  }
}

function AddPersonForm(props){
  
  const [person,setPerson]=useState("");
  

  var handleChange = (e) =>{
    setPerson(e.target.value);
  }

  var handleSubmit= (e) =>{
    props.handleSubmit(person);
    setPerson("")    
    e.preventDefault();
  }  

    return <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Add new contact" onChange={handleChange} value={person} />
      <button type="submit">Add</button>
    </form>
  
}

function PeopleList(props){
  
  const arr= props.dataaa;
   
  
  const listItems= arr.map((val,index) =>
    <li key={index}>{val}</li>
  );
  
  return <ul>{listItems}</ul>;
  
}







class List extends React.Component{
   dat= this.props.dat
   listItems= this.dat.map((val,index)=>
      <li key={index}>{val}</li>      
   );
   
   render(){
     return <ul>
       {this.listItems}
     </ul>
   }
}

var list=["A","B","C"];


//const val=<GetName index="0"/>
const val=<FetchName name="James"/>

ReactDOM.render(
    <h1 id={user[0].id} className={name}>Hello, {val}!</h1> ,
  document.getElementById('root')
);

let counter=0;

function show(){
  counter++;
  const el= <p>{counter}</p>;
  ReactDOM.render(
    el,document.getElementById(user[0].id)
  );
}

//setInterval(show,1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
