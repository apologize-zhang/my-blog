'use strict';

angular.module('myApp')
    .controller('CommentCardController', function ($scope, $stateParams, ConstantService, ResponseUtil, CommentService) {

        CommentService.list(
            {
                page: 1,
                pageSize: 10
            },
            function success(response) {
                if(ResponseUtil.validate(response)) {
                    $scope.commentList = response.data.list;
                }
            },
            function error(reason) {

            }
        )

    });
