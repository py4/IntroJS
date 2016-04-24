/**
 * Created by py4_ on 4/22/16.
 */
Utils = function() {

};

Utils.to_date = function(string) {
    splitted = string.split('-');
    return new Date(splitted[1] + ' ' + splitted[0] + ' ' + splitted[2]);
};

Utils.sort_string_dates = function(arr) {
    arr.sort(function(a,b) {
        return Utils.to_date(a) - Utils.to_date(b);
    });
};

Utils.parse_shipments = function(line) {
    var shipments = [];
    var shipment = "";
    var in_shipment = false;
    for(var i = 0; i < line.length; i++) {
        if(line[i] == '[') {
            in_shipment = true;
            continue;
        }
        if(line[i] == [']']) {
            in_shipment = false;
            shipments.push(Utils.parse_shipment(shipment));
            shipment = "";
        }
        if(in_shipment)
            shipment += line[i];
    }
    return shipments;
};

Utils.parse_shipment = function(string) {
    var tokens = string.split(',');
    return {
        'name': tokens[0].substring(1,tokens[0].length - 1),
        'count': parseInt(tokens[1].trim()),
        'base_price': parseInt(tokens[2].trim())
    };
};

exports.Utils = Utils;