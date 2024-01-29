const {Router} = require("express") ; 
const rootRouter = Router() ; 
const {userRouter} = require("./user") ; 
const {accountRouter} = require("./account") ;

rootRouter.use("/user" , userRouter) ; 
rootRouter.use("/account", accountRouter) ; 

// exporting all routes 
module.exports = {
    rootRouter,
}