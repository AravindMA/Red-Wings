import React from 'react';

const Navigation=({onRouteChange,isSignedIn,route})=>{ 
	  if(isSignedIn && route!=='home'){
	  	return(
            <nav style={{display:'flex',justifyContent:'flex-end',fontweight:'bold'}}> 
		        <p onClick={()=>onRouteChange('home')}className='f3 link dim white  pa3 pointer'>Back to homepage</p>
	        </nav>
	  		);
	  }
	  else if(isSignedIn)
	  {
	  	return(
	  	 <nav style={{display:'flex',justifyContent:'flex-end'}}>
	        <p  onClick={()=>onRouteChange('donate')}className='f3 link dim white  pa3 pointer'>Donate Blood</p> 
	        <p  onClick={()=>onRouteChange('request')}className='f3 link dim white  pa3 pointer'>Request Blood</p>
	         <p  onClick={()=>onRouteChange('vr')}className='f3 link dim white  pa3 pointer'>View Request</p>  
	        <p  onClick={()=>onRouteChange('profile')}className='f3 link dim white  pa3 pointer'>View/Update profile</p> 
	        <p  onClick={()=>onRouteChange('camps')}className='f3 link dim white  pa3 pointer'>Contact Camps</p> 
	        <p  onClick={()=>onRouteChange('SignOut')}className='f3 link dim white  pa3 pointer'>Sign Out</p>
	     </nav>
	     );
	  }
	  else{
	  	return(
		  	 <nav style={{display:'flex',justifyContent:'flex-end',fontweight:'bold'}}>
		       <p onClick={()=>onRouteChange('SignIn')}className='f3 link dim white  pa3 pointer'>Sign In</p>
		       <p onClick={()=>onRouteChange('Register')}className='f3 link dim white  pa3 pointer'>Register</p>
		     </nav>
	     );
	  }
}

export default Navigation;