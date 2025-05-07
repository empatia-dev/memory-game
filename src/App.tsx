import { useState } from 'react';
import './App.css';
import FlashList from './components/FlashList.tsx';
import FlashForm from './components/FlashForm.tsx';
import { Flashcard } from './types/Flashcard.tsx';

function App() {

  const symbols = "🍒🌸🍉🥑🍌🥥🍑🫐🍇🥕";

  function turnEmojisIntoFlashCards(emojis: string) {
    const emojiArray = Array.from(emojis);  
    const singleCards: Flashcard[] = emojiArray.map((emoji) => ({ question: "Game", answer: emoji, stayFlipped: false  }));
    const unshuffledCards: Flashcard[] = [...singleCards, ...singleCards];
    return shuffleArray(unshuffledCards);
  }


  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const shuffledArray = turnEmojisIntoFlashCards(symbols);
  
  const [flashCards, setFlashCards] = useState<Flashcard[]>(shuffledArray);
  const [showForm, setShowForm] = useState(false);
  const [triggerReset, setTriggerReset] = useState(0);
  const [currentSymbols, setCurrentSymbols] = useState(symbols);

  function showFlashForm() {
    setShowForm(true);
  }

  function hideFlashForm() {
    setShowForm(false);
  }

  // after changing the emojis on the form
  // update flashCards array with new shuffled cards
  function updateEmojis(emojis: string) {
    const newCards = turnEmojisIntoFlashCards(emojis);
    setFlashCards(newCards);
    setShowForm(false);
    resetGame();
    setCurrentSymbols(emojis);
  }

  // set all cards 'stayFlipped' to false,
  // and set 'frontSide' to true on all
  // FlashCard components (useEffect)
  function resetGame() {
    setTriggerReset((prev) => prev + 1);
    setFlashCards((prev) => prev.map((card) => ({ ...card, stayFlipped: false })));
    setTimeout(() => {
      setFlashCards((prev) => shuffleArray(prev));
    }, 600);
    
  }
 
  // once two flipped cards are the same,
  // update their 'stayFlipped' attribute
  // to true.
  function onMatch(matchedIndices: number[]) {
    const updated = flashCards.map((card, i) => {
      if (matchedIndices.includes(i)) {
        return { ...card, stayFlipped: true };
      }
      return card;
    });
    setFlashCards(updated);
  }
  
  
  return (
    <div>
      <div>
        <FlashList 
          flashCards={flashCards}
          onMatch={onMatch}
          triggerResetCounter={triggerReset}
          handleClick={showFlashForm}
          resetGame={resetGame}
        />
      </div>
      {showForm && <FlashForm
                      changeEmojis={updateEmojis}
                      hideForm={hideFlashForm}
                      text={currentSymbols}
                      />}     
    </div>

  );
}

export default App;