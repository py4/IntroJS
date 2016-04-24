/**
 * Created by py4_ on 4/21/16.
 */
var path = require('path');
var Ingredient = require('./ingredient').Ingredient;

var IngredientContainer = function(shipments_path) {
    this.ingredients = {};
    this.load_shipments(shipments_path);
};

IngredientContainer.prototype.load_shipments = function(shipments_path) {
    var data = require(path.join(__dirname, shipments_path));
    keys = Object.keys(data);
    Utils.sort_string_dates(keys);
    for(var i in keys) {
        for(var j in data[keys[i]]) {
            obj = data[keys[i]][j];
            var ingredient_name = obj.ingredient.name;
            //if(!this.ingredients[ingredient_name])
            ///    this.ingredients[ingredient_name] = new Ingredient(ingredient_name);
            this.add_shipment(ingredient_name, keys[i], obj.amount, obj.price);
        }
    }

};

IngredientContainer.prototype.add_shipment = function(ingredient_name, date, count, price) {
    if(!this.ingredients[ingredient_name])
        this.ingredients[ingredient_name] = new Ingredient(ingredient_name);
    this.ingredients[ingredient_name].add(date, count, price);
};

IngredientContainer.prototype.show_ingredients = function() {
    keys = Object.keys(this.ingredients).sort();
    for(var i in keys) {
        var ingredient = this.ingredients[keys[i]];
        process.stdout.write(i.toString() + " " + keys[i] + " " + ingredient.total_count.toString() + " " + ingredient.total_price.toString()+"\n");
    }
};

IngredientContainer.prototype.has_enough = function(name, amount) {
    if(!this.ingredients[name])
        return false;
    else
        return this.ingredients[name].has_enough(amount);
};

IngredientContainer.prototype.how_many = function(name) {
    return this.ingredients[name].how_many();
}

IngredientContainer.prototype.price_for = function(name, amount, should_pull) {
    return this.ingredients[name].price_for(amount, should_pull);
};

IngredientContainer.prototype.pull = function(name, amount) {
    return this.ingredients[name].pull(amount);
};

IngredientContainer.prototype.how_much_for_new = function(name, amount) {
    return this.ingredients[name].how_much_for_new(amount);
};

IngredientContainer.prototype.get_total_value = function() {
    var sum = 0;
    for(name in this.ingredients)
        sum += this.ingredients[name].total_price;
    return sum;
};


exports.IngredientContainer = IngredientContainer;