'use strict';

angular.module('myApp')
    .controller('UserCenterController', function ($scope, ConstantService) {

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
