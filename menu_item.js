/**
 * Created by py4_ on 4/25/16.
 */
var MenuItem = function(food_name, price) {
    this.food_name = food_name;
    this.price = price;
    this.reservations = [];
};

MenuItem.prototype.add_reservation = function(username) {
    this.reservations.push(username);
};

exports.MenuItem = MenuItem;
