'use strict';

angular.module('myApp')
    .controller('BlogController', function($scope) {

        $(document).ready(function () {
            setTimeout(function() {
                SyntaxHighlighter.all();
            }, 200);
        })
    });