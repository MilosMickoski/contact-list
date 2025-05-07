import '../App.css';
import React from 'react';


function ActionIcon({color,icon,onClick}) {
    
    return (
       <div className='action-icon' style={{backgroundColor:color}} onClick={onClick}>
          <img height={15} width={15} src={icon} alt=""/>
       </div>
      );
    };

export default ActionIcon;
