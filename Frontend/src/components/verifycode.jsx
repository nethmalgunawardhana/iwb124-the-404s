import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';

const Verifycode = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle verify code here
    console.log('verify code submitted', { password });
  };



  return (
    <div className="min-h-full bg-white-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <a
          href="#"
          className="mt-8 text-center text-sm text-gray-600"
        > &lt;<span className="mt-8 text-center text-sm text-gray-600">&nbsp;Back to login

        </span>
        </a>
        
        <br /><br />


        <h2 className="text-2xl font-semibold text-purple-800 mb-4">Verify code</h2>
        <p className="text-center text-gray-600 mb-8">An authentication code has been sent to your email. </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="code"
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
          <div className="flex   items-center">
            <label htmlFor="resend" className="text-sm text-gray-600">
              Didn’t receive a code?  <span className="text-red-500"><a href="#">Resend</a></span>
            </label>

          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Verify
          </button>
        </form>

      </div>
    </div>
  )
}

export default Verifycode;