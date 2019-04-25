const bcrypt = require('bcryptjs')

var passWord = 'stephen'
function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}        

console.log(hashPassword(passWord));