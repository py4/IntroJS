/**
 * Created by py4_ on 4/22/16.
 */

    var path = require('path');
    var Recipe = require('./recipe').Recipe;
    //var Storage = require('./storage').Storage;

    var RecipeContainer = function (recipe_path) {
        this.recipes = {};
        this.load_recipes(recipe_path);
    };

    RecipeContainer.prototype.load_recipes = function (recipe_path) {
        var recipes = require(path.join(__dirname, recipe_path));
        for (var i in recipes) {
            var recipe = new Recipe(recipes[i].name);
            this.recipes[recipes[i].name] = recipe;
            for (var j in recipes[i].recipe) {
                var ingredient = recipes[i].recipe[j];
                var name = ingredient.ingred.name;
                if (Storage.ingredient_container.has_enough(name, ingredient.amount)) {
                    var total_price = Storage.ingredient_container.price_for(name, ingredient.amount, false);
                    recipe.add_ingredient(name, ingredient.amount, total_price);
                }
                else
                    process.stdout.write("Not enough ingredients for this recipe! \n");
            }
        }
        console.log(this.recipes);
    };

RecipeContainer.prototype.show_recipes = function() {
    var keys = Object.keys(this.recipes).sort();
    for(var i in keys) {
        process.stdout.write(i.toString() + this.recipes[keys[i]].stringify());
    }
};

RecipeContainer.prototype.estimate_for = function(food_name, num) {
    var result = {};
    var ingredients = this.recipes[food_name].get_ingredients();
    for(var ingredient in ingredients) {
        var required_count = ingredients[ingredient] * num;
        var available_count = Storage.ingredient_container.how_many(ingredient);
        result[ingredient] = {
            'required': required_count,
            'available': available_count
        };
        if(required_count <= available_count)
            result[ingredient]['purchase price'] = 0;
        else
            result[ingredient]['purchase price'] = Storage.ingredient_container.how_much_for_new(ingredient, required_count - available_count);
    };
    return result;
};





exports.RecipeContainer = RecipeContainer;