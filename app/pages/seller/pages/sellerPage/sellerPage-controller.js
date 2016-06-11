angular.module('sellerPage.controller', ['sellerPage.service'])

    .filter("OrderState", function(){
        return function(input){
            if(input == 'PENDING_SETTLEMENT'){
                return '待结算';
            }else if(input == 'SETTLED'){
                return '已结算';
            }

            return "未知状态";
        }
    })

    .controller('SellerPageController', ['$scope','$state', 'SellerPageFty','TabIndex', function($scope,$state, SellerPageFty,TabIndex){

        //title
        document.title = "销售中心";
        TabIndex.number = 3;
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

                        /// save session
                        ///
                        //if($scope.owner_balance.is_seller){
                        //    ProfileSession.is_seller = 1;
                        //}
                        //if($scope.owner_balance.is_partner){
                        //    ProfileSession.is_partner = 1;
                        //}
                        //if($scope.owner_balance.is_agent){
                        //    ProfileSession.is_agent = 1;
                        //}
                    }
                }, function(error){
                    $.toast('获取信息失败', 'cancel');
                })
        }


        //推广二维码
        $scope.initQrcode = function (q_r_code) {
            document.getElementById('qrcode-backgroud').style.display='block';
            //document.getElementById('light').style.display='block';
            //document.getElementById('fade').style.display='block';

            var divhtml = document.getElementById("dituContent");
            if(divhtml.firstElementChild != null) {
                divhtml.removeChild(divhtml.childNodes[0]);
                divhtml.removeChild(divhtml.childNodes[1]);
            }
            var invitationUrl = "http://www.kequandian.net/app/app?invite_code=" + q_r_code;
            if(invitationUrl != null) {
                var qrcode = new QRCode(divhtml, {
                    width: 220,
                    height: 220
                });
                qrcode.makeCode(invitationUrl);
            }else{
                $.toast('生成二维码失败', 'cancel');
            }

            //关闭二维码
            $scope.close_qrcode = function(){
                document.getElementById('qrcode-backgroud').style.display='none';
                //document.getElementById('light').style.display='none';
            }
        };

    }])

    /*
    * 提佣方案
    * */
    .controller('PianController', ['$scope','$state', 'SellerPageFty', function($scope,$state, SellerPageFty){

        //title
        document.title = "提佣方案";
    }])

;