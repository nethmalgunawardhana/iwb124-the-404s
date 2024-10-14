import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

const SignUpForm = () => {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWRtaW46cGFzc3dvcmQ=', // Replace with the generated token
            },
            body: JSON.stringify({ fname, lname, email, phonenumber, password }),
        });

        if (response.ok) {
            const data = await response.text();
            console.log(data);
            // Redirect or perform other actions
        } else {
            const errorMessage = await response.text();
            console.error(errorMessage);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Sign Up</h2>
            <p className="text-gray-600 mb-4">Enter your credentials to continue</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={fname}
                        onChange={(e) => setFName(e.target.value)}
                        className="w-full px-3 py-2 border bg-gray-300 text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lname}
                        onChange={(e) => setLName(e.target.value)}
                        className="w-full px-3 py-2 border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                        required
                    />
                </div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3 py-2 border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                />
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
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
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="terms"
                        className="mr-2 bg-gray-300"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to all the <span className="text-red-500">Terms</span> and <span className="text-red-500">Privacy Policies</span>
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition duration-300"
                >
                    Create Account
                </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account? <a href="#" className="text-purple-600 hover:underline">Login</a>
            </p>

            <div className="mt-6">
                <p className="text-center text-sm text-gray-600 mb-2">Or login with</p>
                <div className="grid grid-cols-2 gap-4">
                    <a
                        href="#"
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        {/* Add appropriate SVG for the first login method */}
                        {/* Example for Google */}
                        <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        {/* Add appropriate SVG for the second login method */}
                        {/* Example for Facebook */}
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="#4267B2"
                                d="M22.675 0h-21.35C.75 0 0 .75 0 1.675v20.65C0 23.25.75 24 1.675 24h21.35C23.25 24 24 23.25 24 22.325V1.675C24 .75 23.25 0 22.325 0zM12 24v-9.297h-3.103V12h3.103V9.437c0-3.069 1.826-4.749 4.586-4.749 1.309 0 2.694.234 2.694.234v2.967h-1.515c-1.49 0-1.952.928-1.952 1.884V12h3.31l-.529 2.703h-2.78V24H12z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
