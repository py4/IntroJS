/**
 * Created by py4_ on 4/21/16.
 */

var User = function(username, password, is_admin) {
    this.username = username;
    this.password = password;
    this.is_admin = typeof is_admin !== 'undefined' ? is_admin : false;
    this.reservations = {};
};

User.prototype.valid_password = function(password) {
    return this.password === password;
};

User.prototype.add_reservation = function(uuid, menu_item) {
    this.reservations[uuid] = menu_item;
};
User.prototype.has_reservation = function() {
    var  name;
    for (name in this.reservations) {
        if (this.reservations.hasOwnProperty(name)) {
            return true;
        }
    }
    return false;
};
User.prototype.show_reservation_str = function() {
    if(!this.has_reservation())
        return "has made no reservations";

    var result ="refrence\t\t\t\t\tday\t\meal\n";
    for (uid in this.reservations) {
        result += uid + "\t" + this.reservations[uid]['day'] + "\t" + this.reservations[uid]['food_name'] + "\n";
    }
    return  result;
};

//User.prototype.is_privileged = function() {
//    return this.is_admin;
//};
exports.User = User;







