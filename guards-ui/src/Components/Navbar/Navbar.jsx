import { useGlobalContext } from "../ContextAPI/GlobalContext";

const Navbar = () => {
  const { isLoggedIn, gateNumber, setIsLoggedIn, setGateNumber, userType  } = useGlobalContext();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setGateNumber(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("gateNumber");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span className="fs-5 fw-semibold">BBAU Vehicle Management System</span>
        </a>

        {/* Render this div only if the user is logged in and gateNumber is not null */}
        {isLoggedIn &&  (
          <div className="d-flex align-items-center gap-3">
           {userType=="guard" && 
           <span className="text-light fs-5 fw-semibold">GATE: {gateNumber}</span>
           } 
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;