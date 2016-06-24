/**
 * Created by vincent on 2016/6/18.
 */

angular.module('fiveStar', [])
    .directive('fiveStar', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                star: "@",
                bgColor: "@"

            },
            template:   "<div class='five_star_content'>" +
                                "<div ng-repeat='item in yellowList' class='yellow_star'>" +
                                  "<img src='{{item.url}}' alt=''>" +
                                "</div>" +
                                "<div ng-repeat='item in whiteList' class='white_star'>" +
                                "   <img src='{{item.url}}' alt=''>" +
                                "</div>" +
                        "</div>",
            link:link

        };

       function link($scope, $element, $arrts) {
           var yellowList = [];
           var whiteList = [];

           var star = $scope.star;

           if($scope.star == undefined){
               star = 0;
           }

           for(var i=0; i<star; i++){
               yellowList.push({url: "lib/progress/img/yellow_star.png"});
           }
           for(var i=0; i<5-star; i++){
               whiteList.push({url: "lib/progress/img/white_star.png"});
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