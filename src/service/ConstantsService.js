'use strict';

angular.module('myApp')
    .service('ConstantsService', function ($resource, ConstantService) {

    })
    .service('ResponseUtil', function() {
        /* 判断response中是否有错误 */
        this.validate = function(response) {
            return response.code == 0;
        }
    })
;