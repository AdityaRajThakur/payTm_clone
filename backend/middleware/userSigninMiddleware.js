const {z}  = require("zod") ; 
const userSchema = z.object({
    username : z.string() , 
    password : z.string().min(3),
}) 
function userSigninMiddleware(req ,res ,next){
    const out = userSchema.safeParse(req.body) ; 
    if(!out['success']){
        return res.status(411).json({
            message : "Incorrect inputs" , 
        }); 
    }
    next() ; 
}

module.exports = {
    userSigninMiddleware , 
}