import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css'
// add score
function App() {
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [cards, setCards] = useState([]);

  const initCards = (data) => {
    const newCards = [];
    data.forEach(image => newCards.push({
      url: image.images.original.url,
      id: uuid(),
    }));
    setCards(newCards);
  }

  const historyRepeats = (id) => {
    for(let i=0; i<history.length; ++i)
      if(history[i] === id) return true;
    return false;
  }

  const processCards = (id) => {
    if(historyRepeats(id)) {
      setScore(0);
      setHistory([]);
    }
    else {
      history.push(id)
      setScore(score + 1);
      setMaxScore(Math.max(maxScore, score + 1));
    }
    shuffleCards();
  }

  const shuffleCards = () => {
    const newCards = [...cards];
    for(let i=0; i<cards.length; ++i) {
      const newIndex = Math.floor(Math.random() * 10);
      const temp = newCards[newIndex];
      newCards[newIndex] = newCards[i];
      newCards[i] = temp;
    }
    setCards(newCards);
  }

  useEffect(() => {
    fetch('https://api.giphy.com/v1/gifs/search?api_key=ndL1whSGZHgorsl8l004DJCwEVZhl21T&q=cat&limit=15', {mode: 'cors'})
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        initCards(response.data);
      });
  }, []);

  return (
    <div id='app'>
      <h1>CAT CARDZ</h1>
      <h2>Score: {score} Max Score: {maxScore}</h2>
      <div className='cards'>
        {cards.map(card =>
          <img
            className='card'
            src={card.url} 
            key={card.id} 
            width='256px' 
            height='256px'
            onClick={() => processCards(card.id)}
          />)
        }
      </div>
    </div>
  );
}

export default App
