import { useState } from "react";

const BlockedNotification = () => {
  const [blockedVehicle, setBlockedVehicle] = useState("UP32 AB 4455");
  const [reason, setReason] = useState("");
  const [entryStatus, setEntryStatus] = useState("");

  const clearNotification = () => {
    setBlockedVehicle(null);
    setReason("");
  };

  const handleStopEntry = () => {
    setEntryStatus(`Entry Stopped for vehicle ${blockedVehicle}`);
    alert(`Entry has been stopped for ${blockedVehicle}.`);
    clearNotification();
  };

  const handleAllowEntry = () => {
    setEntryStatus(`Allowed ${blockedVehicle} with reason: ${reason}`);
    alert(`Vehicle ${blockedVehicle} allowed with reason: ${reason}`);
    clearNotification();
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h5 className="card-title mb-4">🚨 Blocked Vehicle Alert</h5>

        {blockedVehicle ? (
          <div className="alert alert-danger d-flex flex-column gap-3">
            <div className="fs-5">
              <strong>⚠️ Blocked Vehicle Detected:</strong>{" "}
              <span
                className="badge bg-danger fs-4 p-2"
                style={{
                  border: "2px solid white",
                  boxShadow: "0 0 10px rgba(255,0,0,0.7)",
                }}
              >
                {blockedVehicle}
              </span>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-danger"
                onClick={handleStopEntry}
              >
                Entry Stopped
              </button>

              <input
                type="text"
                className="form-control"
                placeholder="Reason for allowing..."
                style={{ maxWidth: "250px" }}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <button
                className="btn btn-success"
                onClick={handleAllowEntry}
                disabled={!reason.trim()}
              >
                Allow
              </button>
            </div>
          </div>
        ) : (
          <p className="text-muted">No blocked vehicles detected right now.</p>
        )}

        {/* Show latest status */}
        {entryStatus && (
          <div className="mt-3 alert alert-info">
            <strong>Status:</strong> {entryStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockedNotification;
