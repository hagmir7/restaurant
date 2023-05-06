const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');


exports.protect = async (req, res, next)=>{
    let token
    const { authorization } = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try{
            // Get token form header
            token = authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
            // Return auth user data
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(error){
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, no token');
        }
    }

    if(!token){
        res.status(401).json({message: 'Not authorized, no token' });
    }

}

exports.protectAdmin = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(' ')[1];
            const decode = jwt.decode(token, process.env.TOKEN_SECRET);
            const user = await User.findById(decode.id).select('-password');
            const role = await Role.findById(user.role?.toString()).select('name');
            // return res.json(role);
            if (!role || !role.name === 'Admin') {
                return res.status(401).json({ message: "You are Not Admin!" });
            }
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Not authorized, no token" });
        }
    }
    !token && res.status(401).json({ message: "Not authorized, no token" });

}