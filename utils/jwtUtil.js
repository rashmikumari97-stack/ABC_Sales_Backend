const jwt =require("jsonwebtoken");
const generateToken=(payload)=>{
    return jwt.sign(payload, "MySecretKey@123",{expiresIn:'1h',});
}
const verifyToken=(token) =>{
    return jwt.verify(token, process.env.JWT_SECRET)
};

module.exports={
    generateToken,
    verifyToken,
}