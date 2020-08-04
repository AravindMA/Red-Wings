import React,{Component} from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Donate from './components/donate/donate';
import Request from './components/request/request';
import Homepage from './components/Homepage/Homepage';
import Camps from './components/camps/camps';
import View from './components/viewrequest/viewrequest';
import Update from './components/update/update';
import Profile from './components/profile/profile';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';

const particlesOptions={
  particles:{
    number:{
      value:150,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

const initialState={
      route:'SignIn',
      isSignedIn:false,
      user:{
        id:'',
        name: '',
        email:'',
        value:'',
        age:'',
        joined:'',
        counts:''
      },
      requesters:[]
  }   

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
    }
  loadUser=(data)=>{
    console.log(data);
    this.setState({user:{
      id:data.id,
      name: data.name,
      email:data.email,
      value:data.value,
      age:data.age,
      joined:data.joined,
      counts:data.counts

    }})
  }
  

   onButtonSubmit=()=>{
        fetch('http://localhost:3001/counts',{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          id:this.state.user.id
      })
      }).then(response=>response.json()).then(count=>{
        this.setState(Object.assign(this.state.user,{counts:count}))
      })
   }     
  onRouteChange=(route)=>{
    if(route==='SignOut'){
      this.setState(initialState);
    }
    else if(route==='home'||route==='donate'||route==='request'||route==='profile'||route==='camps'||route==='update'||route==='vr') {
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  routeSwitch (route) {
            switch (route){
              case "home": return(
                    <div>
                    <Logo /> 
                    <Homepage name={this.state.user.name}/>
                  </div>
                  );   
              case "SignIn":return(<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>);
              case "donate":return(<Donate onRouteChange={this.onRouteChange} onButtonSubmit={this.onButtonSubmit}  name={this.state.user.name} id={this.state.user.id} age={this.state.user.age} value={this.state.user.value}/>);
              case "request":return(<Request onRouteChange={this.onRouteChange} requestUser={this.requestUser}/>);
              case "vr":return(<View requesters={this.state.requesters} />);
              case "profile":return(<Profile  counts={this.state.user.counts} name={this.state.user.name} joined={this.state.user.joined} age={this.state.user.age} value={this.state.user.value} email={this.state.user.email}  onRouteChange={this.onRouteChange} />);
              case "camps":return(<Camps />);
              case "update":return(<Update  id={this.state.user.id} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>);
              default: return(<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>);
            }       
         }         

  render(){
    const {isSignedIn,box,imageUrl,route}=this.state;
   return( 
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} route={this.state.route}/>
        {this.routeSwitch(route)}
      </div>
   );
  }
 }
 

export default App;
