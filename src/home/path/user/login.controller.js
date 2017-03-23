'use strict';

angular.module('myApp')
    .controller('LoginController', function ($scope,
                                             $log,
                                             $state,
                                             $uibModalInstance,
                                             UserService) {


        $scope.registe = function() {

            $uibModalInstance.close(null);

            $state.go('registe');
        };

        $scope.login = function() {


            UserService.login(
                {
                    name: 'aaa',
                    password: '123'
                },
                function success(resposne) {

                },
                function error(reason) {
                    $log.error(reason);
                }
            )

        };


        // 取消
        $scope.cancel = function () {
            $uibModalInstance.close(null);
        };
    });