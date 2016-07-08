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
                $el.css('height',0);

                //console.log("squareImg: width?"+el.width+",height?"+el.height);

                if(el.width>0) {
                    $el.css('height', el.width);
                }

                //while(!(el.width>100)){
                //    $timeout(function(){
                //        $el.css('height', Math.max(175, el.width));
                //    }, 500);
                //}
                //console.log("squareImg: width?"+el.width+",height?"+el.height);
            }
        };
    })
;