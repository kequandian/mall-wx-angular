angular.module('sellerPage.controller', ['sellerPage.service', 'seller.session'])
    /*.directive('bindJavascript', function () {
        return {
            restrict: 'A',
            scope: {
                javascript: '@'
            },
            replace: false,
            link: function ($scope, element, attr) {
                var script = angular.element(document.createElement('script'));
                var source = $scope.javascript;
                console.log(source);

                script[0].text = source;
                angular.element(element).append(script[0]);
            }
        };
    })*/
    .filter("OrderState", function () {
        return function (input) {
            if (input == 'PENDING_SETTLEMENT') {
                return '待结算';
            } else if (input == 'SETTLED') {
                return '已结算';
            }
            else if (input == 'REFUNDED') {
                return '已退款';
            }

            return "未知状态";
        }
    })

    .controller('SellerPageController', ['$scope', '$state', '$rootScope', 'SellerPageFty', 'BalanceSession', 'UserInfo', 'DWStatus',
        function ($scope, $state, $rootScope, SellerPageFty, BalanceSession, UserInfo, DWStatus) {

            //title
            document.title = "销售中心";

            $rootScope.tabsNumber = 3;

            //用户信息
            getUserInfo();
            //分销余额
            getOwnerBalance();

            function getUserInfo() {
                SellerPageFty.sellerUserInfoService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.userInfo = json.data;
                            //alert(angular.toJson($scope.userInfo));
                            UserInfo.register_date = $scope.userInfo.register_date;
                        }
                    }, function (error) {
                        $.toast('获取信息失败', 'cancel');
                    })
            }

            function getOwnerBalance() {
                SellerPageFty.ownerBalanceService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.owner_balance = json.data;
                            //console.log(angular.toJson($scope.owner_balance));

                            $scope.owner_balance.is_member = $scope.owner_balance.is_agent
                                || $scope.owner_balance.is_partner
                                || $scope.owner_balance.is_seller;

                            if($scope.owner_balance.is_partner) {
                                $scope.owner_balance.level_percent = getLevelPercent();
                            }

                            /// save session
                            BalanceSession.balance = $scope.owner_balance.balance;

                        }
                    }, function (error) {
                        $.toast('获取信息失败', 'cancel');
                    })
            }

            function getLevelPercent(){
                ///if($scope.owner_balance.partner_pool_count <= $scope.owner_balance.next_partner_level.headcount_quota){
                //    return 0;
                //}

                //var extra = $scope.owner_balance.partner_pool_count - $scope.owner_balance.partner_level.headcount_quota;
                //var levelSpan = $scope.owner_balance.next_partner_level.headcount_quota - $scope.owner_balance.partner_level.headcount_quota;

                if($scope.owner_balance.next_partner_level) {
                    var val = ($scope.owner_balance.partner_pool_count * 100 / $scope.owner_balance.next_partner_level.headcount_quota);
                    return parseInt(val);
                }

                return 0;
            }


            //推广二维码
            $scope.initQrcode = function (q_r_code) {

                document.getElementById('qrcode-backgroud').style.display = 'block';
                //document.getElementById('light').style.display='block';
                //document.getElementById('fade').style.display='block';

                var divhtml = document.getElementById("dituContent");
                if (divhtml.firstElementChild != null) {
                    divhtml.removeChild(divhtml.childNodes[0]);
                    divhtml.removeChild(divhtml.childNodes[1]);
                }
                var invitationUrl = "http://www.kequandian.net/app/app?invite_code=" + q_r_code;
                if (invitationUrl != null) {
                    loadScript("lib/qrcodejs/qrcode.min.js", function(){
                        var qrcode = new QRCode(divhtml, {
                            width: 220,
                            height: 220
                        });
                        qrcode.makeCode(invitationUrl);
                    });
                } else {
                    $.toast('生成二维码失败', 'cancel');
                }
                //关闭二维码
                $scope.close_qrcode = function () {
                    document.getElementById('qrcode-backgroud').style.display = 'none';
                    //document.getElementById('light').style.display='none';
                }
            };

            function loadScript(src, callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (callback)script.onload = callback;

                var sc = document.getElementsByTagName("head")[0];
                sc.appendChild(script);
                script.src = src;
            }

            //进入提现页
            $scope.goToWithdrow = function (phone) {
                $state.go('withdraw', {accountPhone: phone})
            };

            //进入我的信息页
            $scope.goToDistributionInfo = function () {
                DWStatus.d_w_status = 1;
                $state.go('distributionInfo');
            };

        }])

    /*
     * 提佣方案
     * */
    .controller('PianController', ['$scope', '$state', 'SellerPageFty', function ($scope, $state, SellerPageFty) {

        //title
        document.title = "提佣方案";
    }])

;