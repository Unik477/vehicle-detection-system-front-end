// App.jsx
import './App.css';
import GateDashboard from './Components/Dashboard/GateDashboard';
import Navbar from './Components/Navbar/Navbar';
import LoginPage from './Components/Login/LoginPage';
import WebSocketHandler from './Components/WebSockets/WebSocketHandler';
import { useGlobalContext } from './Components/ContextAPI/GlobalContext';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useGlobalContext();

  return (
    <>
      <Navbar />
      {isLoggedIn ? (
        <>
          <GateDashboard />
          <WebSocketHandler /> {/* Display WebSocket messages */}
        </>
      ) : (
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
