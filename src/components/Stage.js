import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Stage = ({ handleSubmit, answersSubmitted }) => {
  const { stageId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load questions for the current stage (could come from backend or hardcoded)
    const fetchQuestions = async () => {
      const response = await axios.get(`http://localhost:5000/api/questions/${stageId}`);
      setQuestions(response.data);
    };
    fetchQuestions();
  }, [stageId]);

  const handleChange = (e, question) => {
    setAnswers({ ...answers, [question]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (answersSubmitted) {
      alert("You've already submitted the answers.");
      return;
    }
    // Submit the answers
    await axios.post(`http://localhost:5000/api/submit-answers`, { stageId, answers });
    handleSubmit();
    setSubmitted(true);
    alert('Answers submitted successfully!');
    navigate('/');
  };

  if (submitted) {
    return <h2>You have already completed this stage.</h2>;
  }

  return (
    <div>
      <h1>Stage {stageId}</h1>
      <form onSubmit={handleFormSubmit}>
        {questions.map((q, index) => (
          <div key={index}>
            <label className='question-label'>{q}</label>
            <input className='answer-section' type="text" onChange={(e) => handleChange(e, q)} required />
          </div>
        ))}
        <button type="submit" disabled={answersSubmitted}>Submit</button>
      </form>
    </div>
  );
};

export default Stage;
