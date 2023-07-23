import React from 'react';
import AttributeItem from './AttributeItem.jsx';
import PropTypes from 'prop-types';

const Attributes = ({ characterAttribute, incrementAttribute, decrementAttribute, character }) => {
  // Error handling: if any required props are missing, render an error message
  if (!characterAttribute || !incrementAttribute || !decrementAttribute || !character) {
    return <div>Error: Invalid props</div>;
  }

  return (
    <div id='AttributeList' className="container mx-auto block max-w-sm p-6  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" aria-label="Attribute List">
      <h2 className='text-1xl font-bold dark:text-white'>Attributes</h2>
      {Object.keys(characterAttribute).map((attribute, index) => {
        const attributeValue = characterAttribute[attribute];

        return (
          <AttributeItem
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

// PropTypes for the Attributes component
Attributes.propTypes = {
  characterAttribute: PropTypes.object.isRequired,
  incrementAttribute: PropTypes.func.isRequired,
  decrementAttribute: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
};

export default Attributes;