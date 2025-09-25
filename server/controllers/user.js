const UserModel = require("../models/user");

const registerUser = async (req, res, next) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        res.send({ status: true, user: user })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({username: req.body.username, password: req.body.password});
        if(!user){
            res.status(401).json({ status: false, message: 'User does not exist' })
        }
        if(user){res.send({ status: true, user: user })}
    } catch (error) {
        next(error)
    }
}

module.exports = { registerUser, loginUser };