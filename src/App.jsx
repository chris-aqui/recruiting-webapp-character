import './App.css';
import Attributes from './components/Attributes';
import Classes from './components/Classes';
import SkillList from './components/SkillList';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { CharacterProvider } from './contexts/CharactersContext';

function App() {
  return (
    <div className="App">
      <CharacterProvider>
        <header className="App-header text-center px-2 py-2 md:px-4 md:py-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl">React Coding Exercise =] </h1>
        </header>
        <section className="App-section grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 py-2 md:px-4 md:py-4">
          <Attributes defaultAttributeList={ATTRIBUTE_LIST} />
          <Classes defaultClassList={CLASS_LIST} />
          <SkillList defaultSkillList={SKILL_LIST} />
        </section>
      </CharacterProvider>
    </div>
  );
}

export default App;
