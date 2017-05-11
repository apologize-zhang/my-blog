'use strict';

angular.module('myApp')

    .factory('StorageService', function ($rootScope) {

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

            // 清除token
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
            },
            saveUser: function(user) {
                sessionStorage.setItem("current_user", angular.toJson(user));
                $rootScope.$broadcast("userChanged");
            },
            getUser: function() {
                sessionStorage.getItem("current_user");
            }
        }
    });