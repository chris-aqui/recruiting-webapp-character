import { useEffect, useState } from 'react';
import { calculateModifier } from '../utils/calculateModifier';
import PropTypes from 'prop-types';

const SkillItem = ({
	skill,
	skillName,
	skillAttributeModifier,
	skillIncrementSkill,
	skillDecrementSkill,
	characterName,
	characterAttribute,
}) => {
	// State variables for the skill point, modifier, and total
	// Initial values are set based on the props
	const [skillPoint, setSkillPoint] = useState(skill.points || 0);
	const [modifier, setModifier] = useState(calculateModifier(characterAttribute, skill.attributeModifier));
	const [total, setTotal] = useState(skill.points + calculateModifier(characterAttribute, skill.attributeModifier));

	// useEffect hook to update the modifier and total whenever the skill point, character attribute, or skill attribute modifier changes
	useEffect(() => {
		setModifier(calculateModifier(characterAttribute, skillAttributeModifier));
		setTotal(skillPoint + modifier);
	}, [skillPoint, characterAttribute, skillAttributeModifier]);

	// error handling
	if (!skill || !characterAttribute || !skillIncrementSkill || !skillDecrementSkill || !characterName) {
		return <div>Error: Invalid props</div>;
	}

	return (
		<div className='p-1'>
			<div>{skillName}: {skillPoint}</div>
			<div>(Modifier: {skillAttributeModifier}): {modifier}</div>
			<span>Total: {total}</span>
			<div>
				<button
					type="button"
					aria-label={`Increase ${skillName}`}
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => { skillIncrementSkill(characterName, skillName); setSkillPoint(skillPoint + 1); }}
				>
					+
				</button>
				<button
					type="button"
					aria-label={`Decrease ${skillName}`}
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => { skillDecrementSkill(characterName, skillName); setSkillPoint(skillPoint - 1); }}
				>
					-
				</button>
			</div>
		</div>
	);
}

SkillItem.propTypes = {
	skill: PropTypes.object.isRequired,
	skillName: PropTypes.string.isRequired,
	skillAttributeModifier: PropTypes.string.isRequired,
	skillIncrementSkill: PropTypes.func.isRequired,
	skillDecrementSkill: PropTypes.func.isRequired,
	characterName: PropTypes.string.isRequired,
	characterAttribute: PropTypes.object.isRequired,
};

export default SkillItem;
