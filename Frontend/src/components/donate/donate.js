import React from 'react';
class Donate extends React.Component {
	constructor(props){
		super(props);
		this.state={
			units:''
		}
	}
	onUnitsChange=(event)=>{
			this.setState({'units':event.target.value})
	}
	onSubmitDonate=()=>{
		fetch('http://localhost:3001/donate',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				name:this.props.name,
				age:this.props.age,
				value:this.props.value,
                units:this.state.units
			})
		}).then(response=>response.json()).then(user=>{
				if(user.id){
					this.props.onRouteChange('home');
					alert('successfully donated')
				}
				else{
					alert(user);
				}
			
		})
	}
	render(){
		return(
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw8 shadow-5  center">
			<main className="pa5 black-80">
			  <div className="measure ">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f4 fw6 ph0 mh0">DONOR FORM</legend>
			      <div className="mt2">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"
			         name="name"  id="name" readonly="readonly" value={this.props.name}/>
			      </div>
			      <div className="mt2">
			        <label className="db fw6 lh-copy f6" htmlFor="units">NO. of Units</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" 
			        name="units"  id="email-address" onChange={this.onUnitsChange} />
			      </div>
			      <div className="mv2">
			        <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"
			         name="age"  id="age" readonly="readonly" value={this.props.age} />
			     </div> 
			     <div className="mv2">
			        <label className="db fw6 lh-copy f6" htmlFor="blood">Blood Group</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text"
			         name="blood"  id="blood" readonly="readonly" value={this.props.value} />
			     </div>
			    </fieldset>
			    <div className="">
			      <input  onClick={()=>{this.props.onButtonSubmit() ; this.onSubmitDonate()}} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="DONATE!!" />
			    </div>
			  </div>
	        </main>
        </article>
		);
	}
}

export default Donate;