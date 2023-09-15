// Authentication Middleware.

const authenticateUser = (req,res,next)=>{
    const token = req.headers["authorization"];

    if(token){
        jwt.verify(token, process.env.JWT_SCRETEKEY, (err, decode) =>{
            if(err){
                return res.status(404).json({
                    success: false,
                    message: "Invalid token."
                })
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
    else{
        return res.status(401).josn({
            success: false,
            message: "Token not provided."
        })
    }
}