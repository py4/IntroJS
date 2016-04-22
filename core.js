/**
 * Created by py4_ on 4/21/16.
 */
Storage = require('./storage').Storage;

var Core = function(users_path, shipments_path, recipe_path) {
    //var Storage = require('./storage').Storage;
    Storage.init(users_path, shipments_path, recipe_path);
    this.current_user = null;
}

Core.prototype.listen = function() {
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var fetchCommand = function(obj) {
        var prefix = "[Anonymous]";
        if(obj.current_user)
            prefix = "["+obj.current_user+"]";

        rl.question(prefix + " -> ", function(command) {
            if (command == "exit"){
                rl.close();
            } else {
                args = command.split(' ');
                if(args[0] != 'login' && args[0] != 'logout')
                    if(!obj.authenticate_user()) {
                        process.stdout.write("Not authorized!\n");
                        return fetchCommand(obj);
                    }
                switch(args[0]) {
                    case 'login':
                        obj.handle_login({'username': args[1], 'password': args[2]});
                        break;
                    case 'logout':
                        obj.handle_logout();
                        break;
                    case 'show':
                        switch(args[1]) {
                            case 'ingredients':
                                obj.handle_show_ingredients();
                                break;
                            case 'recipes':
                                obj.handle_show_recipes();
                                break;
                            default:
                                obj.handle_not_found();
                        }
                        break;
                    default:
                        obj.handle_not_found();
                }

                fetchCommand(obj);
            }
        });
    }

    fetchCommand(this);
}

Core.prototype.handle_login = function(params) {
    if(this.current_user)
        process.stdout.write("You're currently logged in!\n");
    else if(Storage.user_contrainer.valid_cred(params.username, params.password)) {
        this.current_user = params.username;
        process.stdout.write("Successfully logged in!\n");
    } else
        process.stdout.write("Wrong username or passsword!\n");
};

Core.prototype.handle_logout = function() {
    if(!this.current_user)
        process.stdout.write("You are not logged in at all!\m");
    else {
        this.current_user = null;
        process.stdout.write("Logged out successfully\n");
    }
};

Core.prototype.handle_not_found = function() {
    process.stdout.write("Command not found!\n");
};

Core.prototype.authenticate_user = function() {
    return true;
    if(this.current_user)
        return true;
    return false;
}

Core.prototype.handle_show_ingredients = function() {
    Storage.ingredient_container.show_ingredients();
};

Core.prototype.handle_show_recipes = function() {
    Storage.recipe_container.show_recipes();
}



exports.Core = Core;