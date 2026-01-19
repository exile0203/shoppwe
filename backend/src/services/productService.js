import Product from '../models/productModel.js'
import { uploadproductProfile } from '../utils/productPFP.js';
export const createProductService = async(productData)=>{
    const {ownerId, productName, productQuantity, fileBuffer, ownerName,productPrice,} = productData;

    if(!ownerId){
        throw new Error("Missing ID")
    }

    const uploadResult = await uploadproductProfile(fileBuffer)

    if(!uploadResult){
        throw new Error("Failed to upload product picture")
    }

 


    const product = await Product.create({
        ownerId,
        productName,
        productQuantity,
        productPicture : uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
        productPrice,
        ownerName
    })

    return product;

}

import cloudinary from "../config/cloudinaryConfig.js";

export const editProductService = async (id, productData) => {
  const {
    productName,
    productQuantity,
    fileBuffer,
    productPrice,
  } = productData;

  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  let productPicture = product.productPicture;
  let cloudinaryId = product.cloudinaryId;

  
  if (fileBuffer) {
    
    if (cloudinaryId) {
      await cloudinary.uploader.destroy(cloudinaryId);
    }

    const uploadResult = await uploadproductProfile(fileBuffer, {
      folder: "products",
    });

    productPicture = uploadResult.secure_url;
    cloudinaryId = uploadResult.public_id;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productQuantity,
      productPrice,
      productPicture,
      cloudinaryId,
    },
    { new: true }
  );

  return updatedProduct;
};


export const deleteProductService = async(id) =>{
    if(!id) {
        throw new Error("MISSING ID")
    }

    const result = await Product.findByIdAndDelete(id)
    return result;
}

export const getAllProductsService = async(page=1, limit=6, sortQuery = {productPrice: - 1})=>{
    
    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)
    const skip = (pageNumber- 1) * limitNumber
    const products = await Product.find()
    .select("-createdAt -updatedAt")
    .sort(sortQuery)
    .skip(skip)
    .limit(limitNumber)

    const totalProducts = await Product.countDocuments();

    return{
        products,
        pagination:{
            page:pageNumber,
            limit: limitNumber,
            totalProducts,
            totalPages: Math.ceil(totalProducts/ limitNumber)
        }
    }
}

export const searchProductService = async({query, page, limit})=>{
      if(!query){
        throw new Error("Missing query")
      }
      const pageNumber =parseInt(page);
      const limitNumber = parseInt(limit)
      const skip = (pageNumber - 1)*limitNumber

      const results = await Product.find({
        $text:{$search : query}
      })
      .sort({productPrice : -1})
      .skip(skip)
      .limit(limitNumber)

      const totalProducts = await Product.countDocuments({$text:{$search:query}});

      return{
        results,
        pagination:{
           page:pageNumber,
            limit: limitNumber,
            totalProducts,
            totalPages: Math.ceil(totalProducts/ limitNumber)
        }
        }
      }

      


  
