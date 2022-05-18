import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutPage from './pages/About';
import EntriesListPage from './pages/EntriesList';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EntriesListPage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
