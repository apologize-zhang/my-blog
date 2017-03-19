'use strict';

angular.module('myApp')
    .controller('BlogCreateController', function($scope) {


        $scope.saveAndPublish = function() {
            console.log($scope.content);
        }
    });