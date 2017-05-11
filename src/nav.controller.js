/**
 * Created by admin on 2017/2/12.
 */
'use strict';

angular.module('myApp')
    .controller('navController', function ($scope, $rootScope, ConstantService, StorageService) {

        $rootScope.$on('userChanged', function() {

            $scope.currentUser = StorageService.getContext("current_user");
            if(!angular.isUndefinedOrNull($scope.currentUser)) {
                try{
                    $scope.currentUser = angular.fromJson($scope.currentUser);
                } catch(e) {

                }
            }
        });

        $rootScope.navs = [
            {
                name: 'Java',
                isParent: true,
                children: [
                    {
                        id: 1,
                        name: 'Spring'
                    },
                    {
                        id: 2,
                        name: 'Maven'
                    }
                ]
            },
            {
                id: 3,
                name: 'JavaScript',
                isParent: false
            }
        ]

    });


