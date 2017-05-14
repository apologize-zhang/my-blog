'use strict';

angular.module('myApp')
    .controller('BlogController', function ($scope, $stateParams, $sce, BlogService, StorageService, ResponseUtil) {

        // 代码高亮
        // SyntaxHighlighter.all();

        BlogService.get(
            {
                id: $stateParams.blogId
            },
            function success(response) {

                if (ResponseUtil.validate(response)) {

                    $scope.blog = response.data;

                    $scope.blog.content = $sce.trustAsHtml($scope.blog.content);

                    if(!StorageService.getBlog($stateParams.blogId)) {
                        StorageService.addBlog($stateParams.blogId);

                        // 设置blog
                        $scope.blog.read += 1;

                        BlogService.read(
                            {
                                id: $stateParams.blogId
                            },

                            function success(response) {
                            },
                            function error() {
                            }
                        );
                    }
                }
            },
            function error(reason) {

            }
        )

    });