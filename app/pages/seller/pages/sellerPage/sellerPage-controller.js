angular.module('sellerPage.controller', ['sellerPage.service'])

    .controller('SellerPageController', ['$scope','$state', 'SellerPageFty', function($scope,$state, SellerPageFty){

        //用户信息
        getUserInfo();



        function getUserInfo(){
            SellerPageFty.sellerUserInfoService()
                .then(function(json){
                    if(json.status_code == 0){
                        $scope.userInfo = json.data;
                    }
                }, function(error){
                    $.toast('获取信息失败', 'cancel');
                })
        }




    }]);