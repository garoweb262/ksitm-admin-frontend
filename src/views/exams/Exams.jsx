import React from 'react';
import QuestionCard from './components/Question';

const Exams = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Exam Questions</h1>
      <QuestionCard />
    </div>
  );
};

export default Exams;
