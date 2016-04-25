/**
 * Created by py4_ on 4/25/16.
 */

var WeeklyMenu = require('./weekly_menu').WeeklyMenu;

var WeeklyMenuContainer = function() {
    this.menues = {}
};

WeeklyMenuContainer.prototype.has_next_week = function() {
    return !!this.get_next_menu();
};

WeeklyMenuContainer.prototype.confirmed_next_week = function() {
    return this.get_next_menu().confirmed;
};

WeeklyMenuContainer.prototype.create_next_week = function() {
    if(!this.has_next_week())
        this.menues[Utils.get_next_sat()] = new WeeklyMenu(Utils.get_next_sat());
};

WeeklyMenuContainer.prototype.repeat_menu = function() {
    this.create_next_week();
    if (!this.can_alter_menu())
        return false;
    var prev_sat = Utils.get_next_sat();
    prev_sat.setDate(prev_sat.getDate() - 7);
    if (!this.menues[prev_sat])
        return false;
    this.menues[Utils.get_next_sat()] = this.menues[prev_sat];
    return true;
};

WeeklyMenuContainer.prototype.get_next_menu = function() {
    return this.menues[Utils.get_next_sat()];
};

WeeklyMenuContainer.prototype.add_food = function(day, food_name, price) {
    this.get_next_menu().add_food(day, food_name, price);
};

WeeklyMenuContainer.prototype.confirm_menu = function() {
    this.get_next_menu().confirm();
};

WeeklyMenuContainer.prototype.can_alter_menu = function() {
    return this.has_next_week() && !this.confirmed_next_week();
};
WeeklyMenuContainer.prototype.can_reserve = function() {
    return this.has_next_week() && this.confirmed_next_week();
};
WeeklyMenuContainer.prototype.add_reservation = function(username, day, food_name) {
    //@returns uuid of reservation
    //@returns false on failure
    return this.get_next_menu().add_reservation(username, day, food_name);
};

WeeklyMenuContainer.prototype.show_reservation_str = function(day) {
    if (!this.has_next_week())
        return "There is no menu for next week\n";
    return this.get_next_menu().show_reservations_str(day);
};

WeeklyMenuContainer.prototype.finalize_next_week = function() {
    var result = "";
    if (!this.has_next_week())
        return "There is no menu for next week\n";
    return this.get_next_menu().finalize_menu();
}

exports.WeeklyMenuContainer = WeeklyMenuContainer;