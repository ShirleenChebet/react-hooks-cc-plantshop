import React, { useState } from "react";

function PlantCard({ id, image, plantName, price, inStock: initialInStock, onPriceUpdate, onDelete }) {
  const [inStock, setInStock] = useState(initialInStock);
  const [newPrice, setNewPrice] = useState(price);
  const [isEditing, setIsEditing] = useState(false);

  const handleStockToggle = () => {
    setInStock((prevInStock) => !prevInStock);
  };

  const handleEditPrice = () => {
    setIsEditing(true);
  };

  const handleSavePrice = () => {
    // Ensure newPrice is a valid number
    const updatedPrice = parseFloat(newPrice);
    if (!isNaN(updatedPrice)) {
      onPriceUpdate(id, updatedPrice);
      setIsEditing(false);
    } else {
      alert("Please enter a valid price");
    }
  };

  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={plantName} />
      <h4>{plantName}</h4>
      {isEditing ? (
        <div>
          <input
            type="number"
            value={newPrice}
            onChange={handlePriceChange}
            step="0.01"
            min="0"
            placeholder="New Price"
          />
          <button onClick={handleSavePrice}>Save</button>
        </div>
      ) : (
        <p>Price: {isNaN(newPrice) ? price.toFixed(2) : parseFloat(newPrice).toFixed(2)}</p>
      )}
      <div>
        {inStock ? (
          <button className="primary" onClick={handleStockToggle}>
            In Stock
          </button>
        ) : (
          <button onClick={handleStockToggle}>Out of Stock</button>
        )}
      </div>
      <div>
        {isEditing ? (
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        ) : (
          <button onClick={handleEditPrice}>Edit Price</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
}

export default PlantCard;