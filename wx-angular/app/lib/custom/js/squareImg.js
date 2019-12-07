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
                //console.log("squareImg: width?"+el.width+",height?"+el.height);

                if( $el[0].clientWidth > 0){
                    $el.css('height',$el[0].clientWidth);
                }else{
                    $el.css('height','auto');
                }

               /* scope.$watch(function() {
                    //console.log("watch width?"+ $el[0].width+", height?"+$el[0].height);
                    return $el[0].clientWidth;

                }, function(value, oldValue){

                    if( ! (el.width> 0 && el.height > 0 && el.width==el.height)) {
                        $el.css('height', value);
                    }
                    //console.log("watch onchange()?"+ $el[0].width+", clientHeight?"+$el[0].height);
                });*/

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