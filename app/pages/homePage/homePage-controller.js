angular.module('homePage.controller', ['homePage.service'])

    .controller('HomePageController', ['$scope','$state', 'HomePageFty','$rootScope',
        function($scope,$state, HomePageFty,$rootScope){

            //document.title = "首页";

            $scope.$watch("title",function(value){
                $("title").text(value);
            });
            $scope.title="首页";

            $scope.goToGoodsList = function(){
                $state.go('home.goodsList');
            };

    }]);