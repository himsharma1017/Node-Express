const UserModel = require("../Models/User.model");
let bcrypt = require("bcrypt.js");
let salt = bcrypt.genSaltSync(10);
const jwtToken = require("jsonwebtoken");

const signup = async(req,res)=>{
    let {username, email, password} = req.body;

    try {
        if(username == " " || email == " " || password == " "){
            return res.status(400).json({
                message: 'Please fill all the fields those are Mandatory.'
            })
        }

        const existingUser = await UserModel.find({email});

        if(existingUser){

            return res.status(400).json({
                success: false,
                message: 'User already exists !',
                existingUser
            })
        }

        const signingUser = await UserModel.create({
            username,
            password: await bcrypt.hash(password,salt),
            email
        })

        await signingUser.save();

        const token = jwt.sign({id:registeredUser._id},process.env.JWT_SECRETKEY,{
            expiresIn: "1d"
        })
        res.status(200).json({
            success:true,
            message: 'User registered successfully.',
            registeredUser,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error registering user ${error.message}.`

        })
    }
}

const signin = async(req,res)=>{
    let {email,password} = req.body;

    try {
        if (email == ' ' || password == ' ') {
            return res.status(400).json({
                message: `Please fill all the fields.`

            })
        }

        const existingUser = await UserModel.find({ email });
        if (!existingUser || !(await bcrypt.compare(password,existingUser[0].password))) {
            return res.status(400).json({
                sucess: false,
                message: "User does not exists, please register yourself!"

            })
        }

        if (existingUser.length > 0 && existingUser[0].password) {
            // now match the users password with password coming from request body;

            if (await bcrypt.compare(password, existingUser[0].password)) {
                const token = jwt.sign({ id: existingUser[0]._id }, process.env.JWT_SECRETKEY, {
                    expiresIn: '24h'
                })
                return res.status(200).json({
                    success: true,
                    message: "Login Successful",
                    existingUser,
                    token
                })
            }
            return res.status(400).json({
                success: false,
                message: "password does not match",
                login: 'unsuccessful'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: `Something went wrong ${error.message}`

        })
    }
}

const getprofile = async(req,res)=>{
    let {email} = req.query;
    try {
        const userProfile = await UserModel.findById({email:email});
        if(!userProfile){
            return res.status(400).json({
                success: false,
                message:'no User found with this Email.'
            })
        }

        res.status(200).json({
            success: true,
            message:'User found in Database.',
            userProfile
        })        
    } catch (error) {
        console.log(error);
            return res.status(400).json({
            success: false,
            message:'something went wrong while getting User Data.!'
    })
    }
}

const updateProfile = async(req,res)=>{
    let id = req.params.id;
    let {username,password} = req.body;

    try {
        
        const updateProfile = await UserModel.findByIdAndUpdate({_id:id},{password:password,username:username},{
            new: true
        });

        if(!updateProfile){
            return res.status(400).json({
                success: false,
                message:'Username and password could not be updated'
            })
        }

        res.status(200).json({
            success: true,
            message:'Both Username and Password updated successfully',
            updateProfile
        })
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message:'error in updating User Credentials.'
        })
    }
}



module.exports = {signup,signin,getprofile, updateProfile};