import UserModel from '../models/UserModel.js';

// Add to Cart
const addToCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove items from user cart
const removeCartItem = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId);
        let cartData = userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            await UserModel.findByIdAndUpdate(req.body.userId, { cartData });
            res.json({ success: true, message: "Removed From Cart" });
        } else {
            res.json({ success: false, message: "Item not in cart or already at zero" });
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeCartItem, getCart };
