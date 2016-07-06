/**
 * 申请退货
 *
 * @author Jimmie Hwang
 * @create 2016/6/16
 *
 */

angular.module("salesReturn.controller", ["salesReturn.service"])

    .controller("ReturnController", ["$scope", "$state", '$stateParams', "$timeout", "SalesReturnInfo",
        '$ocLazyLoad','$injector', function ($scope, $state, $stateParams,$timeout, SalesReturnInfo, $ocLazyLoad, $injector) {

            document.title = "申请退货";

            $scope.returnType = [
                {key: "请选择服务", value: "请选择服务"},
                {key: "RETURN", value: "退货退款"},
                {key: "REFUND", value: "仅退款"}
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

            //退货金额
            $scope.total_price = $stateParams.totalPrice;
            var s_r_status = $stateParams.SalesReturnStatus;
            if (s_r_status == 1) {
                $scope.returnType.key = 'REFUND';
            } else if (s_r_status == 2) {
                $scope.returnType.key = 'RETURN';
            }


            function getReturnCauses() {
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
            }

            $scope.salesReturn = {
                content: null
            };


            //提交退货信息
            $scope.postSalesReturn = function () {
                var order_number = $stateParams.orderNumber;
                var service_type = $scope.returnType.key;
                //var reason = $scope.salesReturn.reason;
                var reason = "退货退款";
                var content = $scope.salesReturn.content;

                if (order_number == null) {
                    $.toast("订单号出错", "cancel");
                    return;
                }
                if ($scope.total_price == null) {
                    $.toast("退货金额不正确", "cancel");
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
                    $.toast("请填写退货说明", "cancel");
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
                $ocLazyLoad.load('pages/pageCommon/imageUpLoad.js').then(function(){
                    var ImageUpLoad = $injector.get('ImageUpLoad');
                    loadImageFileAsURL(ImageUpLoad);
                });
            };

            function loadImageFileAsURL(ImageUpLoad) {

                var filesSelected = document.getElementById("inputFileToLoad").files;

                if (filesSelected.length > 0) {

                    var success = 0;
                    for (var i = 0; i < filesSelected.length; i++) {
                        var fileToLoad = filesSelected[i];

                        var fileReader = new FileReader();

                        fileReader.onload = function (fileLoadedEvent) {
                            var encodedResult = fileLoadedEvent.target.result;
                            console.log(encodedResult.length);

                            if(encodedResult.length > 212000){
                                $.toast('该图片超出范围','cancel');
                                return;
                            }

                            ImageUpLoad.uploadImage(encodedResult).then(function (json) {
                                console.log(json);
                                if (json.status_code == 0) {

                                    if(!angular.isDefined($scope.image_list)) {
                                        $scope.image_list = [];
                                    }

                                    //console.log(json.data);
                                    $scope.image_list.push(json.data);

                                    //$.toast('提交成功');
                                    success ++;

                                } else {
                                    //$.toast('提交失败', 'cancel');
                                }
                            }, function (error) {
                                //$.toast('提交失败', 'cancel');
                            })
                        };

                        fileReader.readAsDataURL(fileToLoad);
                    }//for

                    if(success>0){
                        $.toast('提交成功');
                    }

                }//length
            }
    }]);