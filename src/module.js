module.exports.addUser = function (user, listUser, action){
    let check = true;
    listUser.forEach(element => {
        if (element.username == user.username) {
            check = false;
            console.log('Tên đăng nhập đã tồn tại!');
            // Alert thông báo tên đăng nhập đã tồn tại
        }
    });
    if(action !== 'account'){
        if(user.password !== user.repass){
            check = false;
            console.log('Mật khẩu không đúng!');
            // Alert thông báo mật khẩu không đúng
        }
    }
    // let accType;
    // if(user.acctype == 'Admin'){
    //     accType = 1;
    // }
    // else{
    //     accType = 2;
    // }
    // user.accType = accType;
    return check;
}