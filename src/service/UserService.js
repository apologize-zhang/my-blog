'use strict';

angular.module('myApp')
    .service('UserService', function (ConstantService) {
        return $resource(ConstantService.BLOG + '/api/user/:id', {}, {
            'get': {
                method: 'GET'
            },
            'login': {
                url: ConstantService.BLOG + '/api/user/login',
                method: 'POST'
            }
        });
    });