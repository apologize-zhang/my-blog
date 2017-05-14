'use strict';

angular.module('myApp')
    .factory('BlogUtil', function () {


        return {

            /**
             * 去除html标签
             *
             * @param text
             */
            replaceTag: function (text) {
                return text.replace(/<[^>]+>/g, "");//去掉所有的html标记
            },

            /**
             * 截取字符串
             * @param string
             * @param num
             * @param replaceStr
             * @returns {*}
             */
            subStr: function(string, num, replaceStr) {
                if(string.length > num) {
                    return string.substr(0, num) + replaceStr;
                }
                return string;
            }


        }
    });