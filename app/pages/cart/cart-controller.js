angular.module('cart.controller', ['cart.service','addressManager.service'])

    .controller('CartController', ['$scope', '$state', 'CartFty','TabIndex', function($scope, $state, CartFty,TabIndex){

        //title
        document.title = "购物车";
        TabIndex.number = 4;

        $scope.empty_cart_hide = true;
        $scope.cart_info_hide = true;

        AllCarts();
        function AllCarts() {
            CartFty.getCarts().then(
                function (result) {
                    //console.log(result.data);
                    if(result.status_code == 0) {
                        $scope.carts = result.data;
                        if ($scope.carts.length > 0) {
                            $scope.empty_cart_hide = true;
                            $scope.cart_info_hide = false;
                        } else {
                            $scope.empty_cart_hide = false;
                            $scope.cart_info_hide = true;
                        }
                    }else{
                        $.toast('获取购物车信息失败', 'cancel');
                    }
                },function (error){
                    console.log(error);
                    $.toast('获取购物车信息失败', 'cancel');
            })
        }

        //商品数量增减
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
                        //console.log(result);
                        $state.go('home.cart',{}, {reload: true});
                    },function (error){
                        //console.log(error);
                    });
                $.toast("已经删除!");
            }, function() {
                //取消操作
            });
        };

        //选购结算
        $scope.checkAll = function() {
            if(typeof $scope.carts === "undefined"){
                return;
            }
            $scope.carts.forEach(function (it) {
                it.$checked = $scope.$allChecked;
            });
        };
        $scope.checkItem = function(item) {
            if(typeof $scope.carts === "undefined"){
                return;
            }
            $scope.$allChecked = $scope.carts.every(function(it) {
                return it.$checked;
            });
        };
        $scope.totalToPay = function () {
            if(typeof $scope.carts === "undefined"){
                return;
            }
            return $scope.carts.reduce(function(prev, next) {
                return next.$checked ? prev + next.quantity * next.price : prev;
            }, 0);
        };
        $scope.totalFreight = function () {
            if(typeof $scope.carts === "undefined"){
                return;
            }
            return $scope.carts.reduce(function(prev, next) {
                return next.$checked ? prev + next.quantity * next.freight : prev;
            }, 0);
        };
        $scope.someChecked = function() {
            if(typeof $scope.carts === "undefined"){
                return;
            }
            return $scope.carts.some(function(it) {
                return it.$checked;
            });
        };

        //去结算
        $scope.checkedCarts=[];
        $scope.goSettlement= function (pay,freight){
            if(typeof $scope.carts === "undefined"){
                return;
            }
            $scope.carts.some(function(it) {
                if(it.$checked){
                    $scope.checkedCarts.push(it);
                }
            });
            //$scope.checkedCarts.push(pay);
            //$scope.checkedCarts.push(freight);
            console.log($scope.checkedCarts);
            $state.go('cart-settlement', {carts:$scope.checkedCarts,totalToPay:pay,totalFreight:freight});
        };


        //编辑
        $scope.edit_action_text = "编辑";
        $scope.cart_item_price = false;
        $scope.cart_item_quantity = true;
        $scope.edit_action = function(){
            if($scope.edit_action_text == "编辑") {
                $scope.edit_action_text = "取消";
                $scope.cart_item_price = true;
                $scope.cart_item_quantity = false;
                $scope.edit_action_img = true;
            }else if($scope.edit_action_text == "取消") {
                $scope.edit_action_text = "编辑";
                $scope.cart_item_price = false;
                $scope.cart_item_quantity = true;
                $scope.edit_action_img = false;
            }
        };

    }])

    .controller('SettlementController', ['$scope', '$state', '$stateParams', '$location', 'AddressManagerFty', 'CartFty',
        function($scope, $state, $stateParams, $location, AddressManagerFty, CartFty){

            //title
            document.title = "结算";

            AllContacts();
            function AllContacts() {
                AddressManagerFty.getContacts().then(
                    function (result) {
                        $scope.contacts = result.data;
                        angular.forEach($scope.contacts, function(data,index){
                            if(data.is_default == 1){
                                $scope.currentContact = data;
                                //console.log($scope.currentContact);
                            }
                        });
                    },function (error){
                        console.log(error);
                })
            }

            //获取结算数据
            $scope.settlementCarts= $stateParams.carts;
            $scope.settlementData=[];
            //console.log("carts:"+$stateParams.carts);
            angular.forEach($stateParams.carts, function(data,index){
                $scope.settlementData[index]=({
                    "product_id": data.product_id,
                    "quantity": data.quantity
                });
            });
            console.log($scope.settlementData);
            $scope.pay=$stateParams.totalToPay;
            $scope.freight=$stateParams.totalFreight;
            $scope.total_price = $stateParams.totalToPay + $stateParams.totalFreight;

            //提交订单
            $scope.order={};
            $scope.addOrderSubmit=function() {
                //console.log($scope.order);
                CartFty.addOrder($scope.order).then(
                    function (result) {
                        //console.log(result.data);
                        deleteProducts($scope.settlementData);
                        //window.location.href='/app/payment/wpay/'+ result.data.order_number;
                        //$state.go('order-confirm',{data:result.data});
                    },function (error){
                        console.log(error);
                    });
            };

            //删除购物车商品
            function deleteProducts(items){
                $scope.product_items = [];
                angular.forEach(items, function(data,index){
                    data.quantity = 0;
                    $scope.product_items.push(data);
                });
                CartFty.deleteProduct($scope.product_items)
                    .then(function(json){
                    }, function(error){
                        console.log(error);
                    })

            }


            //新增地址
            $scope.addAddress= function (){
                $state.go('add-address');
            };
            //修改地址
            $scope.editAddress= function (item){
                console.log(item);
                $state.go('edit-address', {data:item});
            };
            //删除地址
            $scope.deleteContact= function(id) {
                $.confirm("", "确认删除?", function() {
                    AddressManagerFty.deleteContact(id).then(
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

            //选择地址
            $scope.changeContact= function(item) {
                $scope.currentContact = item;
                console.log($scope.currentContact);
            };

            //显示发票抬头
            $scope.invoiceTitle= false;

            $scope.showInvoiceTitle= function() {
                $scope.invoiceTitle=!$scope.invoiceTitle;
            };

            //收货时间选项
            $scope.receivingTime=[{key:'anytime',value:'收货时间不限'},{key:'weekendOrHoliday',value:'周六日/节假日收货'},{key:'workDay',value:'周一至周五收货'}];

    }])


    .controller('OrderConfirmController', ['$scope', '$state', '$stateParams', 'CartFty', function($scope, $state, $stateParams, CartFty){

        //title
        document.title = "付款";

        $scope.orderData=$stateParams.data;
        $scope.confirm=function(order_number){
            console.log(order_number);
            CartFty.wpay(order_number).then(
                function (result) {
                    console.log(result);
                    //$state.go('cart-settlement',{}, {reload: true});
                },function (error){
                    console.log(error);
                });
        }
    }]);


