'use strict';

angular.module('myApp')
    .controller('InfoCardController', function ($scope, UserService, ResponseUtil, UploadHelper) {


        $scope.mode = 'read';

        $scope.uploader = UploadHelper.createUploader($scope);
        $scope.uploader.init();

        UserService.get(
            {
                id: 1
            },
            function success(response) {
                if (ResponseUtil.validate(response)) {
                    $scope.user = response.data;
                }
            }
        );

        $scope.switchMode = function() {
            if($scope.mode == 'edit') {
                $scope.mode = 'read';
            } else {
                $scope.mode = 'edit';
                $scope.imgUrl = $scope.user.img;
                $scope.editUser = angular.copy($scope.user);
            }
        };


        $scope.cancel = function() {

        };


        $scope.save = function() {

            $scope.editUser.img = $scope.imgUrl;

            UserService.update(
                {
                    token: '123'
                },
                $scope.editUser,
                function success(response) {
                    if (ResponseUtil.validate(response)) {
                        $scope.user = response.data;
                        $scope.mode = 'read';
                    }
                }
            );
        };
    });
