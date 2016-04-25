/**
 * Created by py4_ on 4/21/16.
 */

var User = function(username, password, is_admin) {
    this.username = username;
    this.password = password;
    this.is_admin = typeof is_admin !== 'undefined' ? is_admin : false;
};

User.prototype.valid_password = function(password) {
    return this.password === password;
};

//User.prototype.is_privileged = function() {
//    return this.is_admin;
//};
exports.User = User;







