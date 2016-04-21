/**
 * Created by py4_ on 4/21/16.
 */

var User = function(username, password) {
    this.username = username;
    this.password = password;
}

User.prototype.valid_password = function(password) {
    return this.password === password;
}

exports.User = User;







