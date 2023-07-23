import React from 'react';
import PropTypes from 'prop-types';
import { useCharacter } from '../contexts/CharactersContext';
import SkillItem from './SkillItem';
import { calculateModifier } from '../utils/calculateModifier';


const SkillList = ({ character }) => {
	// Using the useCharacter hook to get the incrementSkill and decrementSkill functions from the CharactersContext
	const { incrementSkill, decrementSkill } = useCharacter();

	// error handling
	if (!character || !character.skills || !character.attributes) {
		return <div>Error: Invalid character prop</div>;
	}

	// Calculating the total available points based on the character's intelligence attribute
	const totalAvailablePoints = 10 + 4 * calculateModifier(character.attributes, 'intelligence');

	return (
		<div id='AttributeList' className="container mx-auto block max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" aria-label="Skill List">
			<h2 className='text-1xl font-bold dark:text-white'>Skills</h2>
			<h5 className='text-1xl font-bold dark:text-white'>Total skill points available: {totalAvailablePoints}</h5>

			{Object.keys(character.skills).map((skillName) => {
				const skill = character.skills[skillName];
				return (
					<SkillItem
						key={`${skillName}-skill`}
						skill={skill}
						skillName={skillName}
						characterAttribute={character.attributes}
						skillAttributeModifier={skill.attributeModifier}
						skillIncrementSkill={incrementSkill}
						skillDecrementSkill={decrementSkill}
						characterName={character.characterName}
					/>
				)
			})}
		</div>
	)
}

SkillList.propTypes = {
	character: PropTypes.shape({
		skills: PropTypes.object.isRequired,
		attributes: PropTypes.object.isRequired,
		characterName: PropTypes.string.isRequired,
	}).isRequired,
};

export default SkillList;