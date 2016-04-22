/**
 * Created by py4_ on 4/22/16.
 */

//module.exports = function(Storage) {


    var path = require('path');
    var Recipe = require('./recipe').Recipe;
    //var Storage = require('./storage').Storage;

    var RecipeContainer = function (recipe_path) {
        this.recipes = {};
        this.load_recipes(recipe_path);
    }

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
                    process.stdout.write("Not enought ingredients for this recipe! \n");
            }
        }
        console.log(this.recipes);
    };
//};

exports.RecipeContainer = RecipeContainer;