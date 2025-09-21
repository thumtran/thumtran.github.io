import React, { useState, useEffect } from 'react';

const wordList = [
  "ABACK", "ABASE", "ABATE", "ABBEY", "ABBOT", "ABHOR", "ABIDE", "ABLED", "ABODE", "ABORT",
  "ABOUT", "ABOVE", "ABUSE", "ACUTE", "ADMIT", "AHEAD", "ALOFT", "ALPHA", "ALONG", "ALTER",
  "AMBER", "AMPLY", "AMUSE", "ANGEL", "ANGRY", "APART", "APPLE", "APPLY", "ARENA", "ARGUE",
  "AROSE", "ASIDE", "ASSET", "AVERT", "AWARD", "AWARE", "AWFUL", "AXIOM", "AZURE", "BAKER",
  "BALSA", "BANAL", "BARRY", "BATCH", "BATHS", "BELOW", "BENCH", "BLACK", "BLAME", "BLIMP",
  "BLOCK", "BLOND", "BOARD", "BOAST", "BOGGY", "BRAIN", "BREAD", "BRICK", "BRIDE", "BROWN",
  "BUDGE", "BULLY", "BUNCH", "BURST", "CABAL", "CABLE", "CANDY", "CANOE", "CATER", "CAUSA",
  "CHASE", "CHEAT", "CHECK", "CHEST", "CHEST", "CHIEF", "CHILD", "CHILL", "CHOKE", "CHORE",
  "CIVIC", "CLASH", "CLEAN", "CLEAR", "CLIMB", "CLOSE", "COACH", "COAST", "COLOR", "CRAZY",
  "CREAM", "CRISP", "CROWN", "CRUDE", "CRUSH", "CUBIC", "CYCLE", "DANCE", "DEATH", "DECOR",
  "DREAM", "DRINK", "DRIVE", "EAGER", "EARTH", "EASEL", "EATEN", "ELBOW", "ELDER", "EQUAL",
  "ERROR", "EVENT", "EXACT", "EXIST", "EXTRA", "FABLE", "FANCY", "FIGHT", "FINAL", "FIRST",
  "FOCUS", "FORCE", "FORUM", "FOUND", "FROWN", "FROZE", "FUNKY", "GAMMA", "GLORY", "GRACE",
  "GRAND", "GRAPE", "GRAVE", "GREAT", "GREEN", "GROWN", "GUESS", "GUIDE", "HASTE", "HEART",
  "HEAVY", "HELLO", "HENCE", "HORSE", "HOVER", "HUMID", "HUMOR", "IDEAL", "IMPLY", "INFER",
  "INPUT", "IRONY", "JOKER", "JUDGE", "KNIFE", "LADLE", "LATER", "LEAFY", "LEAVE", "LEMON",
  "LIGHT", "LIMIT", "LUCKY", "MAGIC", "MAIZE", "MAKER", "MARRY", "MASON", "MAYBE", "MERGE",
  "MIGHT", "MINCE", "MODEL", "MOIST", "MONEY", "MORAL", "MOTOR", "MOUNT", "MOUSE", "MOVIE",
  "NASTY", "NEEDY", "NEVER", "NIGHT", "NINTH", "NOBLE", "NOISY", "NORTH", "OCEAN", "OFTEN",
  "OLIVE", "ORDER", "OTHER", "OUGHT", "OWNER", "PAINT", "PANIC", "PARTY", "PEACE", "PENCE",
  "PHONE", "PHOTO", "PIANO", "PILOT", "PITCH", "PLANT", "PLAZA", "POINT", "POWER", "PRESS",
  "PRIDE", "PRIME", "PROBE", "PROXY", "PULSE", "PUNCH", "PUPIL", "PUPPY", "PURGE", "QUEEN",
  "QUICK", "QUIET", "QUOTA", "RADIO", "RAISE", "READY", "REFER", "RENEW", "REPEL", "REPLY",
  "RIGHT", "RIVER", "ROBOT", "ROUGH", "ROUND", "ROYAL", "RURAL", "SADLY", "SAVOR", "SCARY",
  "SCENE", "SCOPE", "SCORE", "SENSE", "SERVE", "SEVEN", "SHAKE", "SHARP", "SHEET", "SHELF",
  "SHIFT", "SHINE", "SHIRT", "SHOOT", "SHORT", "SICKL", "SIGHT", "SIXTH", "SKIRT", "SLAVE",
  "SLEEP", "SLIDE", "SMALL", "SMASH", "SMILE", "SMOKE", "SNAKE", "SOBER", "SOLID", "SOLVE",
  "SOUND", "SOUTH", "SPACE", "SPARE", "SPELL", "SPEND", "SPIKE", "SPITE", "SPLIT", "STAFF",
  "STAND", "START", "STATE", "STILL", "STOCK", "STONE", "STORE", "STORY", "STRIP", "STUDY",
  "STYLE", "SUGAR", "SUITE", "TABLE", "TASTE", "TAXIS", "TEACH", "TIGER", "TITLE", "TODAY",
  "TOWEL", "TOXIC", "TRICK", "TREAT", "TRUTH", "TWAIN", "TWICE", "UNDER", "UNITY", "UNTIL",
  "UPSET", "URINE", "USURY", "VALID", "VITAL", "VIVID", "VOICE", "VOTER", "WAIST", "WASTE",
  "WATCH", "WATER", "WEARY", "WEIGH", "WHALE", "WHEAT", "WHEEL", "WHICH", "WHILE", "WHITE",
  "WHOLE", "WIDOW", "WORLD", "WORRY", "WORTH", "WOULD", "WRECK", "WRONG", "YACHT", "YIELD",
  "YOUNG", "YUMMY", "ZEBRA", "ZEROE"
];

const App = () => {
  const [solution, setSolution] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [keyboardColors, setKeyboardColors] = useState({});

  useEffect(() => {
    // Pick a new word on component mount
    resetGame();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver) return;

      if (e.key === 'Enter') {
        if (currentGuess.length === 5) {
          handleGuess();
        } else {
          setMessage('Guess must be 5 letters!');
        }
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess(prev => prev + e.key.toUpperCase());
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, isGameOver]);

  const resetGame = () => {
    const newSolution = wordList[Math.floor(Math.random() * wordList.length)];
    setSolution(newSolution);
    setGuesses([]);
    setCurrentGuess('');
    setMessage('');
    setIsGameOver(false);
    setKeyboardColors({});
  };

  const handleGuess = () => {
    const guess = currentGuess.toUpperCase();
    if (!wordList.includes(guess)) {
      setMessage("Not a valid word");
      return;
    }

    const newGuesses = [...guesses, guess];
    setGuesses(newGuesses);
    setCurrentGuess('');
    setMessage('');

    const newKeyboardColors = { ...keyboardColors };
    const solutionLetters = solution.split('');
    const solutionCopy = [...solutionLetters];

    // First pass for correct (green) letters
    const correctLetters = [];
    guess.split('').forEach((letter, i) => {
      if (letter === solutionLetters[i]) {
        correctLetters[i] = letter;
        newKeyboardColors[letter] = 'bg-green-500';
        solutionCopy[i] = null; // Mark as used
      }
    });

    // Second pass for misplaced (yellow) and incorrect (gray)
    guess.split('').forEach((letter, i) => {
      if (!correctLetters[i]) {
        if (solutionCopy.includes(letter)) {
          newKeyboardColors[letter] = newKeyboardColors[letter] === 'bg-green-500' ? 'bg-green-500' : 'bg-yellow-500';
          const index = solutionCopy.indexOf(letter);
          solutionCopy[index] = null; // Mark as used
        } else {
          newKeyboardColors[letter] = newKeyboardColors[letter] === 'bg-green-500' || newKeyboardColors[letter] === 'bg-yellow-500'
            ? newKeyboardColors[letter]
            : 'bg-gray-500';
        }
      }
    });

    setKeyboardColors(newKeyboardColors);

    if (guess === solution) {
      setMessage('You won!');
      setIsGameOver(true);
    } else if (newGuesses.length === 6) {
      setMessage(`Game over! The word was ${solution}.`);
      setIsGameOver(true);
    }
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < 6; i++) {
      const row = [];
      const currentGuessRow = i === guesses.length;
      const word = currentGuessRow ? currentGuess : guesses[i] || '';

      for (let j = 0; j < 5; j++) {
        const letter = word[j] || '';
        let bgColor = 'bg-gray-800';
        let borderColor = 'border-gray-500';

        if (i < guesses.length) {
          if (letter === solution[j]) {
            bgColor = 'bg-green-500';
          } else if (solution.includes(letter)) {
            bgColor = 'bg-yellow-500';
          } else {
            bgColor = 'bg-gray-500';
          }
          borderColor = 'border-gray-500';
        } else if (currentGuessRow) {
          bgColor = letter ? 'bg-gray-800' : 'bg-gray-900';
          borderColor = letter ? 'border-gray-400' : 'border-gray-700';
        }

        row.push(
          <div
            key={j}
            className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-3xl font-bold uppercase rounded-lg border-2
                        ${bgColor} ${borderColor} transition-all duration-300 transform scale-100 `}
          >
            {letter}
          </div>
        );
      }
      grid.push(
        <div key={i} className="flex gap-2 mb-2 justify-center">
          {row}
        </div>
      );
    }
    return grid;
  };

  const renderKeyboard = () => {
    const keys = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
    ];

    const handleKeyClick = (key) => {
      if (isGameOver) return;
      if (key === 'ENTER') {
        if (currentGuess.length === 5) {
          handleGuess();
        } else {
          setMessage('Guess must be 5 letters!');
        }
      } else if (key === '⌫') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else {
        if (currentGuess.length < 5) {
          setCurrentGuess(prev => prev + key);
        }
      }
    };

    return (
      <div className="flex flex-col gap-2 mt-4 select-none">
        {keys.map((row, i) => (
          <div key={i} className="flex gap-1 sm:gap-2 justify-center">
            {row.map((key) => {
              const keyColor = keyboardColors[key] || 'bg-gray-700 hover:bg-gray-600';
              const isWideKey = key === 'ENTER' || key === '⌫';
              return (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={`flex-1 ${isWideKey ? 'min-w-[4rem] sm:min-w-[5rem]' : 'w-8 sm:w-12'} h-12 sm:h-14
                              rounded-lg font-bold text-white uppercase text-sm sm:text-base
                              ${keyColor} transition-colors duration-200 focus:outline-none`}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-inter">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <header className="p-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500">WORDLE</h1>
      </header>
      <main className="flex flex-col items-center p-4">
        <div className="max-w-xs sm:max-w-md w-full">
          {renderGrid()}
        </div>
        <div className="mt-4 text-center h-8">
          {message && (
            <div className="text-xl font-semibold text-gray-300">
              {message}
            </div>
          )}
        </div>
        {renderKeyboard()}
        {isGameOver && (
          <button
            onClick={resetGame}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-bold text-lg rounded-full shadow-lg
                       hover:bg-green-700 transition-colors duration-200"
          >
            Play Again
          </button>
        )}
      </main>
    </div>
  );
};

export default App;
