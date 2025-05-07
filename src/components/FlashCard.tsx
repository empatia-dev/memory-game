import { useEffect, useState } from "react";

type Props = {
  question: string;
  answer: string;
  stayFlipped: boolean;
  flipCounter: () => void;
  resetCard: number;
  canFlip: boolean
};

function FlashCard({ question, answer, stayFlipped, flipCounter, resetCard, canFlip }: Props) {
  const [frontSide, setFrontSide] = useState(true);

  // flip cards to frontside once
  // 'resetCard' is triggered
  useEffect(() => {
    setFrontSide(true);
  }, [resetCard]);

  return (
    <div
      className={`flash-card ${!frontSide || stayFlipped ? "flipped" : ""}`}
      onClick={() => {
        if (canFlip) {
          setFrontSide(false);
          flipCounter();
        }
        }
      }
    >
      <div className="flash-card-inner">
        <div className="flash-card-front">
          <p>{question}</p>
        </div>
        <div className="flash-card-back">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;