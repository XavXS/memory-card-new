import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css'

function App() {
  //const [score, setScore] = useState(0);
  const [cards, setCards] = useState([]);

  const initCards = (data) => {
    const newCards = [];
    data.forEach(image => newCards.push({
      url: image.images.original.url,
      id: uuid(),
    }));
    setCards(newCards);
  }

  const shuffleCards = () => {
    const newCards = [...cards];
    console.log('hi');
    for(let i=0; i<cards.length; ++i) {
      const newIndex = Math.floor(Math.random() * 10);
      const temp = newCards[newIndex];
      newCards[newIndex] = newCards[i];
      newCards[i] = temp;
    }
    setCards(newCards);
  }

  useEffect(() => {
    fetch('https://api.giphy.com/v1/gifs/search?api_key=ndL1whSGZHgorsl8l004DJCwEVZhl21T&q=cat&limit=10', {mode: 'cors'})
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        initCards(response.data);
      });
  }, []);

  return (
    <div className='cards'>
      {cards.map(card =>
        <img
          className='card'
          src={card.url} 
          key={card.id} 
          width='256px' 
          height='256px'
          onClick={shuffleCards}
        />)
      }
    </div>
  );
}

export default App
