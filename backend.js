import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const dp = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

//Connecting with the DB and SQL queries are written here

export async function insertUser(userDetails) {
  const createUserQuery =
    "INSERT INTO CUSTOMER(customer_name,phoneNumber,customer_email,password,role) VALUES(?, ?, ?, ?, ?)";
  const result = await dp.query(createUserQuery, [
    userDetails.name,
    userDetails.phoneNumber,
    userDetails.email,
    userDetails.password,
    userDetails.role,
  ]);
  return result;
  console.log(userDetails);
}
export async function insertFarmer(userDetails) {
  const createUserQuery =
    "INSERT INTO FARMER(farmer_name,phoneNumber,farmer_email,password,role) VALUES(?, ?, ?, ?, ?)";
  const result = await dp.query(createUserQuery, [
    userDetails.name,
    userDetails.phoneNumber,
    userDetails.email,
    userDetails.password,
    userDetails.role,
  ]);
  return result;
  console.log(userDetails);
}

export async function getCustomer(email) {
  const getCustomerQuery = "select * from customer where customer_email = ?";
  const [user] = await dp.query(getCustomerQuery, [email]);
  return user;
}
export async function getFarmer(email) {
  const getFarmerQuery = "select * from farmer where farmer_email = ?";
  const [farmer] = await dp.query(getFarmerQuery, [email]);
  return farmer;
}
export async function fetchFarmer(farmer_id) {
  try {
    const fetchFarmerDetails =
      " select farmer_id,farmer_name,phoneNumber,farmer_email from farmer where farmer_id =?";
    const [farmer] = await dp.query(fetchFarmerDetails, [farmer_id]);
    return farmer;
  } catch (error) {
    console.log(error);
  }
}
export async function insertFarm(farmDetails) {
  try {
    const insertFarmDetails =
      "INSERT INTO FARM(farm_name,farm_location,description,farm_type,farmer_id) VALUES(?, ?, ?, ?, ?)";
    const result = await dp.query(insertFarmDetails, [
      farmDetails.farm_name,
      farmDetails.farm_location,
      farmDetails.description,
      farmDetails.farm_type,
      farmDetails.farmer_id,
    ]);
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchFarmDetails(farmer_id) {
  try {
    const fetchFarmDetailsQuery = "SELECT * FROM FARM WHERE FARMER_ID=?";
    const [farm] = await dp.query(fetchFarmDetailsQuery, [farmer_id]);
    return farm;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateFarmDetails(farm_id, details) {
  try {
    const updateFarmDetailsQuery = `
      UPDATE FARM 
      SET farm_name = ?, farm_location = ?, description = ?, farm_type = ? 
      WHERE farm_id = ?
    `;

    await dp.query(updateFarmDetailsQuery, [
      details.farm_name,
      details.farm_location,
      details.description,
      details.farm_type,
      farm_id,
    ]);

    return { success: true, message: "Farm details updated successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteFarmDetails(farm_id) {
  try {
    const deleteFarmQuery = `DELETE FROM FARM WHERE FARM_ID = ?`;
    await dp.query(deleteFarmQuery, [farm_id]);
    return {
      success: true,
      message: `Farm with ID ${farm_id} deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting farm:", error);
    throw error;
  }
}
export async function insertTour(farm_id, tourDetails) {
  try {
    console.log(farm_id);
    const addTourQuery = `INSERT INTO TOURS(TOUR_NAME, DURATION, CAPACITY, PRICE, FARM_ID) VALUES (?, ?, ?, ?, ?)`;
    await dp.query(addTourQuery, [
      tourDetails.tour_name,
      tourDetails.duration,
      tourDetails.capacity,
      tourDetails.price,
      farm_id,
    ]);

    const getTourIdQuery = `SELECT TOUR_ID FROM TOURS 
                            WHERE TOUR_NAME = ? AND FARM_ID = ?`;
    const [tourIdResult] = await dp.query(getTourIdQuery, [
      tourDetails.tour_name,
      farm_id,
    ]);

    // Extract the tour ID from the result
    const tourId = tourIdResult[0].TOUR_ID;
    //Insert tour activities in a loop
    for (const activity of tourDetails.activities) {
      const addTourActivityQuery = `INSERT INTO TOUR_ACTIVITIES(TOUR_ID,TOUR_ACTIVITY) VALUES ( ?, ?)`;
      await dp.query(addTourActivityQuery, [tourId, activity.tour_activity]);
    }

    return tourId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function fetchToursByFarmId(farm_id) {
  try {
    const fetchToursProcedure = "CALL FetchToursByFarmIdProcedure(?)";
    const [toursResult] = await dp.query(fetchToursProcedure, [farm_id]);
    //console.log(toursResult);
    return toursResult[0]; // Return the entire array containing all tour details
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function updatetourDetails(tour_id, tourdetails) {
  try {
    const { tour_name, duration, capacity, price, activities } = tourdetails;
    await dp.query(
      `
      UPDATE TOURs 
      SET tour_name = ?, duration = ?, capacity = ?, price = ? 
      WHERE tour_id = ?
    `,
      [tour_name, duration, capacity, price, tour_id]
    );

    await dp.query(
      `
      DELETE FROM TOUR_ACTIVITIES WHERE tour_id = ?
    `,
      [tour_id]
    );
    const activityValues = activities.map((activity) => [
      tour_id,
      activity.tour_activity,
    ]);
    await dp.query(
      `
      INSERT INTO TOUR_ACTIVITIES (tour_id, tour_activity) VALUES ?
    `,
      [activityValues]
    );

    return {
      success: true,
      message: "1",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deletetourDetails(tour_id) {
  try {
    const deletetourQuery = `DELETE FROM TOURS WHERE TOUR_ID = ?`;
    await dp.query(deletetourQuery, [tour_id]);
    return {
      success: true,
      message: `tour with ID ${tour_id} deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting farm:", error);
    throw error;
  }
}
export async function fetchAllTours() {
  try {
    const fetchAllToursquery = `
      SELECT tours.tour_id,
        tours.tour_name,
        farm.farm_name,
        farm.farm_location,
        farm.description AS farm_description,
        tours.duration AS tour_duration,
        tours.capacity,
        tours.price,
        GROUP_CONCAT(DISTINCT tour_activities.tour_activity ORDER BY tour_activities.tour_activity ASC SEPARATOR ', ') AS tour_activities
      FROM 
        tours
      JOIN 
        farm ON tours.farm_id = farm.farm_id
      JOIN 
        farmer ON farm.farmer_id = farmer.farmer_id
      JOIN 
        tour_activities ON tours.tour_id = tour_activities.tour_id
      GROUP BY 
        tours.tour_id;
    `;

    const [result] = await dp.query(fetchAllToursquery);
    console.log(result);
    return result; // Assuming you want to return the result for further processing
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error for error handling in the caller function
  }
}

export async function addBooking(bookingDetails, customer_id, tour_id) {
  try {
    const addbookingquery = `INSERT INTO BOOKING (BOOKING_DATE,TOUR_DATE,NUMBER_OF_PEOPLE,BOOKING_CUSTOMER_ID,BOOKING_TOUR_ID) VALUES (?,?,?,?,?)`;
    const resultT = await dp.query(addbookingquery, [
      bookingDetails.bookingDate,
      bookingDetails.tourDate,
      bookingDetails.numberOfPeople,
      customer_id,
      tour_id,
    ]);
    return resultT;
  } catch (error) {
    if (
      error.code === "ER_SIGNAL_EXCEPTION" &&
      error.sqlMessage === "Booking exceeds tour capacity"
    ) {
      console.error("Booking exceeds tour capacity"); // Log error for debugging
      throw new Error("Booking exceeds tour capacity");
    } else {
      console.error(error);
      throw new Error("Error in booking process");
    }
  }
}

export async function review(reviewDetails) {
  try {
    console.log(reviewDetails);
    const reviewquery = `INSERT INTO REVIEW (NAME, RATING,COMMENT) VALUES(?,?,?)`;
    const result = await dp.query(reviewquery, [
      reviewDetails.name,
      reviewDetails.rating,
      reviewDetails.comments,
    ]);
  } catch (error) {
    console.log(error);
  }
}
// export async function addBooking(bookingdetails, customer_id, tour_id) {
//   try {
//     const addBookingProcedure = 'CALL addBookingProcedure(?, ?, ?, ?, ?)';
//     const result = await dp.query(addBookingProcedure, [
//       bookingdetails.bookingDate,
//       bookingdetails.tourDate,
//       bookingdetails.numberOfPeople,
//       customer_id,
//       tour_id,
//     ]);

//     // Check if there is an error message in the result
//     if (result && result[0] && result[0][0] && result[0][0][0] && result[0][0][0].Message) {
//       console.log("Error Message:", result[0][0][0].Message); // Display the error message in the console
//     } else {
//       console.log("Booking added successfully.");
//     }

//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function fetchBookingsByFarmId(farmer_id) {
//   try {
//     const fetchBookingsQuery = `
//     SELECT
//     DISTINCT booking_id,
//     R.farmer_id,
//     R.farm_id,
//     booking_tour_id,
//     booking_date,
//     tour_date,
//     number_of_people,
//     booking_customer_id
// FROM
//     booking B, farm R, farmer F, tours T
// WHERE
//     B.booking_tour_id = T.tour_id
//     AND T.farm_id = R.farm_id
//     AND R.farmer_id = F.farmer_id
//     AND F.farmer_id = ?
// ORDER BY
//     B.tour_date;

//     `;
//     console.log(fetchBookingsQuery);
//     const [bookingsResult] = await dp.query(fetchBookingsQuery, [farmer_id]);
//     console.log(bookingsResult);
//     return bookingsResult;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

export async function fetchBookingsByFarmId(farmer_id) {
  try {
    const fetchBookingsQuery = `
    SELECT b.booking_id, b.booking_date, b.tour_date, b.number_of_people, 
       t.tour_id, t.tour_name,
       c.customer_name AS customer_name, c.phoneNumber AS customer_contact,
       'booked' AS status
FROM booking b
JOIN tours t ON b.booking_tour_id = t.tour_id
JOIN customer c ON b.booking_customer_id = c.customer_id
WHERE t.farm_id IN (SELECT farm_id FROM farm WHERE farmer_id = ?);

    `;
    const [bookingsResult] = await dp.query(fetchBookingsQuery, [farmer_id]);
    console.log(bookingsResult);
    return bookingsResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
