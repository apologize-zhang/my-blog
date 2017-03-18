angular.module('myApp')
    .config(function ($stateProvider) {
    $stateProvider
        .state('app', {
            abstract: true,
            views: {

            }
        })
        .state('home', {
            parent: 'app',
            url: '/',
            data: {
            },
            views: {
                'main@': {
                    templateUrl: 'home/home.html'
                }
            },
            resolve: {

            }
        });
});
