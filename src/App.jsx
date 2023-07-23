import './App.css';
import PropTypes from 'prop-types';
import { CLASS_LIST } from './consts.js';
import React from 'react';
import CharacterSheet from './components/CharacterSheet';
import { useCharacter } from './contexts/CharactersContext';

// App is the main functional component of the application.
// It uses the useCharacter hook to get the saveCharacters function from the CharactersContext.
function App() {
  const { saveCharacters } = useCharacter();

  return (
    <div className="App">
      <header className="App-header text-center px-2 py-2 md:px-4 md:py-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl">React Coding Exercise </h1>
      </header>
      <section className='App-section px-4 py-2 md:px-4 md:py-4' >
        <button
          type="button"
          aria-label="Save Character"
          className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={saveCharacters}
        >
          Save Character
        </button>
        <button
          type="button"
          aria-label="Add Character"
          className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            console.log('Add Character')
            // TODO: Add Character
          }}
        >
          Add Character
        </button>
      </section>
      <CharacterSheet
        defaultClassList={CLASS_LIST}
      />
    </div>
  );
}

// PropTypes for the App component
App.propTypes = {
  defaultClassList: PropTypes.shape({
    Strength: PropTypes.number,
    Dexterity: PropTypes.number,
    Constitution: PropTypes.number,
    Intelligence: PropTypes.number,
    Wisdom: PropTypes.number,
    Charisma: PropTypes.number,
  })
};

export default App;
