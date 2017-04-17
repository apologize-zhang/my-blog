'use strict';

angular.module('myApp')
.filter('ClassifyFilter', function () {
    return function (items, parentId) {

        if (angular.isUndefinedOrNull(items)) {
            return;
        }
        var _items = [];

        angular.forEach(items, function(item) {
            if(item.parentId == parentId) {
                _items.push(item);
            }
        });

        return _items;
    };
});