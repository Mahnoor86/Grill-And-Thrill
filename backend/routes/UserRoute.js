import express from 'express';
import { LoginUser, RegisterUser } from '../controllers/UserController.js'; 


const UserRoute= express.Router()

UserRoute.post("/register", RegisterUser)
UserRoute.post("/login", LoginUser)

export default UserRoute;
