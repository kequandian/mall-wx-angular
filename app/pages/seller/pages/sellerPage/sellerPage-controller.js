angular.module('sellerPage.controller', ['sellerPage.service'])

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

                        var isAgent = $scope.owner_balance.isAgent;
                        var isPartner = $scope.owner_balance.isPartner;
                        var isSeller = $scope.owner_balance.isSeller;

                        var stringName = "";
                        if(isAgent){
                            stringName += "代理商 ";
                        }
                        if(isPartner){
                            stringName += "合伙人 ";
                        }
                        if(isSeller){
                            stringName += "分销商";
                        }
                        $scope.user_lv_name = stringName;
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
            var invitationUrl = q_r_code;
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