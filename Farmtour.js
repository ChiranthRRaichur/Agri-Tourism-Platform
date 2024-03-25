import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./FarmTour.css"; // Import CSS file for styling

const Farmtour = () => {
  const [tours, setTours] = useState([]);
  const { farmId } = useParams();
  const [editingTour, setEditingTour] = useState(null);
  const [editedTourData, setEditedTourData] = useState({
    tour_name: "",
    duration: "",
    capacity: "",
    price: "",
    activities: [],
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/farm_tours/${farmId}`
        );
        const toursData = response.data.map((tour) => ({
          tour_id: tour.TOUR_ID,
          tour_name: tour.TOUR_NAME,
          duration: tour.DURATION,
          capacity: tour.CAPACITY,
          price: tour.PRICE,
          activities: tour.TOUR_ACTIVITIES.split(",").map((activity) => ({
            tour_activity: activity.trim(),
          })),
        }));
        setTours(toursData);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, [farmId]);

  const handleEditTour = (tour) => {
    setEditingTour(tour);
    setEditedTourData({
      tour_name: tour.tour_name,
      duration: tour.duration,
      capacity: tour.capacity,
      price: tour.price,
      activities: tour.activities.map((activity) => ({ ...activity })),
    });
  };

  const handleUpdateTour = async (tourId) => {
    try {
      // Send updated tour data to the backend
      console.log(tourId);
      const response = await axios.put(
        `http://localhost:5000/update_tour/${tourId}`,
        editedTourData
      );

      // Update tour details in the local state
      setTours(
        tours.map((tour) =>
          tour.tour_id === tourId ? { ...tour, ...editedTourData } : tour
        )
      );

      setEditingTour(null);
      // Display success message
      if (response.data.message === "1") {
        alert("Tour updated successfully!");
      }
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  const handleDeleteTour = async (tourId) => {
    // Ask for confirmation before deleting the tour
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour?"
    );
    if (!confirmDelete) return; // If user cancels, do nothing

    try {
      // Send delete request to backend to delete the tour
      await axios.delete(`http://localhost:5000/delete_tour/${tourId}`);
      // Remove the deleted tour from the local state
      setTours(tours.filter((tour) => tour.tour_id !== tourId));
      // Display a success message
      alert("Tour deleted successfully!");
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };
  const addTour = () => {
    window.location.href = "/addtour";
  };
  return (
    <>
      <div className="navbar-container-FT">
        <div id="title-FT">
          FIELDVISTA<span className="captcha">-An AgriTour</span>
        </div>

        <nav className="navbar_farmer" id="navbar_farmer">
          <div className="navbar-links-Ft">
            <Link className="nav-link-FT" to="http://localhost:3000/">
              Home
            </Link>
            <a className="nav-link-FT" href="#about">
              View Bookings
            </a>
            <a
              className="nav-link-FT"
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
      <div className="farm-tours-container-FT">
        <h2
          style={{
            textAlign: "center",
            fontFamily: "Anta, sans-serif",
            fontWeight: "750",
            fontStyle: "normal",
          }}
        >
          Tours for Farm ID: {farmId}
        </h2>
        <div className="tour-cards-container-FT">
          {tours.map((tour) => (
            <div key={tour.tour_id} className="tour-card-FT">
              {editingTour === tour ? (
                <div>
                  <label htmlFor="tourName">Tour Name:</label>
                  <input
                    type="text"
                    id="tourName"
                    value={editedTourData.tour_name}
                    onChange={(e) =>
                      setEditedTourData({
                        ...editedTourData,
                        tour_name: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="duration">Duration:</label>
                  <input
                    type="text"
                    id="duration"
                    value={editedTourData.duration}
                    onChange={(e) =>
                      setEditedTourData({
                        ...editedTourData,
                        duration: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="capacity">Capacity:</label>
                  <input
                    type="text"
                    id="capacity"
                    value={editedTourData.capacity}
                    onChange={(e) =>
                      setEditedTourData({
                        ...editedTourData,
                        capacity: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    id="price"
                    value={editedTourData.price}
                    onChange={(e) =>
                      setEditedTourData({
                        ...editedTourData,
                        price: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="activities">Activities:</label>
                  <input
                    type="text"
                    id="activities"
                    value={editedTourData.activities
                      .map((activity) => activity.tour_activity)
                      .join(", ")}
                    onChange={(e) =>
                      setEditedTourData({
                        ...editedTourData,
                        activities: e.target.value
                          .split(",")
                          .map((activity) => ({
                            tour_activity: activity.trim(),
                          })),
                      })
                    }
                  />
                  <button onClick={() => handleUpdateTour(tour.tour_id)}>
                    Update
                  </button>
                </div>
              ) : (
                <div>
                  <h4
                    style={{
                      textAlign: "center",
                      fontFamily: "Anta, sans-serif",
                      fontWeight: "750",
                      fontStyle: "normal",
                    }}
                  >
                    {" "}
                    Tour:&nbsp;
                    {tour.tour_name}
                  </h4>
                  <p style={{ fontSize: "20px", paddingTop: "20px" }}>
                    Duration: {tour.duration}
                  </p>
                  <p style={{ fontSize: "20px" }}>Capacity: {tour.capacity}</p>
                  <p style={{ fontSize: "20px" }}>Price: {tour.price}</p>
                  <p style={{ fontSize: "20px" }}>Activities:</p>
                  <ul>
                    {tour.activities.map((activity, index) => (
                      <li key={index}>{activity.tour_activity}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleEditTour(tour)}
                    className="btn-FT"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTour(tour.tour_id)}
                    className="btn-FT"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="fixed-button-container">
          <button className="fixed-button" title="Add Farm" onClick={addTour}>
            <span className="button-icon">+</span>
            <span className="button-text">Add Tour</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Farmtour;
