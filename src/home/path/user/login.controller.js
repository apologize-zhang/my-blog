'use strict';

angular.module('myApp')
    .controller('LoginController', function ($scope,
                                             $uibModalInstance,
                                             UserService) {

        $scope.login = function() {


        };


        // 取消
        $scope.cancel = function () {
            $uibModalInstance.close(null);
        };
    });