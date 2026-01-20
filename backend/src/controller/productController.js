import { getProductbyIdService } from "../services/cartService.js";
import { createProductService, editProductService, deleteProductService, getAllProductsService, searchProductService } from "../services/productService.js";

export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const productData = {
      ownerId: req.user._id,
      ownerName: req.user.name,
      productName: req.body.productName,
      productQuantity: req.body.productQuantity,
      productPrice: req.body.productPrice,
      fileBuffer: req.file?.buffer
    };

    const product = await createProductService(productData);

    res.status(201).json({ success: true, product });
  } catch (err) {
    return res.status(400).json({
      success: false,
      Error: err.message
    });
  }
};


export const editProduct = async(req, res)=>{
    try{
        const {id} = req.params
        const productData = {
      productName: req.body.productName,
      productQuantity: req.body.productQuantity,
      productPrice: req.body.productPrice,
      fileBuffer: req.file?.buffer
    };
     
    if (!productData.filePath) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
     }

    const updatedProduct = await editProductService(id, productData)

    return res.status(201).json(updatedProduct)


    }catch(err){
         return res.status(400).json({
      success: false,
      Error: err.message
    });
    }
}

export const getProductbyId = async(req, res)=>{
    try{
      const userId = req.user._id
      const {id} = req.params
      if(!userId || !id){
        return res.status(401).json({
          success:false,
          Error:"Missing necessary id"
        })
      }
      const result = await getProductbyIdService({
        userId: userId,
        productId: id
      })

      const sum  = result.product.productPrice * result.quantity
      
      return res.status(200).json({
        success:true,
        result,
        sum
      })
      
    } catch (err) {
      return res.status(400).json({
        success: false,
        Error: err.message
      });
    }
}


export const deleteProduct = async(req, res)=>{
    try{
        const {id} = req.params

        const result = await deleteProductService(id)
        return res.status(200).json({
            sucess:true,
            
        })
    }catch(err){
        return res.status(400).json({
      success: false,
      Error: err.message
    });
    }
}

export const getAllProducts = async(req, res)=>{
    try{
        const {page, limit, sort} = req.query
         let sortQuery = {};

    switch (sort) {
      case "price-asc":
        sortQuery = { productPrice: 1 };
        break;
      case "price-desc":
        sortQuery = { productPrice: -1 };
        break;
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

        const products = await getAllProductsService(page,limit, sortQuery)
        return res.status(201).json({
            sucess:true,
            products
        })
    }catch(err){
         return res.status(400).json({
      success: false,
      error: err.message
    });
    }
}

export const searchProduct = async(req, res)=>{
  try{
    const{q, page =1, limit =6} = req.query

    const result = await searchProductService({
      query:q,
      page:page,
      limit:limit
    })

    if(result.pagination.totalProducts === 0){
      return res.status(400).json({
        sucess:false,
        message:"Found no items"
      })
    }
    return res.status(200).json({
      sucess:true,
      result
    })
  }catch(err){
    return res.status(400).json({
      sucess:false,
      error:err.message
    })
  }
}