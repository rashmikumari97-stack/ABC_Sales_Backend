const {verifyToken} = require("../utils/jwtUtil");
const authMiddleware = (req, res, next)=>{
console.log(req.path,'reqp')
    const publicRoutes = ['/api/auth/login', 'api/auth/register'];

    if(publicRoutes.includes(req.path)){
        return next();
    }

    const authHeader= req.headers.authrization;

    if(!authHeader || !authHeader.startwith("Bearer ")){
        return res.status(401).json({
            success:false,
            message:'authrization token missing'
        })
    }
    const token = authHeader.split(" ")[1];

try {
    const decoded = verifyToken(token);
          req.user=decoded;
          next();
}

catch(error){
    return res.status(401).json({
        success: false,
        message:"invalid or expired token"
    })
}
    
}

module.exports= authMiddleware;