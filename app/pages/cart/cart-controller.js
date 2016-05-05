angular.module('cart.controller', ['cart.service'])

    .controller('CartController', ['$scope', '$state', 'CartFty', function($scope, $state, CartFty){

        AllCarts();

        function AllCarts() {
            CartFty.getCarts().then(
                function (result) {
                    console.log(result.data);
                    $scope.carts = result.data;
                },function (error){
                    console.log(error);
            })
        }

        $scope.downQuantity = function(id){
            angular.forEach($scope.carts, function(value, key){
                console.log(id);
                if(value.product_id == id){
                    if(value.quantity > 1){
                        value.quantity = value.quantity -1;
                    }
                }
            },$scope.carts);
            console.log($scope.carts);
        };
        $scope.upQuantity = function(id){
            angular.forEach($scope.carts, function(value, key){
                if(value.product_id == id){
                    value.quantity = value.quantity +1;
                }
            },$scope.carts);
            console.log($scope.carts);
        };

        //alert(angular.toJson($scope.carts));

        //删除购物车单项商品
        $scope.showDeleteConfirm= function(id) {
            $.confirm("您确定要删除该商品吗?", "确认删除?", function() {
                CartFty.deleteCart(id).then(
                    function (result) {
                        console.log(result);
                        $state.go('cart',{}, {reload: true});
                    },function (error){
                        console.log(error);
                    });
                $.toast("已经删除!");
            }, function() {
                //取消操作
            });
        };
    }])

    .controller('SettlementController', ['$scope', '$state', 'CartFty', function($scope, $state, CartFty){

        AllContacts();

        function AllContacts() {
            CartFty.getContacts().then(
                function (result) {
                    $scope.contacts = result.data;
                    angular.forEach($scope.contacts, function(data,index){
                        if(data.is_default == 1){
                            $scope.currentContact = data;
                            console.log($scope.currentContact);
                        }
                    });
                },function (error){
                    console.log(error);
            })
        }

        //新增地址
        $scope.editAddress= function (){
            $state.go('edit-address');
        };
        //删除地址
        $scope.deleteContact= function(id) {
            $.confirm("", "确认删除?", function() {
                CartFty.deleteContact(id).then(
                    function (result) {
                        console.log(result);
                        $state.go('cart-settlement',{}, {reload: true});
                    },function (error){
                        console.log(error);
                    });
                $.toast("已经删除!");
            }, function() {
                //取消操作
            });
        };

        //更改地址
        $scope.changeContact= function(id) {
            angular.forEach($scope.contacts, function(data,index){
                if(data.id == id){
                    $scope.currentContact = data;
                    console.log($scope.currentContact);
                }
            });
            //$scope.contactList= false;
        };

        //显示发票抬头
        $scope.invoiceTitle= false;

        $scope.showInvoiceTitle= function() {
            $scope.invoiceTitle=!$scope.invoiceTitle;
        };

    }])

    .controller('EditAddressController', ['$scope', '$state', 'CartFty', function($scope, $state, CartFty){

        var pcd ;
        AllPCD();

        function AllPCD() {
            CartFty.getPCD().then(
                function (result) {
                    //$scope.provinces = result.data;
                    pcd = result.data;
                },function (error){
                    console.log(error);
            })
        }

        $scope.showPCD = function (){
            // jshint ignore: start
            +function($){

                $.rawCitiesData = pcd;
                console.log(pcd);

            }($);
            // jshint ignore: end

            /* global $:true */
            /* jshint unused:false*/

            + function($) {
                "use strict";


                var defaults;

                $.fn.cityPicker = function(params) {
                    params = $.extend({}, defaults, params);
                    return this.each(function() {

                        var format = function(data) {
                            var result = [];
                            for(var i=0;i<data.length;i++) {
                                var d = data[i];
                                if(d.name === "请选择") continue;
                                result.push(d.name);
                            }
                            if(result.length) return result;
                            return [""];
                        };

                        var area_list = function(data) {
                            if(!data.area_list) return [""];
                            return format(data.area_list);
                        };

                        var getCities = function(d) {
                            for(var i=0;i< raw.length;i++) {
                                if(raw[i].name === d) return area_list(raw[i]);
                            }
                            return [""];
                        };

                        var getDistricts = function(p, c) {
                            for(var i=0;i< raw.length;i++) {
                                if(raw[i].name === p) {
                                    for(var j=0;j< raw[i].area_list.length;j++) {
                                        if(raw[i].area_list[j].name === c) {
                                            return area_list(raw[i].area_list[j]);
                                        }
                                    }
                                }
                            }
                            return [""];
                        };

                        var raw = $.rawCitiesData;
                        var provinces = raw.map(function(d) {
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

                        if(params.showDistrict) cols.push({
                            values: initDistricts,
                            cssClass: "col-district"
                        });

                        var config = {

                            cssClass: "city-picker",
                            rotateEffect: false,  //为了性能

                            onChange: function (picker, values, displayValues) {
                                var newProvince = picker.cols[0].value;
                                var newCity;
                                if(newProvince !== currentProvince) {
                                    var newCities = getCities(newProvince);
                                    newCity = newCities[0];
                                    var newDistricts = getDistricts(newProvince, newCity);
                                    picker.cols[1].replaceValues(newCities);
                                    if(params.showDistrict) picker.cols[2].replaceValues(newDistricts);
                                    currentProvince = newProvince;
                                    currentCity = newCity;
                                    picker.updateValue();
                                    return;
                                }
                                if(params.showDistrict) {
                                    newCity = picker.cols[1].value;
                                    if(newCity !== currentCity) {
                                        picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                                        currentCity = newCity;
                                        picker.updateValue();
                                    }
                                }
                            },

                            cols: cols
                        };

                        if(!this) return;
                        var p = $.extend(config, params);
                        //计算value
                        var val = $(this).val();
                        if(val) {
                            p.value = val.split(" ");
                            if(p.value[0]) {
                                currentProvince = p.value[0];
                                p.cols[1].values = getCities(p.value[0]);
                            }

                            if(p.value[1]) {
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
        };


    }]);