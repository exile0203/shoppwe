import { registerUserService, signInUserService } from "../services/authService.js";

export const registerUser = async(req, res)=>{
    try{
        const {name, username, password, role} = req.body

        const result = await registerUserService(name, username, password, role)
        return res.status(201).json({
            success:true,
            data:{
                name: result.name,
                username:result.username,
                role:result.role
            }
        })
    }catch (err) {
    console.error(err);
    res.status(400).json({
        sucess:false,
      message: err.message,
    });
  }
}

export const signInUser = async (req, res)=>{
    try{
        const {username, password} = req.body
        
        const user = await signInUserService(username, password)
        const token = user.token

        res.cookie('jwt', token,{
        httpOnly:true,
        secure:process.env.NODE_ENV ==='production',
        sameSite:"strict",
          maxAge:
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN) *
        24 *
        60 *
        60 *
        1000,
       });

        return res.status(200).json({
            sucess:true,
            user:{
                id:user.user.id,
                name:user.user.name,
                username:user.user.username,
                role:user.user.role
            }})
    }catch (err) {
    console.error(err);
    res.status(400).json({
        sucess:false,
      message: err.message,
    });
  }
}

export const signOutUser = async(req, res)=>{
    try{
        res.cookie("jwt",'',{
            httpOnly:true,
            expires:new Date(0)
        });
            res.status(201).json({
            sucess:true,
            message:"User logged out"
        })
    }catch (err) {
    console.error(err);
    res.status(400).json({
      message: err.message,
    });
  }
}