'use strict';

angular.module('myApp')
    .controller('BlogCardController', function ($scope, $stateParams, ConstantService, BlogService) {

        $scope.statusFilter = ConstantService.BlogStatus.Normal;

        $scope.load = function () {

            BlogService.list(
                {
                    userId: $scope.user.id,
                    page: 1,
                    pageSize: 10,
                    status: $scope.statusFilter
                },
                function success(response) {
                    $scope.blogList = response.data.list;
                },
                function error(reason) {

                }
            );

        };

        $scope.load();


        $scope.statusChange = function (status) {
            $scope.statusFilter = status;

            $scope.load();

        };

    });
