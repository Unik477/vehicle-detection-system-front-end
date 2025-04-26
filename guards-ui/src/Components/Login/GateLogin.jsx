import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../ContextAPI/GlobalContext";

const GateLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, setGateNumber } = useGlobalContext();
  const [selectedGate, setSelectedGate] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      if (res.status === 200) {
        setIsLoggedIn(true);
        setGateNumber(selectedGate); // set selected gate globally
        onLoginSuccess();
      }
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="mb-3 text-center"> Gate System Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
  <label className="form-label">Select Gate Number</label>
  <div className="d-flex justify-content-between">
    <div className="form-check">
      <input
        type="radio"
        id="gate1"
        name="gate"
        value="1"
        checked={selectedGate === "1"}
        onChange={(e) => setSelectedGate(e.target.value)}
        className="form-check-input"
        required
      />
      <label htmlFor="gate1" className="form-check-label ms-1">Gate 1</label>
    </div>
    <div className="form-check">
      <input
        type="radio"
        id="gate2"
        name="gate"
        value="2"
        checked={selectedGate === "2"}
        onChange={(e) => setSelectedGate(e.target.value)}
        className="form-check-input"
        required
      />
      <label htmlFor="gate2" className="form-check-label ms-1">Gate 2</label>
    </div>
    <div className="form-check">
      <input
        type="radio"
        id="gate3"
        name="gate"
        value="3"
        checked={selectedGate === "3"}
        onChange={(e) => setSelectedGate(e.target.value)}
        className="form-check-input"
        required
      />
      <label htmlFor="gate3" className="form-check-label ms-1">Gate 3</label>
    </div>
  </div>
</div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GateLogin;