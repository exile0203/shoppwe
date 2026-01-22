import redisClient from "../config/redisConfig.js";

const MAX_ATTEMPT = 5;
const BLOCK_TIME = 15*60;

export const loginRateLimiter = async(username)=>{
    const key = `login_attempts/${username}`

    const attempts = await redisClient.get(key)

    if(attempts && parseInt(attempts)>= MAX_ATTEMPT){
        return{
            allowed:false,
            message:'Too many failed attempts, Try again later'
        }
    }

    if(attempts){
        await redisClient.incr(key)
    }else{
        await redisClient.setEx(key, BLOCK_TIME, '1')
    }
    return {
        allowed:true
    }
}

export const resetLoginAttempts = async(username)=>{
    const key = `login_attempts/${username}`;
    await redisClient.del(key);
}