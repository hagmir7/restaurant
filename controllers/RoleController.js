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
    if(RoleModel.find({name})){
        res.status(400).json({message: "Role is already exits"});
    }

    try{
        const role = new RoleModel({name});
        const newRole = await role.save()
        res.json(newRole);
    }catch(error){
        console.log("Error creating new Role ", error);
        res.status(500).json({message: "Interval server error."})
    }


}
