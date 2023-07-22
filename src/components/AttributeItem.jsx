import { calculateModifier } from '../utils/calculateModifier';
const AttributeItem = ({
	attributeName,
	attributeValue,
	handleIncrement,
	handleDecrement,
}) => {
	const modifier = calculateModifier(attributeValue);

	return (
		<div className="p-1">
			<span>{attributeName}: {attributeValue} (Modifier: {modifier})</span>
			<div>
				<button type="button" className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={() => handleIncrement(attributeName.toLowerCase())}>+</button>
				<button type="button" className='px-1 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={() => handleDecrement(attributeName.toLowerCase())}>-</button>
			</div>
		</div>
	)
}

export default AttributeItem;
