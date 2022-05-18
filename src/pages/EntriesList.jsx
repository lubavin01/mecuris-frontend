import React, { useEffect, useRef, useState } from 'react';
import { ObjectService } from '../api/ObjectService';
import Three from '../Three';

import EntryList from '../components/EntryList';
import EntryForm from '../components/EntryForm';
import MyModal from '../components/ui/modal/MyModal';

import '../styles/app.css';
import { useCallback } from 'react';

function EntriesListPage() {
    const threeJsObject = useRef();
    const threeRef = useRef();

    const [entries, setEntries] = useState([]); // list of entries
    const [modalData, setModalData] = useState({ visibility: false, data: {} }); // modal window
    const [renderEntry, setRenderEntry] = useState(); // current rendering entry

    const initialize = useCallback(async () => {
        threeJsObject.current = new Three(threeRef.current);
        threeJsObject.current.render();
        threeJsObject.current.animate();

        const entries = await ObjectService.getEntries();
        setEntries(entries);

        if (entries.length) {
            setRenderEntry(entries[0]);
        }
    }, []);

    const deleteEntry = useCallback(
        async (id) => {
            await ObjectService.deleteEntry(id);

            const newEntries = entries.filter((entry) => entry._id !== id);
            setEntries(newEntries);
        },
        [entries],
    );

    const submitEntry = useCallback(
        async (modifiedEntry) => {
            if (modifiedEntry._id) {
                // Modified existing one
                await ObjectService.updateEntry(modifiedEntry);
                const newEntries = entries.map((entry) => {
                    if (entry._id === modifiedEntry._id) {
                        if (renderEntry === entry) {
                            setRenderEntry(modifiedEntry);
                        }
                        return modifiedEntry;
                    }

                    return entry;
                });

                setEntries(newEntries);
            } else {
                // Created a new one
                const entry = await ObjectService.createEntry(modifiedEntry);
                setEntries([...entries, entry]);
            }

            setModalData({ visibility: false, data: {} });
        },
        [renderEntry, entries],
    );

    const modifyEntry = useCallback((entry) => {
        setModalData({ visibility: true, data: entry });
    }, []);

    useEffect(() => {
        initialize();
    }, []);

    useEffect(() => {
        if (threeJsObject.current && renderEntry) {
            threeJsObject.current.addBox(renderEntry);
            threeJsObject.current.render();
            threeJsObject.current.animate();
        }
    }, [renderEntry]);

    useEffect(() => {
        console.log('useEffect - modal Data', { modalData });
    }, [modalData]);

    return (
        <div className="App" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MyModal visible={modalData.visibility} setModalData={setModalData}>
                <EntryForm submitEntry={submitEntry} data={modalData.data} />
            </MyModal>
            <div className="entry-container">
                <h1>Entries</h1>
                <button
                    style={{ width: '50px' }}
                    onClick={() => {
                        console.log('create click', { modalData });
                        setModalData({ visibility: true, data: {} });
                    }}
                >
                    Create
                </button>
                <EntryList entries={entries} deleteEntry={deleteEntry} modifyEntry={modifyEntry} setRenderEntry={setRenderEntry} />
            </div>
            <div className="container" ref={threeRef} />
        </div>
    );
}

export default EntriesListPage;
