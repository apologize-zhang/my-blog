angular.module('myApp')
    .config(function ($stateProvider) {

        $stateProvider
            .state('list', {
                url: ':state/list',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/list/list.html',
                        controller: 'ListController'
                    }
                },
                resolve: {}
            })
            .state('blog', {
                url: '{id: [0-9]+}/blog',
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
            .state('new-blog', {
                url: 'new/blog',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/blog/input/blog.input.html',
                        controller: 'BlogCreateController'
                    }
                }
            })
            .state('registe', {
                url: 'registe',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/user/registe.html',
                        controller: 'RegisteController'
                    }
                }
            })

    });