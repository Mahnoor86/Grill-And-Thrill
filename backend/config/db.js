import mongoose from "mongoose";

export const connection = async() =>{
    await mongoose.connect('mongodb+srv://GrillAndThrill:grillandthrill123@grillandthrillcluster.zteo0.mongodb.net/GrillAndThrill').then(()=>console.log('Database Connected'));
}