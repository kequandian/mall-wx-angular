angular.module('home.controller', ['home.service'])
    .controller('HomeController', ['$scope', '$state', '$rootScope', '$timeout', 'SimpleCartFty','GlobalVariable',
        function ($scope, $state, $rootScope, $timeout, SimpleCartFty, GlobalVariable) {

            //获取购物车数量
            getCartCount();

            //nav 样式
            var scope = $rootScope;
            scope.$watch('tabsNumber', function (nValue, oValue) {
                $scope.currentId = nValue;
            });
            scope.$watch('cartCount', function (nValue, oValue) {
                $scope.home_tabs[3].c_number = nValue;
            });

            $scope.clickme = function (id) {
                $scope.currentId = id;
            };
            //title li
            $scope.home_tabs = [{
                'id': '1',
                'name': '首页',
                'srefName': '.homePage',
                'home_tab_icon': 'weui_tabbar_icon ion-app-biliya-tabs-home',
                'c_count': null,
                'c_number': 0
            }, {
                'id': '2',
                'name': '分类',
                'srefName': '.category',
                'home_tab_icon': 'weui_tabbar_icon ion-app-biliya-tabs-search',
                'c_count': null,
                'c_number': 0
            }, {
                'id': '3',
                'name': GlobalVariable.SELLER_SHIP=='NO' ? '分销' : '销售中心',
                'srefName': GlobalVariable.SELLER_SHIP=='YES' ? '.sellerPage' : GlobalVariable.SELLER_SHIP=='NO' ?  '.becomeDistributor' : 'sellerApplying',
                'home_tab_icon': 'weui_tabbar_icon ion-app-biliya-tabs-team',
                'c_count': null,
                'c_number': 0
            }, {
                'id': '4',
                'name': ' 购物车',
                'srefName': '.cart',
                'home_tab_icon': 'weui_tabbar_icon ion-app-biliya-tabs-cart',
                'c_count': 'cart_count',
                'c_number': 0
            }, {
                'id': '5',
                'name': '个人中心',
                'srefName': '.my',
                'home_tab_icon': 'weui_tabbar_icon ion-app-biliya-tabs-user',
                'c_count': null,
                'c_number': 0
            }];

            //获取购物车数量
            function getCartCount() {
                SimpleCartFty.getCarts()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            var c_count = 0;
                            if (json.data.length > 0) {
                                angular.forEach(json.data, function (v, k) {
                                    c_count += v.quantity;
                                });
                            }
                            if (c_count > 0) {
                                $scope.home_tabs[3].c_number = c_count;
                                $rootScope.detailsCartCount = c_count;
                            }
                        }
                    }, function (error) {
                        console.log(error)
                    })
            }


        }]);