import React, { createContext, useState, useEffect, useContext } from 'react';

const AttributesContext = createContext();

export function useAttributes() {
	return useContext(AttributesContext);
}

export function AttributesProvider({ children }) {
	const [attributes, setAttributes] = useState({
		'strength': 10,
		'dexterity': 10,
		'constitution': 10,
		'intelligence': 10,
		'wisdom': 10,
		'charisma': 10,
	});

	const incrementAttribute = (attribute) => {
		console.log('incrementing attribute', attribute)
		setAttributes({
			...attributes,
			[attribute]: attributes[attribute] + 1,
		});
	};

	const decrementAttribute = (attribute) => {
		console.log('decrementing attribute', attribute)
		setAttributes({
			...attributes,
			[attribute]: Math.max(0, attributes[attribute] - 1),
		});
	};

	return (
		<AttributesContext.Provider value={{ attributes, incrementAttribute, decrementAttribute }}>
			{children}
		</AttributesContext.Provider>
	);
}
