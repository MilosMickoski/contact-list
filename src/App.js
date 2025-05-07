import './App.css';
import React, { useEffect, useState } from 'react';
import ContactCard from './components/ContactCard';


function App() {
  const [loading, setLoading] = useState(true);
  const [firstLetters, setFirstLetters] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(prev => (prev === id ? null : id));
  };


  useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch");
          return response.json();
        })
        .then(async (data) => {
          data.sort((a, b) => a.name.localeCompare(b.name));
          const tempLetters = {};
          for (let i = 0; i < data.length; i++) {
            const firstLetter = data[i].name.charAt(0).toUpperCase();
            if (!tempLetters[firstLetter]) {
              tempLetters[firstLetter] = [];
            }
            tempLetters[firstLetter].push(data[i]);
          }
          setFirstLetters(tempLetters);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setLoading(false);
        });
    }, []);
  
    console.log(firstLetters);
    return (
    <div className="App">
      <h1 style={{textAlign:'center', marginTop:"10px"}}>Contact List</h1>
      
      {loading && (
        <div className='loading-container'>
          <div className='loader' />
        </div>
      )}

      <div className='main-container'>
        {Object.keys(firstLetters).map((letter) => (
          <div key={letter} className='letter-list-container'>
            <div className='letter-container'>
              <h2 className='letter-text'>{letter}</h2>
            </div>
            <div className='contact-list-container'>
              {firstLetters[letter].map((user) => (
                <ContactCard key={user.id} user={user} expanded={user.id===expandedCard} onClick={() => toggleExpand(user.id)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
