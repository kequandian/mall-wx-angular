/*
 * 线下门店
 * */
angular.module('offLineShop.controller', ['offLineShop.service'])
    .controller('OffLineShopController', ['$scope','$state', 'OffLineShopFty',
        function ($scope,$state, OffLineShopFty) {

            //title
            document.title = "线下门店";


            $scope.seller_team_action = function(){
                $state.go('sellerTeam');
            };

            $scope.seller_authorization_action = function(){
                $state.go('sellerAuthorization',{isAgent:true});
            };

            $scope.my_recommend_actopm = function(){
                $state.go('myRecommend');
            }

        }]);