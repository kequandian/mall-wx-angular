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
                //$state.go('sellerAuthorization',{isAgent:true});
                $state.go('authorizationPage');
            };

            $scope.my_recommend_action = function(){
                $state.go('myRecommend');
            };

            $scope.withdraw_apply_action = function(){
                $state.go('withdrawApply');
            };

            $scope.offLine_exchange_record_action = function(){
                $state.go('offLineExchangeRecord');
            };

            $scope.settlement_record_action = function(){
                $state.go('settlementRecord');
            };

        }])



    /*
     * 经销授权nav
     * */
    .controller('AuthorizationPageController', ['$scope','$state','$filter','OffLineShopFty',
        function ($scope, $state,$filter,OffLineShopFty) {

            document.title = "经销授权";

            //进入皇冠经销授权页
            $scope.crown_seller_authorization_action = function(){
                $state.go('crownSellerAuthentication', {levelStatus: true, isMe:'default'});
            };

            //进入星级经销授权页
            $scope.star_seller_authorization_action = function(){
                $state.go('crownSellerAuthentication', {levelStatus: false, isMe:'default'});
            };


        }])
;