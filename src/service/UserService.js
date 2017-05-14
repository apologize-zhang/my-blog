'use strict';

angular.module('myApp')
    .service('UserService', function ($resource, ConstantService, StorageService) {
        return $resource(ConstantService.BLOG + '/user/:id', {token: StorageService.getToken()}, {
            'get': {
                method: 'GET'
            },
            'registe': {
                method: 'POST'
            },
            'update': {
                method: 'PUT'
            },
            'login': {
                url: ConstantService.BLOG + '/user/login',
                method: 'POST'
            },
            'gerCurrentUser': {
                url: ConstantService.BLOG + '/user/current',
                method: 'GET'
            },
            'visit': {
                url: ConstantService.BLOG + '/user/:id/visit',
                method: 'GET'
            }
        });
    });