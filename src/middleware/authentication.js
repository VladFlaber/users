const express= require("express")
const  app = express()

const isAdmin= function (req,res,next){
    if (req.header("Authorization") ==="admin"){
        next();
    }
    else{
        res.json({msg:"you must be an admin"})
    }
}
module.exports=isAdmin;