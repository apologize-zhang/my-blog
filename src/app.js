/**
 * Created by admin on 2017/2/12.
 */
angular.module('myApp', ['ui.router'])
    .run(function ($rootScope, $state) {

        $state.go('home');

        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
            console.log(toState);
        });

        $rootScope.scrollTop = function() {
            $('body').animate({scrollTop: 0}, 500);
        }
    })
    .factory('ConstantService', function() {
        return {
        }
    })
    .value('metaUmeditorConfig', {
        imageUrl: '图片url',
        toolbar: [
            'source | undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
            'insertorderedlist insertunorderedlist | paragraph | fontfamily fontsize',
            '| justifyleft justifycenter justifyright justifyjustify |',
            'link unlink | image video ',
            '| horizontal preview', 'drafts', 'formula'
        ],
        initialFrameWidth: 900
    })
;
