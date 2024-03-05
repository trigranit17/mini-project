import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AdminDashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [formState, setFormState] = useState({title: '', description: ''}); 
    const [editingQuizId, setEditingQuizId] = useState(null); 
    const [participantAnswers, setParticipantAnswers] = useState([]);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const AdminDashboard = () => {
        const navigate = useNavigate();

        const goToQuizDetails = (quizId) => {
            navigate(`/admin/quiz/${quizId}`);
        };

        const goToQuizForm = (quizId) => {
            navigate(`/admin/quiz-form/${quizId}`);
        };

        const createNewQuiz = () => {
            navigate('/admin/quiz-form');
        };

        const viewParticipantAnswers = (quizId) => {
            navigate(`/admin/quiz/${quizId}/answers`);
        };

        const fetchQuizzes = async () => {
            try {
                const response = await fetch('http://localhost:8080/backend');
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const data = await response.json();
                setQuizzes(data.quizzes);
            } catch (error) {
                console.error(error.message);
            }
        };

        const handleDeleteQuiz = async (quizId) => {
            try {
                const response = await fetch(
                    `http://localhost:8080/backend/${quizId}`,
                    {method: 'DELETE'}
                );
                if (!response.ok) {
                    throw new Error('Could not delete quiz!');
                }
                fetchQuizzes(); // Refresh daftar quiz setelah penghapusan
            } catch (error) {
                console.error(error.message);
            }
        };

        const handleFormSubmit = async (e) => {
            e.preventDefault();
            const url = editingQuizId
                ? `http://localhost:8080/backend/${editingQuizId}`
                : 'http://localhost:8080/backend';
            const method = editingQuizId
                ? 'PUT'
                : 'POST';

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formState)
                });

                if (!response.ok) {
                    throw new Error('Could not process the form.');
                }

                await fetchQuizzes(); // Memperbarui daftar quiz setelah sukses
                setFormState({title: '', description: ''}); // Reset form state
                setEditingQuizId(null); // Reset editing state
            } catch (error) {
                console.error(error);
            }
        };

        const handleEditQuiz = (quiz) => {
            setFormState({title: quiz.title, description: quiz.description});
            setEditingQuizId(quiz.id);
        };

        const fetchParticipantAnswers = async (quizId) => {
            try {
                const response = await fetch(`http://localhost:8080/backend/${quizId}/answers`);
                if (!response.ok) {
                    throw new Error('Could not fetch participant answers!');
                }
                const data = await response.json();
                setParticipantAnswers(data.answers); // Asumsikan respons dalam format { answers: [] }
            } catch (error) {
                console.error(error.message);
            }
        };

        return (
            <div>
                <h2>Daftar Quiz</h2>
                <ul>
                    {
                        quizzes.map((quiz) => (
                            <li key={quiz.id}>
                                {quiz.title}
                                - {quiz.description}
                                <button onClick={() => viewParticipantAnswers(quiz.id)}>Lihat Jawaban</button>
                                <button onClick={() => handleEditQuiz(quiz)}>Edit</button>
                                <button onClick={() => handleDeleteQuiz(quiz.id)}>Hapus</button>
                            </li>
                        ))
                    }
                </ul>
                <h3>{
                        editingQuizId
                            ? 'Edit Quiz'
                            : 'Buat Quiz Baru'
                    }</h3>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Judul Quiz:
                        <input
                            type="text"
                            value={formState.title}
                            onChange={(e) => setFormState({
                                ...formState,
                                title: e.target.value
                            })}/>
                    </label>
                    <label>
                        Deskripsi Quiz:
                        <input
                            type="text"
                            value={formState.description}
                            onChange={(e) => setFormState({
                                ...formState,
                                description: e.target.value
                            })}/>
                    </label>
                    <button type="submit">{
                            editingQuizId
                                ? 'Update'
                                : 'Simpan'
                        }</button>
                </form>
                <button onClick={createNewQuiz}>Buat Quiz Baru</button>
            </div>
        );
    };
};

export default AdminDashboard;
