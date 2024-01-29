const jwt  = require("jsonwebtoken") ; 
const {JWT_SECRET} = require("../config") ; 
const {z} = require("zod") ; 
const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})
function authMiddleware(req ,res , next ){
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    const authorization  = req.headers.authorization ; 
    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.status(411).json({
            message:"Error" , 
        });
    }
    const token = authorization.split(" ")[1] ; 
    try{
        const decoded = jwt.verify(token , JWT_SECRET) ; 
        req.userId = decoded.userid ; 
   
        next() ; 
    }catch(err){
        return res.status(411).json({
            message :"Authorization failed" , 
        })
    }
}

module.exports = {
    authMiddleware, 
}