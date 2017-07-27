angular.module('wholesaleDetails.controller', ['wholesaleDetails.service'])

        .controller('WholesaleDetailsController', ['$scope', '$state', '$stateParams', '$rootScope', 'WholesaleDetailsFty',
        'PointRate','WholesalePCDCode', '$ocLazyLoad','$interval','wCateCache',
        function ($scope, $state, $stateParams, $rootScope, WholesaleDetailsFty, PointRate,WholesalePCDCode, $ocLazyLoad,$interval,wCateCache) {

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("homePage:jquery loaded");
                })
            });
            //title
            document.title = "商品详情";

            var scope = $rootScope;
            scope.$watch('detailsCartCount', function (nValue, oValue) {
                $scope.d_cart_count = nValue;
                //console.log('新值：' + nValue + "-------" + '旧值：' + oValue);
            });

            $scope.point_rate = PointRate.rate;
            var wholesaleId = $stateParams.wholesaleId;
            var product_id = 0;
            var province = WholesalePCDCode.province;
            var city = WholesalePCDCode.city;
            var district = WholesalePCDCode.district;
            var pcd = null;
            $scope.pcd_change_price = 0;
            $scope.cannot_deliver = false;
            $scope.fare_info ={};

            if(province != null && city != null && district != null){
                $scope.pcd = province + ' ' + city + ' ' + district;
            }

            //获取商品批发详情
            getWholesaleDetails();

            //修改url地址，用于分享
            //appendFallback(product_id);

            function appendFallback(product_id){
                if ( window.location.href.indexOf('fb_redirect=true') >=0 ) {
                    return false;
                }

                var newurl;
                if(window.location.href.indexOf('?') >= 0){
                    var params = window.location.href.split('?');
                    var longParam = params[1];
                    var param = longParam.split('#')[0];
                    /// already has fallback
                    if(param.indexOf('fallback=piecegroup-')>=0){
                        param = 'fallback=details-' + product_id;
                    }else if(param.indexOf('fallback=details-')>=0){
                        param = param.replace(/fallback=details\-\d+/,  'fallback=details-'+product_id);
                        console.log("param>>> "+param);
                    }else{
                        param = param + '&fallback=details-' + product_id;
                        console.log("param> "+param);
                    }

                    /// append details
                    ///
                    newurl = '?' + param + '#/details/' + product_id ;
                    console.log("newurl>>> "+newurl);
                }else{
                    newurl = '?fallback=details-'+ product_id +'#/details/' + product_id;
                    console.log("newurl> "+newurl);
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


            //获取商品批发详情
            function getWholesaleDetails(){

                WholesaleDetailsFty.getWholesaleDetailsSerivce(wholesaleId)
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.wholesale_info = json.data;
                            product_id = json.data.product_id;
                            $scope.fare_info.is_incl_postage = 1;
                            //console.log("商品批发详情: " + angular.toJson(json));

                            //商品详情
                            detailsInfo();
                        }else{
                            console.log("获取商品批发详情失败: " + angular.toJson(json));
                        }
                    }, function(error){
                        console.log("获取商品批发详情失败: " + angular.toJson(error));
                    }).finally(function(){
                        //变更价格
                        //producePriceChange($scope.wholesale_info);
                        //获取省市区
                        //AllPCD();
                    })
            }

            //获取商品详情信息
            $scope.properties_list = [];
            function detailsInfo() {
                WholesaleDetailsFty.detailsService(product_id)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.details = json.data;
                            //console.log("商品详情信息: " + angular.toJson(json.data));

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
                            getProductRabate(product_id);
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

                            //运费
                            /*$scope.fare_info = $scope.details.fare_template;

                            //console.log("运费信息：" + angular.toJson($scope.fare_info))

                            $scope.fare_info.is_excl_postage = ($scope.fare_info.is_incl_postage==0 && $scope.fare_info.is_incl_postage_by_if==0);

                            angular.forEach($scope.fare_info.carry_modes, function(item){
                                if(item.is_default){
                                    $scope.fare_info.default_amount = item.first_amount;
                                }
                            })*/

                            //商品描述
                            if($scope.wholesale_info.description != null){
                                $scope.description_info = $scope.wholesale_info.description;
                            }else{
                                $scope.description_info = $scope.details.description;
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

            //星级经销价
            $scope.wholesale_price = function(price, wholesaleUnit, productUnit){
                if(wholesaleUnit === undefined || wholesaleUnit === null || wholesaleUnit == ""){
                    return '星级经销价: ' + price + '/' + productUnit
                }else{
                    return '星级经销价: ' + price + '/' + wholesaleUnit
                }
            };

            //现零售价
            $scope.retail_price = function(price, wholesaleUnit, productUnit){
                if(wholesaleUnit === undefined || wholesaleUnit === null || wholesaleUnit == ""){
                    return '现零售价: ' + price + '/' + productUnit
                }else{
                    return '现零售价: ' + price + '/' + wholesaleUnit
                }
            };

            //获取快递公司
            function expressInfo(){
                WholesaleDetailsFty.expressSerivce()
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
                WholesaleDetailsFty.kqQQService()
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

            function getProductRabate(product_id){
                WholesaleDetailsFty.productRebateService(product_id)
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

            /*TitleReSet("商品详情");
             function TitleReSet(title) {
             // body...
             document.title = title;
             //如果是IOS端微信,无法直接修改title.需要下面这一段神代码...
             //没看懂为什么添加一个iframe,然后remove掉就能动态修改title
             var $body = $('body');
             var $iframe = $('<iframe src="" style="display:none;"></iframe>');
             $iframe.on('load', function (argument) {
             //console.log("loading....");
             setTimeout(function () {
             //console.log("remove....");
             $iframe.off('load').remove();
             }, 0);
             }).appendTo($body);
             }*/

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

            //购买状态
            $scope.buy_status = function (number, b_status) {
                if(!b_status){
                    $.toast('该商品暂无库存', 'cancel');
                    return;
                }
                //console.log("number: " + number);

                if (number == 1) {
                    $scope.b_status = "cart";
                } else if (number == 2) {
                    $scope.b_status = "buy";
                }
            };

            //确认购买option
            $scope.buy_product_option = function (productInfo, productId, quantity) {

                var product_property = null;
                var product_specification_id = null;
                var int_quantity = parseInt(quantity);
                var isFightGroups = $scope.is_fight_groups;
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
                    WholesaleDetailsFty.check_buy_count(productId, quantity)
                        .then(function(json){
                            console.log("限购信息：" + angular.toJson(json));
                            if(json.status_code == 0){
                                buy_option(productInfo,productId, int_quantity,product_property,product_specification_id);
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
                var b_status = $scope.b_status;
                console.log("b_status: " + b_status);
                if (b_status == "cart") {
                    if (productInfo.stock_balance > 0) {
                        $scope.addProductToCart(productId, int_quantity, product_property, product_specification_id);
                    } else {
                        $.toast('此商品暂无库存');
                    }
                } else if (b_status == "buy") {
                    if (productInfo.stock_balance > 0) {
                        $scope.buy_immediately(productInfo, int_quantity, product_property, product_specification_id);
                    } else {
                        $.toast('此商品暂无库存');
                    }
                }
            }

            //添加购物车
            $scope.addProductToCart = function (productId, quantity, product_property, product_specification_id) {

                if(!quantity > 0){
                    $.toast('请输入商品数量','cancel');
                    return;
                }
                if($scope.cannot_deliver){
                    $.toast('该地区不支持配送服务','cancel');
                    return;
                }

                //批发状态
                var body = [];
                var item = {};
                var marketing_status = 'WHOLESALE';
                var marketing_id = $scope.wholesale_info.id;

                item.product_id = productId;
                item.quantity = quantity;
                item.product_specification_id = product_specification_id;
                item.marketing_id = marketing_id;
                item.marketing = marketing_status;
                body.push(item);

                console.log('body: ' + angular.toJson(body));

                WholesaleDetailsFty.addProToCatService(body)
                    .then(function (json) {

                        $ocLazyLoad.load('Jquery').then(function () {
                            $ocLazyLoad.load('JqueryWeUI').then(function () {

                                /*start function*/
                                if (json.status_code == 0) {
                                    //$.toast.prototype.defaults.duration = 2000;
                                    var c_count = 0;
                                    if (json.data.length > 0) {
                                        angular.forEach(json.data, function (v, k) {
                                            //c_count += (v.weight * v.quantity);
                                            c_count += v.quantity;
                                        });
                                    }
                                    //$rootScope.detailsCartCount = c_count/1000;
                                    $rootScope.detailsCartCount = c_count;
                                    $.toast("成功添加商品");
                                } else {
                                    $.toast("添加失败", "cancel");
                                    console.log("添加失败：" + angular.toJson(json));
                                }
                                /*end function*/

                            });
                        });

                    }, function (error) {
                        $.toast("添加失败", "cancel");
                        console.log("添加失败：" + angular.toJson(error));
                    })
            };

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
                //var buy_price = 0;
                if (item.specifications.length > 0) {
                    angular.forEach(item.specifications, function (v, k) {
                        if (v.id == product_specification_id) {
                            //buy_price = v.price;
                            p_item.product_specification_name = v.name;
                            p_item.stock_balance = v.stock_balance;
                        }
                    });
                    p_item.price = $scope.wholesale_info.pricing.price;
                }

                //console.log("item:" + angular.toJson(item));
                p_item.product_id = item.id;
                p_item.quantity = quantity;
                p_item.product_name = item.name;
                p_item.fare_id = item.fare_id;
                p_item.cover = item.cover;
                p_item.weight = item.weight;
                p_item.bulk = item.bulk;

                //批发状态
                p_item.marketing = 'WHOLESALE';
                p_item.wholesaleData.marketing_id = $scope.wholesale_info.id;
                //p_item.wholesaleData.original_price = item.price;
                //p_item.wholesaleData.pricings = $scope.wholesale_info.pricings;

                //如果规格为空
                if(product_specification_id == null){
                    p_item.stock_balance = item.stock_balance;
                    p_item.price = $scope.wholesale_info.pricing.price;
                }

                p_item.product_specification_id = product_specification_id;
                $scope.checkedCarts.push(item);

                p_info.push(p_item);
                //console.log('p_info: ' + angular.toJson(p_info));
                //console.log('details price: ' + $scope.details.price);
                //return;
                wCateCache.returnStatus = 'details';

                $rootScope.settle_product_code = p_info;
                $rootScope.settle_product_totalToPay = p_info[0].price * p_info[0].quantity;

                var newUrl = '#/cart-settlement';
                var title = '结算';
                var c_state = history.state;
                window.history.pushState(c_state, title, newUrl);

                $state.go('cart-settlement', {
                    carts: $scope.checkedCarts,
                    totalToPay: p_info[0].price * p_info[0].quantity,
                    totalFreight: item.freight
                });


                //保存配送地信息
                /*if($scope.cannot_deliver){
                    $.toast('该地区不支持配送服务','cancel');
                }else{
                    saveRegion(item.freight,quantity,p_info);
                }*/

            };

            //保存配送地信息
            function saveRegion(freight,quantity,p_info){

                if(JSON.stringify(region_body) == '{}'){
                    $.toast('配送地数据异常', 'cancel');
                    return;
                }

                WholesaleDetailsFty.saveRegionService(region_body)
                    .then(function(json){
                        if(json.status_code == 0){

                            $rootScope.settle_product_code = p_info;
                            $rootScope.settle_product_totalToPay = p_info[0].price * p_info[0].quantity;

                            WholesalePCDCode.province = region_body.province;
                            WholesalePCDCode.city = region_body.city;
                            WholesalePCDCode.district = region_body.district;

                            var newUrl = '#/cart-settlement';
                            var title = '结算';
                            var c_state = history.state;
                            window.history.pushState(c_state, title, newUrl);

                            $state.go('cart-settlement', {
                                carts: $scope.checkedCarts,
                                totalToPay: p_info[0].price * p_info[0].quantity,
                                totalFreight: freight
                            });

                        }else{
                            $.toast('配送地数据异常', 'cancel');
                            console.log('配送地数据异常: ' + angular.toJson(error))
                        }
                    }, function(error){
                        $.toast('配送地数据异常', 'cancel');
                        console.log('配送地数据异常: ' + angular.toJson(error))
                    })
            }

            //添加收藏
            $scope.addProductToCollection = function (productId) {

                WholesaleDetailsFty.addCollectionService(productId)
                    .then(function (json) {

                        $ocLazyLoad.load('Jquery').then(function () {
                            $ocLazyLoad.load('JqueryWeUI').then(function () {
                                /*start function*/
                                //alert(angular.toJson(json));
                                if (json.status_code == 0) {
                                    $.toast('收藏成功');
                                } else {
                                    $.toast('收藏失败', 'cancel');
                                    console.log('收藏失败: ' + angular.toJson(json))
                                }
                                /*end function*/
                            });
                        });

                    }, function (error) {
                        $.toast('收藏失败', 'cancel');
                        console.log('收藏失败: ' + angular.toJson(error))
                    })
            };

            //进入购物车
            $scope.goToCart = function(){
                var newUrl = '#/home/cart';
                var title = '购物车';
                var c_state = history.state;
                window.history.pushState(c_state, title, newUrl);

                $state.go('home.cart');
            };

            //温馨提示文本
            $scope.fare_info_title = function(title, content){
                //if(title != null && content != null){
                //    return 'height: 83px; border-top: 1px solid #ECECEC;'
                //}else{
                //    return 'height: 35px; border-top: 1px solid #ECECEC;'
                //}
                return 'height: 35px; border-top: 1px solid #ECECEC;'
            };


            //更改pcd变更价格
            $scope.pcd_change = function(){

                var interval = $interval(function(){
                    var dis_class = document.getElementsByClassName('weui-picker-modal');
                    console.log(dis_class.length);
                    if(dis_class.length == 0){
                        producePriceChange($scope.wholesale_info);
                        $interval.cancel(interval);
                    }
                }, 800);
            };

            //变更价格
            var region_body = {};
            function producePriceChange(wholesaleInfo){

                $scope.pcd_change_price = 0;
                console.log("变更价格");
                if(wholesaleInfo == null){
                    console.log("wholesaleInfo is null");
                    return;
                }
                var pcd_change = document.getElementById('city-picker');
                if(pcd_change.value === undefined || pcd_change.value == null || pcd_change.value == ''){
                    console.log("获取省市区input值失败");
                    $scope.pcd_change_price = 0;
                }else{
                    console.log("处理中");
                    var input_pcd = pcd_change.value.replace(/[ ]/g, "-");
                    var region_null = null;
                    var change_item = null;
                    angular.forEach(wholesaleInfo.pricings, function(value, index){
                        if(value.region == null){
                            region_null = value;
                        }else if(value.region.indexOf('|') >= 0){
                            var region_list = value.region.split('|');
                            angular.forEach(region_list, function(v,k){
                                if(input_pcd.indexOf(v) != -1){
                                    change_item = value;
                                }
                            })
                        }else{
                            if(input_pcd.indexOf(value.region) != -1){
                                change_item = value;
                            }
                        }
                    });

                    if(change_item == null){
                        change_item = region_null;
                    }
                    //console.log(angular.toJson(change_item))

                    if(change_item.is_default == 1){
                        if(change_item.enabled == 1){
                            $scope.cannot_deliver = false;
                            $scope.pcd_change_price = change_item.price;
                        }else if(change_item.enabled == 0){
                            $scope.cannot_deliver = true;
                            $scope.pcd_change_price = $scope.wholesale_info.trade_price;
                        }
                    }else if(change_item.is_default == 0){
                        if(change_item.enabled == 1){
                            $scope.cannot_deliver = false;
                            $scope.pcd_change_price = change_item.price;
                        }else if(change_item.enabled == 0){
                            $scope.cannot_deliver = true;
                            $scope.pcd_change_price = $scope.wholesale_info.trade_price;
                        }
                        //$rootScope.pcdChangePrice = change_item.price;
                    }
                    region_body.province = pcd_change.value.split(' ')[0];
                    region_body.city = pcd_change.value.split(' ')[1];
                    region_body.district = pcd_change.value.split(' ')[2];
                    console.log('变更完成: ' + $scope.pcd_change_price)

                }
            }


            //判断是否为苹果
            var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE')!= -1;

            // 元素失去焦点隐藏iphone的软键盘
            function objBlur(id,time){
                if(typeof id != 'string') throw new Error('objBlur()参数错误');
                var obj = document.getElementById(id),
                    time = time || 500,
                    docTouchend = function(event){
                        if(event.target!= obj){
                            setTimeout(function(){
                                obj.blur();
                                document.removeEventListener('touchend', docTouchend,false);
                            },time);
                        }
                    };
                if(obj){
                    obj.addEventListener('focus', function(){
                        document.addEventListener('touchend', docTouchend,false);
                    },false);
                }else{
                    throw new Error('objBlur()没有找到元素');
                }
            }

            //隐藏键盘
            $scope.keyboard_hidden = function(){

                document.getElementById('city-picker').blur();

                var userInput = document.getElementById('contact_user');
                userInput.blur();
                var phoneInput = document.getElementById('contact_phone');
                phoneInput.blur();
                var contactInput = document.getElementById('contact_detail');
                contactInput.blur();

                if(isIPHONE){
                    var input1 = new objBlur('contact_user');
                    input1=null;
                    var input2 = new objBlur('contact_phone');
                    input2=null;
                    var input3 = new objBlur('contact_detail');
                    input3=null;
                }
            };

            /*
             * 获取省市区
             * */
            function AllPCD() {
                WholesaleDetailsFty.getPCDService()
                    .then(function (result) {
                        //$scope.provinces = result.data;
                        if(result.status_code == 0){
                            pcd = result.data;
                            showPCD();
                        }else{
                            console.log('获取省市区失败：' + angular.toJson(result));
                        }
                    }, function (error) {
                        console.log('获取省市区失败：' + angular.toJson(error));
                    })
            }

            function showPCD() {
                // jshint ignore: start
                +function ($) {

                    $.rawCitiesData = pcd;
                    //console.log(pcd);

                }($);
                // jshint ignore: end

                /* global $:true */
                /* jshint unused:false*/

                +function ($) {
                    "use strict";

                    var defaults;

                    $.fn.cityPicker = function (params) {
                        params = $.extend({}, defaults, params);
                        return this.each(function () {

                            var format = function (data) {
                                var result = [];
                                for (var i = 0; i < data.length; i++) {
                                    var d = data[i];
                                    if (d.name === "请选择") continue;
                                    result.push(d.name);
                                }
                                if (result.length) return result;
                                return [""];
                            };

                            var area_list = function (data) {
                                if (!data.area_list) return [""];
                                return format(data.area_list);
                            };

                            var getCities = function (d) {
                                for (var i = 0; i < raw.length; i++) {
                                    if (raw[i].name === d) return area_list(raw[i]);
                                }
                                return [""];
                            };

                            var getDistricts = function (p, c) {
                                for (var i = 0; i < raw.length; i++) {
                                    if (raw[i].name === p) {
                                        for (var j = 0; j < raw[i].area_list.length; j++) {
                                            if (raw[i].area_list[j].name === c) {
                                                return area_list(raw[i].area_list[j]);
                                            }
                                        }
                                    }
                                }
                                return [""];
                            };

                            var raw = $.rawCitiesData;
                            var provinces = raw.map(function (d) {
                                return d.name;
                            });
                            var initCities = area_list(raw[0]);
                            var initDistricts = area_list(raw[0].area_list[0]);

                            var currentProvince = provinces[0];
                            var currentCity = initCities[0];
                            var currentDistrict = initDistricts[0];

                            var cols = [
                                {
                                    values: provinces,
                                    cssClass: "col-province"
                                },
                                {
                                    values: initCities,
                                    cssClass: "col-city"
                                }
                            ];

                            if (params.showDistrict) cols.push({
                                values: initDistricts,
                                cssClass: "col-district"
                            });

                            var config = {

                                cssClass: "city-picker",
                                rotateEffect: false,  //为了性能

                                onChange: function (picker, values, displayValues) {
                                    var newProvince = picker.cols[0].value;
                                    var newCity;
                                    if (newProvince !== currentProvince) {
                                        var newCities = getCities(newProvince);
                                        newCity = newCities[0];
                                        var newDistricts = getDistricts(newProvince, newCity);
                                        picker.cols[1].replaceValues(newCities);
                                        if (params.showDistrict) picker.cols[2].replaceValues(newDistricts);
                                        currentProvince = newProvince;
                                        currentCity = newCity;
                                        picker.updateValue();
                                        return;
                                    }
                                    if (params.showDistrict) {
                                        newCity = picker.cols[1].value;
                                        if (newCity !== currentCity) {
                                            picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                                            currentCity = newCity;
                                            picker.updateValue();
                                        }
                                    }
                                },

                                cols: cols
                            };

                            if (!this) return;
                            var p = $.extend(config, params);
                            //计算value
                            var val = $(this).val();
                            if (val) {
                                p.value = val.split(" ");
                                if (p.value[0]) {
                                    currentProvince = p.value[0];
                                    p.cols[1].values = getCities(p.value[0]);
                                }

                                if (p.value[1]) {
                                    currentCity = p.value[1];
                                    params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.value[1]));
                                } else {
                                    currentDistrict = p.value[2];
                                    params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]));
                                }
                            }
                            $(this).picker(p);
                        });
                    };

                    defaults = $.fn.cityPicker.prototype.defaults = {
                        showDistrict: true //是否显示地区选择
                    };

                }($);
            }

        }])
;