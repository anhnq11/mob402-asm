var db = require('./db');
const productsScheme = new db.mongoose.Schema({
    tensp: { type: String, required: true },
    giaban: { type: Number, required: true },
    lsp: { type: String, required: true },
    motasp: { type: String, required: false },
    soluong: { type: Number, required: true },
    author: { type: String, required: true }
});
let prodModel = db.mongoose.model('prod', productsScheme);
module.exports = prodModel;