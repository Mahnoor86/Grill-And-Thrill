import FoodModel from "../models/FoodModel.js";
import fs from "fs";


const deleteImage = (imageName) => {
  fs.unlink(`uploads/${imageName}`, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
    }
  });
};

// Adding food items to the database
const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image uploaded." });
  }

  const { name, description, price, category } = req.body;


  if (!name || !description || !price || !category) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const food = new FoodModel({
    name,
    description,
    price,
    category,
    image: req.file.filename,
  });

  try {
    await food.save();
    res.status(201).json({ success: true, message: "Food item added successfully." });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Failed to add food item. Please try again." });
  }
};

// Fetching all food items from the database
const foodList = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching food list:", error);
    res.status(500).json({ success: false, message: "Failed to fetch food list." });
  }
};

// Removing a food item
const removeFood = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Food ID is required." });
  }

  try {
    const food = await FoodModel.findById(id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }

    deleteImage(food.image);
    await FoodModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Food item removed successfully." });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Failed to remove food item." });
  }
};

// Searching for food items
const searchFood = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ success: false, message: "Search term is required." });
  }

  try {
    const foods = await FoodModel.find({
      name: { $regex: name, $options: "i" }, 
    });

    if (foods.length === 0) {
      return res.status(404).json({ success: false, message: "No food items found." });
    }

    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Error searching food:", error);
    res.status(500).json({ success: false, message: "Failed to search for food items." });
  }
};

// Updating a food item
const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category } = req.body;
  let imageName = req.body.image; 

  if (!id) {
    return res.status(400).json({ success: false, message: "Food ID is required." });
  }

  if (!name || !description || !price || !category) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  if (req.file) {
    imageName = req.file.filename;

    const existingFood = await FoodModel.findById(id);
    if (existingFood) {
      deleteImage(existingFood.image);
    }
  }

  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(
      id,
      { name, description, price, category, image: imageName },
      { new: true } 
    );

    if (!updatedFood) {
      return res.status(404).json({ success: false, message: "Food item not found." });
    }

    res.status(200).json({ success: true, message: "Food item updated successfully.", data: updatedFood });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ success: false, message: "Failed to update food item." });
  }
};

export { addFood, foodList, removeFood, searchFood, updateFood };
