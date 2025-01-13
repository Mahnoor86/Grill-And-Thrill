import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    item:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
})

const OrderModel = mongoose.models.order || mongoose.model("order",OrderSchema)
export default OrderModel;
