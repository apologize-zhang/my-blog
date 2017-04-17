'use strict';

angular.module('myApp')
    .controller('ClassifyCardController', function ($scope, $stateParams, ConstantService, ResponseUtil, ClassifyService) {


        var vm = $scope.vm = {};

        $scope.statusFilter = ConstantService.BlogStatus.Normal;

        $scope.load = function () {

            ClassifyService.list(
                {
                    userId: $scope.user.id
                },
                function success(response) {
                    $scope.classifyList = response.data;
                },
                function error(reason) {

                }
            );
        };

        $scope.load();

        $scope.classifyFilter = function (parentId, classify) {
            var items = [];

            angular.forEach($scope.classifyList, function (item) {
                if (item.parentId == parentId) {
                    items.push(item);
                }
            });

            return items;
        };

        vm.saveParent = function () {

            if (angular.isUndefined(vm.parentName) || vm.parentName == '') {
                return;
            }

            HoldOn.open();

            ClassifyService.create(
                {
                    name: vm.parentName,
                    parentId: null
                },
                function success(response) {
                    HoldOn.close();

                    if(ResponseUtil.validate(response)) {
                        $scope.classifyList.push(response.data);
                        vm.showAdd = false;
                        vm.parentName = null;
                    } else {
                        toastr.error("添加失败", response.message);
                    }
                },
                function error(reason) {
                    HoldOn.close();
                    toastr.error("添加失败", "请稍后重试");
                }
            )
        };

        vm.saveChild = function (parent) {

            if (angular.isUndefined(vm.childName) || vm.childName == '') {
                return;
            }

            HoldOn.open();

            ClassifyService.create(
                {
                    name: vm.childName,
                    parentId: parent.id
                },
                function success(response) {
                    HoldOn.close();

                    if(ResponseUtil.validate(response)) {
                        $scope.classifyList.push(response.data);
                        vm.childName = null;
                        parent.showAdd = false;
                    } else {
                        toastr.error("添加失败", response.message);
                    }
                },
                function error(reason) {
                    HoldOn.close();
                    toastr.error("添加失败", "请稍后重试");
                }
            )
        };

    })
;
