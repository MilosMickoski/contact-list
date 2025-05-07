import '../App.css';
import { motion, AnimatePresence } from 'framer-motion';
import React,{useState} from 'react';
import NameIcon from './NameIcon';
import ActionIcon from './ActionIcon';


function ContactCard({user, expanded, onClick}) {
    const [emailCopied, setEmailCopied] = useState(false);
    const variants = {
        collapsed: {
          opacity: 0,
          height: 0,
          transition: {
            opacity: { duration: 0.3, delay: 0 },
            height: { duration: 0.3, delay: 0.3 },
          }
        },
        expanded: {
          height: 'auto',
          opacity: 1,
          transition: {
            height: { duration: 0.3, delay: 0 },
            opacity: { duration: 0.3, delay: 0.3 },
          }
        }
      };

      const handleAction = (action) => {
        if (action === "c") {
          window.open(`tel:${user.phone.split(' ')[0]}`);
        }
        else if (action === "m") {
          window.open(`sms:${user.phone.split(' ')[0]}`);
        }
        else if (action === "e") {
          if (emailCopied) {return}
          navigator.clipboard.writeText(user.email)
            .then(async() => {
              setEmailCopied(true);
              await new Promise(resolve => setTimeout(resolve, 1000));
              setEmailCopied(false);
            })
            .catch((err) => {
              console.error('Failed to copy email:', err);
              window.alert('Failed to copy email to clipboard.');
            });
        }
        else if (action === "w") {
          window.open(`https://${user.website}`, '_blank');
        }
      }

    return (
        <motion.div
          onClick={onClick}
          layout
          initial={false}
          transition={{ duration: 0.3 }}
          className='contact-card'>
          
          <div className='contact-card-header'>
            <div className='contact-card-header-left'>
              <NameIcon name={user.name} />
              <div style={{display:"flex", flexDirection:"column", justifyContent:"center", marginLeft:"10px", textAlign:"left"}}>
                <h3>{user.name}</h3>
                <h3 style={{fontWeight:"400",fontSize:"13px"}}>{user.username}</h3>
              </div>
            </div>
            <div className='contact-card-header-right' onClick={(e)=>e.stopPropagation()}>
              <ActionIcon color="#e0dede" icon="phoneIcon.png" onClick={()=>handleAction("c")} />
              <ActionIcon color="#e0dede" icon="messagesIcon.png" onClick={()=>handleAction("m")} />
            </div>
            
          </div>


          <AnimatePresence>
            {expanded && (
              <motion.div
              key="details"
              variants={variants}
              initial="collapsed"
              animate={expanded ? "expanded" : "collapsed"}
              exit="collapsed"
              style={{width:"100%"}}
            >
              {/* number, email, work, address, website */}
                <div style={{width:"100%",boxSizing:"border-box", display:"flex", flexDirection:"column", gap:"13px", padding:"10px 100px",fontSize:"12px", textAlign:"left"}}>
                  
                  <div className='contact-card-detail' onClick={(e)=>e.stopPropagation()}>
                    <h3 style={{fontWeight:"600",fontSize:"11px"}} >phone</h3>
                    <h3 style={{color:"#257BC4",fontWeight:"500", cursor:"pointer"}} onClick={()=> handleAction('c')} >{user.phone.split(' ')[0]}</h3>
                    {user.phone.split(' ').length>1 && <h3 style={{fontWeight:"600",fontSize:"11px"}}>extension</h3>}
                    {user.phone.split(' ').length>1 && <h3 style={{color:"#257BC4",fontWeight:"500"}}>{user.phone.split(' ')[1].slice(1)}</h3>}
                  </div>
                  <div className='contact-card-detail' onClick={(e)=>e.stopPropagation()}>
                    <h3 style={{fontWeight:"600",fontSize:"11px"}}>email</h3>
                    {!emailCopied&&
                    <motion.h3 
                      initial={{opacity: 0}}
                      animate={{opacity: 1, transition:{duration:0.7}}}
                      style={{color:"#257BC4",fontWeight:"500", cursor:"pointer"}} onClick={()=> handleAction('e')}>{user.email}</motion.h3>
                    }   
                    {emailCopied&&
                    <motion.h3 
                      initial={{opacity: 0}}
                      animate={{opacity: 1, transition:{duration:0.7}}}
                      style={{color:"#257BC4",fontWeight:"500", cursor:"pointer"}} onClick={()=> handleAction('e')}>{!emailCopied?user.email:"Copied"}</motion.h3>
                    }
                    </div>
                  <div className='contact-card-detail' onClick={(e)=>e.stopPropagation()}>
                    <h3 style={{fontWeight:"600",fontSize:"11px"}}>website</h3>
                    <h3 style={{color:"#257BC4",fontWeight:"500", cursor:"pointer"}} onClick={()=> handleAction('w')}>{user.website}</h3>
                  </div>
                  <div className='contact-card-detail' onClick={(e)=>e.stopPropagation()}>
                    <h3 style={{fontWeight:"600",fontSize:"11px"}}>address</h3>
                    <h3 style={{color:"#257BC4",fontWeight:"500"}}>{`${user.address.suite} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</h3>
                  </div>
                  <div className='contact-card-detail' onClick={(e)=>e.stopPropagation()}>
                    <h3 style={{fontWeight:"600",fontSize:"11px"}}>company</h3>
                    <h3 style={{color:"#257BC4",fontWeight:"500"}}>{user.company.name}</h3>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    };

export default ContactCard;
