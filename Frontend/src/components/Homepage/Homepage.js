import React from 'react';
import './Homepage.css';

const Homepage=({name})=>{
  let str=`${name}`;
  let strn=str.toUpperCase();
  const divStyle = {
  color: 'black',
  fontSize: "30px",
  fontWeight:"bold"
};
    return(
     <header className="Courier New">
            <div className="tc-l mt2 mt2-m mt3-l ph3">
              <h1 className="f2 f1-l fw2  white-90 mb0 lh-title">Be a blood donor,be a hero-a real one.</h1>
              <h2 className="fw1 f3 white-80 mt3 mb4"><div style={divStyle}>Hey {strn},</div>do you know who can donate blood?..click the button below</h2>
              <a className="f6 no-underline grow dib v-mid bg-red white ba b--blue ph3 pv2 mb3" href="https://www.youtube.com/watch?v=E-TNZjMDs1w" target="_blank">VIDEO</a>
            </div> 
      </header>


    )
}

export default Homepage;






