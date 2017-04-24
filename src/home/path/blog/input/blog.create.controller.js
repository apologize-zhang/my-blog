'use strict';

angular.module('myApp')
    .controller('BlogCreateController', function($scope, $state, toastr, StorageService, ResponseUtil, BlogService) {

        $scope.blog = {};

        $scope.saveAndPublish = function() {

            HoldOn.open();


            $scope.blog.content = $scope.content;

            BlogService.create(
                {
                    id: StorageService.token
                },

                $scope.blog,

                function success(response) {
                    HoldOn.close();

                    if(ResponseUtil.validate(response)) {
                        toastr.success("保存成功", "现在跳转到文章页面");

                        setTimeout(function() {
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