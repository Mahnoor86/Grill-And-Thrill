import express from "express";
import {addToCart,removeCartItem,getCart} from "../controllers/CartController.js"
import authMiddleware from "../middleware/Auth.js";

const CartRoute = express.Router();

CartRoute.post("/add",authMiddleware,addToCart);
CartRoute.post("/remove",authMiddleware,removeCartItem);
CartRoute.post("/get",authMiddleware,getCart);

export default CartRoute;