/**
 * Created by py4_ on 4/21/16.
 */
Storage = require('./storage').Storage;

var Core = function(users_path, shipments_path, recipe_path) {
    //var Storage = require('./storage').Storage;
    Storage.init(users_path, shipments_path, recipe_path);
    this.current_user = "admin";
};

Core.prototype.listen = function() {
    var readline = require('readline');
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var fetchCommand = function (obj) {
        var prefix = "[Anonymous]";
        if (obj.current_user)
            prefix = "[" + obj.current_user + "]";

        rl.question(prefix + " -> ", function (command) {
            if (command == "exit") {
                rl.close();
            } else {
                args = command.split(' ');
                if (args[0] != 'login' && args[0] != 'logout')
                    if (!obj.authenticate_user(args)) {
                        process.stdout.write("Not authorized!\n");
                        return fetchCommand(obj);//@esihaj : why another fetch command ?
                    }
                switch (args[0]) {
                    case 'login':
                        obj.handle_login({'username': args[1], 'password': args[2]});
                        break;
                    case 'logout':
                        obj.handle_logout();
                        break;
                    case 'show':
                        switch (args[1]) {
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
                    case 'estimate':
                        obj.handle_estimation({'name': args[2], 'count': args[1]});
                        break;
                    case 'shipment':
                        obj.handle_add_shipment(Utils.parse_shipments(command, Utils.parse_shipment));
                        break;
                    case 'menu':
                        if(command.indexOf("-repeat") == -1)
                            obj.handle_add_menu(Utils.parse_shipments(command, Utils.parse_menu_item));
                        else {
                            console.log("repeated!");
                            obj.handle_repeat_menu();
                        }
                        break;
                    case 'confirm':
                        if(args[1] === "menu")
                            obj.handle_confirm_menu();
                        break;
                    default:
                        obj.handle_not_found();
                }

                fetchCommand(obj);
            }
        });
    };

    fetchCommand(this);
};

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

Core.prototype.authenticate_user = function(action) {
    var privileged_cmds = ["estimate", "shipment", "menu", "confirm", "finalize"];
    var privileged_show_cmds = ["ingredients", "recipes"];
    if(!this.current_user) //if not signed in
        return false;
    if (privileged_cmds.indexOf(action[0]) !== -1 ||
                    (action[0] === "show" && privileged_show_cmds.indexOf(action[1]) !==-1) ) // if trying an admin cmd
        return  Storage.user_contrainer.is_privileged(this.current_user);
    return true;
};

Core.prototype.handle_show_ingredients = function() {
    Storage.ingredient_container.show_ingredients();
};

Core.prototype.handle_show_recipes = function() {
    Storage.recipe_container.show_recipes();
};

Core.prototype.handle_estimation = function(params) {
    var report = Storage.recipe_container.estimate_for(params.name, params.count);
    var result = "ingredient\trequired\tavailable\tpurchase price\n";
    for(name in report)
        result += name + "\t" + report[name]['required'].toString() + "\t" + report[name]['available'].toString() + "\t" + report[name]['purchase price'].toString() + "\n";
    process.stdout.write(result);
};

Core.prototype.handle_add_shipment = function(arr) {
    for(var i in arr)
        Storage.ingredient_container.add_shipment(arr[i].name, "", arr[i].count, arr[i].base_price);
    process.stdout.write("present warehouse value: "+Storage.ingredient_container.get_total_value().toString()+"\n");
};

Core.prototype.handle_show_menu = function() {
    var result = "";
    var details = Storage.weekly_menu_container.get_next_menu().details;
    var days = ["SAT", "SUN", "MON", "THU", "WED", "THU", "FRI"];
    for(var i in days) {
        var day = days[i];
        result += day + "\n";
        if(details[day]) {
            var keys = Object.keys(details[day]);
            keys.sort();
            for(var i in keys)
                result += "- " + keys[i] + " (" + details[day][keys[i]].price.toString() + ")" + "\n";
        } else
            result += "-\n";
    }
    process.stdout.write(result);
};

Core.prototype.handle_add_menu = function(arr) {
    Storage.weekly_menu_container.create_next_week();
    if(!this.can_alter_menu())
        reuturn;

    for(var i in arr)
        Storage.weekly_menu_container.add_food(arr[i].day, arr[i].food_name, arr[i].food_price);
    this.handle_show_menu();
};
Core.prototype.can_alter_menu = function() {
    if(!Storage.weekly_menu_container.can_alter_menu()) {
        process.stdout.write("Can't Alter menu: Menu is confirmed\n");
        return false;
    }
    return true;
};

Core.prototype.handle_repeat_menu = function() {
    if (!Storage.weekly_menu_container.repeat_menu()) {
        if(!this.can_alter_menu())
            return;
        else process.stdout.write("There is no previous menu\n");
    }

    else this.handle_show_menu();
};

Core.prototype.handle_confirm_menu = function() {
    if(this.can_alter_menu()) {
        Storage.weekly_menu_container.confirm_menu();
        process.stdout.write("menu confirmed\n");
    }
};


exports.Core = Core;