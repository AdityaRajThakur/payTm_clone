const express = require("express");
const cors = require("cors") ; 
const bodyParser = require("body-parser") ; 
const app = express() ; 
const {rootRouter}= require("./routes/index"); 

app.use(cors()) ; 
app.use(bodyParser.json()) ;  // I can also use express.json() to parse the body of the payload ; 
// app.use(express.json()) ; 


app.use('/api/v1' , rootRouter) ; 


const PORT = 8000
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});