import axios from "axios";

export const useProducts = ()=>{

    const getProducts = async(page, sort)=>{
        try{
            const result = await axios.get(`/api/v1/products?page=${page}&sort=${sort}`)
            if(result.data.sucess === true){
                return result.data
            }else{
                throw new Error("Failed to fetch products")
            }
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error);
            } else if (error.request) {
                throw new Error("No response from server");
            } else {
                throw new Error(error.message);
            }
        }
    }

    const createProduct = async (productData)=>{
        try{
            
            const {productName, productPrice, productQuantity, file} = productData
            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('productPrice', Number(productPrice));
            formData.append('productQuantity',Number(productQuantity));
            formData.append('file', file);
            const result = await axios.post(`/api/v1/products/my-products`, formData,{
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return result.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error);
            } else if (error.request) {
                throw new Error("No response from server");
            } else {
                throw new Error(error.message);
            }
        }
    }

    const searchProduct = async(query)=>{
        try{
            if(!query){
                throw new Error("Invalid field")
            }
            const result = await axios.get(`/api/v1/products/search?q=${query}`)
            if(result.data.sucess === true){
                return result.data
            }else{
                throw new Error("Failed to search")
            }
        }catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error);
            } else if (error.request) {
                throw new Error("No response from server");
            } else {
                throw new Error(error.message);
            }
        }
    }

    return {getProducts, searchProduct, createProduct}
}