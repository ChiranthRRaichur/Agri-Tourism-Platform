import { useFormik } from "formik";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Booking.css";

const BookingPage = () => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [tourCapacity, setTourCapacity] = useState(0);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    // Fetch tour capacity from localStorage when the component mounts
    const storedCapacity = localStorage.getItem("tour_capacity");
    if (storedCapacity) {
      setTourCapacity(parseInt(storedCapacity));
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const today = new Date().toISOString().substr(0, 10);

  const formik = useFormik({
    initialValues: {
      booking_id: "",
      customer_name: localStorage.getItem("customer_name") || "",
      contactNo: "",
      bookingDate: today,
      tourDate: "",
      numberOfPeople: "",
    },

    onSubmit: async (values) => {
      try {
        // Retrieve customer_id and tour_id from localStorage
        const customer_id = localStorage.getItem("customer_id");
        const tour_id = localStorage.getItem("tour_id");

        // Verify if the number of people exceeds the tour capacity
        if (parseInt(values.numberOfPeople) > tourCapacity) {
          alert(
            "Number of people exceeds tour capacity. Please choose a lower number."
          );
          return;
        }
        console.log(values);
        // Send data to the backend using Axios
        const response = await axios.post(
          `http://localhost:5000/addbooking/${customer_id}/${tour_id}`,
          values
        );
        if (response.data.error) {
          alert(response.data.error); // Alert the error message
        } else {
          //   // Alert success or perform other actions if needed
          alert(response.data.message);
          localStorage.setItem("Booking_id", response.data.booking_id);
          setBookingConfirmed(true);
          setBookingId(response.data.booking_id);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <>
      <div className="B-body" style={{ backgroundColor: "#000000f1" }}>
        <div className="bg-C">
          <div id="title-C-B">
            FIELDVISTA<span className="captcha">-An AgriTour</span>
          </div>

          <nav className="navbar-C-B">
            <Link href="#" style={{ color: "white" }}>
              HOME
            </Link>
            <a href="#about" style={{ color: "white" }}>
              ABOUT
            </a>
            <a href="#about" style={{ color: "white" }}>
              CONTACT
            </a>
            <a
              style={{ color: "white" }}
              onClick={() => {
                // Clear all data stored in localStorage
                localStorage.clear();
                // Redirect to the home page
                window.location.href = "/";
              }}
            >
              SIGN-OUT
            </a>
          </nav>
        </div>

        <div
          className="booking-container"
          // style={{ backgroundColor: "whitesmoke" }}
        >
          {!bookingConfirmed ? (
            <form onSubmit={formik.handleSubmit} className="form-B">
              <div className="py-5 text-center">
                <h1
                  style={{
                    fontFamily: "Anta, sans-serif",
                    fontWeight: "950",
                    fontStyle: "normal",
                    color: "White",
                    textDecoration: "underline",
                  }}
                >
                  BOOKING PAGE
                </h1>
              </div>
              <div className="form-group">
                <label className="label-B" htmlFor="customer_name">
                  Name
                </label>
                <input
                  className="input-B"
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  onChange={formik.handleChange}
                  value={formik.values.customer_name}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label-B" htmlFor="contactNo">
                  Contact Number
                </label>
                <input
                  className="input-B"
                  type="tel"
                  id="contactNo"
                  name="contactNo"
                  onChange={formik.handleChange}
                  value={formik.values.contactNo}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label-B" htmlFor="bookingDate">
                  Booking Date
                </label>
                <input
                  className="input-B"
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  onChange={formik.handleChange}
                  value={formik.values.bookingDate}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label-B" htmlFor="tourDate">
                  Tour Date
                </label>
                <input
                  className="input-B"
                  type="date"
                  id="tourDate"
                  name="tourDate"
                  onChange={formik.handleChange}
                  value={formik.values.tourDate}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label-B" htmlFor="numberOfPeople">
                  Number of People
                </label>
                <input
                  className="input-B"
                  min="1"
                  type="number"
                  id="numberOfPeople"
                  name="numberOfPeople"
                  onChange={formik.handleChange}
                  value={formik.values.numberOfPeople}
                  required
                />
              </div>

              <button className="button-bc" type="submit">
                Confirm Booking
              </button>
            </form>
          ) : (
            <div className="confirmed" style={{ color: "white" }}>
              {/* Confirmation message */}
              <img
                width={150}
                height={150}
                src="https://www.shutterstock.com/image-vector/check-mark-icon-symbols-vector-600nw-1906113508.jpg"
                className="rounded mx-auto d-block"
                alt="Confirmation Checkmark"
              ></img>
              <br />
              {/* <p>Booking-ID: {bookingId}</p> */}
              <h1 style={{ marginBottom: "20px" }}>Booking Confirmed</h1>
              {/* <p>Booking-ID: {formik.values.Booking_id}</p> */}
              <p>Name: {formik.values.customer_name}</p>
              <p>Contact Number: {formik.values.contactNo}</p>
              <p>Booking Date: {formik.values.bookingDate}</p>
              <p>Tour Date: {formik.values.tourDate}</p>
              <p>Number of People: {formik.values.numberOfPeople}</p>
              <br />
              <h1 className="abc">"Adventure Awaits!"</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingPage;
