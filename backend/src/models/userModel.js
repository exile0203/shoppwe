import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true   
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        enum:['user','admin', 'seller'],
        required:true,
    }
    
},{timestamps:true});

export default mongoose.model('User', userSchema);