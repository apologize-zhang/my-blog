'use strict';

angular.module('myApp')
    .controller('HomeController', function ($scope, $stateParams, UserService, ResponseUtil) {


        $scope.type = 1;

        UserService.get(
            {
                id: $stateParams.id ? $stateParams.id : 1
            },
            function success(response) {
                if (ResponseUtil.validate(response)) {
                    $scope.user = response.data;
                }
            }
        );


        UserService.gerCurrentUser(
            {},
            function success(response) {
                $scope.currentUser = response.data;
            },
            function error() {

            }
        );

        $scope.switch = function(type) {
            $scope.type = type
        }
    });
