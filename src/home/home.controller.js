'use strict';

angular.module('myApp')
    .controller('HomeController', function ($scope, $stateParams, UserService, ResponseUtil) {


        $scope.type = 1;

        UserService.get(
            {
                id: $stateParams.id
            },
            function success(response) {
                if (ResponseUtil.validate(response)) {
                    $scope.user = response.data;
                }
            }
        );



        $scope.switch = function(type) {
            $scope.type = type
        }
    });
