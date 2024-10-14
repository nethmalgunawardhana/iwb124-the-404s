// LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ=' // Replace with the generated token
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.text();
            console.log(data);
            // Redirect or perform other actions
        } else {
            const errorMessage = await response.text();
            setError(errorMessage);
            console.error(errorMessage);
        }
    };

    const handleSignupClick = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    return (
        <div className="min-h-full bg-white-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-black text-center mb-2">Hi, Welcome Name</h2>
                <p className="text-center text-gray-600 mb-8">Enter your credentials to continue</p>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <input
                            type="email"
                            placeholder="john.doe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">Remember me</label>
                        </div>
                        <a href="./forgotpassword" className="text-sm text-purple-600 hover:text-purple-500">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or login with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <a href="#" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            {/* Add social login icons here */}
                            <span>Google</span>
                        </a>
                        <a href="#" className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            {/* Add social login icons here */}
                            <span>Facebook</span>
                        </a>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="font-medium text-purple-600 hover:text-purple-500" onClick={handleSignupClick}>
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
