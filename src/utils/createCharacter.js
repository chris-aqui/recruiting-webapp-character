const DEFAULT_ATTRIBUTES = {
	strength: 10,
	dexterity: 10,
	constitution: 10,
	intelligence: 10,
	wisdom: 10,
	charisma: 10,
};

const DEFAULT_SKILLS = {
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
	}
}
export class Character {
	constructor(
		characterName,
		attributes = DEFAULT_ATTRIBUTES,
		skills = DEFAULT_SKILLS,
	) {
		this.characterName = characterName;
		this.attributes = attributes;
		this.skills = skills;
		this.totalPoints = Object.values(this.attributes).reduce((total, attribute) => total + attribute, 0);
		this.modifiers = this.calculateModifiers();
	}

	calculateModifiers() {
		let modifiers = {};
		for (const attribute in this.attributes) {
			modifiers[attribute] = this.calculateModifier(attribute);
		}
		return modifiers;
	}

	calculateModifier(attribute) {
		// Example calculation: subtract 10 from the attribute, divide by 2, and round down
		return Math.floor((this.attributes[attribute] - 10) / 2);
	}

}
