angular.module('myApp')
    .config(function ($stateProvider) {

        $stateProvider
            .state('list', {
                url: ':state/list',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/tab/list.html',
                        controller: 'ListController'
                    }
                },
                resolve: {}
            })
            .state('blog', {
                url: ':id/blog',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/blog/blog.html',
                        controller: 'BlogController'
                    }
                },
                resolve: {}
            })
            .state('user-center', {
                url: 'user',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/user-center/user-center.html',
                        controller: 'UserCenterController'
                    }
                }
            })
    });