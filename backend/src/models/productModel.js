import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true
    },
    productPicture:{
        type:String,
        required:true
    },
    productPrice :{
        type:Number,
        required:true
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    ownerName:{
        type:String,
        required:true
    }
},{timestamps:true})

productSchema.index({ productName: "text"});


export default mongoose.model("Product", productSchema);