'use strict';

angular.module('myApp')
    .controller('SlideController', function ($scope, $rootScope) {

        $scope.hide = function() {
            $rootScope.showSlide = !$rootScope.showSlide;
        }

    });