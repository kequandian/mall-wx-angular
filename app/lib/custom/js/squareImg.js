/*
 功  能：通用功能
 */
angular.module('squareImg', [])
    .directive('squareImg', function () {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            link: function (scope, $el, attrs) {

                var el = $el[0];

                while(!(el.width>0)){
                    $timeout(function(){
                        $el.css('height', el.width);
                    }, 500);
                }

                $el.css('height', el.width);
                //console.log("squareImg: width?"+el.width+",height?"+el.height);
            }
        };
    })
;