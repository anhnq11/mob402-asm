var db = require('./db');
const theLoaiScheme = new db.mongoose.Schema({
    tenloai: { type: String, required: true }
});
let theLoaiModel = db.mongoose.model('cat', theLoaiScheme);
module.exports = theLoaiModel;