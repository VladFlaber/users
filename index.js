const express =require("express")
const config = require("config")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')

const app =express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const PORT=config.get('port')||5000


app.use("/api/users",require("./routes/users.routes"));

async  function start(){
    try{
        await mongoose.connect(config.get("mongoUri"),{
            useNewUrlParser:true,
            useUnifiedTopology:true,

        })
        app.listen(PORT,()=>console.log(`app has been started at port ${PORT} ...`));
    }
    catch (e){
        console.log("SERVER error" , e.message);
        process.exitCode(1);
    }
}
start();