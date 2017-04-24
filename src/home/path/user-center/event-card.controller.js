'use strict';

angular.module('myApp')
    .controller('EventCardController', function ($scope, $stateParams, ConstantService, ResponseUtil, EventService) {

        EventService.list(
            {
                page: 1,
                pageSize: 10
            },
            function success(response) {
                if(ResponseUtil.validate(response)) {
                    $scope.eventList = response.data.list;
                }
            },
            function error(reason) {

            }
        )

    });
