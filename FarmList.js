import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FarmList.css";

const FarmList = () => {
  const [farms, setFarms] = useState([]);
  const [editingFarmId, setEditingFarmId] = useState(null);
  const [editedFarmData, setEditedFarmData] = useState({
    farm_name: "",
    farm_location: "",
    description: "",
    farm_type: "",
  });
  const [selectedFarmType, setSelectedFarmType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch farm details from backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/fetchfarm", {
          params: {
            farmer_id: localStorage.getItem("farmer_id"),
          },
        });
        setFarms(response.data); // Assuming the response data is an array of farm objects
      } catch (error) {
        console.error("Error fetching farm details:", error);
      }
    };

    fetchData();
  }, []);

  const deleteFarm = async (farmId) => {
    // Ask for confirmation before deleting the farm
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this farm?"
    );
    if (!confirmDelete) return; // If user cancels, do nothing

    try {
      // Send delete request to backend to delete the farm
      await axios.delete(`http://localhost:5000/deletefarm/${farmId}`);
      // Remove the deleted farm from the local state
      setFarms(farms.filter((farm) => farm.farm_id !== farmId));
      // Display a success message
      alert("Farm deleted successfully!");
    } catch (error) {
      console.error("Error deleting farm:", error);
    }
  };

  const handleEditFarm = (farmId) => {
    setEditingFarmId(farmId);
    const farmToEdit = farms.find((farm) => farm.farm_id === farmId);
    setEditedFarmData(farmToEdit);
    setIsDialogOpen(true);
  };

  const addfarm = () => {
    window.location.href = "/addfarm"; // Navigate to the add farm page
  };

  const handleUpdateFarm = async (farmId) => {
    try {
      // Map selected farm type to its corresponding integer value
      const farmTypeIntegerValue = getFarmTypeIntegerValue(selectedFarmType);
      // Update farm data with the selected farm type integer value
      const updatedFarmData = {
        ...editedFarmData,
        farm_type: farmTypeIntegerValue,
      };
      console.log(updatedFarmData);
      const response = await axios.put(
        `http://localhost:5000/updatefarm/${farmId}`,
        updatedFarmData
      );

      //Update farm details in the local state
      setFarms(
        farms.map((farm) =>
          farm.farm_id === farmId ? { ...farm, ...updatedFarmData } : farm
        )
      );
      setEditingFarmId(null);
      setIsDialogOpen(false);
      // Alert that the farm was updated successfully
      if (response.data.message === "1") {
        alert("Farm updated successfully!");
      }
    } catch (error) {
      console.error("Error updating farm:", error);
    }
  };

  // Function to map farm type name to its corresponding integer value
  const getFarmTypeIntegerValue = (type) => {
    switch (type) {
      case "Crop Farms":
        return 1;
      case "Livestock Farms":
        return 2;
      case "Dairy Farms":
        return 3;
      case "Agroforestry Farms":
        return 4;
      case "Herb and Flower Farms":
        return 5;
      case "Aquaculture Farms":
        return 6;
      default:
        return 0; // Default to 0 or unknown if no match
    }
  };

  // Function to handle change in the farm type dropdown
  const handleFarmTypeChange = (event) => {
    setSelectedFarmType(event.target.value);
  };

  // Function to close the edit dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="field-wrap-FL">
      <div
        className="farm-cards-container"
        style={{ filter: isDialogOpen ? "blur(5px)" : "none" }}
      >
        {farms.map((farm) => (
          <div key={farm.farm_id} className="farm_cardFL" id="farm_card_indi">
            <h3>{farm.farm_name}</h3>
            <p>Farm ID: {farm.farm_id}</p>
            <p>Farm Type: {getFarmTypeLabel(farm.farm_type)}</p>
            <p>Farm Location: {farm.farm_location}</p>
            <p>Farm Description: {farm.description}</p>

            <div>
              <Link
                to={`/farm_tours/${farm.farm_id}`}
                className="arrow-link"
                onClick={() => {
                  localStorage.setItem("farm_id", farm.farm_id);
                  const farmideeee = localStorage.getItem("farm_id");
                  console.log(farmideeee);
                }}
              >
                View Tours
              </Link>
              <button onClick={() => deleteFarm(farm.farm_id)}>Delete</button>
              <button onClick={() => handleEditFarm(farm.farm_id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
      {isDialogOpen && (
        <div className="edit-dialog">
          <span className="close-btn" onClick={handleCloseDialog}>
            &times;
          </span>
          <label htmlFor="farmName">Farm Name:</label>
          <input
            type="text"
            id="farmName"
            value={editedFarmData.farm_name}
            onChange={(e) =>
              setEditedFarmData({
                ...editedFarmData,
                farm_name: e.target.value,
              })
            }
          />
          <label htmlFor="farmLocation">Farm Location:</label>
          <input
            type="text"
            id="farmLocation"
            value={editedFarmData.farm_location}
            onChange={(e) =>
              setEditedFarmData({
                ...editedFarmData,
                farm_location: e.target.value,
              })
            }
          />
          <label htmlFor="farmDescription">Farm Description:</label>
          <input
            type="text"
            id="farmDescription"
            value={editedFarmData.description}
            onChange={(e) =>
              setEditedFarmData({
                ...editedFarmData,
                description: e.target.value,
              })
            }
          />
          <label htmlFor="farmType">Farm Type:</label>
          <select
            id="farmType"
            value={selectedFarmType}
            onChange={handleFarmTypeChange}
          >
            <option value="">Select Farm Type</option>
            <option value="Crop Farms">Crop Farms</option>
            <option value="Livestock Farms">Livestock Farms</option>
            <option value="Dairy Farms">Dairy Farms</option>
            <option value="Agroforestry Farms">Agroforestry Farms</option>
            <option value="Herb and Flower Farms">Herb and Flower Farms</option>
            <option value="Aquaculture Farms">Aquaculture Farms</option>
          </select>
          <button onClick={() => handleUpdateFarm(editingFarmId)}>
            Update
          </button>
        </div>
      )}
      <div className="fixed-button-container">
        <button className="fixed-button" title="Add Farm" onClick={addfarm}>
          <span className="button-icon">+</span>
          <span className="button-text">Add Farm</span>
        </button>
      </div>
    </div>
  );
};

// Function to map farm type number to label
const getFarmTypeLabel = (type) => {
  switch (type) {
    case 1:
      return "Crop Farms";
    case 2:
      return "Livestock Farms";
    case 3:
      return "Dairy Farms";
    case 4:
      return "Agroforestry Farms";
    case 5:
      return "Herb and Flower Farms";
    case 6:
      return "Aquaculture Farms";
    default:
      return "Unknown";
  }
};

export default FarmList;
