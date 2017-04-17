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
                var token = sessionStorage.getItem('_token');
                return token ? token : '';
            },

            // 清除一条记录
            removeToken: function () {
                sessionStorage.removeItem('_token');
            },

            // 清除所有记录
            clearAll: function () {
                sessionStorage.clear();
            },

            // 是否有token
            hasToken: function() {
                return !angular.isUndefinedOrNull(sessionStorage.getItem('_token'));
            },

            saveContext: function(key, context) {
                sessionStorage.setItem(key, context);
            },
            getContext: function(key) {
                return sessionStorage.getItem(key);
            }

        }
    });