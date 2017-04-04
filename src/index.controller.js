'use strict';

angular.module('myApp')

    .controller('IndexController', function ($scope,
                                             $uibModal,
                                             ResponseUtil,
                                             StorageService,
                                             UserService) {


        $scope.loginUser = null;

        $scope.user = null;

        UserService.gerCurrentUser(
            {token: StorageService.getToken()},
            function success() {

            }
        );

        // 登录
        $scope.login = function () {

            $uibModal.open({
                animation: true,
                templateUrl: 'home/path/user/login.html',
                controller: 'LoginController',

                resolve: {}
            }).result.then(
                function success(result) {

                },
                function error(reason) {

                }
            );


        }

    });