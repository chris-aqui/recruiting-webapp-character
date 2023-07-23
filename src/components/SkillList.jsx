import React from 'react';
import { useCharacter } from '../contexts/CharactersContext';
import SkillItem from './SkillItem';
import { calculateModifier } from '../utils/calculateModifier';


const SkillList = ({ character }) => {
	const { incrementSkill, decrementSkill } = useCharacter();
	const totalAvailablePoints = 10 + 4 * calculateModifier(character.attributes, 'intelligence');



	return (
		<div id='AttributeList' className="container mx-auto block max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<h2 className='text-1xl font-bold dark:text-white'>Skills</h2>
			<h5 className='text-1xl font-bold dark:text-white'>Total skill points available: {totalAvailablePoints}</h5>

			{Object.keys(character.skills).map((skillName) => {
				const skill = character.skills[skillName];
				return (
					<SkillItem
						id={`skill-${skillName}`}
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
export default SkillList;