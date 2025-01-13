import React, { useState } from 'react';
import './AddFood.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddFood = ({url}) => {
 
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Chicken Burger",
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);

    // Append image if it's selected
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        // Reset form data after successful submission
        toast.success("Food added successfully!");
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setImage(false); 
      } else {
        toast.error("An error occurred while adding the food.");
      }
    } catch (error) {
      console.error("Error adding food:", error.response ? error.response.data : error.message);
      toast.error("An error occurred while adding the food.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandle}>
        <div className="add-img flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-pro-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Enter Name Here"
          />
        </div>

        <div className="add-desp flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Enter Description Here"
            required
          ></textarea>
        </div>

        <div className="add-cat-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Chicken Burger">Chicken Burger</option>
              <option value="Beef Burger">Beef Burger</option>
              <option value="Loaded Fries">Loaded Fries</option>
              <option value="Burger Deals">Burger Deals</option>
              <option value="Beverges">Beverges</option>
              <option value="Chicken Nuggest">Chicken Nuggest</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="RS 1000"
            />
          </div>
        </div>

        <button type="submit" className="add-bt">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddFood;
