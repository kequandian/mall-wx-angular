/**
 * 申请退货
 *
 * @author Jimmie Hwang
 * @create 2016/6/16
 *
 */

angular.module("salesReturn.controller", ["salesReturn.service"])

    .controller("ReturnController", ["$scope", '$injector', "$state", '$stateParams', "$timeout", "SalesReturnInfo",
        '$ocLazyLoad', function ($scope, $injector, $state, $stateParams,$timeout, SalesReturnInfo, $ocLazyLoad) {

            document.title = "申请退货";
            $scope.image_list = [];

            $scope.returnType = [
                //{key: "请选择服务", value: "请选择服务"},
                {key: "RETURN",   value: "退货"},
                //{key: "EXCHANGE", value: "换货【仅允许更换同款同价商品】"},
                {key: "REFUND",   value: "退款"}
            ];

            /*$scope.returnReason = [
                {key: "请选择退货原因", value: "请选择退货原因"},
                {key: "大小尺寸与商品描述不符", value: "大小尺寸与商品描述不符"},
                {key: "卖家发错货", value: "卖家发错货"},
                {key: "尺码选错/不喜欢/效果差", value: "尺码选错/不喜欢/效果差"},
                {key: "假冒品牌", value: "假冒品牌"},
                {key: "颜色/款式/图案与描述不符", value: "颜色/款式/图案与描述不符"},
                {key: "收到商品少件或破损", value: "收到商品少件或破损"},
                {key: "材质/面料与商品描述不符", value: "材质/面料与商品描述不符"},
                {key: "质量问题", value: "质量问题"}
            ];*/

            // get return reason
            //getReturnCauses();
            var timestamp, end_timestamp;

            $scope.onTouchStart = function(url) {
                console.log('----------touchstart event called----------');
                timestamp = new Date().getTime();
                console.log('timestamp?'+end_timestamp);

                $timeout(function(){

                    if( end_timestamp==null ) {
                        deleteImage(url);
                    }else if((timestamp - end_timestamp)<1800){
                        // do nothing
                        //console.log('do nothing:timestamp='+ timestamp + ';end_timestamp=' + end_timestamp+ '; ' + (timestamp - end_timestamp));

                    }else if(timestamp > end_timestamp){
                        deleteImage(url);
                    }

                    end_timestamp = new Date().getTime();
                }, 2000);
            }

            function deleteImage(url){
                var index = $scope.image_list.indexOf(url);
                $scope.image_list.splice(index);
            }

            $scope.onTouchEnd = function(url) {
                // current time, means end
                console.log('touchend event called');
                end_timestamp = new Date().getTime();
                console.log('end_timestamp?'+end_timestamp);
            }


            //退货金额
            initSalesReturnInfo();
            function initSalesReturnInfo(){
                var totalPrice = $stateParams.totalPrice;
                var point = $stateParams.point;
                var s_r_status = $stateParams.SalesReturnStatus;
                var payType = $stateParams.paymentType;

                if(payType == 'WECHAT'){
                    $scope.total_price = '￥' + totalPrice.toFixed(2);
                }else if(payType == 'POINT'){
                    $scope.total_price = (totalPrice * point).toFixed(0);
                }else{
                    console.log('订单paymentType不正确: ' + $stateParams.paymentType);
                }

                // WECHAT
                if (s_r_status == 1 && payType == 'WECHAT') {
                    $scope.returnType.key = 'RETURN';
                    $scope.return_type_text = '退货金额';
                } else if (s_r_status == 2 && payType == 'WECHAT') {
                    $scope.returnType.key = 'EXCHANGE';
                } else if (s_r_status == 3 && payType == 'WECHAT') {
                    $scope.returnType.key = 'REFUND';
                    $scope.return_type_text = '退款金额';
                }
                //POINT
                if (s_r_status == 1 && payType == 'POINT') {
                    $scope.returnType.key = 'RETURN';
                    $scope.return_type_text = '退货积分';
                } else if (s_r_status == 2 && payType == 'POINT') {
                    $scope.returnType.key = 'EXCHANGE';
                } else if (s_r_status == 3 && payType == 'POINT') {
                    $scope.returnType.key = 'REFUND';
                    $scope.return_type_text = '退款积分';
                }
            }


            /*function getReturnCauses() {
                SalesReturnInfo.getReturnCauses()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            //$scope.returnReason = json.data;
                            var reasons = [{key: "请选择退货原因", value: "请选择退货原因"}];
                            angular.forEach(json.data, function(item){
                               reasons.push({key: item.name, value: item.name});
                            });
                            $scope.returnReason = reasons;
                            //console.log("causes: "+ angular.toJson($scope.returnReason));
                        }
                    }, function (error) {
                        $.toast("获取退货原因失败", "cancel");
                    })
            }*/


            //
            $scope.salesReturn = {
                // 退货说明
                content: null
            };


            //提交退货信息
            $scope.postSalesReturn = function () {
                var order_number = $stateParams.orderNumber;
                var service_type = $scope.returnType.key;
                //var reason = $scope.salesReturn.reason;
                var reason = "退货退款";
                var content = $scope.salesReturn.content;  //退货说明

                if (order_number == null) {
                    $.toast("订单号出错", "cancel");
                    return;
                }
                if ($scope.total_price == null) {
                    if(service_type == 'REFUND') {
                        $.toast("退款金额不正确", "cancel");
                    }else{
                        $.toast("退货金额不正确", "cancel");
                    }
                    return;
                }
                //if (service_type == "请选择服务") {
                //    $.toast("请选择服务", "cancel");
                //    return;
                //} else if (reason == "请选择退货原因") {
                //    $.toast("请选择退货原因", "cancel");
                //    return;
                //}

                if (content == null || content == "") {
                    if(service_type == 'REFUND') {
                        $.toast("请填写退款说明", "cancel");
                    }else{
                        $.toast("请填写退货说明", "cancel");
                    }
                    return;
                }

                var image_list = $scope.image_list===undefined ? null : $scope.image_list;

                SalesReturnInfo.SalesReturnService(order_number, service_type, reason, content, image_list)
                    .then(function (json) {
                        //console.log(json);
                        if (json.status_code == 0) {
                            //$scope.salesReturn = json.data;

                            $scope.image_list = null;

                            $.toast.prototype.defaults = 500;
                            $.toast("提交成功");

                            $timeout(function(){
                                $state.go('order.all')
                            }, 600);
                        }
                    }, function (error) {
                        $.toast("提交信息失败", "cancel");
                    })
            };

            $scope.uploadImage = function(){

                if($scope.image_list.length >= 5){
                    $.toast('提交图片不能超过5张', 'cancel');
                }else {
                    $ocLazyLoad.load(['pages/pageCommon/imageUpLoad.js', 'lib/custom/js/compressImg.js']).then(function(){
                        var ImageUpLoad = $injector.get('ImageUpLoad');
                        var CompressImg = $injector.get('CompressImg');
                        loadImageFileAsURL(ImageUpLoad, CompressImg);
                    });

                    /*$ocLazyLoad.load('lib/utils/compressImg.js').then(function () {
                        loadImageFileAsURL(ImageUpLoad);
                    })*/
                }
            };

            function loadImageFileAsURL(ImageUpLoad, CompressImg) {

                var filesSelected = document.getElementById("inputFileToLoad").files;

                if (filesSelected.length > 0) {

                    if( ($scope.image_list.length + filesSelected.length) > 5){
                        $.toast('提交图片不能超过5张', 'cancel');
                    }else {

                        var success = 0;
                        for (var i = 0; i < filesSelected.length; i++) {
                            var fileToLoad = filesSelected[i];
                            var fileType = fileToLoad.type;

                            var fileReader = new FileReader();

                            fileReader.onload = function (fileLoadedEvent) {
                                var prevImage = new Image();

                                prevImage.onload = function () {
                                    if (fileType == 'image/png') {
                                        if (prevImage.width > 256 || prevImage.height > 256) {
                                            var canvas = document.createElement('canvas'),
                                                ctx = canvas.getContext('2d');

                                            fileType = 'image/jpeg'
                                            ctx.drawImage(prevImage, 0, 0);

                                            var dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                                            prevImage.src = dataUrl;
                                            //console.log(prevImage.src);
                                        }
                                    }

                                    var compressedImage = CompressImg.compress(prevImage, fileType, 90);

                                    ImageUpLoad.uploadImage(compressedImage.src).then(function (json) {
                                        //console.log(json);
                                        if (json.status_code == 0) {

                                            if (!angular.isDefined($scope.image_list)) {
                                                $scope.image_list = [];
                                            }

                                            //console.log(json.data);
                                            $scope.image_list.push(json.data);
                                            console.log(angular.toJson($scope.image_list));

                                            //$.toast('提交成功');
                                            success++;

                                        } else {
                                            //$.toast('提交失败', 'cancel');
                                        }
                                    }, function (error) {
                                        //$.toast('提交失败', 'cancel');
                                    })
                                    //console.log('image/jpeg?'+data);
                                };

                                prevImage.src = fileLoadedEvent.target.result;
                                //console.log('image/base64?'+prevImage.src);
                            };

                            fileReader.readAsDataURL(fileToLoad);
                        }

                        //if(success>0){
                        //    $.toast('提交成功');
                        //}
                    }

                }//length
            }
    }]);