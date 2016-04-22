/**
 * Created by py4_ on 4/21/16.
 */

var IngredientShipment = require('./ingredient_shipment').IngredientShipment;

var Ingredient = function(name) {
    this.name = name;
    this.ingredient_shipments = [];
    this.total_count = 0;
    this.total_price = 0;
};

Ingredient.prototype.add = function(date, count, base_price) {
    this.ingredient_shipments.push(new IngredientShipment(date, count, base_price));
    this.total_count += count;
    this.total_price += count * base_price;
};

Ingredient.prototype.has_enough = function(num) {
    return num <= this.total_count;
};

Ingredient.prototype.pull = function(num) {

};

Ingredient.prototype.price_for = function(num, should_pull) {
    var total_price = 0;
    for(var i in this.ingredient_shipments) {
        var shipment = this.ingredient_shipments[i];
        if(shipment.count < num) {
            total_price += shipment.count * shipment.base_price;
            num -= shipment.count;
            if(should_pull) {
                this.total_count -= shipment.count;
                shipment.count = 0;
            }
        } else {
            total_price += num * shipment.base_price;
            if(should_pull) {
                this.total_count -= num;
                shipment.count -= num;
            }
            return total_price;
        }
    }
};

exports.Ingredient = Ingredient;


