import React, { useState, useEffect } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddTour.module.css";
import axios from "axios";
const TourForm = () => {
  const [farmerDetails, setFarmerDetails] = useState({
    farmer_id: localStorage.getItem("farmer_id") || "",
    farm_name: localStorage.getItem("farm_name") || "",
  });

  // It assumes that you have set the farmer_id and farm_name in the local storage using localStorage.setItem("farmer_id", "actual_farmer_id_here") and localStorage.setItem("farm_name", "actual_farm_name_here") elsewhere in your code.

  const initialValues = {
    tour_name: "",
    duration: "",
    capacity: "",
    price: "",
    activities: [{ tour_activity: "" }],
  };

  const validationSchema = Yup.object().shape({
    tour_name: Yup.string().required("Tour name is required"),
    duration: Yup.string().required("Duration is required"),
    capacity: Yup.number()
      .required("Capacity is required")
      .positive("Capacity must be a positive number"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    activities: Yup.array().of(
      Yup.object().shape({
        tour_activity: Yup.string().required("Activity is required"),
      })
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Fetch farm_id from localStorage
      const farmId = localStorage.getItem("farm_id");
      // console.log(farmId);
      // Send data to the backend using Axios post request with farm_id as a parameter
      const response = await axios.post(
        `http://localhost:5000/addTour/${farmId}`,
        values
      );
      if (response.data.message === "100") {
        window.location.href = "./Farmer";
      }

      // Reset form submission status
      setSubmitting(false);
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error submitting form:", error);

      // Reset form submission status
      setSubmitting(false);
    }
  };

  return (
    <>
      <div id="title">
        FIELDVISTA<span className="captcha">-An AgriTour</span>
      </div>
      <hr />
      <div className="content-ATcontainer">
        <p
          style={{
            textAlign: "center",
            fontSize: "38px",
            color: "#333",
            fontWeight: "700",
          }}
        >
          Farm Tour Management Dashboard
        </p>
        <text
          style={{
            fontSize: "18px",
            color: "#555",
            marginBottom: "30px",
            // lineHeight: "1.5",
            textAlign: "center",
            // marginRight: "50px",
            // marginLeft: "50px",
          }}
        >
          Welcome, {farmerDetails.farm_name} (ID: {farmerDetails.farmer_id})!
          Use the form below to create, edit, or delete tours on your farm.
          Provide accurate information to help visitors learn about your
          agri-tourism offerings. Once submitted, your tour will be available
          for visitors to book and enjoy.
        </text>
      </div>
      <div
        className="add-tour-container"
        style={{
          width: "100%",
          marginTop: "20px",
          paddingLeft: "400px",
          paddingRight: "400px",
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, { setSubmitting });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form id="add-tour-form" className="form-AT">
              <div>
                <label
                  className="lb-hd"
                  htmlFor="tour_name"
                  style={{ fontSize: "20px", paddingBottom: "5px" }}
                >
                  Tour Name
                </label>
                <Field type="text" id="tour_name" name="tour_name" />
                <ErrorMessage name="tour_name" component="div" />
              </div>
              <div>
                <label
                  className="lb-hd"
                  htmlFor="duration"
                  style={{ fontSize: "20px", paddingTop: "10px" }}
                >
                  Duration
                </label>
                <Field type="text" id="duration" name="duration" />
                <ErrorMessage name="duration" component="div" />
              </div>
              <div>
                <label
                  className="lb-hd"
                  htmlFor="capacity"
                  style={{ fontSize: "20px", paddingTop: "10px" }}
                >
                  Capacity
                </label>
                <Field type="number" id="capacity" name="capacity" />
                <ErrorMessage name="capacity" component="div" />
              </div>
              <div>
                <label
                  className="lb-hd"
                  htmlFor="price"
                  style={{ fontSize: "20px", paddingTop: "10px" }}
                >
                  Price
                </label>
                <Field type="number" id="price" name="price" />
                <ErrorMessage name="price" component="div" />
              </div>
              <FieldArray name="activities">
                {({ push, remove }) => (
                  <div>
                    <label
                      className="lb-hd"
                      style={{ fontSize: "20px", paddingTop: "10px" }}
                    >
                      Activities
                    </label>
                    {values.activities.map((activity, index) => (
                      <div key={index}>
                        <Field
                          type="text"
                          name={`activities.${index}.tour_activity`}
                          placeholder="Activity"
                        />
                        <ErrorMessage
                          name={`activities.${index}.tour_activity`}
                          component="div"
                        />
                        <button
                          style={{
                            margin: "10px 0 10px 15px",
                            borderRadius: "12px",
                            backgroundColor: "#b0361a",
                            padding: "8px",
                            color: "white",
                          }}
                          className="btn-AT"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      style={{
                        margin: "10px 0 10px 15px",
                        borderRadius: "10px",
                        backgroundColor: "#1766cd",
                        padding: "8px",
                        color: "white",
                      }}
                      className="btn-AT"
                      type="button"
                      onClick={() => push({ tour_activity: "" })}
                    >
                      Add Activity
                    </button>
                  </div>
                )}
              </FieldArray>
              <button
                style={{
                  margin: "10px 0px 10px 300px",
                  borderRadius: "10px",
                  backgroundColor: "#54cd17",
                  padding: "10px 40px 10px 40px",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
                className="btn-AT"
                type="submit"
                disabled={isSubmitting}
                // onClick={handlesubmit}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default TourForm;
