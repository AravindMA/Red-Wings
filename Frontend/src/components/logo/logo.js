import React from 'react';
import Tilt from 'react-tilt';


const Logo=()=>{
	return(
      <div className='ma3 mt0'>
        <Tilt className="Tilt br2 shadow-1" options={{ max :55 }} style={{ height: 150, width: 150 }} >
			 <div className="Tilt-inner"><img style={{width:'100%'}} alt='logo' src='https://img2.chinadaily.com.cn/images/201909/27/5d8d6293a310cf3e979e47a7.jpeg'/></div>
		</Tilt>
      </div>
		)
}

export default Logo;