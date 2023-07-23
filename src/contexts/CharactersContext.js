import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';
import { calculateModifier } from '../utils/calculateModifier.js';
import { character } from '../utils/character.js'

// Creating a context for character-related data and functions
// This context will be provided by the CharacterProvider component and can be consumed by any component that needs access to character-related data or functions
const CharacterContext = createContext();

// useCharacter is a custom hook that provides a convenient way for components to consume the CharacterContext
export function useCharacter() {
	return useContext(CharacterContext);
}

// CharacterProvider is a context provider component that provides character-related state and functions to its children.
export function CharacterProvider({ children }) {
	// Initialize characters state with the default character
	const [characters, setCharacters] = useState([character]);

	// Initialize characterModifiers state by calculating the modifiers for the initial characters
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

	// Recalculate the modifiers whenever characters change
	useEffect(() => {
		if (characters) {
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
		}
	}, [characters]);

	// Function to increment an attribute of a character
	const incrementAttribute = (characterName, attribute) => {
		const newCharacters = characters?.map((character) => {
			if (character.characterName === characterName) {
				const totalPoints = Object.values(character.attributes).reduce(
					(acc, curr) => acc + curr
				);
				const canIncrement = totalPoints < 70;

				return {
					...character,
					attributes: {
						...character.attributes,
						[attribute]: canIncrement ? character.attributes[attribute] + 1 : character.attributes[attribute],
					},
					modifiers: {
						...character.modifiers,
						[attribute]: calculateModifier(
							character.attributes,
							attribute
						),
					},
				};
			}
			return character;
		});
		setCharacters(newCharacters);
	};

	// Function to decrement an attribute of a character
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

	// Function to increment a skill of a character
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

	// Function to decrement a skill of a character
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

	// Define the API URL
	const gitHubName = 'christine-aqui';
	const API_URL = `https://recruiting.verylongdomaintotestwith.ca/api/{${gitHubName}}/character`;

	// Fetch the characters from API when the component mounts
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(API_URL);
				const data = await response.json();
				if (data.body.length > 0) {
					setCharacters(data.body)
				}
			} catch (error) {
				console.error('Error:', error);
			}
		};
		fetchData();
	}, []);

	// Save function to save characters to API
	const saveCharacters = async () => {
		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(characterModifiers),
			});

			const data = await response.json();
			console.log('Success:', data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	// Provide the character-related state and functions to the children of this component
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
