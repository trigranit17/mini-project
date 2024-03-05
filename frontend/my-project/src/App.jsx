import React from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import QuizDetails from './components/QuizDetails'; 
import QuizForm from './components/QuizForm'; 
import ParticipantAnswers from './components/ParticipantAnswers'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/quiz/:quizId" element={<QuizDetails />} />
        <Route path="/admin/quiz/:quizId/answers" element={<ParticipantAnswers />} />
        <Route path="/admin/quiz-form" element={<QuizForm />} />
        <Route path="/admin/quiz-form/:quizId" element={<QuizForm />} />
      </Routes>
    </Router>
  );
} 

export default App;
