import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema) // iska matlab hai pehele 
// server check krega ki database mai existing model exist krta hai ya nhi agr nhi
// to fir ek naya model bana dega user ke naam se userschema ka use krke

export default userModel