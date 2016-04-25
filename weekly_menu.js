var MenuItem = require('./menu_item').MenuItem;

var WeeklyMenu = function(date) {
    this.date = date;
    this.confirmed = false;
    this.details = {};
};

WeeklyMenu.prototype.add_food = function(day, food_name, price) {
    if(!this.details[day])
        this.details[day] = {};
    this.details[day][food_name] = new MenuItem(food_name, price, day);
};

WeeklyMenu.prototype.add_reservation = function(username, day, food_name) {
    if (!this.details.hasOwnProperty(day) || !this.details[day].hasOwnProperty(food_name))
        return false;
    return this.details[day][food_name].add_reservation(username);
};

WeeklyMenu.prototype.confirm = function() {
    this.confirmed = true;
};

WeeklyMenu.prototype.has_item_in = function(day) {
    return !!this.details[day];
};

WeeklyMenu.prototype.show_reservations_of_day_str = function(day_details) {
    var result = "";
    for (food_name in day_details) {
        result += day_details[food_name].show_reservations_str();
    }
    return result;
};

WeeklyMenu.prototype.show_reservations_str = function(day) {
    var result = "";
    if (!!day) {
        if (!this.has_item_in(day))
            return "No reservations are made in " + day + "\n";
        return this.show_reservations_of_day_str(this.details[day]);
    } else {
        for(d in this.details) {
            result += this.show_reservations_of_day_str(this.details[d]);
        }
    }
    if (!result)
        return "No reservations are made";
    return result;
};
WeeklyMenu.prototype.finalize_menu = function() {
    var total = {}, sold = 0;
    for(d in this.details) {
        for (food_name in this.details[d]) {
            if (!total[food_name])
                total[food_name] = 0;
            total[food_name] += this.details[d][food_name].get_reservations_count();
            sold += this.details[d][food_name].get_total_sell_price();
        }
    }
    var result = "";
    for( food_name in total) {
        result += food_name + ": " + total[food_name] + "\n";
    }
    result += "cost: ???\n";
    result += "sold: " + sold + "\n";
    result += "profit: ??? (???%)\n";
    return result;
};

exports.WeeklyMenu = WeeklyMenu;