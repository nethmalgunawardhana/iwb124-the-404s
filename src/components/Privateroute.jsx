import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const PrivateRoute = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();
  
  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if authenticated
  return children;
};
