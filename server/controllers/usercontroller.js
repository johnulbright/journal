// let express=require('express');
// let router = express.Router();
// let sequelize=require('../db');
// let User=sequelize.import('../models/user.js');
//the following line combines lines 1 and 2
const router=require('express').Router();
//the following line combines lines 3 and 4
const User=require('../db').import('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

//create a new endpoint: /create
// the endpoint is a post request
router.post('/create',function(req,res){
    //the object matches the model of the UserTable
    //let sequelize create a new record in the database (create)
    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password,13)
    })
        .then(
            function createSuccess(user){
                let token=jwt.sign({id: user.id}, process.env.JWT_SECRET,{expiresIn:24*60*60});
                let responseObject={
                    user: user,
                    message :'User successfully created',
                    sessionToken:token
                };
                res.json(responseObject);
            }
        )
        .catch(function(err){
            res.status(500).json({error:err})
        })
});


router.post('/login',function(req,res){
    User.findOne({where: {email: req.body.user.email}})
    .then(function loginSuccess(user){
        
        if(user ){
            bcrypt.compare(req.body.user.password,user.password,function(err,matches){
                if(matches){
                    let token=jwt.sign({id: user.id},process.env.JWT_SECRET,{expiresIn:24*60*60});
                    res.status(200).json({user:user,message:"login success",sessionToken:token});
                } else {
                    res.status(502).send({error:"Incorrect password"});
                }
            });
        } else {
            res.status(500).json({error:"User not found"})
        }
    })
    .catch(function (err){
        res.status(500).json({error:err})
    });
});


module.exports=router;