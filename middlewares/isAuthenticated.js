import jwt from "jsonwebtoken";

const isAuthenticated = (req,res,next)=>{
   try{
    let token  = req.cookies.token;
    
    if(!token){
return res.status(400).json({"message":"couldnt find token"});
    }
    let tokenData = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!tokenData){
        return res.status(400).json({"message":"couldnt find token"});
    }
   let userId = tokenData.userId;
   req.Id = userId;
   
   next()
}catch(err){
        console.log(`error at authentication ${err}`)
    }
}


export default isAuthenticated