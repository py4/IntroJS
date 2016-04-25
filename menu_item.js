/**
 * Created by py4_ on 4/25/16.
 */
var MenuItem = function(food_name, price, day) {
    this.food_name = food_name;
    this.day = day;
    this.price = price;
    this.reservations = {};
};

MenuItem.prototype.add_reservation = function(username) {
    var uuid = Utils.get_uuid();
    if(!this.reservations[username])
        this.reservations[username] = [];

    this.reservations[username].push(uuid);
    return uuid;
};

MenuItem.prototype.show_reservations_str = function() {
    var result = "";
    for (uname in this.reservations) {
        result += uname + "\t" + this.food_name + "\t" + this.day + "\n";
    }
    return result;
};

exports.MenuItem = MenuItem;
