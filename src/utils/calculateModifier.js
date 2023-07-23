export const calculateModifier = (list, name) => {
	const lowerCaseName = name.toLowerCase();
	return Math.floor((list[lowerCaseName] - 10) / 2);
};