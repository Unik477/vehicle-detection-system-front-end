import React, { useState, useEffect } from "react";
import axios from "axios";
import BlockedVehiclesTable from "./BlockedVehiclesTable";
import BlockVehicleForm from "./BlockVehicleForm";

const BlockedDashboard = () => {
  const [blockedVehicles, setBlockedVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const fetchBlockedVehicles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/blocked-vehicles/all"
      );
      setBlockedVehicles(response.data);
      setLoading(false);
    } catch {
      setError("Error fetching blocked vehicles data");
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    fetchBlockedVehicles();
    setShowForm(false); // Hide form after successful submission
  };

  const handleSearch = (value) => {
    setCurrentPage(1); // Reset to first page when searching
    setIsSearching(!!value.trim()); // Set searching state based on value

    if (!value.trim()) {
      setFilteredVehicles(blockedVehicles);
      return;
    }
    const filtered = blockedVehicles.filter(vehicle =>
      vehicle.vehicleNumber.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVehicles(filtered);
  };

  useEffect(() => {
    fetchBlockedVehicles();
  }, []);

  useEffect(() => {
    setFilteredVehicles(blockedVehicles); // Initialize with all vehicles
  }, [blockedVehicles]);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Blocked Vehicles Management</h2>
        <button
          className={`btn ${showForm ? "btn-danger" : "btn-primary"}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? (
            <>
              <i className="bi bi-x-lg"></i> Close Form
            </>
          ) : (
            <>
              <i className="bi bi-plus-lg"></i> Block/Allow Vehicle
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="mb-4">
          <BlockVehicleForm onSuccess={handleFormSuccess} />
        </div>
      )}

      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by vehicle number..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <BlockedVehiclesTable
          vehicles={filteredVehicles}
          onRefresh={fetchBlockedVehicles}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isSearching={isSearching} // Pass isSearching prop
        />
      )}
    </div>
  );
};

export default BlockedDashboard;
