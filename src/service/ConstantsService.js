'use strict';

angular.module('myApp')
    .service('ConstantsService', function (ConstantService) {

    })
    .service('ResponseUtil', function (toastr, $state) {
        /* 判断response中是否有错误 */
        this.validate = function (response) {

            if (response.code == 0) {
                return true
            }
            switch (response.code) {
                case 112:
                    toastr.error("参数错误", "");
                    break;
                case 405:
                    toastr.error("请先登录", "");
                    break;
                case 404: {
                    $state.go('404');
                    break;
                }
            }
        }
    })
    .service('AuthService', function ($state, $q, toastr, StorageService, UserService, ResponseUtil) {
        /*判断用户是否有权限访问该页面*/
        this.hasAuthority = function (id, state) {

            var d = $q.defer();

            if (StorageService.hasToken()) {

                UserService.gerCurrentUser(
                    {},
                    function success(response) {
                        if (!(ResponseUtil.validate(response) && response.data.id == id)) {
                            $state.go(state);
                        } else {
                            d.resolve(response.data);
                        }
                    },
                    function error() {
                        toastr.error('网络异常', '请重试');
                    }
                );

            } else {
                $state.go('^');
            }

            return d.promise;
        };

        /*获取当前用户*/
        this.currentUser = function () {
            var d = $q.defer();
            UserService.gerCurrentUser(
                {},
                function success(response) {
                    if (ResponseUtil.validate(response)) {
                        d.resolve(response.data);
                    } else {
                        d.reject(response.message);
                    }
                },
                function error(reason) {
                    d.reject(reason);
                }
            );
            return d.promise;
        }
    })
;