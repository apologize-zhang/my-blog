'use strict';

angular.module('myApp')
    .controller('ClassifyCardController', function ($scope, $stateParams,
                                                    ConstantService, ResponseUtil, ClassifyService) {


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


        /**
         * 删除
         *
         * @param classify
         */
        $scope.delete = function (classify) {

            if ($scope.classifyFilter(classify.id).length > 0) {
                BootstrapDialog.alert({
                    title: '',
                    message: "该分类下有子分类，不能删除",
                    type: '',
                    closable: true,
                    draggable: true,
                    buttonLabel: "好的",
                    callback: function (result) {

                    }
                });
                return;
            }

            BootstrapDialog.confirm({
                title: '',
                message: "你确定要删除改分类吗？",
                type: '',
                closable: true,
                draggable: true,
                btnCancelLabel: "取消",
                btnOKLabel: "是的",
                btnOKClass: 'btn-primary',
                callback: function (result) {

                    if (!result) {
                        return;
                    }

                    HoldOn.open();

                    ClassifyService.delete(

                        {'id': classify.id},
                        function success(response) {
                            HoldOn.close();

                            if (ResponseUtil.validate(response)) {
                                $scope.load();
                                vm.showAdd = false;
                            } else {
                                toastr.error("删除失败", response.message);
                            }

                        },
                        function error() {
                            HoldOn.close();
                            toastr.error("删除失败", "请稍后重试");
                        })
                }
            });

        };

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

                    if (ResponseUtil.validate(response)) {
                        $scope.load();
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

        vm.update = function(classify) {
            if (angular.isUndefined(classify.newName) || classify.newName == '') {
                return;
            }

            HoldOn.open();

            classify.name = classify.newName;

            ClassifyService.update(
                classify,
                function success(response) {
                    HoldOn.close();

                    if (ResponseUtil.validate(response)) {
                        $scope.load();
                        classify.showRename = false;
                    } else {
                        toastr.error("修改失败", response.message);
                    }
                },
                function error(reason) {
                    HoldOn.close();
                    toastr.error("修改失败", "请稍后重试");
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

                    if (ResponseUtil.validate(response)) {
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
