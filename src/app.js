/**
 * Created by admin on 2017/2/12.
 */
angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource'])
    .run(function ($rootScope, $state) {

        $state.go('home');

        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
            console.log(toState);
        });

        $rootScope.scrollTop = function() {
            $('body').animate({scrollTop: 0}, 500);
        }
    })
    .factory('ConstantService', function() {
        return {
            BLOG: 'http://localhost:8099/blog'
        }
    })
;
