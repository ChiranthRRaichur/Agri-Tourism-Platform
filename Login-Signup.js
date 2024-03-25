import React, { useState } from "react";
import "./Login-Signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: "", // Updated to be a string
    password: "",
    loginEmail: "",
    loginPassword: "",
  });

  const [activeTab, setActiveTab] = useState("signup");
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    // If the input is a checkbox, update the role object accordingly
    if (type === "checkbox") {
      setFormData({
        ...formData,
        role: {
          ...formData.role,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === "signup") {
        const response = await axios.post("http://localhost:5000/signup", {
          ...formData,
          role: formData.role === "0" ? 0 : 1,
        });
        console.log(response.data);

        alert("Signup successful!");
      } else if (activeTab === "login") {
        const response = await axios.post("http://localhost:5000/login", {
          ...formData,
          role: formData.role === "0" ? 0 : 1,
        });

        if (response.data.message === "0") {
          // Creating Farmer session
          localStorage.setItem("farmer_id", response.data.farmer_id); //setItem is a function
          localStorage.setItem("farmer_name", response.data.name);
          localStorage.setItem("farmer_phone", response.data.phone);
          localStorage.setItem("farmer_email", response.data.email);
          window.location.href = "./Farmer"; // NAvigating
        } else if (response.data.message === "1") {
          // Creating User session
          window.location.href = "./customer";
          localStorage.setItem("customer_id", response.data.customer_id);
          localStorage.setItem("customer_name", response.data.customer_name);
        }

        {
          navigate("./Tour");
        }
        console.log(response.data);
        alert("Login successful!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Operation failed. Please try again.");
    }
  };

  return (
    <div className="bg-image">
      <img
        src="https://img.freepik.com/free-vector/hand-painted-watercolor-nature-background_52683-60523.jpg?t=st=1709028458~exp=1709032058~hmac=ccb7f1c8e0aaadfa20423d620502d33344a9ae79455112dd66ab2a98a0a1c91c&w=996"
        alt=""
      />
      <h1 id="title-L" href="/">
        FieldVista
      </h1>
      <div className="use">
        <div className="form">
          <ul className="tab-group">
            <li className={`tab ${activeTab === "signup" ? "active" : ""}`}>
              <a
                href="#signup"
                style={{ textDecoration: "none" }}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </a>
            </li>
            <li className={`tab ${activeTab === "login" ? "active" : ""}`}>
              <a
                href="#login"
                style={{ textDecoration: "none" }}
                onClick={() => setActiveTab("login")}
              >
                Log In
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div
              id="signup"
              className={`tab-pane ${activeTab === "signup" ? "active" : ""}`}
            >
              <form onSubmit={handleFormSubmit}>
                <div className="field-wrap">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    autoComplete="off"
                    placeholder="Name*" // Add this placeholder attribute
                  />
                </div>
                <div className="field-wrap">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleFormChange}
                    required
                    autoComplete="off"
                    placeholder="Phone Number*" // Add this placeholder attribute
                  />
                </div>
                <div className="field-wrap">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    autoComplete="off"
                    placeholder="Email Address*" // Add this placeholder attribute
                  />
                </div>

                <div className="field-wrap">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    required
                    autoComplete="off"
                    className="password-field"
                    placeholder="Set A Password*" // Add this placeholder attribute
                  />
                </div>
                <div className="field-wrap">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "5px",
                      border: "1px solid rgba(0, 0, 0, 0.5)",
                      backgroundColor: "transparent",
                    }}
                  >
                    <option value="" disabled hidden>
                      Choose a Role*
                    </option>
                    <option value="0">Farmer</option>
                    <option value="1">Customer</option>
                  </select>
                </div>

                <button type="submit" className="button button-block">
                  Get Started
                </button>
              </form>
            </div>
            <div
              id="login"
              className={`tab-pane ${activeTab === "login" ? "active" : ""}`}
            >
              <h1>Welcome Back!</h1>
              <form onSubmit={handleFormSubmit}>
                <div className="field-wrap">
                  <input
                    type="email"
                    name="loginEmail"
                    value={formData.loginEmail}
                    onChange={handleFormChange}
                    required
                    autoComplete="off"
                    placeholder="Email Address*"
                  />
                </div>
                <div className="field-wrap">
                  <input
                    type="password"
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleFormChange}
                    required
                    autoComplete="off"
                    placeholder="Password*"
                  />
                </div>
                <div className="field-wrap">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid rgba(0, 0, 0, 0.5)",
                      backgroundColor: "transparent",
                    }}
                  >
                    <option value="" disabled hidden>
                      Choose a Role*
                    </option>
                    <option value="0">Farmer</option>
                    <option value="1">Customer</option>
                  </select>
                </div>

                <button type="submit" className="button button-block">
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
