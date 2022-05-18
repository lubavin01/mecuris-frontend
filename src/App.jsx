import { useEffect, useRef, useState } from "react";
import { ObjectService } from "./API/ObjectService";
import Three from "./Three";

import './styles/app.css';
import EntryList from "./components/entry-list";
import EntryForm from "./components/entry-form";
import MyModal from "./components/UI/modal/my-modal";

function App() {
    const threeJsObject = useRef();
    const threeRef = useRef();

    const [entries, setEntries] = useState([]); // list of entries
    const [modalData, setModalData] = useState({ visibility: false, data: {} }); // modal window
    const [renderEntry, setRenderEntry] = useState(); // current rendering entry

    const initialize = async () => {
        threeJsObject.current = new Three(threeRef.current);
        threeJsObject.current.render();
        threeJsObject.current.animate();

        const entries = await ObjectService.getEntries();
        setEntries(entries);

        if (entries.length) {
            setRenderEntry(entries[0])
        }
    }

    const deleteEntry = async (id) => {
        await ObjectService.deleteEntry(id);

        const newEntries = entries.filter(entry => entry._id !== id);
        setEntries(newEntries);
    }

    const submitEntry = async (modifiedEntry) => {
        if (modifiedEntry._id) {
            await ObjectService.updateEntry(modifiedEntry);
            const newEntries = entries.map(entry => {
                if (entry._id === modifiedEntry._id) {
                    if (renderEntry === entry) {
                        setRenderEntry(modifiedEntry)
                    }
                    return modifiedEntry;
                }

                return entry;
            })

            setEntries(newEntries);
        } else {
            const entry = await ObjectService.createEntry(modifiedEntry);
            setEntries([...entries, entry]);
        }

        setModalData({ visibility: false, data: {} });
    }

    const modifyEntry = (entry) => {
        setModalData({ visibility: true, data: entry });
    }

    useEffect(() => {
        initialize();
    }, []);

    useEffect(() => {
        if (threeJsObject.current && renderEntry) {
            threeJsObject.current.addBox(renderEntry);
            threeJsObject.current.render();
            threeJsObject.current.animate();
        }
    }, [renderEntry])

    return (
        <div className="App" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MyModal visible={modalData.visibility} setModalData={setModalData}>
                <EntryForm submitEntry={submitEntry} data={modalData.data} />
            </MyModal>
            <div className="entry-container" >
                <h1>Entries</h1>
                <button style={{ width: '50px' }} onClick={() => setModalData({ visibility: true, data: {} })}>Create</button>
                <EntryList
                    entries={entries}
                    deleteEntry={deleteEntry}
                    modifyEntry={modifyEntry}
                    setRenderEntry={setRenderEntry}
                />
            </div>
            <div className="container" ref={threeRef} />
        </div >
    );
}

export default App;
