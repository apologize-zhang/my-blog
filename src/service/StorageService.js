'use strict';

angular.module('myApp')

    .factory('StorageService', function () {

        return {

            // 保存token
            saveToken: function (token) {
                sessionStorage.setItem('_token', token);
            },

            // 获取token
            getToken: function() {
                return sessionStorage.getItem('_token');
            },

            // 清除一条记录
            removeToken: function () {
                sessionStorage.removeItem('_token');
            },

            // 清除所有记录
            clearAll: function () {
                sessionStorage.clear();
            }

        }
    });