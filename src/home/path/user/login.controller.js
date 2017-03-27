'use strict';

angular.module('myApp')
    .controller('LoginController', function ($scope,
                                             $log,
                                             $state,
                                             $uibModalInstance,
                                             ResponseUtil,
                                             StorageService,
                                             toastr,
                                             UserService) {


        $scope.registe = function() {

            $uibModalInstance.close(null);

            $state.go('registe');
        };

        $scope.login = function() {

            UserService.login(
                {
                    email: $scope.user.email,
                    password: $scope.user.password
                },
                function success(response) {
                    if(ResponseUtil.validate(response)) {
                        StorageService.saveToken(response.data);
                        toastr.success('欢迎回来', '登录成功');

                        StorageService.saveToken(response.data);

                        $uibModalInstance.close(null);

                    } else {
                        toastr.error('请检查邮箱或密码是否填写正确', '登录失败');
                    }
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