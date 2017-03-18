'use strict';
angular.module('myApp')
    .controller('ListController', function ($stateParams, $scope, $sce) {

        console.log($stateParams);

        $scope.submit = function() {
            $scope.aaa = $sce.trustAsHtml($scope.content);
        }
    });