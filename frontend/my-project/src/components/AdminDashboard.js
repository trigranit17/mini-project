import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AdminDashboard() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchQuizzes = async () => {
            const backendURL = 'http://localhost:8080/api/quizzes'; 

            try {
                const response = await fetch(backendURL, {
                    headers: {
                        'Content-Type': 'application/json',
                        // ${localStorage.getItem('token')}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }

                const data = await response.json();
                setQuizzes(data.quizzes); // Sesuaikan dengan struktur response dari API Anda
            } catch (error) {
                console.error('Error:', error);
                // Redirect ke halaman login jika ada masalah (misal, token expired)
                navigate('/login');
            }
        };

        fetchQuizzes();
    }, [navigate]);

    return (
        <div className="max-w-4xl mx-auto my-10">
            <h2 className="text-2xl font-semibold text-gray-800">Quiz List</h2>
            <div className="mt-5">
                <ul className="bg-white shadow-md rounded-lg">
                    {
                        quizzes.map((quiz) => (
                            <li key={quiz.id} className="px-6 py-4 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">{quiz.judul}</span>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Manage
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboard;
