import './App.css'
import GateDashboard from './Components/Dashboard/GateDashboard/GateDashboard'
import AdminDashboard from './Components/Dashboard/AdminDashboard/AdminDashboard'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useGlobalContext } from './Components/ContextAPI/GlobalContext'
import Home from './Components/Home/Home'
import GateLogin from './Components/Login/GateLogin'
import AdminLogin from './Components/Login/AdminLogin'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useGlobalContext();
  if (!isLoggedIn) {

    return <Navigate to="/" />;
  }
  return children;
};

// Public Route Component (accessible only when logged out)
const PublicRoute = ({ children }) => {
  const { isLoggedIn, userType } = useGlobalContext();
  
  // Only show toast if user is already logged in and trying to access public routes
  if (isLoggedIn && window.location.pathname === '/') {
    toast.info('Logout yourself first!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  
  if (isLoggedIn) {
    return <Navigate to={userType === 'admin' ? '/admin-dashboard' : '/guard-dashboard'} />;
  }
  
  return children;
};

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Public routes - only accessible when logged out */}
        <Route path="/" element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />
        <Route path="/admin-login" element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        } />
        <Route path="/guard-login" element={
          <PublicRoute>
            <GateLogin />
          </PublicRoute>
        } />

        {/* Protected route - only accessible when logged in */}
        <Route path="/guard-dashboard" element={
          <ProtectedRoute>
            <GateDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin-dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        {/* Catch all other routes and redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App