const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        const {name, email, password,phone, address,isAdmin} = req.body;
        if(!name || !email || !password || !phone) {
          return res.status(400).json({
            message: 'All fields are required'
          })
        }

        const isUser = await User.findOne({ $or: [{ email }, { phone }] });

        if(isUser){
          return res.status(400).json({
            message: 'User already exists'
          })
        }
        
        const user = new User({
          name,
          email,
          password,
          phone,
          address: address || "No address provided",
          isAdmin
        })

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        const token = jwt.sign({email:user.email, _id:user._id}, process.env.JWT_SECRET,{
            expiresIn: '30m'
        })

        res.status(201).json({
            message: 'User registered successfully',
            success: true,
            token,
            email,
            name: user.name,
            phone: user.phone,
            address:user.address || ''
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", success: false,
        })
    }
}

const login = async (req,res) =>{
  try {
    const {email, password} = req.body;

    if(!email || !password){
     return res.status(400).json({
        message: 'All fields are required',
        success: false
      })
    }

    const user = await User.findOne({email:email});
    if(!user){
      return res.status(401).json({
        message: 'User not found',
        success: false
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
       return res.status(401).json({
        message: 'Invalid credentials',
        success: false
      })
    }

    const token = jwt.sign({email: user.email, _id: user._id}, process.env.JWT_SECRET, 
      {expiresIn: '30m'}
    )
    res.json({
      message: 'User logged in successfully',
      success: true,
      token,
      email,
      name: user.name,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin
    })
  } catch (error) {
     res.status(500).json({
        message: "Internal Server Error", success: false,
     })
  }
}

//Admin Access

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admins only",
      });
    }

    next(); // Allow to proceed to controller

  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



module.exports = {signUp, login, isAdmin}