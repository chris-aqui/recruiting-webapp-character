import React from 'react';
import AttributeItem from './AttributeItem.jsx';
import { useAttributes } from '../contexts/CharactersContext';

const Attributes = ({ defaultAttributeList }) => {
  const { attributes, incrementAttribute, decrementAttribute } = useAttributes();


  return (
    <div id='AttributeList' className="container mx-auto block max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h2 className='text-1xl font-bold dark:text-white'>Attributes</h2>
      {defaultAttributeList.map((attribute) => {
        let attributeValue;
        switch (attribute) {
          case 'Strength':
            attributeValue = attributes.strength;
            break;
          case 'Dexterity':
            attributeValue = attributes.dexterity;
            break;
          case 'Constitution':
            attributeValue = attributes.constitution;
            break;
          case 'Intelligence':
            attributeValue = attributes.intelligence;
            break;
          case 'Wisdom':
            attributeValue = attributes.wisdom;
            break;
          case 'Charisma':
            attributeValue = attributes.charisma;
            break;
          default:
            attributeValue = 10;
        }
        return (
          <AttributeItem
            id={`attribute-${attribute}`}
            key={`attribute-${attribute}`}
            attributeName={attribute}
            attributeValue={attributeValue}
            handleIncrement={incrementAttribute}
            handleDecrement={decrementAttribute}
          />
        )
      })}
    </div>
  )
};

export default Attributes;