import React from 'react';
import Navigation from './components/Navigation.js';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';

import Requirements from './pages/Requirements.js';
import Home from './pages/Home.js'
import Equipment from './pages/Equipment.js';

export default function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path='/home' exact element={<Home />} />
                <Route path='/requirements' exact element={<Requirements />} />
                <Route path='/equipment' exact element={<Equipment />} />
            </Routes>
        </Router>
    );
}
