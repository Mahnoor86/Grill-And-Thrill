import express from 'express';
import multer from 'multer';
import { addFood, foodList, removeFood, searchFood, updateFood } from '../controllers/FoodController.js';

const FoodRoute = express.Router();

// Image Storage Configuration
const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: Storage });

// Route to add food with image
FoodRoute.post("/add", (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: "Multer error", error: err.message });
        } else if (err) {
            return res.status(500).json({ success: false, message: "Unknown error occurred", error: err.message });
        }
        next(); 
    });
}, addFood);

FoodRoute.get("/list", foodList);
FoodRoute.post("/remove", removeFood);

FoodRoute.get("/search", searchFood);

// Update food item with image
FoodRoute.put("/update/:id", (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: "Multer error", error: err.message });
        } else if (err) {
            return res.status(500).json({ success: false, message: "Unknown error occurred", error: err.message });
        }
        next(); 
    });
}, updateFood);

export default FoodRoute;
