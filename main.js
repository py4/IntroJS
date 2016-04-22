/**
 * Created by py4_ on 4/21/16.
 */
Utils = require('./utils').Utils;

var Core = require('./core.js').Core;
var core = new Core('data/users.json', 'data/warehouse.json', 'data/recipes.json');
core.listen();
