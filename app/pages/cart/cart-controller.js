angular.module('cart.controller', ['cart.service', 'addressManager.service'])
    .filter('defaultCover', function(){
        return function(input){
            if(input==null){
                return 'img/category/category_cover.png'
            }
            return input;
        }
    })
    .controller('CartController', ['$scope', '$state', '$rootScope', 'CartFty',
        '$ocLazyLoad','cateLeftIndex','cateCacheCode', function ($scope, $state, $rootScope, CartFty, $ocLazyLoad,cateLeftIndex,cateCacheCode) {

            //title
            document.title = "购物车";

            $rootScope.tabsNumber = 4;
            cateLeftIndex.cate_nav_index = 0;
            cateLeftIndex.goods_list_index = 0;

            $scope.empty_cart_hide = true;
            $scope.cart_info_hide = true;

            AllCarts();
            function AllCarts() {
                CartFty.getCarts().then(
                    function (result) {
                        if (result.status_code == 0) {
                            $scope.carts = result.data;
                            //console.log(angular.toJson(result.data[0]));
                            if ($scope.carts.length > 0) {

                                var c_count = 0;
                                angular.forEach($scope.carts, function (v, k) {
                                    c_count += (v.weight * v.quantity);
                                });
                                c_count = c_count/1000;
                                $rootScope.cartCount = c_count;
                                $rootScope.detailsCartCount = c_count;

                                $scope.empty_cart_hide = true;
                                $scope.cart_info_hide = false;
                            } else {
                                $rootScope.cartCount = 0;
                                $rootScope.detailsCartCount = 0;
                                $scope.empty_cart_hide = false;
                                $scope.cart_info_hide = true;

                            }
                        }
                    }, function (error) {
                        console.log(error);
                        $.toast('获取购物车信息失败', 'cancel');
                    })
            }

            //检查商品库存
            $scope.check_stock_balance = function(count){
                if(count > 0){
                    return '';
                }else{
                    return 'color: #BCBCBC;';
                }
            };

            //商品数量增减
            $scope.downQuantity = function (id, product_spec_id) {
                angular.forEach($scope.carts, function (value, key) {
                    //console.log(id);

                    if (product_spec_id == null) {
                        if (value.product_id == id) {
                            if (value.quantity > 1) {
                                value.quantity--;
                            }
                        }
                    } else if (product_spec_id > 0) {
                        if (value.product_id == id && value.product_specification_id == product_spec_id) {
                            if (value.quantity > 1) {
                                value.quantity--;
                            }
                        }
                    }

                }, $scope.carts);
                //console.log($scope.carts);
            };
            $scope.upQuantity = function (id, product_spec_id) {
                angular.forEach($scope.carts, function (value, key) {
                    if (product_spec_id == null) {
                        if (value.product_id == id) {
                            value.quantity++;
                            //if (value.quantity > value.stock_balance) {
                            //    value.quantity = value.stock_balance;
                            //}
                        }
                    } else if (product_spec_id > 0) {
                        //console.log(value.quantity)
                        if (value.product_id == id && value.product_specification_id == product_spec_id) {
                            value.quantity++;
                            //if (value.quantity > value.stock_balance) {
                            //    value.quantity = value.stock_balance;
                            //}
                        }
                        //console.log(value.quantity)
                    }

                }, $scope.carts);
                //console.log(angular.toJson($scope.carts));
            };

            //检查数量
            $scope.countChange = function(id, product_spec_id, quantity){
                if(!checkNumber(quantity) && quantity.length > 0){
                    $.toast('请输入数字', 'cancel');
                    angular.forEach($scope.carts, function(v, k){
                        if (product_spec_id == null) {
                            if (v.product_id == id) {
                                v.quantity = 1;
                            }
                        } else if (product_spec_id > 0) {
                            if (v.product_id == id && v.product_specification_id == product_spec_id) {
                                v.quantity = 1;
                            }
                        }
                    });
                    return;
                }

                if(quantity < 0){
                    $.toast('输入数字不能为负数', 'cancel');
                    angular.forEach($scope.carts, function(v, k){
                        if (product_spec_id == null) {
                            if (v.product_id == id) {
                                v.quantity = 1;
                            }
                        } else if (product_spec_id > 0) {
                            if (v.product_id == id && v.product_specification_id == product_spec_id) {
                                v.quantity = 1;
                            }
                        }
                    });
                }
                //angular.forEach($scope.carts, function(v, k){
                //    if (product_spec_id == null) {
                //        if (v.product_id == id) {
                //            if(v.quantity === "" || v.quantity ===undefined || v.quantity == 0 || v.quantity < 0){
                //                v.quantity = 1;
                //            }
                //        }
                //    } else if (product_spec_id > 0) {
                //        if (v.product_id == id && v.product_specification_id == product_spec_id) {
                //            if(v.quantity === "" || v.quantity ===undefined || v.quantity == 0 || v.quantity < 0){
                //                v.quantity = 1;
                //            }
                //        }
                //    }
                //})
            };

            //验证数字
            function checkNumber(number){
                var isNumber = /^[0-9]*$/.test(number);
                return isNumber;
            }

            //删除购物车单项商品
            $scope.showDeleteConfirm = function (cartItem) {

                //$ocLazyLoad.load('Jquery').then(function () {
                //    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*start function*/
                        $.confirm("", "确认要移除该商品吗？", function () {
                            CartFty.deleteCart(cartItem).then(
                                function (result) {
                                    //console.log(result);
                                    //$state.go('home.cart',{}, {reload: true});
                                    AllCarts();//重新加载购物车

                                    $.toast("移除成功!");

                                }, function (error) {
                                    //console.log(error);
                                });

                        }, function () {
                            //取消操作
                        });
                        /*end function*/

                    //})
                //});
            };

            //选购结算
            $scope.checkAll = function () {
                if (typeof $scope.carts === 'undefined') {
                    return;
                }
                $scope.carts.forEach(function (it) {
                    if(it.stock_balance > 0){
                        it.$checked = $scope.$allChecked;
                    }
                });
            };
            $scope.checkItem = function (item) {
                if (typeof $scope.carts === 'undefined') {
                    return;
                }
                $scope.$allChecked = $scope.carts.every(function (it) {
                    return it.$checked;
                });
            };
            $scope.totalToPay = function () {
                if (typeof $scope.carts === 'undefined') {
                    return;
                }
                return $scope.carts.reduce(function (prev, next) {
                    return next.$checked ? prev + next.quantity * next.price : prev;
                }, 0);
            };
            //weight
            $scope.checkedWeight = function () {
                if (typeof $scope.carts === 'undefined') {
                    return;
                }
                return $scope.carts.reduce(function (prev, next) {
                    return next.$checked ? prev + next.weight * next.quantity : prev;
                }, 0);
            };
            $scope.totalFreight = function () {
                if (typeof $scope.carts === 'undefined') {
                    return;
                }
                return $scope.carts.reduce(function (prev, next) {
                    return next.$checked ? prev + next.quantity * next.freight : prev;
                }, 0);
            };
            $scope.someChecked = function () {
                if (typeof $scope.carts === 'undefined') {
                    return;
                }
                return $scope.carts.some(function (it) {
                    return it.$checked;
                });
            };

            //去结算
            $scope.checkedCarts = [];
            $scope.goSettlement = function (pay, freight) {
                if (typeof $scope.carts === "undefined") {
                    return;
                }
                $scope.carts.some(function (it) {
                    if (it.$checked) {
                        $scope.checkedCarts.push(it);
                    }
                });
                //$scope.checkedCarts.push(pay);
                //$scope.checkedCarts.push(freight);

                //console.log("pay: " + pay)

                $rootScope.settle_product_code = $scope.checkedCarts;
                $rootScope.settle_product_totalToPay = pay;

                var newUrl = '#/cart-settlement';
                var title = '购物车';
                var c_state = history.state;
                window.history.pushState(c_state, title, newUrl);

                $state.go('cart-settlement', {
                    carts: $scope.checkedCarts,
                    totalToPay: pay,
                    totalFreight: freight
                });
            };

            //编辑
            $scope.edit_action_text = "编辑";
            $scope.cart_item_price = false;
            $scope.cart_item_quantity = true;
            $scope.edit_action = function () {
                if ($scope.edit_action_text == "编辑") {
                    $scope.edit_action_text = "完成";
                    $scope.cart_item_price = true;
                    $scope.cart_item_quantity = false;
                    $scope.edit_action_img = true;
                } else if ($scope.edit_action_text == "完成") {
                    $scope.edit_action_text = "编辑";
                    $scope.cart_item_price = false;
                    $scope.cart_item_quantity = true;
                    $scope.edit_action_img = false;
                    editProductCount();
                }
            };

            //修改购物车商品数量
            function editProductCount() {

                var products = [];
                angular.forEach($scope.carts, function (v, k) {
                    var productItem = {};
                    productItem.product_id = v.product_id;
                    productItem.quantity = parseInt(v.quantity);
                    productItem.product_specification_id = v.product_specification_id;
                    products.push(productItem);
                });

                //console.log(angular.toJson(products));

                CartFty.editCountService(products)
                    .then(function (json) {

                        console.log('修改成功：' + angular.toJson(json));
                        if (json.status_code == 0) {
                            var count = 0;
                            angular.forEach($scope.carts, function (v, k) {
                                count += v.quantity;
                            });
                            $rootScope.cartCount = count;
                            $rootScope.detailsCartCount = count;
                            $state.go('home.cart', {},{reload:true});
                        } else {
                            console.log("修改失败：" + angular.toJson(json))
                        }
                    }, function (error) {
                        console.log("错误：" + error)
                    })
            }

        }])

    .controller('SettlementController', ['$scope', '$state', '$stateParams', '$location', '$rootScope', 'AddressManagerFty', 'CartFty','BalanceSession',
        'PointRate', '$ocLazyLoad','areasStatus','goodListParams',
        function ($scope, $state, $stateParams, $location, $rootScope, AddressManagerFty, CartFty,BalanceSession, PointRate,
                  $ocLazyLoad,areasStatus,goodListParams) {

            //title
            document.title = "结算";
            $scope.settlementCarts = [];

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    console.log('settlement:jquery loaded');
                })
            });

            //禁止获取焦点
            document.getElementById('city-picker').blur();

            //FEATURE: point
            $scope.point_rate = PointRate.rate;
            //$scope.onPaymentTypeChange = function(){
            //    console.log($scope.order.payment_type);
            //};
            $scope.pay = $rootScope.settle_product_totalToPay;
            $scope.show_address_status = 'add';

            AllContacts(); //获取地址信息

            function AllContacts() {
                AddressManagerFty.getContacts().then(
                    function (result) {
                        $scope.contacts = result.data;
                        angular.forEach($scope.contacts, function (data, index) {
                            if (data.is_default == 1) {
                                $scope.currentContact = data;
                                //console.log($scope.currentContact);
                            }
                        });

                        if ($scope.currentContact == null) {
                            $scope.currentContact = null;
                            $scope.product_frieght = null;
                            $scope.total_price = $scope.pay + $scope.product_frieght;
                        }

                        if ($scope.currentContact != null) {
                            $scope.productFrieghts.province = $scope.currentContact.province;
                            $scope.productFrieghts.city = $scope.currentContact.city;
                            getFrieght();
                        }

                        if ($scope.contacts.length > 0) {
                            $scope.show_address_status = 'list'
                        } else {
                            $scope.show_address_status = 'add';
                        }

                    }, function (error) {
                        console.log(error);
                    })
            }

            //获取结算数据
            //$scope.settlementCarts = $stateParams.carts;
            $scope.settlementCarts = $rootScope.settle_product_code;
            $scope.settlementData = [];
            $scope.product_list = [];
            //console.log("carts:"+$stateParams.carts);
            //console.log(angular.toJson($stateParams.carts))

            angular.forEach($scope.settlementCarts, function (data, index) {
                $scope.settlementData[index] = ({
                    product_id: data.product_id,
                    quantity: data.quantity,
                    product_specification_id: data.product_specification_id
                });
                $scope.product_list[index] = ({
                    product_id: data.product_id,
                    price: data.price * data.quantity
                });
            });
            //console.log("$scope.productFrieghts:  " + angular.toJson($scope.productFrieghts));


            //获取运费信息
            $scope.productFrieghts = {
                "province": null,
                "city": null,
                "data":[]
            };
            //var delta = null;

            function getFrieght(){
                //console.log(angular.toJson($rootScope.settle_product_code));
                //angular.forEach($stateParams.carts, function (data, index) {
                angular.forEach($rootScope.settle_product_code, function (data, index) {
                    $scope.productFrieghts.data[index] = ({
                        fare_id: data.fare_id,
                        price: data.price,
                        quantity: data.quantity,
                        weight: data.weight,
                        bulk: data.bulk
                    })
                });

                console.log('$scope.productFrieghts：' + angular.toJson($scope.productFrieghts));

                CartFty.frieghtService($scope.productFrieghts)
                    .then(function(json){
                        if(json.status_code == 0){
                            console.log(angular.toJson(json));

                            var carriage = json.data.carriage;
                            //delta = json.data.delta;
                            $scope.product_frieght = carriage;
                            $scope.product_message = json.data.message;

                            //if(delta != null){
                            //    if(delta < 0){
                            //        $scope.delta_count = delta;
                            //        var deltaStr = delta + "" ;
                            //        deltaStr = deltaStr.substr(1,deltaStr.length -1);
                            //        console.log("包邮差额：" + deltaStr);
                            //        $scope.deltaCount = deltaStr;
                            //    }
                            //}else{
                            //    $.toast('获取运费异常', 'cancel');
                            //    return;
                            //}

                            //$scope.pay = $stateParams.totalToPay;
                            console.log("$stateParams.totalToPay:" + $scope.pay);
                            $scope.freight = $stateParams.totalFreight;
                            if($scope.product_frieght > 0){
                                $scope.total_price = $scope.pay + $scope.product_frieght;
                            }else{
                                $scope.total_price = $scope.pay;
                            }
                        }else{
                            console.log('error：' + angular.toJson(json));
                            $.toast('获取运费失败', 'cancel');
                        }
                    }, function(error){
                        console.log('error：' + angular.toJson(error));
                        $.toast('获取运费失败', 'cancel');
                    })
            }

            //下单前计算优惠信息
            coupon();
            function coupon(){
                var products = $scope.product_list;
                console.log("products: " + angular.toJson(products));
                CartFty.countCouponService(products)
                    .then(function(json){
                        if(json.status_code == 0){
                            console.log("获取下单前计算优惠信息：" + angular.toJson(json));
                            $scope.count_coupon = json.data;
                            $scope.coupon_item = json.data[0];
                            console.log('$scope.coupon_item: ' + angular.toJson(json.data[0]))
                        }else{
                            $.toast('获取优惠卷信息失败', 'cancel');
                            console.log('获取优惠卷信息失败：' + angular.toJson(json));
                        }
                    }, function(error){
                        $.toast('获取优惠卷信息失败', 'cancel');
                        console.log('获取优惠卷信息失败：' + angular.toJson(error));
                    })
            }

            //show coupon list
            $scope.show_list = {
                isShow:false
            };
            $scope.toggle_coupon = function(show_list){
                if(show_list.isShow === undefined){
                    return;
                }
                show_list.isShow = !show_list.isShow;
            };
            $scope.show_coupon_list = function(show_list){
                if(show_list.isShow === undefined){
                    return;
                }
                return show_list.isShow;
            };

            //选择优惠卷
            $scope.chose_coupon = function(cItem){
                $scope.coupon_item = cItem;
            };

            //获取优惠卷
            $scope.c_checked = false;
            $scope.get_coupon_item = function(isChecked){
                if(isChecked){
                    $scope.c_checked = isChecked;
                }else{
                    $scope.c_checked = false;
                }
            };

            //进入10元区
            $scope.goToTenAreas = function(){

                var newUrl = '#/goodsList/10';
                var title = '商品列表';
                var c_state = history.state;
                window.history.pushState(c_state, title, newUrl);

                areasStatus.areas_status = 1;
                goodListParams.searchStatus = 3;
                $rootScope.jumpStatus = true;
                $state.go('goodsList',{statusNumber:10});
            };

            //提交订单
            $scope.order = {};

            $scope.order.payment_type = "WECHAT";

            $scope.addOrderSubmit = function () {

                //console.log('addOrderSubmit:'+$scope.order);
                if ($scope.show_address_status == 'add') {
                    var click_index = document.getElementById('showAddress');
                    if(click_index!=null && angular.isDefined(click_index)) {
                        click_index.click();
                    }else{
                        $.toast('请先添加收货地址', 'cancel');
                    }
                    return;
                }

                if($scope.c_checked){
                    $scope.order.coupon_id = $scope.coupon_item.coupon_id;
                }

                $scope.order.contact = $scope.currentContact;

                $scope.productFrieghts.province = $scope.order.contact.province;
                $scope.productFrieghts.city = $scope.order.contact.city;

                console.log('$scope.order: '+ angular.toJson($scope.order));

                //FEATURE: point
                // - check balance
                if($scope.order.payment_type == "POINT" && BalanceSession.balance < $scope.total_price){
                    $.toast('你当前的积分不足', 'cancel');
                    $scope.order.payment_type = "WECHAT";
                }else {
                    //console.log('ok')
                    CartFty.addOrder($scope.order).then(
                        function (result) {
                            if(result.status_code == 0){
                                console.log('提交成功：' + angular.toJson(result));
                                $scope.settlementCarts = [];
                                $scope.order_number = result.data.order_number;
                                deleteProducts($scope.settlementData);
                            }else{
                                if($scope.order.payment_type == 'WECHAT') {
                                    $.alert(result.message, '支付失败', function(){});
                                    console.log('支付失败：' + angular.toJson(result));
                                }else if($scope.order.payment_type == 'POINT'){
                                    $.alert(result.message, '兑换失败', function(){});
                                    console.log('兑换失败：' + angular.toJson(result));
                                }else{
                                    $.toast('未知支付方式', 'cancel');
                                    console.log('未知支付方式：' + angular.toJson(result));
                                }
                            }
                            //$state.go('order-confirm',{data:result.data});
                        }, function (error) {
                            if($scope.order.payment_type == 'WECHAT') {
                                $.toast('支付失败','cancel');
                                console.log('支付失败：' + angular.toJson(error));
                            }else if($scope.order.payment_type == 'POINT'){
                                $.toast('兑换失败','cancel');
                                console.log('兑换失败：' + angular.toJson(error));
                            }else{
                                $.toast('未知支付方式', 'cancel');
                                console.log('未知支付方式：' + angular.toJson(error));
                            }
                        });
                }

            };

            //删除购物车商品
            function deleteProducts(items) {
                //console.log("items：" + angular.toJson(items));

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        $scope.product_items = [];
                        angular.forEach(items, function (data, index) {
                            var del_item = {};
                            del_item.product_id = data.product_id;
                            del_item.quantity = 0;
                            del_item.product_specification_id = data.product_specification_id;
                            $scope.product_items.push(del_item);
                        });

                        CartFty.deleteProduct($scope.product_items)
                            .then(function (result) {
                                if (result.status_code == 0) {
                                    var count = 0;
                                    angular.forEach(result.data, function (v, k) {
                                        count += v.quantity;
                                    });
                                    $rootScope.cartCount = count;
                                    $rootScope.detailsCartCount = count;


                                    if($scope.order.payment_type == 'WECHAT') {
                                        //console.log("删除购物车商品：" + $scope.order_number);
                                        window.location.href = '/app/payment/wpay/' + $scope.order_number;
                                    }else if($scope.order.payment_type == 'POINT'){
                                        window.location.href = '/app/payment/ppay/' + $scope.order_number;
                                    }else{
                                        $.toast('未知支付方式', 'cancel');
                                    }


                                } else {
                                    $.toast('直接支付失败', 'cancel');
                                }
                            }, function (error) {
                                console.log(error);
                            })
                    })
                })
            }


            //新增地址
            $scope.addAddress = function () {
                $state.go('add-address');
            };
            //修改地址
            $scope.editAddress = function (item) {
                console.log(item);
                $state.go('edit-address', {data: item});
            };
            //删除地址
            $scope.deleteContact = function (id) {

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*start function*/
                        $.confirm("", "确认删除?", function () {
                            AddressManagerFty.deleteContact(id).then(
                                function (result) {
                                    if (result.status_code == 0) {
                                        var count = 0;
                                        angular.forEach(result.data, function (v, k) {
                                            count += v.quantity;
                                        });
                                        $rootScope.cartCount = count;
                                        $rootScope.detailsCartCount = count;
                                        $state.go('cart-settlement', {}, {reload: true});
                                    } else {
                                        console.log('删除购物车商品失败')
                                    }
                                }, function (error) {
                                    console.log(error);
                                });
                            $.toast("已经删除!");
                        }, function () {
                            //取消操作
                        });
                        /*end function*/
                    })
                });
            };

            //选择地址
            $scope.changeContact = function (item) {
                $scope.currentContact = item;
                //console.log($scope.currentContact);
                $scope.productFrieghts.province = $scope.currentContact.province;
                $scope.productFrieghts.city = $scope.currentContact.city;
                getFrieght();
            };

            //显示发票抬头
            $scope.invoiceTitle = false;

            $scope.showInvoiceTitle = function () {
                $scope.invoiceTitle = !$scope.invoiceTitle;
            };

            //收货时间选项
            $scope.receivingTime = [{key: 'anytime', value: '收货时间不限'}, {
                key: 'weekendOrHoliday',
                value: '周六日/节假日收货'
            }, {key: 'workDay', value: '周一至周五收货'}];


            //新增收货地址
            $scope.contact = {};
            $scope.settl_create_address = function () {

                var pcd = document.getElementById('city-picker');
                $scope.pcd = pcd.value;

                if (!angular.isString($scope.contact.contact_user)
                    || $scope.contact.contact_user.length == 0) {
                    $.toast('收货人不能为空', 'cancel');
                    return
                }
                if (!angular.isString($scope.contact.phone)
                    || $scope.contact.phone.length == 0) {
                    $.toast('手机号不能为空', 'cancel');
                    return
                } else if (!checkPhone($scope.contact.phone)) {
                    $.toast('手机号码无效', 'cancel');
                    return
                }
                if (!angular.isString($scope.pcd)
                    || $scope.pcd.length == 0) {
                    $.toast('所在地区不能为空', 'cancel');
                    return
                }
                if (!angular.isString($scope.contact.detail)
                    || $scope.contact.detail.length == 0) {
                    $.toast('详细地址不能为空', 'cancel');
                    return
                }

                var pcd_1 = $scope.pcd;
                var pcds = pcd_1.split(/\s/);
                if (pcds.length > 0) {
                    $scope.contact.province = pcds[0];
                }
                if (pcds.length > 1) {
                    $scope.contact.city = pcds[1];
                }
                if (pcds.length > 2) {
                    $scope.contact.district = pcds[2];
                }

                $scope.contact.is_default = 1;

                CartFty.addContact($scope.contact)
                    .then(function (result) {
                        AllContacts();
                        //$state.go('cart-settlement',{}, {reload: true});
                    }, function (error) {
                        console.log(error);
                    });
            };


            //验证手机号
            function checkPhone(str) {
                var isphone = /^((\+|0)86)?\d{11}$/.test(str);
                return isphone;
            }

            var pcd;

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    AllPCD();
                })
            });

            //获取省市区
            function AllPCD() {
                CartFty.getPCDService()
                    .then(function (result) {
                        //$scope.provinces = result.data;
                        pcd = result.data;
                        showPCD();
                    }, function (error) {
                        console.log(error);
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
                var userInput = document.getElementById('s_contact_user');
                userInput.blur();
                var phoneInput = document.getElementById('s_contact_phone');
                phoneInput.blur();
                var contactInput = document.getElementById('s_contact_detail');
                contactInput.blur();

                if(isIPHONE){
                    var input1 = new objBlur('s_contact_user');
                    input1=null;
                    var input2 = new objBlur('s_contact_phone');
                    input2=null;
                    var input3 = new objBlur('s_contact_detail');
                    input3=null;
                }
            };


        }])


    .controller('OrderConfirmController', ['$scope', '$state', '$stateParams', 'CartFty', 'BalanceSession',
        function ($scope, $state, $stateParams, CartFty, BalanceSession) {

        //title
        document.title = "付款";

        $scope.orderData = $stateParams.data;

        $scope.confirm = function (order_number) {
            //console.log(order_number);
            CartFty.wpay(order_number).then(
                function (result) {
                    console.log(result);

                    //$state.go('cart-settlement',{}, {reload: true});
                }, function (error) {
                    console.log(error);
                });
        }
    }]);