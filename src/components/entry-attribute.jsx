import React from 'react';

const EntryAttribute = ({ title, propertyName, value, setAttributeValue, inputType }) => {
    return (
        <div style={{ padding: '10px' }}>
            <span>{title}</span>
            <input value={value} onChange={(e) => setAttributeValue(propertyName, e.target.value)} type={inputType} placeholder={propertyName} />
        </div>
    );
};

export default EntryAttribute;
