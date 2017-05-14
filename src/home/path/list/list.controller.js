'use strict';
angular.module('myApp')
    .controller('ListController', function ($stateParams, $scope, $sce,
                                            BlogService, ResponseUtil) {


        $scope.userId = $stateParams.id;
        $scope.classify = $stateParams.classify;

        BlogService.list(
            {
                userId: $scope.userId,
                page: 1,
                pageSize: 10,
                classify: $scope.classify
            },
            function success(response) {
                if (ResponseUtil.validate(response)) {
                    $scope.blogList = response.data.list;
                }
            },
            function error(reason) {

            }
        );
    });