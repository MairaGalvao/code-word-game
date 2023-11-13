import React, { useContext, useReducer, useEffect } from 'react';
import '../Styles/crossword.css'

const ThemeContext = React.createContext({
  theme: 'light',
  dispatchTheme: (() => {}) as React.Dispatch<{ type: string }>,
});

const themeReducer = (state: string, action: { type: string }): string => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
};

const initialThemeState = 'light';

const Crossword = () => {
  const [theme, dispatchTheme] = useReducer(themeReducer, initialThemeState);

  const getRandomNumber = () => Math.floor(Math.random() * 6) + 1;

  const generateCrosswordGrid = () => {
    const crosswordGrid = [];
    for (let i = 0; i < 15; i++) {
      const row = [];
      for (let j = 0; j < 15; j++) {
        const isBlackSquare = getRandomNumber() === 1; 
        row.push({
          id: i * 15 + j + 1,
          isBlackSquare,
        });
      }
      crosswordGrid.push(row);
    }
    return crosswordGrid;
  };


  const [crosswordGrid, setCrosswordGrid] = React.useState(generateCrosswordGrid());

  useEffect(() => {
    setCrosswordGrid(generateCrosswordGrid());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, dispatchTheme }}>
      <div className={`crossword crossword-${theme}`}>
        {crosswordGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="crossword-row">
            {row.map(({ id, isBlackSquare }, columnIndex) => (
              <div
                key={columnIndex}
                className={`crossword-square ${isBlackSquare ? 'black-square' : ''}`}
              >
                {!isBlackSquare && <div className="square-id">{id}</div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ThemeContext.Provider>
  );
};

export default Crossword;
