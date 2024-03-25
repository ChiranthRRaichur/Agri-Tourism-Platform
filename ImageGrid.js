// ImageGrid.jsx
import React from "react";
import "./ImageGrid.css"; // Import the CSS file for styling

const ImageGrid = () => {
  const imageArray = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <>
      <div className="top-dest">Top destinations</div>
      <hr />
      <div className="image-grid">
        {imageArray.map((index) => (
          <div key={index} className="image-container">
            <img
              src={`images/image${index}.jpg`}
              alt={`Image ${index}`}
              className="grid-image"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGrid;