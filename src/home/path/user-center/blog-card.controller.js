'use strict';

angular.module('myApp')
    .controller('BlogCardController', function ($scope, $stateParams, ConstantService, BlogService) {


        BlogService.list(
            {
                userId: $stateParams.id,
                page: 1,
                pageSize: 10,
                status: 10
            },
            function success(response) {
                $scope.blogList = response.data.list;
                console.table($scope.blogList);
            },
            function error(reason) {

            }
        );


    });
