'use strict';

angular.module('myApp')
    .service('BlogService', function ($resource, ConstantService, StorageService) {
        return $resource(ConstantService.BLOG + '/blog/:id', {token: StorageService.getToken()}, {
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
                url: ConstantService.BLOG + '/blog/user/:userId',
                method: 'GET'
            },
            'read': {
                url: ConstantService.BLOG + '/blog/:id/read',
                method: 'GET'
            },
            'recommend': {
                url: ConstantService.BLOG + '/blog/recommend',
                method: 'GET'
            }
        });
    });