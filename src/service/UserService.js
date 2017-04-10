'use strict';

angular.module('myApp')
    .service('UserService', function ($resource, ConstantService, StorageService) {
        return $resource(ConstantService.BLOG + '/user/:id', {}, {
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
                url: ConstantService.BLOG + '/user/current?token=' + StorageService.getToken(),
                method: 'GET'
            }
        });
    });