import "./App.css";

import { wordsList } from "./data/Words.jsx";
import StartScreen from "./components/StartScreen";
import Temas from "./components/Temas";
import Game from "./components/Game";
import GameOver from "./components/GamerOver.jsx";
import { useCallback, useEffect, useState } from "react";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPikedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  },[words]);

  const startGame = useCallback(() => {
    clearLetterStates();
    setGuesses(guessesQty);

    const { word, category } = pickWordAndCategory();

    let wordLetters = word.toLowerCase().split("");

    setPickedWord(word);
    setPikedCategory(category);

    setLetters(wordLetters);
    setGameStage(stages[1].name);
  },[pickWordAndCategory]);

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetter) => [
        ...actualGuessedLetter,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  },[guesses]);

  useEffect(() => {
      
    const uniqueLetters = [...new Set(letters)];

    if (uniqueLetters.length === 0 || guessedLetters.length === 0) return;
    
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => (actualScore + 100));
      console.log("setscore", setScore)
      startGame();
    }
  
  }, [guessedLetters, letters, startGame]);

  const retry = () => {
    setGuesses(guessesQty);
    setScore(0);
    setGameStage(stages[0].name);
  };

  return (
    <>
      <Temas />
      <div className="App">
        {gameStage === "start" && <StartScreen startGame={startGame} />}
        {gameStage === "game" && (
          <Game
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
          />
        )}
        {gameStage === "end" && <GameOver retry={retry} score={score} />}
      </div>
    </>
  );
}

export default App;
