import User from '../models/userModel.js'

export const getAllUsersService = async(page, limit)=>{

    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)
    const skip = (pageNumber - 1) * limitNumber
    const users = await User.find()
    .select('-createdAt -updatedAt')
    .sort({createdAt: -1})
    .skip({skip})
    .limit({limitNumber})

    const totalUsers =  await User.countDocuments();

    return{
        users,
        pagination:{
            page:pageNumber,
            limit: limitNumber,
            totalUsers,
            totalPages: Math.ceil(totalUsers/ limitNumber)
        }
    }



}