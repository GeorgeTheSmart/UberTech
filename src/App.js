import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Stage from './components/Stage';

const App = () => {
  const [answersSubmitted, setAnswersSubmitted] = useState(false);

  const handleSubmit = () => {
    setAnswersSubmitted(true);
  };

  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route path="/" element={<Navigate to="/stage/1" />} />
        <Route path="/stage/:stageId" element={<Stage handleSubmit={handleSubmit} answersSubmitted={answersSubmitted} />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
