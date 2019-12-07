angular.module('businessOrder.controller', ['businessOrder.service'])

    .controller('BusinessOrderController', ['$scope', '$state', '$stateParams', '$rootScope', 'BusinessOrderFty',
        '$ocLazyLoad',
        function ($scope, $state, $stateParams,$rootScope, BusinessOrderFty, $ocLazyLoad) {

            //title
            document.title = "商家订单";

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("order:jquery loaded");
                })
            });

            //nav 样式
            var scope = $rootScope;
            scope.$watch('businessOrderTabsIndex', function (nValue, oValue) {
                $scope.currentBusinessOrderId = nValue;
            });

            $scope.clickme = function (id) {
                $scope.currentBusinessOrderId = id;
            };
            //title li
            $scope.order_titles = [{
                'id': '1',
                'name': '全部',
                'srefName': '.allOrder'
            },
            //    {
            //    'id': '2',
            //    'name': '待付款',
            //    'srefName': '.payOrder'
            //}, {
            //    'id': '6',
            //    'name': '待成团',
            //    'srefName': '.pendingMassOrder'
            //}, {
            //    'id': '3',
            //    'name': '待发货',
            //    'srefName': '.payedOrder'
            //},
                {
                'id': '4',
                'name': '待收货',
                'srefName': '.deliveredOrder'
            }, {
                'id': '5',
                'name': '已完成',
                'srefName': '.finishOrder'
            }];


        }]);