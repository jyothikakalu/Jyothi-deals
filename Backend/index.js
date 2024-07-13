const express=require("express")
const dbConnect = require("./db/db")
const studentrouter = require("./routes/studentrouter")
const cors=require("cors")
const app=express()
const PORT=3000
const hostName="127.0.0.5"

//routes
app.use(express.json())
app.use(cors())
app.use("/student",studentrouter)



app.listen(PORT,hostName,async()=>{
    await dbConnect()
    console.log(`server started at http://${hostName}:${PORT}`)
})