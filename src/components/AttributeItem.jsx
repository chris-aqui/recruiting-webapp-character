import PropTypes from 'prop-types';

const AttributeItem = ({
	attributeName,
	attributeValue,
	handleIncrement,
	handleDecrement,
	character
}) => {
	// Error handling: if any required props are missing, render an error message
	if (!attributeName || !attributeValue || !handleIncrement || !handleDecrement || !character) {
		return <div>Error: Invalid props</div>;
	}

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
					aria-label={`Increase ${attributeName}`}
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => handleIncrement(character.characterName, attributeName.toLowerCase())}
				>
					+
				</button>
				<button
					type="button"
					aria-label={`Decrease ${attributeName}`}
					className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
					onClick={() => handleDecrement(character.characterName, attributeName.toLowerCase())}
				>
					-
				</button>
			</div>
		</div>
	)
}

AttributeItem.propTypes = {
	attributeName: PropTypes.string.isRequired,
	attributeValue: PropTypes.number.isRequired,
	handleIncrement: PropTypes.func.isRequired,
	handleDecrement: PropTypes.func.isRequired,
	character: PropTypes.shape({
		characterName: PropTypes.string.isRequired,
		modifiers: PropTypes.object.isRequired,
	}).isRequired,
};

export default AttributeItem;
