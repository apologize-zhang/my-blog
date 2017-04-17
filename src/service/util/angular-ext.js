'use strict';

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
};

angular.trimString = function(val) {

    if(this.isUndefinedOrNull(val))
        return null;

    return val.replace(/(^\s+)|(\s+$)/g,'');
};

angular.isStringEmpty = function(val) {
    var trimmedVal = this.trimString(val);

    return trimmedVal === null || trimmedVal === '';
};

angular.splitString = function(val, splitter) {

    if (this.isUndefinedOrNull(val) || val == "")
        return "";

    var values = val.split(splitter);

    var results = [];
    for (var i = 0; i < values.length; i++) {
        var value = this.trimString(values[i]);
        results.push(value);
    }

    return results;
};

angular.getStringByteLength = function(chars) {
    if (angular.isUndefinedOrNull(chars)) {
        return 0;
    }
    return chars.replace(/[^\x00-\xff]/g, "xx").length;
};

