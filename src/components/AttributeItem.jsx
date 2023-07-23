const AttributeItem = ({
	attributeName,
	attributeValue,
	handleIncrement,
	handleDecrement,
	attributes,
	character
}) => {
	// Find the modifier for the given attribute from the characters in context
	const findModifier = (attrName) => {
		return character.modifiers[attrName] || 0;
	};

	const modifier = findModifier(attributeName.toLowerCase());

	return (
		<div className="p-1">
			<span>{attributeName}: {attributeValue} (Modifier: {modifier})</span>
			<div>
				<button
					type="button"
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => handleIncrement(character.characterName, attributeName.toLowerCase())}
				>
					+
				</button>
				<button
					type="button"
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => handleDecrement(character.characterName, attributeName.toLowerCase())}
				>
					-
				</button>
			</div>
		</div>
	)
}

export default AttributeItem;
