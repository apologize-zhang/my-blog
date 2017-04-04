'use strict';

angular.module('myApp')
    .controller('SquareController', function ($rootScope, UserService, ResponseUtil) {

        $rootScope.navs = [
            {
                name: 'java',
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
