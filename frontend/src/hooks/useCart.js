import axios from "axios";

export const useCart = ()=>{
    const getCart = async()=>{
        try{
            const result = await axios.get(`/api/v1/cart`)
            return result.data
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

    const addToCart = async (id)=>{
        try{
            const quantity = 1
            if(!id){
                throw new Error("Missing ID")
            }
            const result =  await axios.post(`/api/v1/cart/${id}`, {quantity})
            if(result){
                return result.data
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

    const editProduct = async(_id, quantity)=>{
        try{    
            console.log(quantity)
          
            
            const result = await axios.put(`/api/v1/cart/${_id}` ,{quantity} ,{new:true})
            if(result.data.sucess === true){
                return result.data
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

    const deleteProduct = async(id)=>{
        try{
            if(!id){
                throw new Error("MISSING ID")
            }
            const result = await axios.delete(`/api/v1/cart/${id}`)
            if(result){
                return result.data
            }
            else{
                throw new Error("FAILED TO DELETE THE PRODUCT")
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
    return {getCart, addToCart, editProduct, deleteProduct}
}