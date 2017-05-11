'use strict';
angular.module('myApp')
    .controller('ListController', function ($stateParams, $scope, $sce,
                                            BlogService, ResponseUtil) {

        BlogService.list(
            {
                userId: 1000,
                page: 1,
                pageSize: 10
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