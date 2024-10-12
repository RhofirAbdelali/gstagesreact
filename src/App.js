import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Students from './Students';
import Supervisors from './Supervisors';
import Layout from './Layout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="students" element={<Students />} />
                    <Route path="supervisors" element={<Supervisors />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;