import '../App.css';
import React from 'react';


function NameIcon({name}) {
    const getInitials = (name) => {
        const names = name.split(' ');
        if (names.length > 1) {
          return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
        }
        return names[0].charAt(0).toUpperCase();
      };
    
      const initials = getInitials(name);
    
    

    return (
       <div className='name-icon'>
         <h1 style={{fontSize:"13px",color:"white"}}>{initials}</h1>
       </div>
      );
    };

export default NameIcon;
