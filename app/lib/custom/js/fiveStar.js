/**
 * Created by vincent on 2016/6/18.
 */

angular.module('fiveStar', [])
    .directive('fiveStar', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                rank: "@",
                rankTop: "@"
            },
            template:   "<div class='five-star'>" +
                                "<div ng-repeat='item in yellowList' class='five-star-rank'>" +
                                  "<img ng-src='{{item.url}}' alt=''>" +
                                "</div>" +
                                "<div ng-repeat='item in whiteList' class='five-star-rank'>" +
                                "   <img ng-src='{{item.url}}' alt=''>" +
                                "</div>" +
                        "</div>",
            link:link

        };

       function link($scope, $element, $arrts) {
           console.log('aaaaaaa');
           var yellowList = [];
           var whiteList = [];

           var rank = $scope.rank;
           if($scope.rank === undefined){
               rank = 0;
           }

           var rankTop = $scope.rankTop;
           if($scope.rankTop === undefined){
               rankTop = rank;
               console.log('rankTop?'+rankTop);
           }

           var src = $arrts.src;
           var rankSrc = $arrts.rankSrc;

           for(var i=0; i<rank; i++){
               yellowList.push({url: rankSrc});
           }
           for(var i=0; i<rankTop-rank; i++){
               whiteList.push({url: src});
           }
           $scope.yellowList = yellowList;
           $scope.whiteList = whiteList;

          /* $scope.starUrl = {
               url:"assets/img/yellow_star.png"
           }
           console.log($scope.starUrl)*/
       }

    });