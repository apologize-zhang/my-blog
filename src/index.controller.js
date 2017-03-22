'use strict';

angular.module('myApp')

    .controller('IndexController', function ($scope,
                                             $uibModal) {


        // 登录
        $scope.login = function () {

            $uibModal.open({
                animation: true,
                templateUrl: 'home/path/user/login.html',
                controller: 'LoginController',

                resolve: {

                }
            }).result.then(
                function success(result) {

                },
                function error(reason) {

                }
            );


        }

    });