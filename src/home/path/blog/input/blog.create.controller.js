'use strict';

angular.module('myApp')
    .controller('BlogCreateController', function($scope, StorageService, BlogService) {

        $scope.blog = {};


        $scope.saveAndPublish = function() {


            $scope.blog.content = $scope.content;

            BlogService.create(
                {
                    id: StorageService.token
                },

                $scope.blog,

                function success() {

                },
                function error() {

                }
            );

        }
    });