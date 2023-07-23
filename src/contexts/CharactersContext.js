import React, {
	createContext, useState, useContext, useEffect,
} from 'react';
import { calculateModifier } from '../utils/calculateModifier.js';

const CharacterContext = createContext();

export function useCharacter() {
	return useContext(CharacterContext);
}

export function CharacterProvider({ children }) {
	const [attributes, setAttributes] = useState({
		strength: 10,
		dexterity: 10,
		constitution: 10,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	});

	const [skills, setSkills] = useState({
		"Acrobatics": 0,
		"Animal Handling": 0,
		"Athletics": 0,
		"Deception": 0,
		"History": 0,
		"Insight": 0,
		"Intimidation": 0,
		"Investigation": 0,
		"Medicine": 0,
		"Nature": 0,
		"Perception": 0,
		"Performance": 0,
		"Persuasion": 0,
		"Religion": 0,
		"Sleight of Hand": 0,
		"Stealth": 0,
		"Survival": 0,
	});
	const [points, setPoints] = useState(10 + 4 * calculateModifier(attributes, 'intelligence'));

	useEffect(() => {
		setPoints(10 + 4 * calculateModifier(attributes, 'intelligence'));
	}, [attributes.intelligence, attributes]);

	const incrementAttribute = (attribute) => {
		setAttributes({
			...attributes,
			[attribute]: attributes[attribute] + 1,
		});
	};

	const decrementAttribute = (attribute) => {
		setAttributes({
			...attributes,
			[attribute]: Math.max(0, attributes[attribute] - 1),
		});
	};

	const incrementSkill = (skill) => {
		if (points > 0) {
			setSkills({
				...skills,
				[skill]: (skills[skill] || 0) + 1,
			});
			setPoints(points - 1);
		}
	};

	const decrementSkill = (skill) => {
		if (skills[skill] > 0) {
			setSkills({
				...skills,
				[skill]: skills[skill] - 1,
			});
			setPoints(points + 1);
		}
	};


	return (
		<CharacterContext.Provider value={{
			attributes, skills, points, incrementAttribute, decrementAttribute, incrementSkill, decrementSkill,
		}}
		>
			{children}
		</CharacterContext.Provider>
	);
}
