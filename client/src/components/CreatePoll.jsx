import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const addOption = () => {
        if (options.length < 6) {
            setOptions([...options, '']);
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please login to create a poll');
            navigate('/login');
            return;
        }

        const filteredOptions = options.filter(opt => opt.trim() !== '');

        if (!question || filteredOptions.length < 2) {
            alert('Please enter a question and at least 2 options.');
            return;
        }

        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/api/polls/create`, {
                question,
                options: filteredOptions
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate(`/poll/${response.data._id}`);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error creating poll');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="card">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Poll</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Question</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="What's on your mind?"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-semibold text-gray-700">Options</label>
                        {options.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                className="input-field"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required={index < 2}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={addOption}
                            className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                            disabled={options.length >= 6}
                        >
                            + Add another option
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary px-8 py-3"
                            disabled={loading || !user}
                        >
                            {!user ? 'Login to Create' : (loading ? 'Creating...' : 'Create Poll')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePoll;
