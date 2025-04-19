
import './App.css'
import GateDashboard from './Components/Dashboard/GateDashboard'
import Navbar from './Components/Navbar/Navbar'
import LoginPage from './Components/Login/LoginPage';
import { useGlobalContext } from './Components/ContextAPI/GlobalContext';

function App() {
  
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();
  return (
    <>
      <Navbar />
      {isLoggedIn ? (
        <GateDashboard />
      ) : (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  )
}

export default App
