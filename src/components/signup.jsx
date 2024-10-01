import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';


const SignUpForm = () => {

  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhoneNumber] = useState('')

  const [showPassword1, setShowPassword1] = useState(false);
  const [password1, setPassword1] = useState('');

  const [showPassword2, setShowPassword2] = useState(false);
  const [password2, setPassword2] = useState('');

  const [agree, setAgree] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Account created', { fname, lname, email,phonenumber, password1, agree });
  };

  return (
    <div className="max-w-md mx-auto  p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">Sign up</h2>
      <p className="text-gray-600 mb-4">Enter your credentials to continue</p>

      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFName(e.target.value)}

            className="w-full px-3 py-2 border bg-gray-300 text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            className="w-full px-3 py-2 border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-2 border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <div className="relative">
          <input
            type={showPassword1 ? "text" : "password"}
            placeholder="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
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
            placeholder="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
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
        <div className="flex   items-center">
          <input
            type="checkbox"
            id="terms"
            className="mr-2 bg-gray-300 "
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
          Create account
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
            <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
              />
              <path
                fill="#34A853"
                d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
              />
              <path
                fill="#4A90E2"
                d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1818182,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
              />
              <path
                fill="#FBBC05"
                d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;