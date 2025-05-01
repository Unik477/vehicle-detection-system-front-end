import { useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { GlobalContext } from "../../ContextAPI/GlobalContext";

const AllowedNotification = () => {
  const [allowedVehicles, setAllowedVehicles] = useState([]);
  const [blockReason, setBlockReason] = useState({});
  const [isProcessing, setIsProcessing] = useState({});
  const { guardID } = useContext(GlobalContext);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {},
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");

      stompClient.subscribe("/topic/allowed-vehicle", (message) => {
        const vehicle = JSON.parse(message.body);
        console.log("Allowed vehicle received:", vehicle);
        
        const vehicleWithId = {
          ...vehicle,
          id: Date.now(),
        };
        
        setAllowedVehicles(prev => [...prev, vehicleWithId]);

        setTimeout(() => {
          setAllowedVehicles(prev => 
            prev.filter(v => v.id !== vehicleWithId.id)
          );
        }, 30000);
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
      console.error("Additional details:", frame.body);
    };

    stompClient.activate();

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, []);

  const handleDelete = (id) => {
    setAllowedVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
  };

  const handleBlock = async (vehicle) => {
    const reason = blockReason[vehicle.id];
    if (!reason?.trim()) {
      alert("Please provide a reason for blocking");
      return;
    }
  
    setIsProcessing(prev => ({ ...prev, [vehicle.id]: true }));
  
    try {
      // First block the vehicle
      const blockResponse = await fetch("http://localhost:8080/api/blocked-vehicles/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleNumber: vehicle.vehicleNumber,
          blockedBy: guardID || "Unknown Guard",
          blockedReason: reason,
          suppressNotification: true  // Add this flag to prevent notification
        })
      });
  
      if (!blockResponse.ok) {
        throw new Error("Failed to block vehicle");
      }
  
      // Then delete the vehicle entry
      const deleteResponse = await fetch("http://localhost:8080/api/vehicles/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleNumber: vehicle.vehicleNumber,
          entryDate: new Date(vehicle.entryTime).toISOString().split('T')[0],
          entryGate: vehicle.entryGate
        })
      });
  
      if (!deleteResponse.ok) {
        throw new Error("Failed to delete vehicle entry");
      }
  
      // Remove notification and clear reason
      handleDelete(vehicle.id);
      setBlockReason(prev => {
        const newState = { ...prev };
        delete newState[vehicle.id];
        return newState;
      });
  
    } catch (error) {
      console.error("Error blocking vehicle:", error);
      alert("Failed to block vehicle. Please try again.");
    } finally {
      setIsProcessing(prev => {
        const newState = { ...prev };
        delete newState[vehicle.id];
        return newState;
      });
    }
  };

  if (allowedVehicles.length === 0) return null;

  return (
    <div className="notifications-container">
      {allowedVehicles.map(vehicle => (
        <div key={vehicle.id} className="alert alert-success mb-3 position-relative">
          <button 
            type="button" 
            className="btn-close position-absolute top-0 end-0 m-2"
            onClick={() => handleDelete(vehicle.id)}
            aria-label="Close"
          ></button>
          
          <h5>✅ Vehicle Entry</h5>
          <p className="mb-1">Vehicle Number: {vehicle.vehicleNumber}</p>
          <p className="mb-1">Entry Gate: {vehicle.entryGate}</p>
          <p className="mb-1">Time: {new Date(vehicle.entryTime).toLocaleTimeString()}</p>

          <div className="mt-2 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Reason for blocking..."
              value={blockReason[vehicle.id] || ''}
              onChange={(e) => setBlockReason(prev => ({
                ...prev,
                [vehicle.id]: e.target.value
              }))}
              disabled={isProcessing[vehicle.id]}
            />
            <button 
              className="btn btn-danger"
              onClick={() => handleBlock(vehicle)}
              disabled={!blockReason[vehicle.id]?.trim() || isProcessing[vehicle.id]}
            >
              {isProcessing[vehicle.id] ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                'Block Entry'
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllowedNotification;