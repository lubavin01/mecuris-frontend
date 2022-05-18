import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import EntryAttribute from './entry-attribute';

const EntryForm = ({ submitEntry, data }) => {

    const defaultEntry = { _id: '', color: '', width: 0, height: 0, depth: 0, positionX: 0, positionY: 0, positionZ: 0 };
    const [entryFormData, setEntryFormData] = useState(defaultEntry);

    useEffect(() => {
        if (data) {
            setEntryFormData(data)
        }
    }, [data]);

    const submitEntryForm = (e) => {
        e.preventDefault();
        const newEntry = {
            _id: entryFormData._id,
            color: entryFormData.color,
            width: entryFormData.width,
            height: entryFormData.height,
            depth: entryFormData.depth,
            positionX: entryFormData.positionX,
            positionY: entryFormData.positionY,
            positionZ: entryFormData.positionZ,
        };
        submitEntry(newEntry);

        setEntryFormData(defaultEntry);
    }

    const setAttributeValue = (propertyName, value) => {
        setEntryFormData({ ...entryFormData, [propertyName]: value })
    }

    return (
        <form>
            {entryFormData._id
                ? <strong>Modify {entryFormData._id}</strong>
                : <strong>Create new</strong>}
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <EntryAttribute
                    title='Color: '
                    propertyName='color'
                    value={entryFormData.color}
                    setAttributeValue={setAttributeValue}
                    inputType='color'
                />

                <EntryAttribute
                    title='Width: '
                    propertyName='width'
                    value={entryFormData.width}
                    setAttributeValue={setAttributeValue}
                    inputType='number'
                />

                <EntryAttribute
                    title='Height: '
                    propertyName='height'
                    value={entryFormData.height}
                    setAttributeValue={setAttributeValue}
                    inputType='number'
                />

                <EntryAttribute
                    title='Depth: '
                    propertyName='depth'
                    value={entryFormData.depth}
                    setAttributeValue={setAttributeValue}
                    inputType='number'
                />

                <EntryAttribute
                    title='positionX: '
                    propertyName='positionX'
                    value={entryFormData.positionX}
                    setAttributeValue={setAttributeValue}
                    inputType='number'
                />

                <EntryAttribute
                    title='positionY: '
                    propertyName='positionY'
                    value={entryFormData.positionY}
                    setAttributeValue={setAttributeValue}
                    inputType='number'
                />

                <EntryAttribute
                    title='positionZ: '
                    propertyName='positionZ'
                    value={entryFormData.positionZ}
                    setAttributeValue={setAttributeValue}
                    inputType='number'
                />
            </div>
            <button onClick={submitEntryForm}>Submit</button>
        </form>
    )
}

export default EntryForm;
