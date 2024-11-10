import React, { useState, useEffect } from 'react';
import PlantCard from './PlantCard';
import NewPlantForm from './NewPlantForm';

function PlantList() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3003/plants')
      .then((r) => r.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching plants');
        setLoading(false);
        console.error('Error fetching plants:', error);
      });
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants((prevPlants) => [...prevPlants, newPlant]);
  };

  const handlePriceUpdate = (id, newPrice) => {
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
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plant?')) {
      fetch(`http://localhost:3003/plants/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
        })
        .catch((error) => console.error('Error deleting plant:', error));
    }
  };

  if (loading) {
    return <p>Loading plants...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <ul className="cards">
        {plants.map((plantObj) => (
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
