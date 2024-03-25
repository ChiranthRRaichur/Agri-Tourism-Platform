import React, { useState } from "react";
import axios from "axios";
import "./Filter.css";

export default function Filter() {
  const [farmLocations, setFarmLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");

  // Function to fetch farm locations
  const fetchFarmLocations = () => {
    axios
      .get("/api/farm/locations")
      .then((response) => {
        setFarmLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching farm locations: ", error);
      });
  };

  // Function to handle filter application
  const applyFilter = () => {
    // Make API call with selected filters
    axios
      .get("/api/tours", {
        params: {
          location: selectedLocation,
          priceRange: selectedPriceRange,
          capacity: selectedCapacity,
        },
      })
      .then((response) => {
        // Handle response
        console.log("Filtered tours: ", response.data);
      })
      .catch((error) => {
        console.error("Error applying filters: ", error);
      });
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-option" onMouseEnter={fetchFarmLocations}>
          <p>Farm Location</p>
          {farmLocations.length > 0 && (
            <div className="location-dropdown">
              {farmLocations.map((location, index) => (
                <p key={index} onClick={() => setSelectedLocation(location)}>
                  {location}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="filter-option">
          <p>Prices</p>
          <div className="price-checkboxes">
            <input
              type="checkbox"
              value="0-50"
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            />
            <label>$0 - $50</label>
            <br />
            <input
              type="checkbox"
              value="51-100"
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            />
            <label>$51 - $100</label>
            <br />
            {/* Add more price ranges as needed */}
          </div>
        </div>
        <div className="filter-option">
          <p>Capacity</p>
          <div className="capacity-options">
            {[10, 20, 30, 40, 50].map((capacity, index) => (
              <p key={index} onClick={() => setSelectedCapacity(capacity)}>
                {capacity}
              </p>
            ))}
          </div>
        </div>
        <button onClick={applyFilter}>Apply</button>
      </div>
    </div>
  );
}
