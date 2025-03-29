import React, { useState } from 'react';
// import firebase from 'firebase/app';
import 'firebase/auth';

const LoginPage = ({ auth, signInWithEmailAndPassword }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                localStorage.setItem('user', user ? JSON.stringify(user) : null);
                window.location.href = '/admin';
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="max-w-md mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-amber-600 mb-4">Login Page</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-lg font-medium text-amber-600" htmlFor="username">Username:</label>
                        <input
                            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-lg font-medium text-amber-600" htmlFor="password">Password:</label>
                        <input
                            className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        className="w-full p-2 text-lg font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
                        type="submit"
                        disabled={loading}
                    >
                       {loading ? 'Loading...' : 'Login'} 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;