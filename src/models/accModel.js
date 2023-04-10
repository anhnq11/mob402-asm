var db = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

const taikhoanScheme = new db.mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { 
        type: String,
        default: 'User' 
    },
    token: {
        type: String,
        required: false
    }
},{
    collection: 'accounts',
});

taikhoanScheme.methods.generateAuthToken = async function () {

    const user = this
    console.log(user)
    const token = jwt.sign({_id: user._id, username: user.username}, SECRET_KEY)
    // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
    user.token = token;
    await user.save()
    return token
}

taikhoanScheme.statics.findByCredentials = async (username, passwd) => {

    const user = await accModel.findOne({username: username});
    console.log(user);
    if (!user) {
        throw new Error({error: 'Không tồn tại user'})
    }
    const isPasswordMatch = await bcrypt.compare(passwd, user.password)
    if (!isPasswordMatch) {
        throw new Error({error: 'Sai password'})
    }
    return user
}

let accModel = db.mongoose.model('accModel', taikhoanScheme);
module.exports = { accModel };