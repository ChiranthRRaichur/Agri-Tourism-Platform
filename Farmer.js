//farmer.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Farmer.css";
import FarmList from "./FarmList"; // Assuming the file containing FarmList component is in the same directory

export default function Farmer() {
  const [farmerDetails, setFarmerDetails] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [showProfileDetails, setShowProfileDetails] = useState(false);

  useEffect(() => {
    // Fetch farmer details from local storage
    const farmerId = localStorage.getItem("farmer_id"); // use local storage: response data are set into local storage, we are using this bcoz if iam farmer, once i login a session is created, so wherever the farner navigates in the session the data should be available.....Once we signout, local storage is cleared
    const farmerName = localStorage.getItem("farmer_name");
    const farmerEmail = localStorage.getItem("farmer_email");
    const farmerPhone = localStorage.getItem("farmer_phone");

    // Update state with farmer details
    setFarmerDetails({
      id: farmerId,
      name: farmerName,
      email: farmerEmail,
      phoneNumber: farmerPhone,
    });
  }, []);

  const toggleProfileDetails = () => {
    setShowProfileDetails(!showProfileDetails);
  };

  return (
    <div>
      <div className="navbar-container-FA">
        <div id="title-F">
          FIELDVISTA<span className="captcha">-An AgriTour</span>
        </div>

        <nav className="navbar_farmer" id="navbar_farmer">
          <div className="navbar-linkss">
            <Link className="nav-link-F" to="http://localhost:3000/">
              Home
            </Link>
            <a className="nav-link-F" href="./View_bookings">
              View Bookings
            </a>

            <a
              className="nav-link-F profile-link"
              onMouseEnter={toggleProfileDetails}
              onMouseLeave={toggleProfileDetails}
            >
              Profile
              {showProfileDetails && (
                <div className="profile-details">
                  <p>
                    <strong>ID:</strong> {farmerDetails.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {farmerDetails.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {farmerDetails.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {farmerDetails.phoneNumber}
                  </p>
                </div>
              )}
            </a>
            <a
              className="nav-link-F"
              onClick={() => {
                // Clear all data stored in localStorage
                localStorage.clear();
                // Redirect to the home page
                window.location.href = "/";
              }}
            >
              Sign Out
            </a>
          </div>
        </nav>
      </div>

      <div className="field-wrap1">
        <div className="row">
          <div className="col-md-12 offset-md-3 ">
            <div className="farmer-card" id="farmer_card"></div>
          </div>
        </div>
      </div>

      <div className="farm-list">
        <p className="farm-hd">Farm Details</p>
        <FarmList />
      </div>
    </div>
  );
}
