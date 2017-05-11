'use strict';

angular.module('myApp')
    .controller('NotFoundController', function ($scope, $state) {

        setTimeout(function () {
            $state.go('square');
        }, 1000);
    });