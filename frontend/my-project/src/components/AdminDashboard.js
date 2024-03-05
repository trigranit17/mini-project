import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const {data} = await axios.get('YOUR_BACKEND_API/quizzes');
                setQuizzes(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuizzes();
    }, []);

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
