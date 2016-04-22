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

exports.Utils = Utils;