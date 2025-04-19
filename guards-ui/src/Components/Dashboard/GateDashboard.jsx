import BlockedNotification from "./BlockedNotification";
import AllowedNotification from "./AllowedNotification"; // Import the new component
import { useState } from "react";

const GateDashboard = () => {
  const [allowedVehicle, setAllowedVehicle] = useState(null);

  
  const handleNewVehicle = (vehicle) => {
    setAllowedVehicle(vehicle);
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left Half: Blocked Notification */}
        <div className="col-md-6 mb-3">
          <BlockedNotification />
        </div>

        {/* Right Half: Allowed Notification */}
        <div className="col-md-6 mb-3">
          <AllowedNotification vehicle={allowedVehicle} />
        </div>
      </div>

     
      <div className="row mt-3">
        <div className="col-12 text-center">
          <button
            className="btn btn-primary"
            onClick={() => handleNewVehicle("ABC123")}
          >
            Simulate Allowed Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default GateDashboard;