import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * LandingPage component
 * 
 * Honestly, I spent way too much time on the CSS for this, but I think the 
 * indigo/gray combo looks pretty clean for a student project. 
 * Using state from AuthContext to decide what buttons the user sees.
 */
const LandingPage = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION - The "First Impression" part */}
            <header className="pt-24 pb-16 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                        Finally, a polling tool that actually <br className="hidden md:block" />
                        <span className="text-indigo-600 italic">updates in real-time.</span>
                    </h1>

                    <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                        I built this because I hate refreshing pages to see results.
                        Create a room, share the link, and watch the bars move as people vote.
                        Super simple.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {user ? (
                            <Link to="/create" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-indigo-200">
                                Create New Poll
                            </Link>
                        ) : (
                            <>
                                <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-indigo-200">
                                    Join for Free
                                </Link>
                                <Link to="/login" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-10 rounded-xl transition-all">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* QUICK FEATURES - Just keeping it real here */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Real-time stuff */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="mb-4 text-indigo-600">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Socket.io Powered</h3>
                            <p className="text-slate-500">
                                Uses WebSockets so the backend pushes updates directly to your screen. No lag, no reloads.
                            </p>
                        </div>

                        {/* Security stuff */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="mb-4 text-green-600">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Fair Voting</h3>
                            <p className="text-slate-500">
                                Checked by both IP addresses and User accounts. Prevents people from spamming votes.
                            </p>
                        </div>

                        {/* Export/Link stuff */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="mb-4 text-purple-600">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Invite-Only (Kinda)</h3>
                            <p className="text-slate-500">
                                Every poll gets a unique room link. Copy it, text it to your coworkers, and see what they think.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="bg-slate-900 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                        {/* Tiny design touch I thought was cool */}
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="white"><path d="M9 21h6v-1H9v1zm3-19C7.58 2 4 5.58 4 10c0 2.76 1.41 5.19 3.5 6.6V19h5v-2.4c2.09-1.41 3.5-3.84 3.5-6.6 0-4.42-3.58-8-8-8z" /></svg>
                        </div>

                        <h2 className="text-3xl font-bold mb-4 relative z-10">Got a question?</h2>
                        <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">
                            Stop asking in messy group chats. Build a poll and get actual numbers in seconds.
                        </p>
                        <Link to={user ? "/create" : "/signup"} className="inline-block bg-white text-slate-900 font-bold py-4 px-12 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-tight text-sm">
                            {user ? 'Go to My Dashboard' : 'Starting Voting Now'}
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-10 text-center border-t border-slate-100">
                <p className="text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} PollRooms Project. Made with Express and React.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
