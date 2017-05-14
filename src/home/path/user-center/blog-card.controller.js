'use strict';

angular.module('myApp')
    .controller('BlogCardController', function ($scope, $stateParams,
                                                ResponseUtil, toastr, ConstantService, BlogService) {

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


        $scope.delete = function(blog) {

            BlogService.delete(
                {id: blog.id},
                function success(response) {
                    if(ResponseUtil.validate(response)) {
                        $scope.load();
                    } else {
                        toastr.error("删除失败", response.message);
                    }
                },
                function error(reason) {
                    toastr.error("删除失败", "请稍后重试");
                }
            )
        };

        $scope.statusChange = function (status) {
            $scope.statusFilter = status;

            $scope.load();

        };

    });
