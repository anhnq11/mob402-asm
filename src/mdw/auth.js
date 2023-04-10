const jwt = require('jsonwebtoken')
const md = require('../models/accModel');
require('dotenv').config(); // su dung thu vien doc file env
const SECRET_KEY = process.env.SECRET_KEY;

const api_auth = async(req, res, next) => {
    
    // let header_token = req.header('Authorization');

    const header_token = req.headers.authorization;

    if(typeof(header_token) =='undefined'){
        return res.status(403).json({msg: 'Không xác định token'});
    }
    const token = header_token.replace('Bearer ', '')
    try {
        const data = jwt.verify(token, SECRET_KEY)
        console.log(data);
        const user = await md.accModel.findOne({ _id: data._id, token: token })
        if (!user) {
            throw new Error("Không xác định được người dùng")
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: error.message })
    }
}
module.exports = {api_auth}
