import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './UpdateFood.css';

const UpdateFood = ({ url }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setList(res.data.data);
      } 
      else 
      {
        toast.error('Failed to fetch food items.');
      }
    } catch (error) {
      toast.error('Error fetching food items.');
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredList([]);
      setSelectedFood(null);
    } else {
      const filtered = list.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredList(filtered);
    }
  };

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
    });
    setImage(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpdateFood = async (event) => {
    event.preventDefault();
    setLoading(true); 

    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('description', formData.description);
    updatedData.append('price', formData.price);
    updatedData.append('category', formData.category);

    if (image) {
      updatedData.append('image', image);
    }

    try {
      const res = await axios.put(`${url}/api/food/update/${selectedFood._id}`, updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        toast.success('Food item updated successfully!');
        fetchData(); 
        setSelectedFood(null);
        setSearchTerm('');
        setFilteredList([]);
        setFormData({ name: '', description: '', price: '', category: '' });
        setImage(null);
      } else {
        toast.error('Failed to update the food item.');
      }
    } catch (error) {
      toast.error('Error updating food item.');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="update-food">
      <ToastContainer />
      <h2>Update Food Item</h2>

      <div className="search-food">
        <input
          type="text"
          placeholder="Search food by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="food-list">
        {searchTerm.trim() && filteredList.length > 0 ? (
          filteredList.map((food) => (
            <div
              key={food._id}
              className="food-item"
              onClick={() => handleSelectFood(food)}
            >
              <p>
                <strong>{food.name}</strong> - Rs {food.price}
              </p>
              <p>{food.category}</p>
            </div>
          ))
        ) : searchTerm.trim() && filteredList.length === 0 ? (
          <p>No food items found for "{searchTerm}"</p>
        ) : (
          <p>Please search for a food item to display.</p>
        )}
      </div>

      {selectedFood && (
        <form className="update-form" onSubmit={handleUpdateFood}>
          <h3>Update Food: {selectedFood.name}</h3>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-upload"
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="Chicken Burger">Chicken Burger</option>
            <option value="Beef Burger">Beef Burger</option>
            <option value="Loaded Fries">Loaded Fries</option>
            <option value="Burger Deals">Burger Deals</option>
            <option value="Beverages">Beverages</option>
            <option value="Chicken Nuggets">Chicken Nuggets</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Food'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateFood;
