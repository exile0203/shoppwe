import { getAllUsersService } from "../services/userService.js";

export const getAllUsers = async(req, res)=>{
    try{
        const {page, limit} = req.query

        const users = await getAllUsersService(page, limit)

        return res.status(200).json({
            sucess:true,
            users
        })
    }catch(err){
        return res.status(400).json({
            sucess:false,
            Error:err.message
        })
    }
}