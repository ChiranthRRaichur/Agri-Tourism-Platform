import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Customer.css";

//Importing Flter compo
import Filter from "../Filter/Filter";

export default function Customer() {
  // const [scrolled, setScrolled] = useState(false);
  const [toursData, setToursData] = useState([]); // Initialize toursData state

  useEffect(() => {
    // Fetch tour data from an API endpoint
    const fetchToursData = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const response = await fetch("http://localhost:5000/all_tours");
        const data = await response.json(); //Converting into JSON
        setToursData(data); // Set the fetched tour data to the state
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchToursData();
  }, []);

  return (
    <div style={{ backgroundColor: "#000000f1", minHeight: "100vh" }}>
      <div className="bg-C">
        <div id="title-C">
          FIELDVISTA<span className="captcha">-An AgriTour</span>
        </div>

        <nav className="navbar-C">
          <a href="/">HOME</a>
          <a href="http://localhost:3000/#about">ABOUT</a>
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

      <div className="quoteImg">
        <p className="quote-C">
          FieldVista: where the <br />
          soil meets the
          <br />
          soul
        </p>
        <p className="quote">Discover serenity in our vibrant fields</p>
        <img
          src="https://cdn-icons-png.freepik.com/512/5863/5863526.png?uid=R139725256&ga=GA1.1.1027108066.1708969823&"
          alt="Image 1"
          style={{
            width: "120px",
            height: "120px",
            position: "absolute",
            // top: "160px",
            left: "380px",
            // transform: "rotate(20deg)",
          }}
        />
        {/* <img
          src="https://cdn-icons-png.freepik.com/512/708/708472.png?uid=R139725256&ga=GA1.1.1027108066.1708969823&"
          alt="Image 2"
          style={{
            width: "150px",
            height: "150px",
            position: "absolute",
            bottom: "120px",
            right: "190px",
          }}
        /> */}
        {/* <img
          src="https://cdn-icons-png.freepik.com/512/1211/1211146.png?uid=R139725256&ga=GA1.1.1027108066.1708969823&  "
          alt="Image 3"
          style={{
            width: "110px",
            height: "110px",
            position: "absolute",
            top: "160px",
            right: "60px",
            // transform: "rotate(60deg)",
          }}
        /> */}
        <img
          src="https://cdn-icons-png.freepik.com/512/2194/2194813.png?uid=R139725256&ga=GA1.1.1027108066.1708969823&"
          alt="Image 4"
          style={{
            width: "100px",
            height: "100px",
            position: "absolute",
            // bottom: "30px",
            right: "390px",
            transform: "rotate(-10deg)",
          }}
        />
        <img
          src="https://cdn-icons-png.freepik.com/512/346/346246.png?uid=R139725256&ga=GA1.1.1027108066.1708969823&"
          alt="Image 5"
          style={{
            width: "110px",
            height: "110px",
            position: "absolute",
            // bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      <div style={{ marginTop: "200px" }}>
        <section id="slideshow">
          <div className="entire-content">
            <div className="content-carrousel">
              <figure className="shadow">
                <img
                  src="https://www.farmersvilla.in/images/tractor-ride.jpg"
                  alt="Slide 1"
                />
              </figure>

              <figure className="shadow">
                <img
                  src="https://tourdefarm.in/wp-content/uploads/2021/01/Farm-Kerala.jpg"
                  alt="Slide 2"
                />
              </figure>
              <figure className="shadow">
                <img
                  src="https://www.shutterstock.com/image-photo/scool-class-on-summer-excursion-260nw-1198655401.jpg"
                  alt="Slide 3"
                />
              </figure>
              <figure className="shadow">
                <img
                  src="https://groundedbythefarm.com/wp-content/uploads/2020/07/Copy-of-Copy-of-grounded-by-the-farm-header-3-1140x599.png"
                  alt="Slide 4"
                />
              </figure>
              <figure className="shadow">
                <img
                  src="https://www.delmarvadiscoverytours.com/images/fl_items/87/original/171_family-farm-kids.jpg"
                  alt="Slide 5"
                />
              </figure>
              <figure className="shadow">
                <img
                  src="https://tourdefarm.in/wp-content/uploads/2021/01/Best-Farmstay-in-India-1.jpg"
                  alt="Slide 6"
                />
              </figure>
              <figure className="shadow">
                <img
                  src="https://dalat.tours/wp-content/uploads/2018/07/Dalat-Farm-Tour.jpg"
                  alt="Slide 7"
                />
              </figure>
              <figure className="shadow">
                <img
                  src="https://totalholidayoptions.in/uploads/travel/travelstyle_img_1615445912tour_image.jpeg"
                  alt="Slide 8"
                />
              </figure>
              <figure className="shadow">
                <img
                  src="https://www.aquaculturealliance.org/wp-content/uploads/2018/12/Thai-prawn-farm_SS_1500-1024x767.jpg"
                  alt="Slide 9"
                />
              </figure>
            </div>
          </div>
        </section>
      </div>

      <section id="collective-tour-cards">
        <p
          style={{
            fontSize: "70px",
            textAlign: "center",
            fontFamily: "Anta, sans-serif",
            fontWeight: "750",
            fontStyle: "normal",
            color: "white",
          }}
        >
          Available Tours
        </p>
        <div className="tours-container1">
          {toursData.length > 0 ? (
            toursData.map((tour, index) => (
              <div key={index} className="tour-card1">
                <h3>{tour.tour_name}</h3>
                <p>Farm Name: {tour.farm_name}</p>
                <p>Farm Location: {tour.farm_location}</p>
                <p>Farm Description: </p>
                <p>{tour.farm_description}</p>
                <p>Tour Duration: {tour.tour_duration}</p>
                <p>Max Tour Capacity: {tour.capacity}</p>
                <p> Tour Price: Rs{tour.price}</p>
                <p style={{ textDecoration: "underline" }}>
                  Activities Included :{" "}
                </p>
                <ul>
                  {tour.tour_activities.split(",").map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    // Set tour details in localStorage
                    localStorage.setItem("tour_id", tour.tour_id);
                    localStorage.setItem("tour_name", tour.tour_name);
                    localStorage.setItem("tour_capacity", tour.tour_capacity);

                    // Navigate to the booking page
                    window.location.href = "/booking";
                  }}
                  className="button_tours"
                >
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </div>
    // </div>
  );
}
