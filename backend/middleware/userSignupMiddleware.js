const {z} = require("zod") ; 


// username : {type : String ,required : true  , unique : true } , 
// firstName : {type :String ,required : true} , 

// lastName : {type :String , required : true} , 
// password : {type :String ,required : true , minLength : 3}  
const userSchema  = z.object({
    username : z.string().email(),
    firstName : z.string(),
    lastName : z.string() , 
    password : z.string().min(3)
})

function userSignupMiddleware(req , res , next){
    const out = userSchema.safeParse(req.body) ; 
    if(!out['success']){
        return res.status(404).json({
            msg : "Incorrect inputs" ,
        })
    }
    next() ; 
}


module.exports = {
    userSignupMiddleware, 
}