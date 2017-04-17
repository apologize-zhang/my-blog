'use strict';

angular.module('myApp')
    .controller('UserCenterController', function ($scope, $stateParams, $state,
                                                  currentUser, StorageService) {


        $scope.user = currentUser;

        var context = StorageService.getContext('user-center.card');

        $scope.card = context ? context : 'info';

        $scope.$watch('card', function(newVal, oldVal) {
            if(angular.equals(newVal, oldVal)) {
                return;
            }

            StorageService.saveContext('user-center.card', newVal);
        })

    });
