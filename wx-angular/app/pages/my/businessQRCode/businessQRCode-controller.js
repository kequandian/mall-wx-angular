angular.module('businessQRCode.controller', ['businessQRCode.service'])

    .controller('BusinessQRCodeController', ['$scope', '$state', '$stateParams', '$rootScope', 'BusinessQRCodeFty',
        '$ocLazyLoad',
        function ($scope, $state, $stateParams,$rootScope, BusinessQRCodeFty, $ocLazyLoad) {

            //title
            document.title = "商家二维码";

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("order:jquery loaded");
                })
            });

            var recommender_id = null;
            //var recommender_name = null;
            var type_status = null;
            var apply_status = null;
            $scope.isCrownApply = '请扫描商家二维码';

            initCode();
            function initCode(){
                getBusinessInfo();
            }

            function initQrcode(businessQRCodeUrl){
                //var fallbackRUL = null;
                //var localURL = window.location.href;
                //var newurl = null;
                //var newLocalURL = null;
                //var params = null;
                //if(localURL.indexOf('?') >= 0){
                //
                //    params = window.location.href.split('?');
                //    var longParam = params[1];
                //    var param = longParam.split('#')[0];
                //    param = param + '&fallback=applynotice-'+ recommender_id +'-'+ type_status +'-'+ apply_status;
                //    newurl = '?' + param;
                //
                //    newLocalURL = params[0] + newurl;
                //
                //}else{
                //    params = window.location.href.split('#');
                //    newurl = '?fallback=applynotice-'+ recommender_id +'-'+ type_status +'-'+ apply_status;
                //    newLocalURL = params[0] + newurl;
                //}

                console.log(businessQRCodeUrl);

                var divhtml = document.getElementById("businessQRCodeContent");
                var invitationUrl = businessQRCodeUrl;
                loadScript("lib/qrcodejs/qrcode.min.js", function () {

                    var qrcode = new QRCode(divhtml, {
                        text: invitationUrl,
                        width: 220,
                        height: 220,
                        correctLevel : QRCode.CorrectLevel.H
                    });
                    //qrcode.clear();
                    //qrcode.makeCode(invitationUrl);
                    //console.log("invitationUrl: " + invitationUrl);
                });
            }

            function getBusinessInfo(){
                var businessQRCodeUrl = null;
                BusinessQRCodeFty.businessUserInfoService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            console.log('商家信息', angular.toJson(json.data))
                            businessQRCodeUrl = json.data.url;
                        } else {
                            $.toast('获取商家信息失败', 'cancel');
                        }

                    }, function (error) {
                        $.toast('获取商家信息失败', 'cancel');
                    }).finally(function(){
                        initQrcode(businessQRCodeUrl);
                    })
            }

            function loadScript(src, callback) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (callback)script.onload = callback;

                var sc = document.getElementsByTagName("head")[0];
                sc.appendChild(script);
                script.src = src;
            }



        }]);