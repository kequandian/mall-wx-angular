/**
 * Created by vincent on 2016/6/18.
 */

angular.module('levelProgress', [])
    .directive('levelProgress', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                value: "@",
                bgColor: "@"

            },
            template:   "<div class='test'>" +
                            "<p class='level'><span class='status' style='width:{{value}}%; background:{{bgColor}}'></span></p>" +
                        "</div>",
            link:link

        };

       function link($scope, $element, $arrts) {
           var yellowList = [];
           var whiteList = [];

           for(var i=0; i<3; i++){
               yellowList.push({url: "assets/img/yellow_star.png"});
           }
           for(var i=0; i<2; i++){
               whiteList.push({url: "assets/img/white_star.png"});
           }
           $scope.yellowList = yellowList;
           $scope.whiteList = whiteList;

           console.log(list);

          /* $scope.starUrl = {
               url:"assets/img/yellow_star.png"
           }
           console.log($scope.starUrl)*/
       }



    });