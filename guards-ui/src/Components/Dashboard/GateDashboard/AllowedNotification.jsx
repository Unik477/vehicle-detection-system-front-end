import { useState, useEffect } from "react";

const AllowedNotification = ({ vehicle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [vehicle]);

  if (!isVisible) return null;

  return (
    <div
      className="alert alert-success alert-dismissible fade show d-flex align-items-center shadow-sm border-0 rounded-3 p-3"
      role="alert"
    >
      <i className="bi bi-check-circle-fill me-3 fs-4"></i>
      <div>
        <strong>Vehicle {vehicle}</strong> is allowed to pass!
      </div>
      <button
        type="button"
        className="btn-close ms-auto"
        aria-label="Close"
        onClick={() => setIsVisible(false)}
      ></button>
    </div>
  );
};

export default AllowedNotification;
