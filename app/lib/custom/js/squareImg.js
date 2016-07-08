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
                if( $el[0].width > 0){
                    $el.css('height',$el[0].width);
                }else {
                    $el.css('height', 'auto');
                }
                //console.log("squareImg: width?"+el.width+",height?"+el.height);

                scope.$watch(function() {
                    //console.log("watch width?"+ $el[0].width+", height?"+$el[0].height);
                    return $el[0].width;
                }, function(value){
                    $el.css('height', value);
                    //console.log("watch onchange()?"+ $el[0].width+", clientHeight?"+$el[0].height);
                });

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