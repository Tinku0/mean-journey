const UserModel = require("../models/user");

const registerUser = async (req, res, next) => {
    try {
        
        const user = await UserModel.findOne({ email: req.body.email });
        if(!user){
            const user = new UserModel(req.body);
            await user.save();
            return res.send({ status: true, user: user })
        }
        return res.status(400).send({ status: false, message: "User already exists" })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({email: req.body.email, password: req.body.password});
        if(!user){
            res.status(401).json({ status: false, message: 'User does not exist' })
        }
        if(user){res.send({ status: true, user: user })}
    } catch (error) {
        next(error)
    }
}

module.exports = { registerUser, loginUser };