import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../socket';
import { useAuth } from '../context/AuthContext';

const PollRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [copying, setCopying] = useState(false);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/polls/${id}`);
                setPoll(res.data);
            } catch (err) {
                console.error('Error loading poll:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPoll();
        socket.emit('join_poll', id);

        socket.on('poll_updated', (updatedData) => {
            setPoll(updatedData);
        });

        // Check local storage for quick UI feedback, but backend is the source of truth
        const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
        if (votedPolls.includes(id)) {
            setHasVoted(true);
        }

        return () => {
            socket.off('poll_updated');
        };
    }, [id]);

    const handleVote = async () => {
        if (!user) {
            alert('Please login to vote');
            navigate('/login');
            return;
        }

        if (selectedOption === null || hasVoted) return;

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/polls/vote', {
                pollId: id,
                optionIndex: selectedOption
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setHasVoted(true);
            const votedPolls = JSON.parse(localStorage.getItem('votedPolls') || '[]');
            localStorage.setItem('votedPolls', JSON.stringify([...votedPolls, id]));

            socket.emit('vote_cast', {
                pollId: id,
                updatedPoll: res.data
            });

            setPoll(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Error casting vote');
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopying(true);
        setTimeout(() => setCopying(false), 2000);
    };

    if (loading) return <div className="text-center py-20 font-medium text-gray-500">Connecting to Poll Room...</div>;
    if (!poll) return <div className="text-center py-20 text-red-500 font-bold">Poll not found!</div>;

    return (
        <div className="max-w-xl mx-auto py-12 px-4">
            <div className="card">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">{poll.question}</h2>
                    <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Live
                    </span>
                </div>

                <div className="space-y-3 mb-8">
                    {poll.options.map((opt, idx) => {
                        const percentage = poll.totalVotes > 0
                            ? Math.round((opt.votes / poll.totalVotes) * 100)
                            : 0;

                        return (
                            <div key={idx} className="relative group">
                                <button
                                    disabled={hasVoted}
                                    onClick={() => setSelectedOption(idx)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all relative z-10 
                                        ${selectedOption === idx ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-100 hover:border-indigo-200'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className={`font-semibold ${selectedOption === idx ? 'text-indigo-700' : 'text-gray-700'}`}>
                                            {opt.text}
                                        </span>
                                        {hasVoted && (
                                            <span className="text-xs font-bold text-gray-400 group-hover:text-indigo-400 transition-colors">
                                                {opt.votes} votes
                                            </span>
                                        )}
                                    </div>
                                </button>

                                <div
                                    className="absolute left-0 top-0 h-full bg-indigo-600/10 rounded-xl transition-all duration-1000 ease-in-out"
                                    style={{ width: hasVoted ? `${percentage}%` : '0%', zIndex: 0 }}
                                ></div>

                                {hasVoted && (
                                    <div className="mt-1 flex justify-end">
                                        <span className="text-[11px] font-black text-indigo-600">{percentage}%</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {!user ? (
                    <button
                        onClick={() => navigate('/login')}
                        className="btn btn-primary w-full py-4 text-sm uppercase tracking-widest font-bold mb-6"
                    >
                        Login to Vote
                    </button>
                ) : (
                    <button
                        onClick={handleVote}
                        disabled={hasVoted || selectedOption === null}
                        className="btn btn-primary w-full py-4 text-sm uppercase tracking-widest font-bold mb-6 shadow-indigo-200/50"
                    >
                        {hasVoted ? 'Thanks for voting!' : (selectedOption !== null ? 'Cast My Vote' : 'Select an Option')}
                    </button>
                )}

                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                    <div className="text-gray-400 text-xs font-bold">
                        TOTAL VOTES: <span className="text-gray-800">{poll.totalVotes}</span>
                    </div>
                    <button
                        onClick={copyLink}
                        className="text-indigo-600 text-xs font-bold hover:text-indigo-800 flex items-center gap-1"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        {copying ? 'LINK COPIED' : 'SHARE POLL'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PollRoom;
