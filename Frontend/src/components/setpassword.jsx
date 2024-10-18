import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';

const setpassword = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [password1, setPassword1] = useState('');

    const [showPassword2, setShowPassword2] = useState(false);
    const [password2, setPassword2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle verify code here
        if (password1 != password2) {
            console.log('new password cannot submit', { password1, password2 });
        } else {
            console.log('new password submitted', { password1 });
        }

    };

    return (
        <div className="min-h-full bg-white-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <a
                    href="#"
                    className="mt-8 text-center text-sm text-gray-600"
                > &lt; <span className="mt-8 text-center text-sm text-gray-600">&nbsp;Back to login</span>
                </a>



                <br /><br />
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">Set a password</h2>
                <p className="text-center text-gray-600 mb-8">Your previous password has been reseted. Please set a new password for your account. </p>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassword1 ? "text" : "password"}
                                placeholder="Password"
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword1(!showPassword1)}
                            >
                                {showPassword1 ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword2 ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword2(!showPassword2)}
                            >
                                {showPassword2 ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                            Set password
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default setpassword;