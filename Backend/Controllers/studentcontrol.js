const bcrypt=require("bcrypt")
const studentModel = require("../Model/Studentmodel")
const jwt=require("jsonwebtoken")

//token generation

const generateToken=(id)=>{
    let studentId=id.toString()
    let token=jwt.sign(studentId,"Mounika")
    return token
}
const getStudent= async(req,res)=>{
    // console.log(req.params)
    let {token}=req.params
    let id=jwt.verify(token,"Mounika")
    let studentDetails=await studentModel.findOne({_id:id}).select("-password -_id-__v")
    res.send(studentDetails)
     //res.send(id)
}
const studentSignup= async(req,res)=>{
    let data=req.body
    let {fname,lname,password,email,sId,mobile}=data
    if(!fname || !lname || !password || !email || !sId || !mobile){
        return res.status(400).send("Provide all required fields")
    }
    let isEmailAvailable=await studentModel.findOne({email})
    if(isEmailAvailable)
    {
        return res.status(401).send("student already registerd")
    }
    else{
        let hashespass=await bcrypt.hash(password,10)
        let student={...data,password:hashespass}
        let studentUpload=new studentModel(student)
        await studentUpload.save()
        return res.status(201).send({token:generateToken(studentUpload._id)})
    }
}
const studentLogin=async(req,res)=>{
    let {password,email}=req.body
    let student=await studentModel.findOne({email})
    if(student){
        let matchedpass= await bcrypt.compare(password,student.password)
        if(matchedpass)
        {
            res.status(200).send({token:generateToken(student._id)})
        }
        else{
            res.status(400).send({msg:"password not registered"})
        }

    }
    else{
        res.status(400).send({msg:"Student not registered"})
    }
}
const studentUpdate =async(req,res)=>{
    const {email,gender,age,fname,lname,mobile,sId}=req.body
    let result= await studentModel.updateOne({email},{$set:{sId,gender,age,fname,lname,mobile}})
    console.log(result)
    if(result.acknowledged){
        res.status(200).send({msg:"user Data Updated"})
    }
    else{
        res.status(500).send({msg:"something went Wrong"})
    }

}
const studentDelete=async(req,res)=>{
    try{
        let {email} = req.body
        if(email){
            let student = await studentModel.findOne({email})
            if(student){
                let response =  await studentModel.deleteOne({email})
                if(response.acknowledged){
                    res.status(200).send({msg:"Student Account Deleted"})
                }
            }
        }
    }
    catch{
        res.status(500).send({msg:"Something went wrong"})
    }
}


module.exports={getStudent,studentSignup,studentLogin,studentUpdate,studentDelete}
