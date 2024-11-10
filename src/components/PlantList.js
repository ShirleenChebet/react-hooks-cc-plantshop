import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import NewPlantForm from './NewPlantForm';
import Search from './Search';
function PlantList() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch the plant data when the component mounts
    fetch('http://localhost:3003/plants')
      .then((r) => r.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error('Error fetching plants:', error));
  }, []);

  // Handle adding a new plant to the list
  function handleAddPlant(newPlant) {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  }

  // Handle updating the price of a plant
  function handlePriceUpdate(id, newPrice) {
    // Send patch request to update the price
    fetch(`http://localhost:3003/plants/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        setPlants((prevPlants) =>
          prevPlants.map((plant) =>
            plant.id === id ? { ...plant, price: updatedPlant.price } : plant
          )
        );
      })
      .catch((error) => console.error('Error updating price:', error));
  }

  // Handle deleting a plant
  function handleDelete(id) {
    // Send DELETE request to remove the plant
    fetch(`http://localhost:3003/plants/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
      })
      .catch((error) => console.error('Error deleting plant:', error));
  }

  // Handle search query change
  function handleSearch(query) {
    setSearchQuery(query);
  }

  // Filter plants based on the search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <ul className="cards">
        {filteredPlants.map((plantObj) => (
          <PlantCard
            key={plantObj.id}
            id={plantObj.id}
            image={plantObj.image}
            plantName={plantObj.name}
            price={plantObj.price}
            inStock={plantObj.inStock}
            onPriceUpdate={handlePriceUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}


export default PlantList;