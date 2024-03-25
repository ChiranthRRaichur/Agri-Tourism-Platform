import React from "react";
import "./HomePage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CropLineChart from "../CropData/CroplineChart";
import ImageGrid from "../Imagegr/ImageGrid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function HomePage() {
  // functional declaration
  const [scrolled, setScrolled] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 80;
      setScrolled(isScrolled);
      const header = document.querySelector("header");
      const title = document.getElementById("title");

      if (window.scrollY > header.offsetHeight) {
        setScrolled(true);
        title.style.color = "gold";
      } else {
        setScrolled(false);
        title.style.backgroundImage =
          "linear-gradient(147deg, #0cd805 58%, gold 42%)";
        title.style.BackgroundClip = "text";
        title.style.color = "transparent";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const initialValues = {
    name: "",
    rating: "",
    comments: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comments: Yup.string().required("Comments are required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    const rev = await axios.post("http://localhost:5000/review", values);
    resetForm();
  };

  return (
    <>
      <div>
        <div className="bg">
          <header className={scrolled ? "scrolled" : ""}>
            <div>
              <div id="title">
                FIELDVISTA<span className="captcha">-An AgriTour</span>
              </div>
            </div>
            <nav className="navbar">
              <div
                className={
                  showLinks ? "navbar-links-HP show" : "navbar-links-HP"
                }
              >
                <Link href="#">HOME</Link>
                <a href="#about">ABOUT</a>
                <a href="#about">CONTACT</a>
                <a href="./Login-Signup">LOGIN/SIGNUP</a>
              </div>
            </nav>
          </header>

          <div>
            <section className="centered-text">
              <h1 style={{ fontSize: "60px" }}>
                Fields of joy, farms of discovery.
              </h1>
            </section>
          </div>
        </div>
        <br />

        <div className="sub-body">
          <div className="HPcontainer px-7 py-4" id="featured-3">
            <p
              className="pb-2 border-bottom"
              style={{
                textAlign: "center",
                fontFamily: "Anta, sans-serif",
                fontWeight: "750",
                fontStyle: "normal",
              }}
            >
              Why Book with FieldVista ?
            </p>
            <div className="row g-4 py-3 row-cols-1 row-cols-lg-3">
              <div className="feature col">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 bdyimag">
                  <img
                    src="https://www.shutterstock.com/image-vector/best-price-shop-label-template-600nw-2227446337.jpg"
                    height="80x"
                    alt="briefcase"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "Old Standard TT, serif",
                    fontWeight: "480",
                    fontStyle: "italic",
                  }}
                  className="fs-2 text-body-emphasis"
                >
                  Best Price Guarantee
                </p>
                <p>
                  Book confidently, knowing that you'll always enjoy the most
                  competitive prices on our platform, backed by our Best Price
                  Guarantee
                </p>
              </div>
              <div className="feature col">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 bdyimag">
                  <img
                    src="https://img.freepik.com/free-photo/handsome-man-glasshouse_23-2147768451.jpg?t=st=1711186626~exp=1711190226~hmac=46dcf3762748c39590df0c996dcf581de0f0ae23099daac4c1e7a9b805af4592&w=996"
                    height="90X"
                    style={{ backgroundColor: "aliceblue" }}
                    alt=""
                  />
                </div>
                <p
                  style={{
                    fontFamily: "Old Standard TT, serif",
                    fontWeight: "480",
                    fontStyle: "italic",
                  }}
                  className="fs-2 text-body-emphasis"
                >
                  Local Expertise
                </p>
                <p>
                  Immerse yourself in the culture and charm of every place you
                  visit, curated by our local experts who know the ins and outs
                  of the regions we serve.
                </p>
              </div>
              <div className="feature col">
                <div className="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3 bdyimag">
                  <img
                    src="https://image.shutterstock.com/image-vector/digital-handshake-on-blue-technology-260nw-2320655091.jpg"
                    height="80x"
                    alt="trust"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "Old Standard TT, serif",
                    fontWeight: "480",
                    fontStyle: "italic",
                  }}
                  className="fs-2 text-body-emphasis"
                >
                  Trust and Reliability
                </p>
                <p>
                  Building trust through transparency and excellence, we pride
                  ourselves on providing a reliable platform where your travel
                  plans are in safe hands..
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <CropLineChart />
        </div>

        <div className="book-Section">
          <div>
            <a href="./Login-Signup#login">Book Tour</a>
          </div>
          <div>
            <a href="./Login-Signup#login">Create Tour</a>
          </div>
        </div>

        <div>
          <ImageGrid />
        </div>

        <div style={{ marginTop: "50px", backgroundColor: "whitesmoke" }}>
          <h2
            style={{
              padding: "20px",
              textAlign: "center",
              fontFamily: "Anta, sans-serif",
              fontWeight: "750",
              fontStyle: "normal",
            }}
          >
            Review and Ratings
          </h2>
          <div className="center-container-H">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="form-group">
                  <div>
                    <label className="label-H" htmlFor="name">
                      Name:
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div>
                    <label className="label-H" htmlFor="rating">
                      Rating (out of 5):
                    </label>
                    <Field
                      type="number"
                      min="1"
                      max="5"
                      id="rating"
                      name="rating"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="rating"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div>
                    <label className="label-H" htmlFor="comments">
                      Comments/Suggestions:
                    </label>
                    <Field
                      as="textarea"
                      id="comments"
                      name="comments"
                      className="form-control textarea-style"
                    />
                    <ErrorMessage
                      name="comments"
                      component="div"
                      className="error"
                    />
                  </div>

                  <button className="btn-H" type="submit">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <footer className="custom-footer">
          <div
            className="card text-center lastsec"
            id="about"
            style={{ marginTop: "100px" }}
          >
            <div className="card-header abtcolor">About Us</div>
            <div className="card-body" id="foot">
              <h5 className="card-title">Welcome to FieldVista</h5>
              <p className="card-text">
                FieldVista is your premier destination for agritourism
                experiences. Est, our mission is to bring people closer to the
                beauty of farms and agriculture. We believe in fostering a
                connection between urban communities and the rural landscapes
                that sustain us. Explore the wonders of farming, discover local
                cultures, and create lasting memories with FieldVista.
              </p>
            </div>
            <div className="card-footer text-body-secondary">
              <p>
                Contact us at:{" "}
                <a href="mailto:info@fieldvista.com">info@fieldvista.com</a>
              </p>
              {/* Social Media Links */}
              <div className="social-media-icons">
                <a href="#" title="Follow us on Instagram">
                  <img src="../images/instagram_icon.png" alt="Instagram" />
                </a>
                <a href="#" title="Follow us on Facebook">
                  <img src="../images/facebook_icon.png" alt="Facebook" />
                </a>
                <a href="#" title="Follow us on Twitter">
                  <img src="../images/twitter_icon.png" alt="Twitter" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
