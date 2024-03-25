import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  insertUser,
  insertFarmer,
  getFarmer,
  getCustomer,
  fetchFarmer,
  insertFarm,
  fetchFarmDetails,
  updateFarmDetails,
  deleteFarmDetails,
  insertTour,
  fetchToursByFarmId,
  updatetourDetails,
  deletetourDetails,
  fetchAllTours,
  addBooking,
  review,
  fetchBookingsByFarmId,
} from "./backend.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

app.post("/signup", async (req, res) => {
  try {
    if (req.body.role == "0") {
      const result = await insertFarmer(req.body);
    } else if (req.body.role == "1") {
      const result = await insertUser(req.body);
    }
    // console.log(result);
    console.log(req.body);
    res.json("user created");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    if (req.body.role == "0") {
      const [result] = await getFarmer(req.body.loginEmail);
      if (
        result.farmer_email === req.body.loginEmail &&
        result.password === req.body.loginPassword
      ) {
        // console.log(result.farmer_id);
        return res.json({
          message: "0",
          farmer_id: result.farmer_id,
          name: result.farmer_name,
          phone: result.phoneNumber,
          email: result.farmer_email,
        });
      }
    } else if (req.body.role == "1") {
      const [result] = await getCustomer(req.body.loginEmail);
      if (
        result.customer_email === req.body.loginEmail &&
        result.password === req.body.loginPassword
      ) {
        console.log("customer Logged in");
        return res.json({
          message: "1",
          customer_id: result.customer_id,
          customer_name: result.customer_name,
        });
      }
    } else {
      return res.json("login unsuccessful");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/farmer", async (req, res) => {
  try {
    console.log(req.query);
    const { farmer_id } = req.query;
    const farmerDetails = await fetchFarmer(farmer_id);
    res.json(farmerDetails);
  } catch (error) {
    console.log(error);
  }
});

app.post("/addFarm", async (req, res) => {
  try {
    const result = await insertFarm(req.body);
    console.log(result);
    return res.json({
      message: "1",
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/fetchFarm", async (req, res) => {
  try {
    const { farmer_id } = req.query;
    const farmDetails = await fetchFarmDetails(farmer_id);
    res.json(farmDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.put("/updatefarm/:farm_id", async (req, res) => {
  try {
    const { farm_id } = req.params;
    const result = await updateFarmDetails(farm_id, req.body);
    res.json({ message: "Farm updated successfully", result });
  } catch (error) {
    console.error("Error updating farm:", error);
    res.status(500).json({ message: "Error updating farm" });
  }
});
app.delete("/deletefarm/:farm_id", async (req, res) => {
  try {
    const { farm_id } = req.params;
    const result = await deleteFarmDetails(farm_id);
    res.json({ message: "Farm Deleted Successfully", result });
  } catch (error) {
    console.log(error);
  }
});
app.post("/addTour/:farm_id", async (req, res) => {
  try {
    const { farm_id } = req.params;
    const result = await insertTour(farm_id, req.body);
    console.log(result);
    return res.json({
      message: "100",
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/farm_tours/:farm_id", async (req, res) => {
  try {
    const { farm_id } = req.params;
    const tours = await fetchToursByFarmId(farm_id);
    return res.json(tours);
    //console.log(tours);
  } catch (error) {
    console.log("Error fetching tours:", error);
  }
});
app.put("/update_tour/:tour_id", async (req, res) => {
  try {
    const { tour_id } = req.params;
    const result = await updatetourDetails(tour_id, req.body);
    res.json({ message: "Tour updated successfully", result });
  } catch (error) {
    console.log(error);
  }
});
app.delete("/delete_tour/:tour_id", async (req, res) => {
  try {
    const { tour_id } = req.params;
    const result = await deletetourDetails(tour_id);
    res.json({ message: "Farm Deleted Successfully", result });
  } catch (error) {
    console.log(error);
  }
});
app.get("/all_tours", async (req, res) => {
  // for Farmer
  try {
    const result = await fetchAllTours();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
app.post("/addBooking/:customer_id/:tour_id", async (req, res) => {
  try {
    const { customer_id, tour_id } = req.params;
    const bookingDetails = req.body;

    await addBooking(bookingDetails, customer_id, tour_id);

    res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    console.error("Error in server:", error.message); // Log error for debugging
    res.json({ error: error.message });
  }
});

app.get("/View_bookings/:farmer_id", async (req, res) => {
  try {
    const farmer_id = req.params.farmer_id;
    console.log(farmer_id);
    const result = await fetchBookingsByFarmId(farmer_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/review", async (req, res) => {
  try {
    const reviewDetails = req.body;
    await review(reviewDetails);
    res.status(200).json({ message: "review added successfully" });
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// app.post("/filtered_tours", async (req, res) => {
//   try {
//     const { location, duration, capacity, price } = req.body;
//     const filteredToursResult = await fetchFilteredTours({
//       location,
//       duration,
//       capacity,
//       price,
//     });
//     res.status(200).json(filteredToursResult);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
