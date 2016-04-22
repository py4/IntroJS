/**
 * Created by py4_ on 4/21/16.
 */

var UserContrainer = require('./user_container').UserContrainer;
var IngredientContainer = require('./ingredient_container').IngredientContainer;
var RecipeContainer = require('./recipe_container').RecipeContainer;

function Storage() {

}

Storage.init = function(users_path, shipments_path, recipe_path) {
    Storage.user_contrainer = new UserContrainer(users_path);
    Storage.ingredient_container = new IngredientContainer(shipments_path);
    Storage.recipe_container = new RecipeContainer(recipe_path);
}

exports.Storage = Storage;