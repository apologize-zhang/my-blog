'use strict';

angular.module('myApp')

    .factory('StorageService', function ($rootScope) {

        return {

            // 保存token
            saveToken: function (token) {
                sessionStorage.setItem('_token', token);
            },

            // 获取token
            getToken: function () {
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
            hasToken: function () {
                return !angular.isUndefinedOrNull(sessionStorage.getItem('_token'));
            },

            saveContext: function (key, context) {
                sessionStorage.setItem(key, context);
            },
            getContext: function (key) {
                return sessionStorage.getItem(key);
            },
            saveUser: function (user) {
                sessionStorage.setItem("current_user", angular.toJson(user));
                $rootScope.$broadcast("userChanged");
            },
            getUser: function () {
                return sessionStorage.getItem("current_user");
            },

            // 阅读记录
            addBlog: function (id) {
                var readHistory = [];
                if (!angular.isUndefinedOrNull(sessionStorage.getItem("read_history"))) {
                    readHistory = angular.fromJson(sessionStorage.getItem("read_history"));
                }
                readHistory.push(id);
                sessionStorage.setItem("read_history", angular.toJson(readHistory));
            },
            getBlog: function (id) {
                var readHistory = [];
                if (!angular.isUndefinedOrNull(sessionStorage.getItem("read_history"))) {
                    readHistory = angular.fromJson(sessionStorage.getItem("read_history"));
                }
                for (var i = 0; i < readHistory.length; i++) {
                    if (readHistory[i] == id) {
                        return true;
                    }
                }
                return false;
            },

            // 访问记录
            addVisit: function(id) {
                var visitHistory = [];
                if (!angular.isUndefinedOrNull(sessionStorage.getItem("visit_history"))) {
                    visitHistory = angular.fromJson(sessionStorage.getItem("visit_history"));
                }
                visitHistory.push(id);
                sessionStorage.setItem("visit_history", angular.toJson(visitHistory));
            },
            getVisit: function (id) {
                var visitHistory = [];
                if (!angular.isUndefinedOrNull(sessionStorage.getItem("visit_history"))) {
                    visitHistory = angular.fromJson(sessionStorage.getItem("visit_history"));
                }
                for (var i = 0; i < visitHistory.length; i++) {
                    if (visitHistory[i] == id) {
                        return true;
                    }
                }
                return false;
            }
        }
    });