'use strict';

angular.module('myApp')
    .service('UserService', function ($resource, ConstantService) {
        return $resource(ConstantService.BLOG + '/api/user/:id', {}, {
            'get': {
                method: 'GET'
            },
            'registe': {
                method: 'POST'
            },
            'login': {
                url: ConstantService.BLOG + '/user/login',
                method: 'POST'
            }
        });
    });