const express=require("express")
const { getStudent,studentSignup,studentLogin,studentUpdate, studentDelete} = require("../Controllers/studentcontrol.js")
const studentrouter=express.Router()

studentrouter.get("/:token",getStudent)


studentrouter.post("/signup",studentSignup)

studentrouter.post("/login",studentLogin)


module.exports=studentrouter

//"token": "eyJhbGciOiJIUzI1NiJ9.NjU2ZWZhMTcxODc5ZDM0MDA2YmEyNjI3.po86LosoZi3jQHpkXVbNsndr-c9dcIGP7z0Fp7kgDK0"