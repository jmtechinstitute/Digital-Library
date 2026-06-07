import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Ithu browser console-la exact-aa enna prechanai nu kaattum 👇
  console.log("🛡️ Protected Route Security Check:", user); 

  if (!user) {
    console.log("❌ User not logged in. Redirecting to Home...");
    return <Navigate to="/" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    console.log("❌ User is NOT admin. Role is:", user.role);
    return <Navigate to="/" />;
  }

  console.log("✅ Access Granted to Admin!");
  return children;
};

export default ProtectedRoute;