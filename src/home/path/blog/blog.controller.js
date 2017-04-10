'use strict';

angular.module('myApp')
    .controller('BlogController', function($scope, $stateParams, $sce, BlogService) {

        // 代码高亮
        SyntaxHighlighter.all();


        BlogService.get(
            {
                id: $stateParams.blogId
            },
            function success(response) {
                $scope.blog = response.data;

                $scope.blog.content = $sce.trustAsHtml($scope.blog.content);
            },
            function error(reason) {

            }
        )

    });