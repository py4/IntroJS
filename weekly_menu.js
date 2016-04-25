var MenuItem = require('./menu_item').MenuItem;

var WeeklyMenu = function(date) {
    this.date = date;
    this.confirmed = false;
    this.details = {};
};

WeeklyMenu.prototype.add_food = function(day, food_name, price) {
    if(!this.details[day])
        this.details[day] = {};
    this.details[day][food_name] = new MenuItem(food_name, price);
};

WeeklyMenu.prototype.add_reservation = function(username, day, food_name) {
    this.details[day][food_name].add_reservation(username);
};

WeeklyMenu.prototype.confirm = function() {
    this.confirmed = true;
};

WeeklyMenu.prototype.has_item_in = function(day) {
    return !!this.details[day];
};

exports.WeeklyMenu = WeeklyMenu;