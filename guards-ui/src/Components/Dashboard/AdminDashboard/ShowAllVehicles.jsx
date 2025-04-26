import { useState, useEffect } from 'react';
import axios from 'axios';

const ShowAllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vehicles/all');
        setVehicles(response.data);
        setLoading(false);
      } catch  {
        setError('Failed to fetch vehicle data');
        setLoading(false);
      }
    };

    fetchVehicles();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchVehicles, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">All Vehicles Record</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Vehicle Number</th>
              <th>Type</th>
              <th>Entry Time</th>
              <th>Exit Time</th>
              <th>Entry Gate</th>
              <th>Exit Gate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.vehicleNumber}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{new Date(vehicle.entryTime).toLocaleString()}</td>
                <td>{vehicle.exitTime ? new Date(vehicle.exitTime).toLocaleString() : '-'}</td>
                <td>{vehicle.entryGate}</td>
                <td>{vehicle.exitGate || '-'}</td>
                <td>
                  <span className={`badge ${vehicle.status === 'IN' ? 'bg-success' : 'bg-danger'}`}>
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowAllVehicles;