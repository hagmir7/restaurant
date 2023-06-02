const express = require('express');
const RoleModel = require('../models/Role');
const app = express();


exports.create = async (req, res, next)=>{
    const { name } = req.body;
    if(!name){
        res.status(400);
        throw Error("Role name is required");
    }

    // Check if Role is already exists
    if((await RoleModel.findOne({name}))){
        return res.status(400).json({message: "Role is already exits"});
    }

    try{
        const role = await RoleModel.create({name});
        res.json(role);
    }catch(error){
        console.log("Error creating new Role ", error);
        res.status(500).json({message: "Interval server error."})
    }


}
