'use strict';

angular.module('myApp')
    .controller('HomeController', function ($scope, $rootScope, $stateParams,
                                            BlogService, DateUtils, BlogUtil, UserService, StorageService, ResponseUtil, VisitHistoryService, ClassifyService) {


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

                    if (!StorageService.getVisit($scope.userId)) {
                        StorageService.addVisit($scope.userId);

                        UserService.visit(
                            {
                                id: $scope.userId
                            },

                            function success(response) {
                            },
                            function error() {
                            }
                        );
                    }

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
                $scope.navs = getNavs(response.data);
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
                    pageSize: 5
                },
                function success(response) {
                    if (ResponseUtil.validate(response)) {

                        angular.forEach(response.data.list, function (item) {
                            item.content = BlogUtil.subStr(BlogUtil.replaceTag(item.content), 300, '...');
                        });
                        $scope.blogList = response.data.list;
                    }
                },
                function error(reason) {

                }
            );
        };

        $scope.load();


        // 切换左侧文章的排序条件
        $scope.switch = function (type) {

            // type: 1. 最近 2.最热  3.star最多
            $scope.type = type;

            BlogService.recommend(
                {
                    userId: $scope.userId,
                    page: 1,
                    pageSize: 8,
                    orderBy: type
                },
                function success(response) {
                    if (ResponseUtil.validate(response)) {
                        $scope.recommend = response.data;
                    }
                },
                function error(reason) {

                }
            );

        };

        $scope.switch(1);

        // 全站排名
        BlogService.recommend(
            {
                page: 1,
                pageSize: 8,
                orderBy: 2
            },
            function success(response) {
                if (ResponseUtil.validate(response)) {
                    $scope.allRecommend = response.data;
                }
            },
            function error(reason) {

            }
        );

        // 访问历史
        VisitHistoryService.get(
            {
                id: $scope.userId
            },
            function success(response) {

                $scope.visitHistory = [];

                for (var i = 0; i < 10; i++) {
                    $scope.visitHistory[i] = [];
                    for (var j = 0; j < 14; j++) {
                        $scope.visitHistory[i].push(response.data[i * 14 + j]);
                    }
                }

            },
            function error(reason) {

            }
        );

        $scope.months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec'
        ];

        $scope.getVisitClass = function (num) {
            if (num == 0) {
                return "visit-0";
            } else if (num < 5) {
                return "visit-5";
            } else if (num < 10) {
                return "visit-10";
            } else if (num < 20) {
                return "visit-20";
            } else {
                return "visit-40";
            }

        }

    });
