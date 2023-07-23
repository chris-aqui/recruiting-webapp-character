import React from 'react';
import AttributeItem from './AttributeItem.jsx';
// import { useCharacter } from '../contexts/CharactersContext';

const Attributes = ({ characterAttribute, incrementAttribute, decrementAttribute, character }) => {
  // new defaultAttributeList format
  //  defaultAttributeList = {
  // 			strength: 10,
  // 			dexterity: 10,
  // 			constitution: 10,
  // 			intelligence: 10,
  // 			wisdom: 10,
  // 			charisma: 10,
  // 		}


  // return (
  //   <div id='AttributeList' className="container mx-auto block max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //     <h2 className='text-1xl font-bold dark:text-white'>Attributes</h2>
  //     {attributeList.map((attribute) => {
  //       let attributeValue;
  //       switch (attribute) {
  //         case 'Strength':
  //           attributeValue = attributeList.strength;
  //           break;
  //         case 'Dexterity':
  //           attributeValue = attributeList.dexterity;
  //           break;
  //         case 'Constitution':
  //           attributeValue = attributeList.constitution;
  //           break;
  //         case 'Intelligence':
  //           attributeValue = attributeList.intelligence;
  //           break;
  //         case 'Wisdom':
  //           attributeValue = attributeList.wisdom;
  //           break;
  //         case 'Charisma':
  //           attributeValue = attributeList.charisma;
  //           break;
  //         default:
  //           attributeValue = 10;
  //       }

  //       return (
  //         <AttributeItem
  //           id={`attribute-${attribute}`}
  //           key={`attribute-${attribute}`}
  //           attributeName={attribute}
  //           attributeValue={attributeValue}
  //           handleIncrement={incrementAttribute}
  //           handleDecrement={decrementAttribute}
  //           attributes={attributeList}
  //         />
  //       )
  //     })}
  //   </div>
  // )
  return (
    <div id='AttributeList' className="container mx-auto block max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h2 className='text-1xl font-bold dark:text-white'>Attributes</h2>
      {Object.keys(characterAttribute).map((attribute, index) => {
        const attributeValue = characterAttribute[attribute];

        return (
          <AttributeItem
            id={`attribute-${attribute}-index-${index}`}
            key={`attribute-${attribute}-index-${index}`}
            attributeName={attribute}
            attributeValue={attributeValue}
            handleIncrement={incrementAttribute}
            handleDecrement={decrementAttribute}
            attributes={characterAttribute}
            character={character}
          />
        )
      })}
    </div>
  )
};

export default Attributes;