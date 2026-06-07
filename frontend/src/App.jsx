import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin'; // Puthusa add pannirukom
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-[#8C52FF] selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Admin Login Route */}
          <Route path="/admin" element={<AdminLogin />} />
          
          {/* Protected Admin Dashboard Route */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;