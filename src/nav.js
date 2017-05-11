angular.module('myApp')
    .config(function ($stateProvider) {

        $stateProvider
            .state('app', {
                abstract: true,
                views: {}
            })
            .state('square', {
                parent: 'app',
                url: '/',
                data: {},
                views: {
                    'main@': {
                        templateUrl: 'home/square.html',
                        controller: 'SquareController'
                    }
                },
                resolve: {}
            })
            .state('home', {
                parent: 'app',
                url: '/home/:id',
                data: {},
                views: {
                    'main@': {
                        templateUrl: 'home/home.html',
                        controller: 'HomeController'
                    }
                },
                resolve: {}
            })
            .state('list', {
                url: '/:state/list',
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
                url: '/blog/{blogId: [0-9]+}',
                parent: 'app',
                views: {
                    'main@': {
                        templateUrl: 'home/path/blog/blog.html',
                        controller: 'BlogController'
                    }
                },
                resolve: {}
            })
            .state('user-center', {
                url: '/my',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/user-center/user-center.html',
                        controller: 'UserCenterController'
                    }
                },
                resolve: {
                    currentUser: function ($stateParams, AuthService) {
                        return AuthService.hasAuthority($stateParams.id, 'home');
                    }
                }
            })
            .state('new-blog', {
                url: '/new/blog',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/blog/input/blog.input.html',
                        controller: 'BlogCreateController'
                    }
                }
            })
            .state('edit-blog', {
                url: '/blog/:blogId/edit',
                parent: 'home',
                views: {
                    'main@': {
                        templateUrl: 'home/path/blog/input/blog.input.html',
                        controller: 'BlogEditController'
                    }
                },
                resolve: {
                    blog: function ($stateParams, $q, ResponseUtil, BlogService) {
                        var d = $q.defer();

                        BlogService.get({id:$stateParams.blogId}, function success(response) {
                            if(ResponseUtil.validate(response)) {
                                d.resolve(response.data);
                            }
                        }, function error(reason) {

                        });

                        return d.promise;
                    }
                }
            })
            .state('registe', {
                url: '/registe',
                parent: 'app',
                views: {
                    'main@': {
                        templateUrl: 'home/path/user/registe.html',
                        controller: 'RegisteController'
                    }
                }
            })

            .state('404', {
                url: '/404',
                parent: 'app',
                views: {
                    'main@': {
                        templateUrl: '404.html',
                        controller: 'NotFoundController'
                    }
                }
            })

    });