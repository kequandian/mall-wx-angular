angular.module('cart.controller', ['cart.service', 'addressManager.service'])

    .controller('CartController', ['$scope', '$state', '$rootScope', 'CartFty',
        '$ocLazyLoad', function ($scope, $state, $rootScope, CartFty, $ocLazyLoad) {

            //title
            document.title = "购物车";

            $rootScope.tabsNumber = 4;

            $scope.empty_cart_hide = true;
            $scope.cart_info_hide = true;

            AllCarts();
            function AllCarts() {
                CartFty.getCarts().then(
                    function (result) {
                        if (result.status_code == 0) {
                            $scope.carts = result.data;
                            //console.log(angular.toJson(result.data))
                            if ($scope.carts.length > 0) {

                                var c_count = 0;
                                angular.forEach($scope.carts, function (v, k) {
                                    c_count += v.quantity;
                                });
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

            //商品数量增减
            $scope.downQuantity = function (id, product_spec_id) {
                angular.forEach($scope.carts, function (value, key) {
                    //console.log(id);

                    if (product_spec_id == null) {
                        if (value.product_id == id) {
                            if (value.quantity > 1) {
                                value.quantity = value.quantity - 1;
                            }
                        }
                    } else if (product_spec_id > 0) {
                        if (value.product_id == id && value.product_specification_id == product_spec_id) {
                            if (value.quantity > 1) {
                                value.quantity = value.quantity - 1;
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
                            value.quantity = value.quantity + 1;
                            //if (value.quantity > 99) {
                            //    value.quantity = 99;
                            //}
                        }
                    } else if (product_spec_id > 0) {
                        if (value.product_id == id && value.product_specification_id == product_spec_id) {
                            value.quantity = value.quantity + 1;
                            //if (value.quantity > 99) {
                            //    value.quantity = 99;
                            //}
                        }
                    }

                }, $scope.carts);
                //console.log($scope.carts);
            };

            //删除购物车单项商品
            $scope.showDeleteConfirm = function (cartItem) {
                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*start function*/
                        $.confirm("", "确认要移除该商品吗？", function () {
                            CartFty.deleteCart(cartItem).then(
                                function (result) {
                                    //console.log(result);
                                    //$state.go('home.cart',{}, {reload: true});
                                    AllCarts();//重新加载购物车
                                }, function (error) {
                                    //console.log(error);
                                });
                            $.toast("移除成功!");
                        }, function () {
                            //取消操作
                        });
                        /*end function*/
                    })
                });
            };

            //选购结算
            $scope.checkAll = function () {
                if (typeof $scope.carts === 'undefined') {
                    return;
                }
                $scope.carts.forEach(function (it) {
                    it.$checked = $scope.$allChecked;
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
                //console.log($scope.checkedCarts);
                $state.go('cart-settlement', {carts: $scope.checkedCarts, totalToPay: pay, totalFreight: freight});
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
                    productItem.quantity = v.quantity;
                    productItem.product_specification_id = v.product_specification_id;
                    products.push(productItem);
                });

                console.log(angular.toJson(products));

                CartFty.editCountService(products)
                    .then(function (json) {

                        //console.log('修改成功：' + angular.toJson(json));
                        if (json.status_code == 0) {
                            var count = 0;
                            angular.forEach($scope.carts, function (v, k) {
                                count += v.quantity;
                            });
                            $rootScope.cartCount = count;
                            $rootScope.detailsCartCount = count;
                        } else {
                            console.log("修改失败：" + error)
                        }
                    }, function (error) {
                        console.log("错误：" + error)
                    })
            }

        }])

    .controller('SettlementController', ['$scope', '$state', '$stateParams', '$location','$rootScope', 'AddressManagerFty', 'CartFty',
        '$ocLazyLoad', function ($scope, $state, $stateParams, $location,$rootScope, AddressManagerFty, CartFty, $ocLazyLoad) {

            //title
            document.title = "结算";
            $scope.settlementCarts = [];

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    console.log('settlement:jquery loaded');
                })
            });

            $scope.show_address_status = 'add';
            AllContacts();
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
            $scope.settlementCarts = $stateParams.carts;
            $scope.settlementData = [];
            //console.log("carts:"+$stateParams.carts);

            //alert(angular.toJson($stateParams.carts))

            angular.forEach($stateParams.carts, function (data, index) {
                $scope.settlementData[index] = ({
                    "product_id": data.product_id,
                    "quantity": data.quantity,
                    "product_specification_id": data.product_specification_id
                });
            });
            //console.log($scope.settlementData);
            $scope.pay = $stateParams.totalToPay;
            $scope.freight = $stateParams.totalFreight;
            $scope.total_price = $stateParams.totalToPay + $stateParams.totalFreight;


            //提交订单
            $scope.order = {};
            $scope.addOrderSubmit = function () {
                //console.log($scope.order);
                if ($scope.show_address_status == 'add') {
                    var click_index = document.getElementById('showAddress');
                    click_index.click();
                    return;
                }


                //console.log('提交前：' + angular.toJson($scope.order))

                $scope.order.contact = $scope.currentContact;

                CartFty.addOrder($scope.order).then(
                    function (result) {
                        //console.log('提交成功：' + angular.toJson(result.data));
                        $scope.settlementCarts = [];
                        $scope.order_number = result.data.order_number;
                        deleteProducts($scope.settlementData);

                        //$state.go('order-confirm',{data:result.data});
                    }, function (error) {
                        console.log(error);
                    });
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

                                    //console.log("删除购物车商品：" + $scope.order_number);
                                    window.location.href = '/app/payment/wpay/' + $scope.order_number;
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
                                    if(result.status_code == 0) {
                                        var count = 0;
                                        angular.forEach(result.data, function (v, k) {
                                            count += v.quantity;
                                        });
                                        $rootScope.cartCount = count;
                                        $rootScope.detailsCartCount = count;
                                        $state.go('cart-settlement', {}, {reload: true});
                                    }else{
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

        }])


    .controller('OrderConfirmController', ['$scope', '$state', '$stateParams', 'CartFty', function ($scope, $state, $stateParams, CartFty) {

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