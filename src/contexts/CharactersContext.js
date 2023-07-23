import React, { createContext, useState, useContext, useEffect } from 'react';
import { calculateModifier } from '../utils/calculateModifier.js';

const CharacterContext = createContext();

export function useCharacter() {
	return useContext(CharacterContext);
}

export function CharacterProvider({ children }) {
	const [characters, setCharacters] = useState([
		{
			characterName: 'character_1',
			totalPoints: 18,
			attributes: {
				strength: 10,
				dexterity: 10,
				constitution: 10,
				intelligence: 10,
				wisdom: 10,
				charisma: 10,
			},
			modifiers: {},
			skills: {
				"Acrobatics": {
					"points": 0,
					"attributeModifier": "Dexterity"
				},
				"Animal Handling": {
					"points": 0,
					"attributeModifier": "Wisdom"
				},
				"Arcana": {
					"points": 0,
					"attributeModifier": "Intelligence"
				},
				"Athletics": {
					"points": 0,
					"attributeModifier": "Strength"
				},
				"Deception": {
					"points": 0,
					"attributeModifier": "Charisma"
				},
				"History": {
					"points": 0,
					"attributeModifier": "Intelligence"
				},
				"Insight": {
					"points": 0,
					"attributeModifier": "Wisdom"
				},
				"Intimidation": {
					"points": 0,
					"attributeModifier": "Charisma"
				},
				"Investigation": {
					"points": 0,
					"attributeModifier": "Intelligence"
				},
				"Medicine": {
					"points": 0,
					"attributeModifier": "Wisdom"
				},
				"Nature": {
					"points": 0,
					"attributeModifier": "Intelligence"
				},
				"Perception": {
					"points": 0,
					"attributeModifier": "Wisdom"
				},
				"Performance": {
					"points": 0,
					"attributeModifier": "Charisma"
				},
				"Persuasion": {
					"points": 0,
					"attributeModifier": "Charisma"
				},
				"Religion": {
					"points": 0,
					"attributeModifier": "Intelligence"
				},
				"Sleight of Hand": {
					"points": 0,
					"attributeModifier": "Dexterity"
				},
				"Stealth": {
					"points": 0,
					"attributeModifier": "Dexterity"
				},
				"Survival": {
					"points": 0,
					"attributeModifier": "Wisdom"
				},
			},
		},
	]);

	const [characterModifiers, setCharacterModifiers] = useState(() => {
		return characters.map((character) => {
			const newModifiers = {};
			for (const attribute in character.attributes) {
				newModifiers[attribute] = calculateModifier(
					character.attributes,
					attribute
				);
			}
			return { ...character, modifiers: newModifiers };
		});
	});

	useEffect(() => {
		// Calculate the modifiers whenever characters change
		const newCharacterModifiers = characters.map((character) => {
			const newModifiers = {};
			for (const attribute in character.attributes) {
				newModifiers[attribute] = calculateModifier(
					character.attributes,
					attribute
				);
			}
			return { ...character, modifiers: newModifiers };
		});

		// Update the characterModifiers state
		setCharacterModifiers(newCharacterModifiers);
	}, [characters]);

	const incrementAttribute = (characterName, attribute) => {
		const newCharacters = characters.map((character) => {
			if (character.characterName === characterName) {
				return {
					...character,
					attributes: {
						...character.attributes,
						[attribute]: character.attributes[attribute] + 1,
					},
					modifiers: {
						...character.modifiers,
						[attribute]: calculateModifier(
							character.attributes,
							attribute
						),
					}
				};
			}
			return character;
		});
		setCharacters(newCharacters);
	};

	const decrementAttribute = (characterName, attribute) => {
		const newCharacters = characters.map((character) => {
			if (character.characterName === characterName) {
				return {
					...character,
					attributes: {
						...character.attributes,
						[attribute]: Math.max(
							0,
							character.attributes[attribute] - 1
						),
					}, modifiers: {
						...character.modifiers,
						[attribute]: calculateModifier(
							character.attributes,
							attribute
						),
					}
				};
			}
			return character;
		});
		setCharacters(newCharacters);
	};

	const incrementSkill = (characterName, skill) => {
		const newCharacters = characters.map((character) => {
			if (character.characterName === characterName) {
				if (character.totalPoints > 0) {
					return {
						...character,
						skills: {
							...character.skills,
							[skill]: {
								"points": (character.skills[skill] || { "points": 0 }).points + 1,
								"attributeModifier": character.skills[skill].attributeModifier
							},
						},
						totalPoints: character.totalPoints - 1,
					};
				}
			}
			return character;
		});
		setCharacters(newCharacters);
	};

	const decrementSkill = (characterName, skill) => {
		const newCharacters = characters.map((character) => {
			if (character.characterName === characterName) {
				if ((character.skills[skill] || { "points": 0 }).points > 0) {
					return {
						...character,
						skills: {
							...character.skills,
							[skill]: {
								"points": character.skills[skill].points - 1,
								"attributeModifier": character.skills[skill].attributeModifier
							},
						},
						totalPoints: character.totalPoints + 1,
					};
				}
			}
			return character;
		});
		setCharacters(newCharacters);
	};

	const gitHubName = 'christine-aqui';
	const API_URL = `https://recruiting.verylongdomaintotestwith.ca/api/${gitHubName}/character`;
	// Fetch the characters from API when the component mounts
	useEffect(() => {
		fetch(API_URL)
			.then(response => response.json())
			.then(data => {
				setCharacters(data.body)
			})
			.catch(error => console.error('Error:', error));
	}, []);

	// Save function to save characters to API
	const saveCharacters = () => {
		fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(characters),
		})
			.then(response => response.json())
			.then(data => console.log('Success:', data))
			.catch((error) => {
				console.error('Error:', error);
			});
	}

	return (
		<CharacterContext.Provider
			value={{
				characters: characterModifiers,
				incrementAttribute,
				decrementAttribute,
				incrementSkill,
				decrementSkill,
				saveCharacters,
			}}
		>
			{children}
		</CharacterContext.Provider>
	);
}
