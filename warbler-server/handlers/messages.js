const db = require("../models");

// /api/users/:d/messages
exports.createMessage = async function(req, res, next) {
    try{
        let message = await db.message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.user.findById(req.params.id);
        foundUser.messages.push(messages.id);
        await foundUser.save();
        let foundMessage = await (await db.Message.findById(message._id)).populate("user", {
            username: true,
            profileImageURL: true
        });
        return res.status(200).json(foundMessage);
    } catch(error){
        return next(error)
    }
}; 

//GET- /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next) {
    try{
        let message = await db.Message.find(req.params.message._id);
        return res.status(200).json(message);
    } catch(error) {
        return next(error)
    }
}; 

// DELETE - /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
    try{
        let foundMessage =await db.Message.findById(req.params.message._id);
        foundMessage.remove();
        res.status(200).json(foundMessage);
    } catch(error) { return next(error); }
}; 