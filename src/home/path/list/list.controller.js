'use strict';
angular.module('myApp')
    .controller('ListController', function ($stateParams, $scope, $sce) {

        var editor = new Simditor({
            height: '900px',
            textarea: $('#editor'),
            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|',
                'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|',
                'indent', 'outdent', 'alignment', '|', 'mark'],
            toolbarFloat: true,
            toolbarFloatOffset: '60px',
            upload: {
                params: {},
                url: 'aaa'
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

        $scope.submit = function () {
            $scope.aaa = $sce.trustAsHtml(editor.getValue());
        }
    });