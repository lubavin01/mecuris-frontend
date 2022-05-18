import React from 'react';
import EntryItem from './entry-item';

const EntryList = ({ entries, deleteEntry, modifyEntry, setRenderEntry }) => {
    return (
        <div>
            {entries.map((entry, idx) =>
                <EntryItem
                    number={idx}
                    entry={entry}
                    deleteEntry={deleteEntry}
                    modifyEntry={modifyEntry}
                    setRenderEntry={setRenderEntry}
                    key={entry._id}
                />
            )}


        </div>
    );

}

export default EntryList
