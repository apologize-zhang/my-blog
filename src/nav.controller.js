/**
 * Created by admin on 2017/2/12.
 */
'use strict';

angular.module('myApp')
    .controller('navController', function ($scope, ConstantService, StorageService) {

        $scope.currentUser = StorageService.getContext("current_user");
        if(!angular.isUndefinedOrNull($scope.currentUser)) {
            try{
                $scope.currentUser = angular.fromJson($scope.currentUser);
            } catch(e) {

            }
        }

        $scope.navs = [
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

angular.module('myApp')
    .service('myService', function() {
        return {
            'log': function() {
                console.log("log");
            }
        }
    });

