import React, { useState } from 'react';

const VehicleSearch = ({ onSearchChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(localSearchTerm);
  };

  const handleChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <div className="mb-4">
      <h4 className="mb-3">Search by Vehicle Number</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter vehicle number..."
            value={localSearchTerm}
            onChange={handleChange}
            aria-label="Search vehicles"
          />
          <button 
            className="btn btn-primary" 
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleSearch;