import React, { useState, useEffect } from "react";
import axios from "axios";
import "./View_bookings.css";

function View_bookings() {
  const [bookings, setBookings] = useState([]);
  const farmerId = localStorage.getItem("farmer_id");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/View_bookings/${farmerId}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (farmerId) {
      fetchBookings();
    }
  }, [farmerId]);

  return (
    <div className="container-VB">
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Anta, sans-serif",
          fontWeight: "750",
          fontStyle: "normal",
          marginTop: "15px",
          marginBottom: "30px",
        }}
      >
        Tour Bookings
      </h1>
      <div className="booking-cards-VB">
        {bookings.map((booking) => (
          <div className="booking-card-VB" key={booking.booking_id}>
            <h2 style={{ marginBottom: "30px" }}>
              Booking ID #{booking.booking_id}
            </h2>
            <p className="booking-info">
              <span className="bold">Customer:</span> {booking.customer_name}
            </p>
            <p className="booking-info">
              <span className="bold">Contact:</span> {booking.customer_contact}
            </p>
            <p className="booking-info status">
              <span className="bold">Status:</span> {booking.status}
            </p>
            <p className="booking-info">
              <span className="bold">Booking Date:</span>{" "}
              {new Date(booking.booking_date).toLocaleDateString()}
            </p>
            <p className="booking-info">
              <span className="bold">Tour Date:</span>{" "}
              {new Date(booking.tour_date).toLocaleDateString()}
            </p>
            <p className="booking-info">
              <span className="bold">Number of People:</span>{" "}
              {booking.number_of_people}
            </p>
            <p className="booking-info">
              <span className="bold">Tour ID:</span> {booking.tour_id}
            </p>
            <p className="booking-info">
              <span className="bold">Tour Name:</span> {booking.tour_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default View_bookings;
