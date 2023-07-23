import React from 'react';
import { useCharacter } from '../contexts/CharactersContext';
import Attributes from './Attributes';
import Classes from './Classes';
import SkillList from './SkillList';

const CharacterSheet = ({ defaultClassList }) => {
	const { characters, incrementAttribute, decrementAttribute } = useCharacter();

	return (
		<div>
			{characters.map((character, index) => {
				return (
					<section
						key={`${character.characterName}-index-${index}`}
						className="App-section grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 py-2 md:px-4 md:py-4"
					>
						<Attributes
							id={`${character.characterName}-index-${index}`}
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
				);
			})}
		</div>
	);
};

export default CharacterSheet;
