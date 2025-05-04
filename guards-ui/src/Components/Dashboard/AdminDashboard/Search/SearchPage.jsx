import { useState } from 'react';
import axios from 'axios';
import VehicleTable from './VehicleTable';

const SearchPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleRefresh = async () => {
    if (startTime && endTime) {
      await handleTimeIntervalSearch();
    } else if (selectedDate) {
      await handleDateSearch();
    } else if (filterType) {
      await handleTypeSearch();
    } else if (searchQuery) {
      await handleVehicleSearch();
    }
  };

  const handleDateSearch = async () => {
    setLoading(true);
    setError(null);
    setEndTime('')
    setStartTime('')
    setSearchQuery('');
    setFilterType('');
    try {
      const response = await axios.get(`http://localhost:8080/api/vehicles/date/${selectedDate}`);
      setVehicles(response.data);
    } catch {
      setError('Failed to fetch vehicles');
      setVehicles([]);
    }
    setLoading(false);
  };
  
  const handleTypeSearch = async () => {
    setLoading(true);
    setError(null);
    setEndTime('')
    setStartTime('')
    setSearchQuery('');
    setSelectedDate('');
    try {
      const response = await axios.get(`http://localhost:8080/api/vehicles/type/${filterType}`);
      setVehicles(response.data);
    } catch {
      setError('Failed to fetch vehicles');
      setVehicles([]);
    }
    setLoading(false);
  };
  
  const handleVehicleSearch = async () => {
    setLoading(true);
    setError(null);
    setEndTime('')
    setStartTime('')
    setSelectedDate('');
    setFilterType('');
    try {
      const response = await axios.get(`http://localhost:8080/api/vehicles/${searchQuery}`);
      setVehicles(response.data);
    } catch {
      setError('Failed to fetch vehicles');
      setVehicles([]);
    }
    setLoading(false);
  };

  const handleTimeIntervalSearch = async () => {
    setLoading(true);
    setError(null);
    setSearchQuery('');
    setSelectedDate('');
    setFilterType('');
    
    try {
      const response = await axios.get(
        `http://localhost:8080/api/vehicles/interval`,
        {
          params: {
            startTime: startTime,
            endTime: endTime
          }
        }
      );
      setVehicles(response.data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch vehicles');
      setVehicles([]);
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4">University Traffic Monitor</h1>
      
      <div className="row mb-4 g-3">
        {/* Vehicle Number Search */}
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by vehicle number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="btn btn-primary" 
              onClick={handleVehicleSearch}
              disabled={!searchQuery}
            >
              Search
            </button>
          </div>
        </div>

        {/* Vehicle Type Filter */}
        <div className="col-md-4">
          <div className="input-group">
            <select 
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Select vehicle type</option>
              <option value="PRIVATE">PRIVATE</option>
              <option value="COMMERCIAL">COMMERCIAL</option>
              <option value="ELECTRIC">ELECTRIC</option>
              <option value="GOVERNMENT">GOVERNMENT</option>
              <option value="OTHER">OTHER</option>
            </select>
            <button 
              className="btn btn-primary" 
              onClick={handleTypeSearch}
              disabled={!filterType}
            >
              Search
            </button>
          </div>
        </div>

        {/* Date Filter */}
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button 
              className="btn btn-primary" 
              onClick={handleDateSearch}
              disabled={!selectedDate}
            >
              Search
            </button>
          </div>
        </div>
    <hr />
        <h2 className="mb-4">Custom Search </h2>
        {/* Time Interval Search */}
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="datetime-local"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Start Time"
            />
            <input
              type="datetime-local"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="End Time"
            />
            <button 
              className="btn btn-primary" 
              onClick={handleTimeIntervalSearch}
              disabled={!startTime || !endTime}
            >
               Search
            </button>
          </div>
        </div>
      </div>

      <hr />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <VehicleTable 
          vehicles={vehicles} 
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
};

export default SearchPage;