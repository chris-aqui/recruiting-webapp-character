import { useEffect, useState } from 'react';
import { calculateModifier } from '../utils/calculateModifier';

const SkillItem = ({
	attributes,
	skills,
	points,
	skillName,
	skillAttributeModifier,
	skillIncrementSkill,
	skillDecrementSkill
}) => {

	const [skillPoint, setSkillPoint] = useState(skills[skillName] || 0);
	const [modifier, setModifier] = useState(calculateModifier(attributes, skillAttributeModifier));
	const [total, setTotal] = useState(points + calculateModifier(attributes, skillAttributeModifier));

	useEffect(() => {
		setModifier(calculateModifier(attributes, skillAttributeModifier));
		setTotal(skillPoint + modifier);
	}, [skillPoint, attributes, skillAttributeModifier, modifier]);

	return (
		<div className='p-1'>
			<div>{skillName}: {skillPoint}</div>
			<div>(Modifier: {skillAttributeModifier}): {modifier}</div>
			<span>Total: {total}</span>
			<div>
				<button
					type="button"
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => { skillIncrementSkill(skillName); setSkillPoint(skillPoint + 1); }}
				>
					+
				</button>
				<button
					type="button"
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => { skillDecrementSkill(skillName); setSkillPoint(skillPoint - 1); }}
				>
					-
				</button>
			</div>
		</div>
	);
}

export default SkillItem;
