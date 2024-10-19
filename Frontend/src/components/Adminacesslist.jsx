import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Phone, Mail, FileText } from 'lucide-react';

const AdminAccessList = () => {
  const [adminRequests, setAdminRequests] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // System admin credentials (in a real app, this would be handled securely)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = '987456321';

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    const result = await Swal.fire({
      title: 'System Admin Authentication',
      html: `
        <input type="text" id="username" class="swal2-input" placeholder="Username">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Login',
      confirmButtonColor: '#3b82f6',
      preConfirm: () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!username || !password) {
          Swal.showValidationMessage('Please enter username and password');
          return false;
        }
        return { username, password };
      }
    });

    if (result.isConfirmed) {
      const { username, password } = result.value;
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        setIsVerified(true);
        fetchAdminRequests();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Authentication Failed',
          text: 'Invalid username or password',
          confirmButtonColor: '#3b82f6'
        });
      }
    }
  };

  const fetchAdminRequests = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:9091/admin/access');
      if (!response.ok) {
        throw new Error('Failed to fetch admin requests');
      }
      const data = await response.json();
      setAdminRequests(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch admin access requests',
        confirmButtonColor: '#3b82f6'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Authentication Required</h2>
          <button
            onClick={checkAdminAuth}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login as Admin
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl text-purple-950 font-bold">Admin Access Requests</h2>
          </div>
          <div className="p-6">
            {adminRequests.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No admin access requests found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {adminRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold  text-black text-lg">{request.name}</h3>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{request.phoneNumber}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="w-4 h-4" />
                        <span className="font-medium">{request.request}</span>
                      </div>
                      
                      <div className="mt-2 pl-6 text-gray-700">
                        <p>{request.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAccessList;