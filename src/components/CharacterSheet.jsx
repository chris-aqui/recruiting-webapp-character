import React from 'react';
import PropTypes from 'prop-types';
import { useCharacter } from '../contexts/CharactersContext';
import Attributes from './Attributes';
import Classes from './Classes';
import SkillList from './SkillList';

const CharacterSheet = ({ defaultClassList }) => {
	// Using the useCharacter hook to get the characters, incrementAttribute, and decrementAttribute from the CharactersContext
	const { characters, incrementAttribute, decrementAttribute } = useCharacter();

	// Error handling: if any required props are missing, render an error message
	// TODO add error boundary component
	if (!defaultClassList || !characters || !incrementAttribute || !decrementAttribute) {
		return <div>Error: Invalid props</div>;
	}

	return (
		<div aria-label="Character Sheet">
			{characters.map((character, index) => {
				return (
					<div key={`${character.characterName}-index-${index}`} className='border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' >
						<h2 className='App-section' >Character Name: {character.characterName}</h2>
						<section
							className="App-section grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 py-2 md:px-4 md:py-4"
						>
							<Attributes
								characterAttribute={character.attributes}
								characterModifier={character.modifiers}
								incrementAttribute={incrementAttribute}
								decrementAttribute={decrementAttribute}
								character={character}
							/>
							<Classes
								defaultClassList={defaultClassList}
								characterAttribute={character.attributes}
							/>
							<SkillList
								character={character}
							/>
						</section>
					</div>
				);
			})}
		</div>
	);
};

// PropTypes for the CharacterSheet component
CharacterSheet.propTypes = {
	defaultClassList: PropTypes.shape({
		Strength: PropTypes.number,
		Dexterity: PropTypes.number,
		Constitution: PropTypes.number,
		Intelligence: PropTypes.number,
		Wisdom: PropTypes.number,
		Charisma: PropTypes.number,
	})
};

export default CharacterSheet;
