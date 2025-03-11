import { useState } from 'react'
import './App.css'

const phrase = "Proteger\u00A0e\u00A0expandir\u00A0x800,\u00A0crescer\u00A0fora\u00A0de\u00A0Sao\u00A0Paulo\u00A0e\u00A0vencer\u00A0em\u00A0OMS\u00A0e\u00A0NGS";
const visibleChars = ["8", "0", ",", " "]; // Caracteres visíveis desde o início

function App() {
  const [displayedWord, setDisplayedWord] = useState(
    phrase.split("").map((char) => (visibleChars.includes(char) ? char : char === "\u00A0" ? "\u00A0\u00A0" : "_"))
  );
  const [wrongLetters, setWrongLetters] = useState([]);
  const [inputLetter, setInputLetter] = useState("");
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleCheckLetter = () => {
    if (inputLetter.length !== 1 || !/[a-zA-Zá-úÁ-Ú]/.test(inputLetter)) return;
    
    const letter = inputLetter.toLowerCase();
    if (phrase.toLowerCase().includes(letter)) {
      const newDisplayedWord = displayedWord.map((char, index) =>
        phrase[index].toLowerCase() === letter ? phrase[index] : char
      );
      setDisplayedWord(newDisplayedWord);
      if (!newDisplayedWord.includes("_")) {
        setGameCompleted(true);
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters([...wrongLetters, letter]);
      }
    }
    setInputLetter("");
  };

  const restartGame = () => {
    setDisplayedWord(
      phrase.split("").map((char) => (visibleChars.includes(char) ? char : char === "\u00A0" ? "\u00A0\u00A0" : "_"))
    );
    setWrongLetters([]);
    setGameCompleted(false);
  };

  return (
    <div className="game-container">
      <h1 className="title">Molecular 2025</h1>
      <p className="word-display">{displayedWord.join(" ")}</p>
      <input
        type="text"
        maxLength="1"
        value={inputLetter}
        onChange={(e) => setInputLetter(e.target.value)}
      />
      <button onClick={handleCheckLetter}>Verificar Letra</button>
      {wrongLetters.length > 0 && (
        <div className="wrong-letters">
          Letras Erradas: {wrongLetters.join(", ")}
        </div>
      )}
      {gameCompleted && (
        <div className="popup">
          <p>Parabéns! Você completou o desafio!</p>
          <p>{phrase}</p>
          <button onClick={restartGame}>Reiniciar Jogo</button>
        </div>
      )}
    </div>
  );
}

export default App
