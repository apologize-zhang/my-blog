'use strict';

angular.module('myApp')
    .service('ClassifyService', function ($resource, ConstantService, StorageService) {
        return $resource(ConstantService.BLOG + '/classify/:id', {token: StorageService.getToken()}, {
            'get': {
                method: 'GET'
            },
            'create': {
                method: 'POST'
            },
            'update': {
                method: 'PUT'
            },
            'delete': {
                method: 'DELETE'
            },
            'list': {
                url: ConstantService.BLOG + '/classify/user/:userId',
                method: 'GET'
            }
        });
    });