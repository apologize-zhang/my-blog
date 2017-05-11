'use strict';

angular.module('myApp')
    .controller('HomeController', function ($scope, $rootScope, $stateParams,
                                            BlogService, UserService, ResponseUtil, ClassifyService) {


        // 轮播图
        var currIndex = 0;
        var slides = $scope.slides = [
            {
                image: 'img.jpg',
                id: currIndex++
            },
            {
                image: 'img.jpg',
                id: currIndex++
            },
            {
                image: 'img.jpg',
                id: currIndex++
            },
            {
                image: 'img.jpg',
                id: currIndex++
            }
        ];

        $scope.userId = $stateParams.id ? $stateParams.id : 1;

        // home的用户id
        UserService.get(
            {
                id: $scope.userId
            },
            function success(response) {
                if (ResponseUtil.validate(response)) {
                    $scope.user = response.data;
                }
            }
        );


        // 获取当前用户
        UserService.gerCurrentUser(
            {},
            function success(response) {
                if (ResponseUtil.validate(response)) {
                    $scope.currentUser = response.data;
                }
            },
            function error() {

            }
        );

        // nav 分类信息
        ClassifyService.list(
            {
                userId: $scope.userId
            },
            function success(response) {
                $rootScope.navs = getNavs(response.data);
            },
            function error(reason) {

            }
        );

        var getNavs = function (data) {
            var parents = [];

            // 筛选出parents
            angular.forEach(data, function (item) {
                if (item.parentId == null) {
                    parents.push(item);
                }
            });

            angular.forEach(parents, function (parent) {
                parent.children = [];
                parent.isParent = false;
                angular.forEach(data, function (item) {
                    if (item.parentId == parent.id) {
                        parent.isParent = true;
                        parent.children.push(item);
                    }
                });
            });

            return parents;
        };

        // 文章列表
        $scope.load = function () {

            BlogService.list(
                {
                    userId: $scope.userId,
                    page: 1,
                    pageSize: 10
                },
                function success(response) {
                    if (ResponseUtil.validate(response)) {

                        angular.forEach(response.data.list, function (item) {
                            item.content = item.content.replace(/<[^>]+>/g, "");//去掉所有的html标记

                            if(item.content.length > 300) {
                                item.content = item.content.substr(0, 300) + "...";
                            }
                        });
                        $scope.blogList = response.data.list;
                    }
                },
                function error(reason) {

                }
            );

        };

        $scope.load();
    });
