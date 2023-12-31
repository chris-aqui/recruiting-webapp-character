import React, { useState, useEffect } from 'react';
import { useAttributes } from '../contexts/CharactersContext';

const Classes = ({ defaultClassList }) => {
	const { attributes } = useAttributes();
	const [eligibleClasses, setEligibleClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState(null);
	useEffect(() => {
		console.log('selectedClass', selectedClass);
	}, [selectedClass]);

	useEffect(() => {
		const newEligibleClasses = [];
		for (const characterClassName in defaultClassList) {
			const classAttributes = defaultClassList[characterClassName];
			if (Object.keys(classAttributes).every((attribute) => {
				return attributes[attribute.toLowerCase()] >= classAttributes[attribute]
			})) {
				newEligibleClasses.push(characterClassName);
			}
		}
		setEligibleClasses(newEligibleClasses);
	}, [attributes]);

	const displayMinimumStats = (className) => {
		setSelectedClass(className);
	}
	const hideMinimumStats = () => {
		setSelectedClass(null);
	}

	return (
		<>
			<div className='container mx-auto block max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
				<h2 className='text-1xl font-bold dark:text-white'>Classes</h2>
				{Object.keys(defaultClassList).map((characterClassName) => (
					<div
						key={characterClassName}
						style={{ color: eligibleClasses.includes(characterClassName) ? 'green' : 'red' }}
						onClick={() => displayMinimumStats(characterClassName)}
					>
						{characterClassName}
					</div>
				))}
			</div>
			{selectedClass && (
				<div className='container mx-auto block max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
					<h3 className='text-1xl font-bold dark:text-white'>{selectedClass} Minimum Requirment</h3>
					{Object.keys(defaultClassList[selectedClass]).map((attribute) => (
						<div
							key={attribute}
							className='p-1'
						>
							{attribute}: {defaultClassList[selectedClass][attribute]}
						</div>
					))}
					<button
						type="button"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={hideMinimumStats}
					>
						Close View
					</button>
				</div>
			)}
		</>
	);
}
export default Classes;