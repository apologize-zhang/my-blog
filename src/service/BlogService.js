'use strict';

angular.module('myApp')
    .service('BlogService', function ($resource, ConstantService) {
        return $resource(ConstantService.BLOG + '/blog/:id', {}, {
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
                url: ConstantService.BLOG + '/blog/list',
                method: 'GET'
            },
            'recommend': {
                url: ConstantService.BLOG + '/user/recommend',
                method: 'GET'
            },
            'gerCurrentUser': {
                url: ConstantService.BLOG + '/user/current',
                method: 'GET'
            }
        });
    });