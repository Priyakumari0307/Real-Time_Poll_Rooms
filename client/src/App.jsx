import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreatePoll from './components/CreatePoll';
import PollRoom from './components/PollRoom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';

// Extracted Navbar for better organization
const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    POLL<span className="text-gray-900">ROOMS</span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link to="/create" className="text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                        Create
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-6">
                            <span className="text-sm font-black text-gray-800 hidden md:inline">
                                {user.username.toUpperCase()}
                            </span>
                            <button
                                onClick={logout}
                                className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-widest border-l border-gray-200 pl-6"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-bold text-gray-800 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-primary text-xs py-2 px-6 uppercase tracking-widest font-black">
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/create" element={<CreatePoll />} />
                            <Route path="/poll/:id" element={<PollRoom />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </Routes>
                    </main>

                    <footer className="py-12 bg-gray-900 text-gray-500 text-sm border-t border-gray-800">
                        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="font-black text-xl tracking-tighter text-white">
                                POLL<span className="text-indigo-500">ROOMS</span>
                            </div>
                            <div className="flex gap-8 font-medium">
                                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms</a>
                                <a href="#" className="hover:text-white transition-colors">Contact</a>
                            </div>
                            <p className="font-medium">&copy; 2026 Poll Room Inc. Built with ❤️ for the world.</p>
                        </div>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
