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
    return this.get_next_menu().confirmed();
};

WeeklyMenuContainer.prototype.create_next_week = function() {
    if(!this.has_next_week())
        this.menues[Utils.get_next_sat()] = new WeeklyMenu(Utils.get_next_sat());
};

WeeklyMenuContainer.prototype.repeat_menu = function() {
    this.create_next_week();
    var prev_sat = Utils.get_next_sat();
    prev_sat.setDate(prev_sat.getDate() - 7);
    this.menues[Utils.get_next_sat()] = this.menues[prev_sat];
};

WeeklyMenuContainer.prototype.get_next_menu = function() {
    return this.menues[Utils.get_next_sat()];
};

WeeklyMenuContainer.prototype.add_food = function(day, food_name, price) {
    this.get_next_menu().add_food(day, food_name, price);
};

exports.WeeklyMenuContainer = WeeklyMenuContainer;