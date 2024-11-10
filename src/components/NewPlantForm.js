import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  // Initialize state with default values
  const [plantName, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Create the new plant object
    const plantObject = {
      name: plantName,
      image: image,
      price: parseFloat(price), // Ensure price is a number
    };

    // Send the new plant data to the server
    fetch('http://localhost:3003/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plantObject),
    })
    .then((r) => r.json())
    .then((data) => {
      console.log("New plant added:", data);

      // Pass the newly added plant data to the parent component
      onAddPlant(data);

      // Optionally clear the form fields after successful submission
      setName('');
      setImage('');
      setPrice('');
    })
    .catch((error) => {
      console.error('Error adding plant:', error);
    });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          required
          placeholder="Plant name"
          value={plantName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          required
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          required
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;