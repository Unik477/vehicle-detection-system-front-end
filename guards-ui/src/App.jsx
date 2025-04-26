
import './App.css'
import GateDashboard from './Components/Dashboard/GateDashboard/GateDashboard'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
// import { useGlobalContext } from './Components/ContextAPI/GlobalContext';
import Home from './Components/Home/Home';
import GateLogin from './Components/Login/GateLogin';
import AdminLogin from './Components/Login/AdminLogin';

function App() {
  
  // const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  return (
    <>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/guard-login" element={<GateLogin />} />
        <Route path="/guard-dashboard" element={<GateDashboard/>}/>
      </Routes>
      {/* {isLoggedIn ? (
        <GateDashboard />
      ) : (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )} */}
      
    </>
  )
}

export default App
