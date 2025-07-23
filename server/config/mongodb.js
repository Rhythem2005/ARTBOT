import mongoose from "mongoose";

const connectDB = async()=>{
    mongoose.connection.on('connected', ()=>{
        console.log("Database connnected")

    })
    await mongoose.connect(`${process.env.MONGODB_URI}/ARTBOT`)
}
export default connectDB;
