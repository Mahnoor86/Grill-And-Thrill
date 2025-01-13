import express from 'express';
import authMiddleware from '../middleware/Auth.js';
import {listOrders, PlaceOrder,updateStatus,userOrder,VerifyOrder} from "../controllers/OrderController.js";

const OrderRoute = express.Router();

OrderRoute.post("/place",authMiddleware,PlaceOrder);
OrderRoute.post("/verify",VerifyOrder);
OrderRoute.post("/userorders",authMiddleware,userOrder)
OrderRoute.get("/list", listOrders)
OrderRoute.post("/status",updateStatus)

export default OrderRoute;