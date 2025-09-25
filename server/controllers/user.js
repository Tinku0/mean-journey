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

module.exports = { registerUser };