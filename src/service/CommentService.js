'use strict';

angular.module('myApp')
    .service('CommentService', function ($resource, ConstantService, StorageService) {
        return $resource(ConstantService.BLOG + '/comment/:id', {token: StorageService.getToken()}, {
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