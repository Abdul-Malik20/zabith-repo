import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Surprise from './components/Surprise';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/surprise" element={<Surprise />} />
    </Routes>
  );
}

export default App;
