'use strict';

angular.module('myApp')
    .controller('BlogController', function ($scope, $stateParams, $sce, BlogService, ResponseUtil) {

        // 代码高亮
        SyntaxHighlighter.all();

        BlogService.get(
            {
                id: $stateParams.blogId
            },
            function success(response) {

                if (ResponseUtil.validate(response)) {

                    $scope.blog = response.data;

                    $scope.blog.content = $sce.trustAsHtml($scope.blog.content);
                }
            },
            function error(reason) {

            }
        )

    });