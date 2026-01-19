import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import User from '../models/userModel.js';

export const registerUserService = async(name, username, password, role)=>{
    if(!name || !username || !password || !role){
        throw new Error("All fields are required");
    }
    const existingUser = await User.findOne({username})
    if(existingUser){
        throw new Error("Username already in used")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        username,
        password:hashedPassword,
        role
    })

    return user;
}

export const signInUserService = async(username, password)=>{
    if(!username || !password){
        throw new Error("Please fill all the required fields")
    }

    const existingUser = await User.findOne({username})
    if(!existingUser){
        throw new Error("Username does not exist")
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if(!isMatch){
        throw new Error("Incorrect credentials, please try again")
    }

    const token = generateToken(existingUser._id);
    return{
        user:{
           id:existingUser._id,
           name:existingUser.name,
           username:existingUser.username,
           role:existingUser.role
        },
        token
    }
}

