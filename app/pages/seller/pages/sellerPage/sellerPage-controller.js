angular.module('sellerPage.controller', ['sellerPage.service'])

    .controller('SellerPageController', ['$scope','$state', 'SellerPageFty', function($scope,$state, SellerPageFty){

        //用户信息
        getUserInfo();
        //分销余额
        getOwnerBalance();

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

        function getOwnerBalance(){
            SellerPageFty.ownerBalanceService()
                .then(function(json){
                    if(json.status_code == 0){
                        $scope.owner_balance = json.data;
                        //alert(angular.toJson($scope.owner_balance))
                    }
                }, function(error){
                    $.toast('获取信息失败', 'cancel');
                })
        }


        //推广二维码
        $scope.initQrcode = function () {

            document.getElementById('light').style.display='block';
            //document.getElementById('fade').style.display='block';

            var divhtml = document.getElementById("dituContent");
            if(divhtml.firstElementChild != null) {
                divhtml.removeChild(divhtml.childNodes[0]);
                divhtml.removeChild(divhtml.childNodes[1]);
            }
            var invitationUrl = "推广二维码";
            if(invitationUrl != null) {
                var qrcode = new QRCode(divhtml, {
                    width: 180,
                    height: 180
                });
                qrcode.makeCode(invitationUrl);
            }else{
                $.toast('生成二维码失败', 'cancel');
            }

            //关闭二维码
            $scope.close_qrcode = function(){
                document.getElementById('light').style.display='none';
            }
        };

    }])

    /*
    * 提佣方案
    * */
    .controller('PianController', ['$scope','$state', 'SellerPageFty', function($scope,$state, SellerPageFty){

    }])

;