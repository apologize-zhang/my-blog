'use strict';

angular.module('myApp')
    .directive('editTextArea', function (ConstantService) {
        return {
            restrict: 'E',
            replace: true,
            template: '<textarea id="editor" placeholder="Hello World" autofocus></textarea>',
            link: function (scope, element, attrs) {

                var editor = new Simditor({
                    textarea: $('#editor'),
                    toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|',
                        'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|',
                        'indent', 'outdent', 'alignment', '|', 'mark'],
                    toolbarFloat: true,
                    toolbarFloatOffset: '60px',
                    upload: {
                        params: null,
                        fileKey: 'file',
                        url: ConstantService.BLOG + "/upload"
                    },
                    codeLanguages: [{
                        name: 'java',
                        value: 'java'
                    }, {
                        name: 'C++',
                        value: 'c++'
                    }, {
                        name: 'CSS',
                        value: 'css'
                    }, {
                        name: 'HTML,XML',
                        value: 'html'
                    }, {
                        name: 'JavaScript',
                        value: 'js'
                    }, {
                        name: 'JSON',
                        value: 'json'
                    }, {
                        name: 'SQL',
                        value: 'sql'
                    }],
                    pasteImage: true
                });

                // 设置初始化值
                if (!angular.isUndefinedOrNull(scope[attrs.ngModel])) {
                    editor.setValue(scope[attrs.ngModel]);
                }

                editor.on('valuechanged', function () {
                    scope[attrs.ngModel] = editor.getValue();
                });

            }
        };
    });