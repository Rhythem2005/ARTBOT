import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// REGISTER FUNCTION - New user signup
const registerUser = async (req , res)=>{
    try{
        // Step 1: Body se data nikalo
        const {name, email, password} = req.body;
        
        // Step 2: Check karo - sab kuch mila ya nahi
        if(!name || !email || !password){
            return res.json({success:false, message:'Missing Details'}) // FIXED: typo
        }
        
        // Step 3: Password ko secure banao (hashing)
        const salt = await bcrypt.genSalt(10) // salt = random string
        const hashedPassword = await bcrypt.hash(password, salt) // password + salt = hashed

        // Step 4: User object tayaar karo
        const userData ={
            name,
            email,
            password: hashedPassword // original password nahi, hashed wala
        }
        
        // Step 5: Database mein save karo
        const newUser = new userModel(userData)
        const user = await newUser.save()

        // Step 6: Token banao (login ke liye)
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        // Step 7: Success response send karo
        res.json({success:true, token, user:{name: user.name}}) // FIXED: typo

    } catch (error){
        // Agar kuch galat ho toh error send karo
        console.log(error)
        res.json({success:false, message:error.message}) // FIXED: typo
    }
}

// LOGIN FUNCTION - Existing user login
const loginUser = async (req, res)=>{
    try {
        // Step 1: Body se email password nikalo
        const {email, password} = req.body;
        
        // Step 2: Database mein user dhundo
        const user = await userModel.findOne({email})

        // Step 3: User exist karta ya nahi check karo
        if(!user){
            return res.json({success:false, message:'User Does Not Exist'}) // FIXED: typo
        }
        
        // Step 4: Password match karta hai ya nahi
        const ismatch = await bcrypt.compare(password, user.password)

        // Step 5: Password sahi hai toh...
        if(ismatch){
            // Token banao login ke liye
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            // Success response bhejo
            res.json({success:true, token, user:{name: user.name}}) // FIXED: typo
        } else{
            return res.json({success:false, message:'Invalid Credentials'}) // FIXED: typo
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message}) // FIXED: typo
    }
}

export { registerUser, loginUser }