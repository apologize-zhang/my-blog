/**
 * Created by admin on 2017/2/12.
 */
angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'toastr', 'uiSwitch', 'angularFileUpload'])
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
    // toastr 消息提示
    .config(function(toastrConfig) {

        angular.extend(toastrConfig, {
            closeButton: true,
            progressBar: true,
            preventOpenDuplicates: true,
            timeOut: 5000,
            allowHtml: true
        });

    })
;
