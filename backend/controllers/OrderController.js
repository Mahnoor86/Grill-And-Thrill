import OrderModel from '../models/OrderModel.js';
import UserModel from '../models/UserModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const PlaceOrder = async (req, res) => {
    const frontend_url = "http://localhost:3000";
    try {
        const newOrder = new OrderModel({ 
            userId: req.body.userId,
            item: req.body.item,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        
        const exchangeRate = 75.57; // Exact AED to PKR conversion rate

        const line_items = req.body.item.map((items) => ({
            price_data: {
                currency: "AED", 
                product_data: { name: items.name },
                unit_amount: Math.round((items.price / exchangeRate) * 100) // Convert from PKR to AED and round
            },
            quantity: items.quantity
        }));
        
        line_items.push({
            price_data: {
                currency: "AED", 
                product_data: { name: "Delivery Charges" },
                unit_amount: Math.round((2 / exchangeRate) * 100) 
            },
            quantity: 1
        });

    
 const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
});


        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error in PlaceOrder:", error);
        res.json({ success: false, message: "Error" });
    }
};
const VerifyOrder = async (req,res) => {
       const {orderId,success} =req.body;
       try {
        if (success=="true") {
          await OrderModel.findByIdAndUpdate(orderId,{payment:true});
          res.json({success:true,message:"Paid"})
        }
        else {
          await OrderModel.findByIdAndDelete(orderId);
          res.json({success:false,message:"Not Paid"})
        }
       } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
       }
  
}

// user order for frontend
   const userOrder = async(req,res)=>{
       try{
        const orders = await OrderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
       }
       catch(error){
        console.log(error);
        res.json({success:false,message:"Error Occured!"})
       }
   }

   // listing order for admin panel
   const listOrders = async(req,res)=>{
       try{
        const orders = await OrderModel.find({});
        res.json({success:true,data:orders})
       }
       catch(error){
        console.log(error);
        res.json({success:false,message:"Error Occured!"})
       }
   }

     // update status
     const updateStatus = async(req,res)=>{
        try{
         await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
         res.json({success:true,message:"Status Updated!"})
        }
        catch(error){
         console.log(error);
         res.json({success:false,message:"Error Occured!"})
        }
    }


 export {PlaceOrder,VerifyOrder,userOrder,listOrders,updateStatus};



