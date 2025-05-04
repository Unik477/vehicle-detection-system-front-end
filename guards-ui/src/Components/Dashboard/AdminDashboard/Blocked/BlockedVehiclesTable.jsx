import React, { useMemo } from 'react';

const BlockedVehiclesTable = ({ 
  vehicles, 
  onRefresh, 
  currentPage, 
  setCurrentPage,
  isSearching // Add this prop
}) => {
  const entriesPerPage = 5;

  // Sort vehicles by blocked date in descending order (newest first)
  const sortedVehicles = useMemo(() => {
    return [...vehicles].sort((a, b) => 
      new Date(b.blockedDate) - new Date(a.blockedDate)
    );
  }, [vehicles]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedVehicles.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(sortedVehicles.length / entriesPerPage);
  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Blocked Vehicles</h3>
          <button 
            className="btn btn-outline-primary"
            onClick={onRefresh}
          >
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </button>
        </div>
        <p className="text-center">No blocked vehicles found</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Blocked Vehicles</h3>
          {/* Only show count when searching and results found */}
          {isSearching && vehicles.length > 0 && (
            <div className="text-muted">
              <span className="badge bg-info">
                <i className="bi bi-exclamation-circle me-1"></i>
                This vehicle has been blocked {vehicles.length} time(s)
              </span>
            </div>
          )}
        </div>
        <button 
          className="btn btn-outline-primary"
          onClick={onRefresh}
        >
          <i className="bi bi-arrow-clockwise"></i> Refresh
        </button>
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Vehicle Number</th>
              <th>Status</th>
              <th>Blocked By</th>
              <th>Blocked Reason</th>
              <th>Blocked Date</th>
              <th>Allowed By</th>
              <th>Allowed Reason</th>
              <th>Allowed Date</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.vehicleNumber}</td>
                <td>
                  <span className={`badge ${vehicle.status === 'BLOCKED' ? 'bg-danger' : 'bg-success'}`}>
                    {vehicle.status}
                  </span>
                </td>
                <td>{vehicle.blockedBy}</td>
                <td>{vehicle.blockedReason}</td>
                <td>{new Date(vehicle.blockedDate).toLocaleString()}</td>
                <td>{vehicle.allowedBy || '-'}</td>
                <td>{vehicle.allowedReason || '-'}</td>
                <td>{vehicle.allowedDate ? new Date(vehicle.allowedDate).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, vehicles.length)} of {vehicles.length} entries
        </div>
        <div className="btn-group">
          <button 
            className="btn btn-outline-primary" 
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button 
            className="btn btn-outline-primary" 
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedVehiclesTable;