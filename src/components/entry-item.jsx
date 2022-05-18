import React from 'react';

const EntryItem = ({ entry, deleteEntry, modifyEntry, setRenderEntry }) => {
    const deleteItem = () => {
        deleteEntry(entry._id);
    }
    const modifyItem = () => {
        modifyEntry(entry)
    }
    const renderItem = () => {
        setRenderEntry(entry)
    }
    return (
        <div className='entry'>
            <div className="post__content">
                <strong>{entry._id}</strong>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div className='attribute'>color: {entry.color}</div>
                    <div className='attribute'>width: {entry.width}</div>
                    <div className='attribute'>height: {entry.height}</div>
                    <div className='attribute'>depth: {entry.depth}</div>
                </div>
            </div>
            <div className="post__btns">
                <button onClick={deleteItem}>Delete</button>
                <button onClick={modifyItem}>Modify</button>
                <button onClick={renderItem}>Render</button>
            </div>
        </div>
    );
}

export default EntryItem;
