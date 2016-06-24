/*
 功  能：通用功能
 */
angular.module('commonJs', [])
    .directive('squareImg', function () {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            link: function (scope, $el, attrs) {
                var el = $el[0];
                $el.css('height', el.width);
                //console.log("squareImg: width?"+el.width+",height?"+el.height);
            }
        };
    })

    .filter('NotNull', function () {
        return function (input) {
            if (!angular.isDefined(input)) {
                return 0;
            }

            if (input == null) {
                return 0;
            }

            return input;
        }
    })

    //截取文字长度过滤器
    .filter('cutText', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || '…');
        };
    })

    //解析含html的字符串
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }])

;