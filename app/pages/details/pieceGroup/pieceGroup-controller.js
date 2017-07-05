angular.module('pieceGroup.controller', ['pieceGroup.service'])

    .controller('PieceGroupController', ['$scope', '$state', '$stateParams', '$rootScope','$window',
        'PieceGroupFty', 'PointRate', '$ocLazyLoad','$interval',
        function ($scope, $state, $stateParams, $rootScope,$window, PieceGroupFty, PointRate, $ocLazyLoad,$interval) {

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    console.log("pieceGroup:jquery loaded");
                })
            });
            //title
            document.title = "拼团商品详情";

            var scope = $rootScope;
            scope.$watch('detailsCartCount', function (nValue, oValue) {
                $scope.d_cart_count = nValue;
                //console.log('新值：' + nValue + "-------" + '旧值：' + oValue);
            });

            $scope.point_rate = PointRate.rate;
            var product_id = $stateParams.pieceGroupId;
            var master_id = $stateParams.masterId;
            var pieceGroupCouponItem = $rootScope.pieceGroupCouponItem;
            $scope.master_id = $stateParams.masterId;

            $scope.master_user_id = $rootScope.master_id;

            console.log("product_id> " + product_id);
            console.log("master_id> " + master_id);
            console.log("user_id> " + $scope.master_user_id);

            var marketingType = null;
            var marketingId = null;
            var marketingStatus = null;

            marketingType = 'PIECE-GROUP';
            getFightGroupsDetails(product_id);

            //修改url地址，用于分享
            appendFallback(product_id, master_id);

            function appendFallback(pieceGroupId, masterId){
                if ( window.location.href.indexOf('fb_redirect=true') >=0 ) {
                    return false;
                }

                var newurl;
                if(window.location.href.indexOf('?') >= 0){
                    var params = window.location.href.split('?');
                    var longParam = params[1];
                    var param = longParam.split('#')[0];
                    /// already has fallback
                    if(param.indexOf('fallback=details-')>=0){
                        param = 'fallback=piecegroup-' + pieceGroupId + '-' + masterId;
                    }else if(param.indexOf('fallback=piecegroup-')>=0){
                        param = param.replace(/fallback=piecegroup\-\d+\-\d+/,  'fallback=piecegroup-'+pieceGroupId + '-'+masterId);
                        //console.log("param>>> "+param);
                    }else{
                        param = param + '&fallback=piecegroup-' + pieceGroupId + '-' + masterId;
                        //console.log("param> "+param);
                    }

                    /// append details
                    ///
                    newurl = '?' + param + '#/piecegroup/' + pieceGroupId + '/' + masterId;
                    //console.log("newurl>>> "+newurl);
                }else{

                    newurl = '?fallback=piecegroup-'+ pieceGroupId +'-'+ masterId +'#/piecegroup/' + pieceGroupId + '/' + masterId;
                    //console.log("newurl> "+newurl);
                }

                if(longParam != newurl) {
                    //prevents browser from storing history with each change:
                    var currentState = history.state;
                    if (currentState == null) {
                        currentState = {title: document.title, url: newurl};
                    }

                    //console.log("newurl<< "+newurl);
                    window.history.pushState(currentState, document.title, newurl);
                }
            }

            //获取商品详情信息
            $scope.properties_list = [];
            function detailsInfo() {
                PieceGroupFty.detailsService(product_id)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.details = json.data;
                            //console.log(angular.toJson(json.data));

                            $scope.details_stock_balance = $scope.details.stock_balance;
                            $scope.details_price = $scope.details.price;

                            if($scope.details_stock_balance > 0){
                                $scope.b_status_btn = true;
                            }else{
                                $scope.b_status_btn = false;
                            }

                            if ($scope.details.covers.length > 0) {
                                $scope.details_content_sheet_img = $scope.details.covers[0].url;
                            }

                            if (angular.isDefined($scope.details.specifications)) {
                                if ($scope.details.specifications.length > 0) {
                                    var properties = [];

                                    var rep = false;  // replace new properties is required
                                    angular.forEach($scope.details.specifications, function (v, k) {
                                        if (v != null || v != "") {
                                            properties.push(v);
                                        } else {
                                            rep = true;
                                        }
                                    });

                                    if (rep) {
                                        $scope.details.specifications = properties;
                                    }
                                }
                            }

                            //获取商品返利
                            getProductRabate(product_id,marketingType,marketingId);
                            //获取默认快递公司
                            if($rootScope.default_express == null){
                                expressInfo();
                            }else{
                                $scope.default_express = $rootScope.default_express;
                            }
                            //获取客服QQ
                            if($rootScope.kf_qq == null){
                                getKFQQ();
                            }else{
                                $scope.kf_qq = $rootScope.kf_qq;
                            }

                            if($scope.fightGroupsdetails.free_shipping == 1){
                                var fare_info = {
                                    is_incl_postage:0
                                };
                                fare_info.is_incl_postage = 1;
                                $scope.fare_info = fare_info;
                            }else{
                                //运费
                                $scope.fare_info = $scope.details.fare_template;

                                //console.log("fare_info  ?   " + angular.toJson($scope.fare_info));
                                $scope.fare_info.is_excl_postage = ($scope.fare_info.is_incl_postage==0 && $scope.fare_info.is_incl_postage_by_if==0);

                                angular.forEach($scope.fare_info.carry_modes, function(item){
                                    if(item.is_default){
                                        $scope.fare_info.default_amount = item.first_amount;
                                    }
                                })
                            }

                        } else {
                            if(json.message == 'product.is.offsell'){
                                $.alert('此商品已售罄','提示', function(){
                                    window.history.back();
                                });
                            }else{
                                $.toast('获取商品详情失败','cancel');
                                console.log("获取商品详情失败");
                            }
                        }
                    }, function (error) {
                        console.log("获取商品详情失败");
                    }).finally(function(){
                    })
            }

            //获取快递公司
            function expressInfo(){
                PieceGroupFty.expressSerivce()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.default_express = json.data.name;
                            $rootScope.default_express = $scope.default_express;
                        }else{
                            console.log('获取默认快递公司失败');
                        }
                    }, function(error){
                        console.log('获取默认快递公司失败：' + angular.toJson(error));
                    })
            }

            function getKFQQ(){
                PieceGroupFty.kqQQService()
                    .then(function(json){
                        //console.log(angular.toJson(json));
                        if(json.status_code == 0){
                            $scope.kf_qq = json.data[0].number;
                            $rootScope.kf_qq = $scope.kf_qq;
                        }else{
                            console.log("获取客服QQ失败：" + angular.toJson(json));
                        }
                    }, function(error){
                        console.log("获取客服QQ失败：" + angular.toJson(error));
                    })
            }

            function getProductRabate(product_id,marketingType,marketingId){
                PieceGroupFty.productRebateService(product_id,marketingType,marketingId)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.product_rebate = json.data;
                            console.log("获取商品返利信息: "  + angular.toJson(json.data));
                        }else{
                            console.log("获取商品返利信息失败：" + angular.toJson(json));
                        }
                    }, function(error){
                        console.log("获取商品返利信息失败：" + angular.toJson(error));
                    })
            }

            $scope.spec_item_price = null;
            $scope.spec_item_stock_balance = null;
            $scope.spec_item_name = null;

            $scope.get_input_value = function (item) {
                $scope.product_property_value = item;

                $scope.spec_item_price = item.price;
                $scope.spec_item_stock_balance = item.stock_balance;
                $scope.spec_item_name = item.name;
                $scope.q_count = 1;
            };

            $scope.q_count = 1;
            $scope.downQ = function () {
                if ($scope.q_count > 1) {
                    $scope.q_count--;
                } else {
                    $scope.q_count = 1;
                }
            };
            $scope.upQ = function (details) {
                $scope.q_count++;
                if($scope.product_property_value!=null){
                    if($scope.q_count > $scope.product_property_value.stock_balance){
                        $scope.q_count = $scope.product_property_value.stock_balance;
                    }
                }else{
                    if($scope.q_count > details.stock_balance){
                        $scope.q_count = details.stock_balance;
                    }
                }
            };

            //检查数量
            $scope.countChange = function(details){

                var quantity = $scope.q_count;

                if(!checkNumber(quantity) && quantity.length > 0){
                    //console.log('不是数字')
                    $.toast('请输入数字', 'cancel');
                    $scope.q_count = 1;
                    return;
                }

                if(quantity < 0){
                    $.toast('输入数字不能为负数', 'cancel');
                    $scope.q_count = 1;
                    return;
                }

                if($scope.product_property_value!=null){
                    if($scope.q_count > $scope.product_property_value.stock_balance){
                        $scope.q_count = $scope.product_property_value.stock_balance;
                    }
                }else{
                    if($scope.q_count > details.stock_balance){
                        $scope.q_count = details.stock_balance;
                    }
                }

            };

            //验证数字
            function checkNumber(number){
                var isNumber = /^[0-9]*$/.test(number);
                return isNumber;
            }

            //拼团
            $scope.piece_group_buy_status = function (b_status,isOpenPieceGroups,isOriginalPrice) {

                if(!b_status){
                    $.toast('该商品暂无库存', 'cancel');
                    return;
                }

                if(isOpenPieceGroups){
                    marketingStatus = 'PIECE-GROUP';
                }

                $scope.is_original_price = isOriginalPrice;
                console.log('isOriginalPrice: ' + isOriginalPrice);

            };

            //参与某团长拼团
            $scope.join_piece_group_buy_status = function (b_status,isOpenPieceGroups) {

                if(!b_status){
                    $.toast('该商品暂无库存', 'cancel');
                    return;
                }

                if(master_id > 0){
                    if(isOpenPieceGroups){
                        marketingStatus = 'PIECE-GROUP';
                    }else{
                        marketingStatus = 'PIECE-GROUP-JOINT';
                    }
                }else{
                    console.log('团长ID获取异常');
                }

                $scope.is_original_price = 0;

            };

            //确认购买option
            $scope.buy_product_option = function (productInfo, productId, quantity) {

                var product_property = null;
                var product_specification_id = null;
                var int_quantity = parseInt(quantity);
                console.log(int_quantity);

                if ($scope.product_property_value != null) {
                    product_specification_id = $scope.product_property_value.id;
                }

                if ($scope.details.specifications.length > 0 && product_specification_id == null) {
                    $.toast('请选择商品规格','cancel');
                    return;
                }
                if ($scope.details.specifications.length > 0 && $scope.product_property_value.stock_balance == 0) {
                    $.toast('此商品暂无库存','cancel');
                    return;
                }
                if($scope.details.purchase_strategy != null){
                    PieceGroupFty.check_buy_count(productId, quantity)
                        .then(function(json){
                            console.log("限购信息：" + angular.toJson(json));
                            if(json.status_code == 0){
                                buy_option(productInfo, productId, int_quantity,product_property,product_specification_id);
                            }else{
                                $.alert(json.message);
                                console.log("获取限购信息失败：" + angular.toJson(json))
                            }
                        }, function(error){
                            console.log("获取限购信息失败：" + angular.toJson(error))
                        });
                }else if($scope.details.purchase_strategy == null){
                    buy_option(productInfo, productId, int_quantity,product_property,product_specification_id);
                }

            };

            //选择方式
            function buy_option(productInfo,productId, int_quantity,product_property,product_specification_id){
                if (productInfo.stock_balance > 0) {
                    $scope.buy_immediately(productInfo, int_quantity, product_property, product_specification_id);
                } else {
                    $.toast('此商品暂无库存');
                }
            }


            //立即购买
            $scope.checkedCarts = [];
            $scope.buy_immediately = function (item, quantity, product_property, product_specification_id) {

                //console.log(angular.toJson(item));

                if(!quantity > 0){
                    $.toast('请输入商品数量','cancel');
                    return;
                }

                var p_info = [];
                var p_item = {
                    product_id:null,
                    product_name:null,
                    quantity:null,
                    cover:null,
                    product_specification_id:null,
                    product_specification_name:null,
                    stock_balance:null,
                    fare_id:null,
                    weight:0,
                    bulk:0,
                    fightGroupData:{},
                    wholesaleData:{}
                };
                var buy_price = 0;
                if (item.specifications.length > 0) {
                    angular.forEach(item.specifications, function (v, k) {
                        if (v.id == product_specification_id) {
                            buy_price = v.price;
                            p_item.product_specification_name = v.name;
                            p_item.stock_balance = v.stock_balance;
                        }
                    });
                    p_item.price = buy_price;
                }

                //console.log("item::" + angular.toJson(item));
                p_item.product_id = item.id;
                p_item.quantity = quantity;
                p_item.product_name = item.name;
                p_item.fare_id = item.fare_id;
                p_item.cover = item.cover;
                p_item.weight = item.weight;
                p_item.bulk = item.bulk;

                if(product_specification_id == null){
                    p_item.stock_balance = item.stock_balance;
                    p_item.price = item.price;
                }

                p_item.product_specification_id = product_specification_id;
                $scope.checkedCarts.push(item);

                if($scope.is_original_price == 0){
                    p_item.marketing = marketingStatus;
                    p_item.fightGroupData.free_shipping = $scope.fightGroupsdetails.free_shipping;
                    p_item.fightGroupData.payment_type = $scope.fightGroupsdetails.payment_type;
                    p_item.fightGroupData.coupon_usage = $scope.fightGroupsdetails.coupon_usage;
                    p_item.price = $scope.fightGroupsdetails.price;
                    if(pieceGroupCouponItem.id > 0){
                        p_item.fightGroupData.coupon_id = pieceGroupCouponItem.id;
                    }
                    if(marketingStatus == 'PIECE-GROUP-JOINT'){
                        console.log("参团");
                        if(master_id > 0){
                            p_item.marketing_id = parseInt(master_id);
                        }else{
                            p_item.marketing_id = $scope.master_item.id;
                        }
                    }else{
                        console.log("开团");
                        p_item.marketing_id = $scope.fightGroupsdetails.id;
                    }
                }else{
                    console.log("普通购买");
                }
                p_info.push(p_item);

                //console.log("$scope.fightGroupsdetails: " + angular.toJson($scope.fightGroupsdetails));
                console.log("单前用户id: " + $rootScope.master_id);
                console.log("活动id: " +  $scope.fightGroupsdetails.id);
                console.log(angular.toJson(p_info));
                //return;

                var newUrl = '';
                var title = '';
                var c_state = history.state;
                if($scope.is_original_price == 0){
                    console.log("拼团购买");
                    //console.log(angular.toJson(p_info));
                    $rootScope.settle_product_code = p_info;
                    //$rootScope.settle_product_totalToPay = pieceGroupCouponItem.id > 0 ? 0 : $scope.fightGroupsdetails.price * quantity;
                    $rootScope.settle_product_totalToPay = $scope.fightGroupsdetails.price * quantity;

                    newUrl = '#/cart-settlement';
                    title = '结算';
                    window.history.pushState(c_state, title, newUrl);

                    /*
                    * totalToPay: pieceGroupCouponItem.id > 0 ? 0 : $scope.fightGroupsdetails.price * quantity,
                    * */
                    $state.go('cart-settlement', {
                        carts: $scope.checkedCarts,
                        totalToPay: $scope.fightGroupsdetails.price * quantity,
                        totalFreight: item.freight
                    });

                }else{

                    console.log("普通购买");
                    //console.log(angular.toJson(p_info));
                    $rootScope.settle_product_code = p_info;
                    $rootScope.settle_product_totalToPay = item.price * quantity;

                    //console.log(angular.toJson(p_info));
                    //return;

                    newUrl = '#/cart-settlement';
                    title = '结算';
                    window.history.pushState(c_state, title, newUrl);

                    $state.go('cart-settlement', {
                        carts: $scope.checkedCarts,
                        totalToPay: item.price * quantity,
                        totalFreight: item.freight
                    });
                }
            };

            //添加收藏
            $scope.addProductToCollection = function (productId) {

                PieceGroupFty.addCollectionService(productId)
                    .then(function (json) {

                        $ocLazyLoad.load('Jquery').then(function () {
                            $ocLazyLoad.load('JqueryWeUI').then(function () {

                                /*start function*/
                                //alert(angular.toJson(json));
                                if (json.status_code == 0) {
                                    $.toast('收藏成功');
                                } else {
                                    $.toast('收藏失败', 'cancel');
                                }
                                /*end function*/

                            });
                        });

                    }, function (error) {
                        $.toast('收藏失败', 'cancel');
                    })
            };

            //进入购物车
            $scope.goToCart = function(){

                //$interval.cancel(one_second);
                //one_second = undefined;

                var newUrl = '#/home/cart';
                var title = '购物车';
                var c_state = history.state;
                window.history.pushState(c_state, title, newUrl);

                $state.go('home.cart');
            };

            $scope.fare_info_title = function(title, content){
                if(title != null && content != null){
                    return 'height: 83px; border-top: 1px solid #ECECEC;'
                }else{
                    return 'height: 35px; border-top: 1px solid #ECECEC;'
                }
            };

            //拼团商品详情
            function getFightGroupsDetails(id){

                var promoted_masters = [];
                var start = 0;
                var end = 0;
                var newTimeStamp = 0;

                PieceGroupFty.getFightGroupsDetailsService(id)
                    .then(function(json){
                        if(json.status_code == 0){
                            //console.log(angular.toJson(json));
                            $scope.fightGroupsdetails = json.data;
                            marketingId = json.data.id;
                            product_id = json.data.product_id;
                            start = Date.parse(new Date());

                            if(master_id > 0){
                                angular.forEach(json.data.promoted_masters, function(v, k){
                                    if(master_id == v.id){
                                        promoted_masters.push(v);
                                    }
                                });
                                //判断拼团订单时候超时
                                angular.forEach(json.data.promoted_masters, function(v, k){
                                    end = Date.parse(new Date(v.end_time.replace(/-/g, "/")));
                                    newTimeStamp = end - start;  //时间差的毫秒数
                                    if(newTimeStamp > 0){
                                        if(promoted_masters.length < 3){
                                            if(master_id != v.id){
                                                promoted_masters.push(v);
                                            }
                                        }
                                    }
                                });

                            }else{
                                //判断拼团订单时候超时
                                angular.forEach(json.data.promoted_masters, function(v, k){

                                    end = Date.parse(new Date(v.end_time.replace(/-/g, "/")));
                                    newTimeStamp = end - start;  //时间差的毫秒数
                                    if(newTimeStamp > 0){
                                        if(promoted_masters.length < 3){
                                            promoted_masters.push(v);
                                        }
                                    }
                                });
                            }

                            if(promoted_masters.length > 0){
                                $scope.promoted_masters = promoted_masters;
                            }else{
                                $scope.promoted_masters = null;
                            }

                            //console.log(angular.toJson($scope.promoted_masters));

                            //商品详情信息
                            detailsInfo();

                        }else{
                            $.toast('获取拼团商品详情失败','cancel');
                            console.log("获取拼团商品详情失败:" + angular.toJson(json));
                        }
                    }, function(error){
                        $.toast('获取拼团商品详情失败','cancel');
                        console.log("获取拼团商品详情失败:" + angular.toJson(error));
                    })
            }

            //是否免费开团
            $scope.isPieceGroupCoupon = function(pieceGroupPrice){
              if(pieceGroupCouponItem.id > 0){
                  return 0;
              }else{
                  return pieceGroupPrice;
              }
            };

            //计算剩余人数
            $scope.count_member = function(minParticipatorCount, paidMembersCount){

                var count = minParticipatorCount - paidMembersCount;

                if(count > 0){
                    return '还差'+ count + '人, ';
                }else{
                    return '';
                }
            };

            //计算剩余时间
            var one_second;
            $scope.count_time = function(endTime,index){

                //if(one_second){
                //    clearInterval(one_second);
                //}
                var start = Date.parse(new Date());
                var end = Date.parse(new Date(endTime.replace(/-/g, "/")));
                var newDate = end - start;  //时间差的毫秒数

                if(newDate > 0){
                    //计算出相差天数
                    var days = Math.floor(newDate/(24*3600*1000));
                    var leave1 = newDate%(24*3600*1000);    //计算天数后剩余的毫秒数
                    var hours = Math.floor(leave1/(3600*1000)); //计算相差分钟数
                    var leave2 = leave1%(3600*1000);        //计算小时数后剩余的毫秒数
                    var minutes = Math.floor(leave2/(60*1000)); //计算相差秒数
                    var leave3 = leave2%(60*1000);      //计算分钟数后剩余的毫秒数
                    var seconds = Math.round(leave3/1000);
                    //console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")

                    if(hours<10){
                        hours = "0"+ hours;
                    }
                    if(minutes<10){
                        minutes = "0"+ minutes;
                    }
                    if(seconds<10){
                        seconds = "0"+ seconds;
                    }
                    $scope.newTime = hours + ':'+ minutes + ':' + seconds;

                    //one_second = $interval(function(){
                    //    $scope.newTime -= 1000;
                    //    $interval.cancel(one_second);
                    //    one_second = undefined;
                    //},1000);

                    if($scope.newTime == '00:00:00'){

                        console.log('重新获取小伙伴拼团列表：' + $scope.newTime);
                        //判断拼团订单时候超时
                        var promoted_masters = [];
                        var start1 = 0;
                        var end1 = 0;
                        var newTimeStamp = 0;
                        angular.forEach($scope.fightGroupsdetails.promoted_masters, function(v, k){

                            end1 = Date.parse(new Date(v.end_time.replace(/-/g, "/")));
                            newTimeStamp = end1 - start1;  //时间差的毫秒数
                            if(newTimeStamp > 0){
                                if(promoted_masters.length < 3){
                                    promoted_masters.push(v);
                                }
                            }
                        });

                        if(promoted_masters.length > 0){
                            $scope.promoted_masters = promoted_masters;
                        }else{
                            $scope.promoted_masters = null;
                        }
                    }

                    //countdown(hours,minutes,seconds,index);
                    //cdown(newDate,index);

                }else{
                    return '已超时'
                }

            };

            // 单个计时器
            function countdown(hours,minutes,seconds,index){
                if($window.timer){
                    clearInterval($window.timer);
                }
                // 倒计时
                var timeObj={
                    h:0,
                    m:0,
                    s:0
                };

                timeObj.h = hours;
                timeObj.m = minutes;
                timeObj.s = seconds;

                var timeStr = toDouble(timeObj.h)+toDouble(timeObj.m)+toDouble(timeObj.s);
                var timeList = document.getElementsByClassName('time-text-' + index);
                for(var i = 0; i < timeList.length; i++){
                    timeList[i].innerHTML = timeStr[i];
                }
                function toDouble(num){
                    if(num<10){
                        return '0' + num;
                    }else{
                        return '' + num;
                    }
                }

                $window.timer=setInterval(function(){
                    timeObj.s--;
                    if(timeObj.s==-1){
                        timeObj.m--;
                        timeObj.s=59;
                    }
                    if(timeObj.m==-1){
                        timeObj.h--;
                        timeObj.m=59;
                    }
                    if(timeObj.h==-1){
                        timeObj.h=0;
                        timeObj.m=0;
                        timeObj.s=0;
                        clearInterval($window.timer);
                    }
                    timeStr=toDouble(timeObj.h)+toDouble(timeObj.m)+toDouble(timeObj.s);
                    for(var i=0;i<timeList.length;i++){
                        timeList[i].innerHTML=timeStr[i];
                    }
                },1000)
            }

            //多个计时器
            function cdown(timeStamp,index){
                var addTimer = function(){
                    var list = [],
                        interval;

                    return function(timeStamp,index){
                        if(!interval){
                            interval = setInterval(go,1000);
                        }else{
                            console.log('索引'+ index+'停止计时')
                            clearInterval(interval);
                        }
                        list.push({ele:document.getElementById('time-text-'+index),time:timeStamp});
                    }

                    function go() {
                        for (var i = 0; i < list.length; i++) {
                            list[i].ele.innerHTML = changeTimeStamp(list[i].time);
                            if (!list[i].time){
                                console.log('')
                                list.splice(i--, 1000);
                            }
                        }
                    }

                    //传入unix时间戳，得到倒计时
                    function changeTimeStamp(timeStamp){
                        var distancetime = new Date().getTime() - new Date(timeStamp*1000).getTime();
                        if(distancetime > 0){
                            //如果大于0.说明尚未到达截止时间
                            var ms = Math.floor(distancetime%1000);
                            var sec = Math.floor(distancetime/1000%60);
                            var min = Math.floor(distancetime/1000/60%60);
                            var hour =Math.floor(distancetime/1000/60/60%24);

                            if(ms<100){
                                ms = "0"+ ms;
                            }
                            if(sec<10){
                                sec = "0"+ sec;
                            }
                            if(min<10){
                                min = "0"+ min;
                            }
                            if(hour<10){
                                hour = "0"+ hour;
                            }

                            return hour + ":" +min + ":" +sec + ":" +ms;
                        }else{
                            //若否，就是已经到截止时间了
                            return "已截止！"
                        }
                    }
                }();
                return addTimer(timeStamp,index);
            }












            //判断是否是团长
            $scope.isMaster = function(masterId, masterItemId){
                if(masterId == masterItemId){
                    return ''
                }else{
                    return 'product_info';
                }
            };

            //参团
            $scope.join_team = function(masterItem){

                if($scope.master_user_id == masterItem.user_id){
                    $.toast('不能参加自己建的团','cancel');
                }else{
                    $scope.is_original_price = 0;
                    $scope.master_item = masterItem;
                    marketingStatus = 'PIECE-GROUP-JOINT';
                    console.log(angular.toJson(masterItem))
                }

            };

        }])
;
