const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signIn = async function(req, res, next){
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageURL } = user;
        let isMatch = await user.comparePasssword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageURL
            }, process.env.SECRET_KEY );
            return res.status(200).json({
                id,
                username,
                profileImageURL,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid email/password"
            });
        }
    } catch(error) {
        return next({
            status: 400,
            message: "Invalid email/password"
        });
    }
};

exports.signUp = async function(req, res, next){
    try{
        //create a user
        let user = await db.User.create(req.body);
        let {id, username, profileImageURL} = user
        //create a token (signing a token)
        let token = jwt.sign({
            id,
            username,
            profileImageURL
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageURL,
            token
        })
    } catch(error) {
        if(error.code === 1100){
            error.message = "Sorry, that username is already taken";
        }
        return next({
            status: 400,
            message: error.message
        });
    }
}
