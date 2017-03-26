'use strict';

angular.module('myApp')

    .factory('UploadHelper', function (FileUploader, ConstantService, toastr) {

        return {
            createUploader: function (scope) {

                var uploaderContext = {
                    // 上传地址URL
                    url: ConstantService.BLOG + '/upload',
                    // 上传图片CDN
                    imageCdn: null
                };

                // 上传成功的素材
                var materialResponses = [];

                return {

                    init: function () {
                        var self = this;

                        self.instance = new FileUploader({
                            url: ConstantService.BLOG + '/upload',
                            autoUpload: true
                        });


                        // 上传文件之前
                        self.instance.onBeforeUploadItem = function (item) {
                        };

                        // 上传一个文件成功
                        self.instance.onSuccessItem = function (item, response, status, headers) {
                            if(response.success == true) {
                                scope.imgUrl = response.file_path;
                            }
                        };

                        // 上传一个文件失败
                        self.instance.onErrorItem = function (item, response, status, headers) {

                        };

                        // 文件添加完毕
                        self.instance.onAfterAddingAll = function () {

                        };

                        // 所有的文件上传完毕
                        self.instance.onCompleteAll = function () {

                        }

                    },

                    instance: null

                };
            }
        }
    });