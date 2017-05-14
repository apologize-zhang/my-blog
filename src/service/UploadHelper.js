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
                            toastr.info('正在上传,请勿离开');
                        };

                        // 上传一个文件成功
                        self.instance.onSuccessItem = function (item, response, status, headers) {
                            if(response.success == true) {
                                scope.imgUrl = response.file_path;
                            }
                        };

                        // 上传一个文件失败
                        self.instance.onErrorItem = function (item, response, status, headers) {
                            toastr.error('上传失败', '请稍后再试');
                        };

                        // 文件添加完毕
                        self.instance.onAfterAddingAll = function () {
                            if(self.instance.queue.length > 0) {
                                // 取第一个文件，判断他的格式以及大小
                                var _file = self.instance.queue[0].file;

                                if(_file.type.indexOf('image') == -1) {
                                    toastr.error('上传失败', '仅支持图片');
                                    self.instance.clearQueue();
                                    return;
                                }
                                if(_file.size > 1024 * 1024 * 10) {
                                    toastr.error('上传失败', '大小超过10M');
                                    self.instance.clearQueue();
                                    return;
                                }
                            }
                        };

                        // 所有的文件上传完毕
                        self.instance.onCompleteAll = function () {
                            toastr.success('上传完成', '');
                        }

                    },

                    instance: null

                };
            }
        }
    });