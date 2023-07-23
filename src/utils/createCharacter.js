export class Character {
	constructor(name, attributes = {}, skills = {}) {
		this.name = name;
		this.attributes = {
			strength: 10,
			dexterity: 10,
			constitution: 10,
			intelligence: 10,
			wisdom: 10,
			charisma: 10,
			...attributes,
		};
		this.skills = {
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
			...skills,
		};
		this.modifiers = this.calculateModifiers();
	}

	incrementAttribute(attribute) {
		if (this.totalPoints() < 70) {
			this.attributes[attribute]++;
			this.modifiers[attribute] = this.calculateModifier(attribute);
		}
	}

	decrementAttribute(attribute) {
		if (this.attributes[attribute] > 0) {
			this.attributes[attribute]--;
			this.modifiers[attribute] = this.calculateModifier(attribute);
		}
	}

	incrementSkill(skill) {
		// Add conditions if needed
		this.skills[skill]++;
	}

	decrementSkill(skill) {
		// Add conditions if needed
		this.skills[skill]--;
	}

	calculateModifiers() {
		let modifiers = {};
		for (const attribute in this.attributes) {
			modifiers[attribute] = this.calculateModifier(attribute);
		}
		return modifiers;
	}

	calculateModifier(attribute) {
		// Your logic to calculate modifier
	}

	totalPoints() {
		return Object.values(this.attributes).reduce((total, attribute) => total + attribute, 0);
	}
}
