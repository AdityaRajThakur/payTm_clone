const {Router}  = require("express") ; 
const {authMiddleware} = require("../middleware/authMiddlware") ; 
const {Account, User} = require("../database/db")
const accountRouter = Router() ; 
const mongoose =  require("mongoose") ; 
const {z}  = require("zod") ; 
accountRouter.get("/balance" ,authMiddleware, async (req ,res)=>{
    const balance = await Account.findOne({
        userId :req.userId
    }) ; 
    res.status(200).json({
        balance : balance.balance
    })
})

accountRouter.post("/transfer" , authMiddleware , async (req ,res ) => {

    const mySchema = z.object({
        to:z.string(), 
        amount :z.number(),
    })
    if(!mySchema.safeParse(req.body)['success']){
        return res.status(404).json({
            message : "invalid inputs" , 
        });
    }
    const { amount , to } = req.body ; 

    const session = await mongoose.startSession() ; 
    session.startTransaction() ;  

    const fromAccount = await Account.findOne({
        userId : req.userId , 
    }).session(session) ; 

    if(!fromAccount || fromAccount.balance<amount){
        await session.abortTransaction() ; 
        return res.status(400).json({
            message : "insufficient balance" , 
        }); 
    }
    const toAccount = await Account.findOne({
        userId : to , 
    }).session(session) ; 
    // console.log("from ->" , req.userId) ;
    // console.log("to ->" , to) ; 
    if(!toAccount){
        await session.abortTransaction() ; 
        return res.status(400).json({
            message : 'invalid accounts', 
        })
    }
    await Account.updateOne({
        userId : req.userId , 
    }, {
        $inc :{
            balance : -amount ,
        }
    }).session(session) ; 
    await Account.updateOne({
        userId : to , 
    }, {
        $inc :{
            balance : amount ,
        }
    }).session(session) ; 
    await session.commitTransaction() ; 
    res.status(200).json({
        message : "Transfer successful" , 
    })
});

module.exports = {
    accountRouter , 
}