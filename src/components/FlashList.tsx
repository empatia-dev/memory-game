import { useEffect, useState } from "react";
import FlashCard from "./FlashCard";
import Button from "./Button";
import { Flashcard } from "../types/Flashcard";

type Props = {
  flashCards: Flashcard[];
  onMatch: (flippedCards: number[]) => void;
  triggerResetCounter: number;
  handleClick: () => void;
  resetGame: () => void;
};

function FlashList({ flashCards, onMatch, triggerResetCounter, handleClick, resetGame } : Props) {

  const [counter, setCounter] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);

  function updateCounter(index: number) {
    // only update the counter if the card
    // tapped/clicked is not already flipped
    if (
      flippedCards.includes(index) ||
      flashCards[index].stayFlipped
    ) return;
    setFlippedCards([...flippedCards, index]);
    setCounter((prev) => prev + 1);
    
  }

  // trigger the reset useEffect inside
  // FlashCard.tsx by changing the 'resetCounter'
  useEffect(() => {
    setResetCounter(prev => prev + 1);
  }, [triggerResetCounter])

  useEffect(() => {
    // Whenever two cards have been flipped,
    // compare them to see if they match.
    // If they do match send their indexes
    // to the parent so that we can set
    // their 'stayFlipped' attribute to true 
    if (counter === 2) {
      setCanFlip(false);
  
      const [first, second] = flippedCards;
      const flipped1 = flashCards[first].answer;
      const flipped2 = flashCards[second].answer;
    
      const isMatch = flipped1 === flipped2;
    
      if (isMatch) {
        onMatch([first, second]);
        setCanFlip(true);
      } else {
        setTimeout(() => {
          setResetCounter(prev => prev + 1);
          setCanFlip(true);
        }, 800);
      }
    
      setCounter(0);
      setFlippedCards([]);
    }
  }, [counter, flashCards, flippedCards, onMatch]);


    return <div className='cards-list'>
    {flashCards.map((flashcard, index) =>
        <FlashCard
          key={index}
          question={flashcard.question}
          answer={flashcard.answer}
          stayFlipped={flashcard.stayFlipped}
          flipCounter={() => {
            updateCounter(index);
          }}
          resetCard={resetCounter}
          canFlip={canFlip}
        />
    )
    }
    <div className='button-container buttons-placement'>
          <Button
          symbol={"Edit"}
          handleClick={handleClick}
          />
          <Button
          symbol={"Reset"}
          handleClick={resetGame}
          />
        </div>
    </div>;
}

export default FlashList;