import { useState, useRef } from "react";
import Button from "./Button";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: </span>
        {score}
      </p>
      <h1>Adivinhe a palavra: </h1>
      <h3 className="tip">
        Dicas sobre a palavra:<span> {pickedCategory.toUpperCase()}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas.</p>
      <div className="wordContainer">
        {letters.map((char, i) =>
          guessedLetters.includes(char) ? (
            <span key={i} className="letter">
              {char}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            pattern="[a-zA-Z]{1}"
            title="Digite apenas uma letra"
            onChange={(e) => setLetter(e.target.value.toLowerCase())}
            required
            value={letter}
            ref={letterInputRef}
          />
          <Button type="submit">Jogar!</Button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas: </p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
