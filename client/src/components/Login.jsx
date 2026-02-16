import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto py-12 px-4">
            <div className="card">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-primary w-full py-3">Login</button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
