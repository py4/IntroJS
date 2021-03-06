/**
 * Created by py4_ on 4/21/16.
 */
var path = require('path');
var User = require('./user').User;

var UserContrainer = function(users_path) {
    this.users = {}
    this.load_users(users_path);
    this.init_admin();
}

UserContrainer.prototype.load_users = function(users_path) {
    var arr = require(path.join(__dirname, users_path));
    for(var i in arr) {
        var username = arr[i].username;
        this.users[username] = new User(username, arr[i].password);
    }
}
UserContrainer.prototype.init_admin = function () {
    this.users["admin"] = new User("admin", "password", true);
}

UserContrainer.prototype.get_users = function() {
    return this.users;
}

UserContrainer.prototype.get_user = function(username) {
    return this.users[username];
}

UserContrainer.prototype.user_exists = function(username) {
    return this.users.hasOwnProperty(username);
}

UserContrainer.prototype.valid_cred = function(username, password) {
    return this.user_exists(username) && this.get_user(username).password == password;
}

UserContrainer.prototype.is_privileged = function(username) {
    return this.user_exists(username) && this.get_user(username).is_admin;
}

exports.UserContrainer = UserContrainer;