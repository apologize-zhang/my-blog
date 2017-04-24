'use strict';

angular.module('myApp')
    .controller('HomeController', function ($scope, $stateParams, UserService, ResponseUtil, StorageService) {


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
                if(ResponseUtil.validate(response)) {
                    $scope.currentUser = response.data;
                }
            },
            function error() {

            }
        );



    });
