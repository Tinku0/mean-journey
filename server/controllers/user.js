const UserModel = require("../models/user");
const jwt = require('jsonwebtoken');

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
        if(user){
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.send({ status: true, token: token })
        }
    } catch (error) {
        next(error)
    }
}

const updateProfile = async (req, res, next) => {
    const  { id } = req.user;
    try {
        const user = await UserModel.findOneAndUpdate({_id: id}, req.body, { new: true });
        res.status(200).json({ message: 'Updated succesfully', user: user })
    } catch (error) {
        next(error)
    }
}

const getProfile = async (req, res, next) => {
    const  { id } = req.user;
    try {
        const user = await UserModel.findOne({_id: id});
        const safeUser = user.toObject();
        delete safeUser.password;
        res.status(200).json({ message: 'Profile fecthed succesfully', user: safeUser })
    } catch (error) {
        next(error)
    }
}

module.exports = { registerUser, loginUser, updateProfile, getProfile };