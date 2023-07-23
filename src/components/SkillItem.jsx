import { useEffect, useState } from 'react';
import { calculateModifier } from '../utils/calculateModifier';

const SkillItem = ({
	skill,
	skillName,
	skillAttributeModifier,
	skillIncrementSkill,
	skillDecrementSkill,
	characterName,
	characterAttribute,
}) => {


	const [skillPoint, setSkillPoint] = useState(skill.points || 0);
	const [modifier, setModifier] = useState(calculateModifier(characterAttribute, skill.attributeModifier));
	const [total, setTotal] = useState(skill.points + calculateModifier(characterAttribute, skill.attributeModifier));

	useEffect(() => {
		setModifier(calculateModifier(characterAttribute, skillAttributeModifier));
		setTotal(skillPoint + modifier);
	}, [skillPoint, characterAttribute, skillAttributeModifier, modifier]);




	return (
		<div className='p-1'>
			<div>{skillName}: {skillPoint}</div>
			<div>(Modifier: {skillAttributeModifier}): {modifier}</div>
			<span>Total: {total}</span>
			<div>
				<button
					type="button"
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => { skillIncrementSkill(characterName, skillName); setSkillPoint(skillPoint + 1); }}
				>
					+
				</button>
				<button
					type="button"
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => { skillDecrementSkill(characterName, skillName); setSkillPoint(skillPoint - 1); }}
				>
					-
				</button>
			</div>
		</div>
	);
}

export default SkillItem;
