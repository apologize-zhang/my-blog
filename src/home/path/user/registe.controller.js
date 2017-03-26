'use strict';

angular.module('myApp')
    .controller('RegisteController', function ($scope,
                                               $log,
                                               $state,
                                               UploadHelper,
                                               UserService) {


        $scope.uploader = UploadHelper.createUploader($scope);
        $scope.uploader.init();

        $scope.user = {
            gender: 'man'
        };

        // 注册
        $scope.registe = function() {

            $scope.user.img = $scope.imgUrl;

            UserService.registe(
                $scope.user,
                function success(response) {

                },
                function error(reason) {
                    $log.error(reason);
                }
            );

        };

        $scope.cancel = function() {
            BootstrapDialog.confirm({
                title: '提示',
                message: '你确定要离开吗',
                type: BootstrapDialog.TYPE_DEFAULT,
                closable: true,
                draggable: true,
                btnCancelLabel: '朕再想想',
                btnOKLabel: '去意已决',
                btnOKClass: 'btn-primary',
                callback: function (result) {

                    // user cancelled action, do nothing.
                    if (!result) {
                        return;
                    }

                    $state.go('^');

                }
            });
        }

    });