/**
 * Created by py4_ on 4/22/16.
 */
var Recipe = function(name) {
    this.name = name;
    this.ingredients = {}
    this.total_price = 0;
};

Recipe.prototype.add_ingredient = function(name, count, total_price) {
    this.ingredients[name] = count;
    this.total_price += total_price;
};

exports.Recipe = Recipe;