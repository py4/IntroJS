/**
 * Created by py4_ on 4/22/16.
 */
var Recipe = function(name) {
    this.name = name;
    this.ingredients = {};
    this.total_price = 0;
};

Recipe.prototype.add_ingredient = function(name, count, total_price) {
    this.ingredients[name] = count;
    this.total_price += total_price;
};

Recipe.prototype.stringify = function() {
    var result = "";
    result += ("\t"+this.name+"\n");
    var keys = Object.keys(this.ingredients).sort();
    result += "\t";
    for(var i in keys)
        result += (keys[i]+": "+this.ingredients[keys[i]]).toString()+", ";
    result += '\n';
    result += "\t"+this.total_price.toString()+"\n";
    return result;
};

Recipe.prototype.get_ingredients = function() {
    return this.ingredients;
};

exports.Recipe = Recipe;