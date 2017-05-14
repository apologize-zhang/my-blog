'use strict';

angular.module('myApp')
    .service('VisitHistoryService', function ($resource, ConstantService) {
        return $resource(ConstantService.BLOG + '/visithistory/:id', {}, {
            'get': {
                method: 'GET'
            }
        });
    });