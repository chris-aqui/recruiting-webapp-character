import './App.css';
import { CLASS_LIST } from './consts.js';
import React from 'react';
import CharacterSheet from './components/CharacterSheet';
import { useCharacter } from './contexts/CharactersContext';


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
          className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={saveCharacters}
        >
          Save Character
        </button>
      </section>
      <CharacterSheet
        defaultClassList={CLASS_LIST}
      />
    </div>
  );
}

export default App;
