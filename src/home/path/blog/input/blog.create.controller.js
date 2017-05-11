'use strict';

angular.module('myApp')
    .controller('BlogCreateController', function ($scope, $state, $stateParams,
                                                  toastr, ClassifyService, StorageService, ResponseUtil, BlogService) {


        $scope.blog = {};

        $scope.userId = $stateParams.id;


        // 分类信息
        ClassifyService.list(
            {
                userId: $scope.userId
            },
            function success(response) {
                if (ResponseUtil.validate(response)) {
                    $scope.classifies = $scope.classifyFilter(response.data);
                }
            },
            function error(reason) {

            }
        );

        $scope.classifyFilter = function (classifies) {
            var items = [];

            var children = [];

            // 筛选出parents
            angular.forEach(classifies, function (item) {
                if (item.parentId == null) {
                    items.push(item);
                }
            });

            angular.forEach(items, function (parent) {
                parent.isParent = false;
                angular.forEach(classifies, function (item) {
                    if (item.parentId == parent.id) {
                        parent.isParent = true;
                        children.push(item);
                    }
                });
            });

            angular.forEach(items, function (parent) {
                if (parent.isParent == false) {
                    children.push(parent);
                }
            });

            return children;
        };


        $scope.saveAndPublish = function () {

            HoldOn.open();

            $scope.blog.content = $scope.content;

            BlogService.create(
                {
                    id: StorageService.token
                },

                $scope.blog,

                function success(response) {
                    HoldOn.close();

                    if (ResponseUtil.validate(response)) {
                        toastr.success("保存成功", "现在跳转到文章页面");

                        setTimeout(function () {
                            $state.go('blog', {'blogId': response.data.id});
                        }, 1000)
                    }

                },
                function error() {
                    HoldOn.close();
                    toastr.success("保存失败", "请稍后再试");
                }
            );

        }
    });