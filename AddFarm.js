import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; //Import axios for HTTP requests
import "./AddFarm.css"; // Import CSS file for additional styles
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const FarmForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    farm_name: "",
    farm_location: "",
    description: "",
    farm_type: "",
    farm_photo: null,
  };

  const validationSchema = Yup.object().shape({
    farm_name: Yup.string().required("Farm name is required"),
    farm_location: Yup.string().required("Farm location is required"),
    description: Yup.string().required("Description is required"),
    farm_type: Yup.string().required("Farm type is required"),
    // farm_photo: Yup.mixed().required("Farm photo is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const farmerId = localStorage.getItem("farmer_id"); // Get farmer id from local storage
      const formData = {
        farm_name: values.farm_name,
        farm_location: values.farm_location,
        description: values.description,
        farm_type: values.farm_type,
        farmer_id: farmerId,
      };

      console.log(JSON.stringify(formData, null, 2)); // Log form data as JSON

      const response = await axios.post(
        "http://localhost:5000/addFarm",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message === "1") {
        alert("Farm Added Succesfully");
        navigate("/Farmer");
      }

      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error("Error:", error);
    }

    //setSubmitting(false);
  };

  return (
    <div className="bg-AF-img">
      <div className="bg-AF">
        <div id="title-AF">
          FIELDVISTA<span className="captcha">-An AgriTour</span>
        </div>

        <nav className="navbar-AF">
          <Link href="#">HOME</Link>
          <a href="#about">ABOUT</a>
          <a href="#about">CONTACT</a>
          <a
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
      <div className="add-farm-container">
        <div className="farm-container-AF" id="add_farm-AF">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "Anta, sans-serif",
              fontWeight: "750",
              fontStyle: "normal",
              color: "black",
            }}
          >
            ADD FARM
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="F-form-AF">
                <Field
                  className="form-AF"
                  type="text"
                  name="farm_name"
                  placeholder="Farm Name *"
                />
                <ErrorMessage name="farm_name" component="div" />
                <br />
                <Field
                  className="form-AF"
                  type="text"
                  name="farm_location"
                  placeholder="Farm Location *"
                />
                <ErrorMessage name="farm_location" component="div" />
                <br />

                <Field
                  className="form-AF"
                  as="textarea"
                  name="description"
                  placeholder="Description *"
                />
                <ErrorMessage name="description" component="div" />
                <br />

                <Field
                  className="form-AF"
                  as="select"
                  name="farm_type"
                  placeholder="Select Farm Type *"
                >
                  <option value="">Select Farm Type</option>
                  <option value="1">Crop Farms</option>
                  <option value="2">Livestock Farms</option>
                  <option value="3">Agroforestry Farms</option>
                  <option value="4">Herb and Flower Farms</option>
                  <option value="5">Aquaculture Farms</option>
                  <option value="6">Educational Farms</option>
                  <option value="7">Diary Farms</option>
                </Field>
                <ErrorMessage name="farm_type" component="div" />
                <br />

                {/* <ErrorMessage name="farm_photo" component="div" />
                  <br /> */}

                <button
                  className="btn-AF"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FarmForm;
