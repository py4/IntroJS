/**
 * Created by py4_ on 4/21/16.
 */

var UserContrainer = require('./user_container').UserContrainer;

function Storage() {

}

Storage.init = function(users_path) {
    Storage.user_contrainer = new UserContrainer(users_path);
}

exports.Storage = Storage;