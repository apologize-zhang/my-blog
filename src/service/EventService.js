'use strict';

angular.module('myApp')
    .service('EventService', function ($resource, ConstantService, StorageService) {
        return $resource(ConstantService.BLOG + '/event/:id', {token: StorageService.getToken()}, {
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
                method: 'GET'
            }
        });
    });