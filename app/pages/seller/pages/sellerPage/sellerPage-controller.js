angular.module('sellerPage.controller', ['sellerPage.service'])

    .controller('SellerPageController', ['$scope','$state', 'SellerPageFty', function($scope,$state, SellerPageFty){

        //用户信息
        getUserInfo();


        function getUserInfo(){
            SellerPageFty.sellerUserInfoService()
                .then(function(json){
                    if(json.status_code == 0){
                        $scope.userInfo = json.data;
                        //alert(angular.toJson($scope.userInfo))
                    }
                }, function(error){
                    $.toast('获取信息失败', 'cancel');
                })
        }


        //推广二维码
        $scope.show_qrcode = function(){
        };


        //二维码
        $scope.initQrcode = function () {

            document.getElementById('light').style.display='block';
            //document.getElementById('fade').style.display='block';

            var invitationUrl = "推广二维码";
            if(invitationUrl != null) {
                var qrcode = new QRCode(document.getElementById("dituContent"), {
                    width: 200,
                    height: 180
                });
                qrcode.makeCode(invitationUrl);
            }else{
                $.toast('生成二维码失败', 'cancel');
            }
        };
    }])


    .controller('PianController', ['$scope','$state', 'SellerPageFty', function($scope,$state, SellerPageFty){

    }])

;