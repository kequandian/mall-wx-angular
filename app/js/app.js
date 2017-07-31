(function () {
    'use strict';

    var myapp = angular.module('app', [
        'ui.router',
        'oc.lazyLoad',
        'global',
        //'bsSwitch',
        //'spinner',
        'commonJs',
        'moduleValueJs',
        'home.route',
        'homePage.route',
        'my.route',
        'cart.route',
        //'seller.route',
        'goodsList.route',
        'details.route',
        'addressManager.route',
        'orderDetails.route',
        'sellerPage.route',
        'myTeam.route',
        'promotionOrder.route',
        //'marketing.route',
        //'shopSettings.route',
        'category.route',
        //'integral.route',
        'feedback.route',
        'commonProblem.route',
        'collection.route',
        'distributionInfo.route',
        'refund.route',
        'withdraw.route',
        "express.route",
        "salesReturn.route",
        'searchPage.route',
        'coupon.route',
        'offLineShop.route',
        'pieceGroup.route',
        'pieceGroupGoodsList.route',
        'wholesale.route',
        'wholesaleGoodsList.route',
        'wholesaleDetails.route',
        'addWholesaleAddress.route',
        'myAgent.route'

    ]).config(["$urlRouterProvider", '$ocLazyLoadProvider','$locationProvider',
        function ($urlRouterProvider, $ocLazyLoadProvider,$locationProvider) {

            $urlRouterProvider.otherwise("/home/homePage");

            $ocLazyLoadProvider.config({
                modules: [ {
                    name: 'Jquery',
                    files: ['bower_components/jquery/dist/jquery.min.js'],
                    cache: true
                }, {
                    name: 'JqueryWeUI',
                    files: ['bower_components/jquery-weui/dist/js/jquery-weui.min.js',
                        'js/weui.js',
                        {type: 'css', path: 'bower_components/jquery-weui/dist/css/jquery-weui-compact.css'}],
                    cache: true
                }, {
                    name: 'FiveStar',
                    files: [{type: 'css', path: 'lib/custom/css/fiveStar.css'}, 'lib/custom/css/levelProgress.css', 'lib/custom/js/fiveStar.js', 'lib/custom/js/levelProgress.js',],
                    cache: true
                }, {
                    name: 'SquareImg',
                    files: ['lib/custom/js/squareImg.js'],
                    cache: true
                }, {
                    name: 'SortableSwitch',
                    files: ['lib/custom/css/sortableSwitch.css', 'lib/custom/js/sortableSwitch.js'],
                    cache: true
                }, {
                    name: 'ImageCache',
                    files: [
                        //  not used now
                        'lib/custom/js/imgcache.js',
                        'lib/custom/js/ngImgCache.js'
                        ],
                    cache: true
                }, {
                    name: 'GoodsList',
                    files: ['pages/goodsList/goodsList-controller.js',
                        'pages/goodsList/goodsList-service.js',
                        'lib/custom/js/sortableSwitch.js',
                        {type: 'css', path: 'lib/custom/css/sortableSwitch.css'},
                        {type: 'css', path: 'css/goodsList/goodsList.css'}],
                    cache: false
                }, {
                    name: 'Details',
                    files: [
                        'pages/details/details-controller.js',
                        'pages/details/details-service.js',
                        {type: 'css', path: 'css/cart/cart.css'},
                        {type: 'css', path: 'css/details/details.css'}],
                    cache: false
                }, {
                    name: 'Search',
                    files: ['pages/searchPage/searchPage-controller.js',
                        'pages/searchPage/searchPage-service.js',
                        {type: 'css', path: 'css/searchPage/searchPage.css'}],
                    cache: false
                }, {
                    name: 'SalesReturn',
                    files: [
                        'pages/my/order/salesReturn/salesReturn-controller.js',
                        'pages/my/order/salesReturn/salesReturn-service.js',
                        'lib/ng-touch.min.js',
                        {type: 'css', path: 'css/my/salesReturn.css'}
                    ],
                    cache: false
                }, {
                    name: 'Category',
                    files: ['pages/category/category-controller.js',
                        'pages/category/category-service.js',
                        {type: 'css', path: 'css/category/category.css'},
                        {type: 'css', path: 'css/category/fightGroups.css'}],
                    cache: false
                }, {
                    name: 'Withdraw',
                    files: ['pages/seller/pages/withdraw/withdraw-controller.js',
                        'pages/seller/pages/withdraw/withdraw-service.js',
                        'pages/seller/seller-session-service.js',
                        {type: 'css', path: 'css/sellerPage/withdraw.css'},
                        {type: 'css', path: 'css/sellerPage/exchangeRecord.css'}
                    ],
                    cache: false
                }, {
                    name: 'Distribution',
                    files: ['pages/seller/pages/distributionInfo/distributionInfo-controller.js',
                        'pages/seller/pages/distributionInfo/userInfo-service.js',
                        'pages/seller/seller-session-service.js',
                        {type: 'css', path: 'css/sellerPage/distributionInfo.css'}],
                    cache: false
                }, {
                    name: 'Order',
                    files: [
                        'pages/my/order/order-controller.js',
                        'pages/my/order/order-service.js',
                        'pages/my/order/order-common-service.js',
                        {type: 'css', path: 'css/order/order.css'}],
                    cache: false
                },  {
                    name: 'OrderDetails',
                    files: ['pages/my/order/orderDetails/orderDetail-controller.js',
                        'pages/my/order/orderDetails/orderDetail-service.js',
                        'pages/my/order/express/express-service.js',
                        'pages/my/order/order-common-service.js',
                        'pages/my/order/order-service.js',
                        {type: 'css', path: 'css/order/orderDetails.css'}],
                    cache: false
                }, {
                    name: 'Refund',
                    files: [
                        'pages/my/order/refund/refund-controller.js',
                        'pages/my/order/refund/refund-service.js',
                        {type: 'css', path: 'css/order/refund.css'}],
                    cache: false
                }, {
                    name: 'Express',
                    files: ['pages/my/order/express/express-controller.js',
                        'pages/my/order/orderDetails/orderDetail-service.js',
                        'pages/my/order/express/express-service.js',
                        {type: 'css', path: 'css/order/express.css'}],
                    cache: false
                }, {
                    name: 'Cart',
                    files: ['pages/cart/cart-controller.js',
                        'pages/cart/cart-service.js',
                        'pages/my/addressManager/addressManager-service.js',
                        {type: 'css', path: 'css/cart/cart.css'},
                        {type: 'css', path: 'css/cart/settlement.css'}],
                    cache: false
                }, {
                    name: 'SellerPage',
                    files: ['pages/seller/pages/sellerPage/sellerPage-controller.js',
                        'pages/seller/pages/sellerPage/sellerPage-service.js',
                        'pages/seller/seller-session-service.js',
                        {type: 'css', path: 'lib/custom/css/fiveStar.css'},
                        {type: 'css', path: 'lib/custom/css/levelProgress.css'},
                        {type: 'css', path: 'css/my/profile.css'},
                        {type: 'css', path: 'css/sellerPage/sellerPage.css'}],
                    cache: false
                }, {
                    name: 'Team',
                    files: ['pages/seller/pages/myTeam/myTeam-controller.js',
                        'pages/seller/pages/myTeam/myTeam-service.js',
                        {type: 'css', path: 'css/sellerPage/myTeam.css'}],
                    cache: false
                }, {
                    name: 'PromotionOrder',
                    files: ['pages/seller/pages/promotionOrder/promotionOrder-controller.js',
                        'pages/seller/pages/promotionOrder/promotionOrder-service.js',
                        'pages/seller/seller-session-service.js',
                        {type: 'css', path: 'css/sellerPage/promotionOrder.css'}],
                    cache: false
                }, {
                    name: 'My',
                    files: [
                        'pages/my/my-controller.js',
                        'pages/my/my-service.js',
                        {type: 'css', path: 'css/my/my.css'},
                        {type: 'css', path: 'css/my/profile.css'}],
                    cache: false
                }, {
                    name: 'Feedback',
                    files: [
                        'pages/my/feedback/feedback-controller.js',
                        'pages/pageCommon/imageUpLoad.js',
                        'lib/ng-touch.min.js',
                        'pages/my/feedback/feedback-service.js',
                        {type: 'css', path: 'css/my/feedback.css'}],
                    cache: false
                }, {
                    name: 'Collection',
                    files: ['pages/my/collection/collection-controller.js',
                        'pages/my/collection/collection-service.js',
                        {type: 'css', path: 'css/my/collection.css'}],
                    cache: false
                }, {
                    name: 'Questions',
                    files: ['pages/my/commonProblem/commonProblem-controller.js',
                        'pages/my/commonProblem/commonProblem-service.js',
                        {type: 'css', path: 'css/my/commonProblem.css'}],
                    cache: false
                }, {
                    name: 'Address',
                    files: ['pages/my/addressManager/addressManager-controller.js',
                        'pages/my/addressManager/addressManager-service.js',
                        {type: 'css', path: 'css/addressManager/addressManager.css'}],
                    cache: false
                }, {
                    name: 'becomeDistributor',
                    files: ['pages/seller/pages/sellerPage/sellerPage-controller.js',
                        'pages/seller/pages/sellerPage/sellerPage-service.js',
                        'pages/seller/seller-session-service.js',
                        {type: 'css', path: 'css/sellerPage/distributionInfo.css'}],
                    cache: false
                }, {
                    name: 'sellerApplying',
                    files: ['pages/seller/pages/sellerPage/sellerPage-controller.js',
                        'pages/seller/pages/sellerPage/sellerPage-service.js',
                        'pages/seller/seller-session-service.js',
                        {type: 'css', path: 'css/sellerPage/sellerApplying.css'}],
                    cache: false
                }, {
                    name: 'Coupon',
                    files: ['pages/my/coupon/coupon-controller.js',
                        'pages/my/coupon/coupon-service.js',
                        {type: 'css', path: 'css/coupon/coupon.css'}],
                    cache: false
                }, {
                    name: 'OffLine',
                    files: ['pages/seller/pages/offLineShop/offLineShop-controller.js',
                        'pages/seller/pages/offLineShop/offLineShop-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/offLineShop.css'}],
                    cache: false
                }, {
                    name: 'SellerTeam',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/sellerTeam.css'}],
                    cache: false
                }, {
                    name: 'SellerAuthorization',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/sellerAuthorization.css'}],
                    cache: false
                }, {
                    name: 'LookupTable',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/lookupTable.css'}],
                    cache: false
                }, {
                    name: 'CheckTableData',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/checkTableData.css'}],
                    cache: false
                }, {
                    name: 'MyRecommend',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/myRecommend.css'}],
                    cache: false
                }, {
                    name: 'OffLineExchangeRecord',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/exchangeRecord.css'}],
                    cache: false
                }, {
                    name: 'SettlementRecord',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/settlementRecord.css'}],
                    cache: false
                }, {
                    name: 'PieceGroup',
                    files: [
                        'pages/details/pieceGroup/pieceGroup-controller.js',
                        'pages/details/pieceGroup/pieceGroup-service.js',
                        {type: 'css', path: 'css/cart/cart.css'},
                        {type: 'css', path: 'css/details/details.css'}],
                    cache: false
                }, {
                    name: 'PieceGroupGoodsList',
                    files: [
                        'pages/goodsList/pieceGroupGoodsList/pieceGroupGoodsList-controller.js',
                        'pages/goodsList/pieceGroupGoodsList/pieceGroupGoodsList-service.js',
                        {type: 'css', path: 'css/goodsList/pieceGroupGoodsList.css'}],
                    cache: false
                }, {
                    name: 'Wholesale',
                    files: [
                        'pages/seller/pages/wholesale/wholesale-controller.js',
                        'pages/seller/pages/wholesale/wholesale-service.js',
                        {type: 'css', path: 'css/sellerPage/wholesale/wholesale.css'}],
                    cache: false
                }, {
                    name: 'WholesaleGoodsList',
                    files: [
                        'pages/seller/pages/wholesale/pages/wholesaleGoodsList/wholesaleGoodsList-controller.js',
                        'pages/seller/pages/wholesale/pages/wholesaleGoodsList/wholesaleGoodsList-service.js',
                        {type: 'css', path: 'css/sellerPage/wholesale/wholesaleGoodsList.css'}],
                    cache: false
                }, {
                    name: 'WholesaleDetails',
                    files: [
                        'pages/seller/pages/wholesale/pages/wholesaleDetails/wholesaleDetails-controller.js',
                        'pages/seller/pages/wholesale/pages/wholesaleDetails/wholesaleDetails-service.js',
                        {type: 'css', path: 'css/cart/cart.css'},
                        {type: 'css', path: 'css/sellerPage/wholesale/wholesaleDetails.css'}],
                    cache: false
                }, {
                    name: 'AddWholesaleAddress',
                    files: [
                        'pages/seller/pages/wholesale/pages/addWholesaleAddress/addWholesaleAddress-controller.js',
                        'pages/seller/pages/wholesale/pages/addWholesaleAddress/addWholesaleAddress-service.js',
                        {type: 'css', path: 'css/cart/cart.css'},
                        {type: 'css', path: 'css/sellerPage/wholesale/addWholesaleAddress.css'}],
                    cache: false
                }, {
                    name: 'AuthorizationQRCode',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/authorizationQRCode.css'}],
                    cache: false
                }, {
                    name: 'OffLineMessageInfo',
                    files: ['pages/seller/pages/offLineShop/seller/offLineShopSeller-controller.js',
                        'pages/seller/pages/offLineShop/seller/offLineShopSeller-service.js',
                        {type: 'css', path: 'css/sellerPage/offlineSeller/offLineMessageInfo.css'}],
                    cache: false
                }, {
                    name: 'MyAgent',
                    files: ['pages/seller/pages/myAgent/myAgent-controller.js',
                        'pages/seller/pages/myAgent/myAgent-service.js',
                        {type: 'css', path: 'css/sellerPage/myAgent.css'}],
                    cache: false
                }, {
                    name: 'CommissionPage',
                    files: ['pages/seller/pages/myAgent/pages/myAgentSubPage-controller.js',
                        'pages/seller/pages/myAgent/pages/myAgentSubPage-service.js',
                        {type: 'css', path: 'css/sellerPage/myAgent/commissionPage.css'}],
                    cache: false
                }, {
                    name: 'CommissionPageLookupTable',
                    files: ['pages/seller/pages/myAgent/pages/myAgentSubPage-controller.js',
                        'pages/seller/pages/myAgent/pages/myAgentSubPage-service.js',
                        {type: 'css', path: 'css/sellerPage/myAgent/commissionPageLookupTable.css'}],
                    cache: false
                }, {
                    name: 'CommissionCheckTable',
                    files: ['pages/seller/pages/myAgent/pages/myAgentSubPage-controller.js',
                        'pages/seller/pages/myAgent/pages/myAgentSubPage-service.js',
                        {type: 'css', path: 'css/sellerPage/myAgent/commissionPageCheckTableData.css'}],
                    cache: false
                }, {
                    name: 'ComPageSettlementRecord',
                    files: ['pages/seller/pages/myAgent/pages/myAgentSubPage-controller.js',
                        'pages/seller/pages/myAgent/pages/myAgentSubPage-service.js',
                        {type: 'css', path: 'css/sellerPage/myAgent/commissionPageSettlementRecord.css'}],
                    cache: false
                }

                ]
            });
        }]);

    myapp.run(['$ocLazyLoad', '$rootScope', function ($ocLazyLoad, $rootScope) {

        $rootScope.rec_session = {};
        $rootScope.rec_session.rec_product = [];
        $rootScope.rec_session.page_size  = 10;
        $rootScope.rec_session.page_number  = 1;
        $rootScope.rec_session.load_more = false;
        $rootScope.rec_session.loading_in_progress = false;

        //商品详情
        $rootScope.rec_session.default_express  = null; //快递公司名称
        $rootScope.kf_qq = null;    //客服QQ

        //结算页缓存
        $rootScope.settle_product_code = null;
        $rootScope.settle_product_totalToPay = 0;

        //首页优惠卷状态
        $rootScope.home_coupon_status = false;
        $rootScope.follow_url = null;
        $rootScope.red_point_status = false;

        //拼团团长id
        $rootScope.master_id = 0;
        $rootScope.pieceGroupCouponItem = [];
        $rootScope.pieceGroupCouponItem.id = 0;

        //批发详情地区变更价格
        $rootScope.pcdChangePrice = -1;

        /*//Do your $on in here, like this:
        $rootScope.$on("$locationChangeStart",function(event, next, current){
            console.log('$locationChangeStart')
        });*/

        angular.element(document).ready(function () {
            //document.getElementById('msg').innerHTML = 'Hello';
            //$ocLazyLoad.load('bower_components/angular-ui-router/release/angular-ui-router.min.js')

            /*$ocLazyLoad.load('bower_components/jquery/dist/jquery.min.js')
             .then(function () {
             $ocLazyLoad.load([{type: 'css', path: 'bower_components/jquery-weui/dist/css/jquery-weui.min.css'},
             'bower_components/jquery-weui/dist/js/jquery-weui.min.js',
             'js/weui.js'
             ]).then(function () {
             console.log("loaded jquery");
             })
             });*/
        });
    }]);

    /*myapp.directive('cityPicker', function () {
     return function (scope, element, attrs) {
     //console.log('work');
     element.cityPicker({
     onSelect: function (dateText) {
     var modelPath = $(this).attr('ng-model');
     putObject(modelPath, scope, dateText);
     scope.$apply();
     }
     });
     }
     })*/

    /*.directive('updateTitle', ['$rootScope', '$timeout',
     function ($rootScope, $timeout) {
     return {
     link: function (scope, element) {

     var listener = function (event, toState) {

     var title = 'Default Title';
     if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

     $timeout(function () {
     element.text(title);
     }, 0, false);
     };

     $rootScope.$on('$stateChangeSuccess', listener);
     }
     };
     }
     ])*/

    /*.directive("myDir", function () {
     return {
     restrict: "E",
     scope: {
     name: "@",
     amount: "=",
     save: "&"
     },
     template: "<div>" +
     "  {{name}}: <input ng-model='amount' />" +
     "  <button ng-click='save()'>淇濆瓨</button>" +
     "</div>",
     replace: true,
     transclude: false,
     link: function (scope, element, attrs) {

     console.log("initial value for name:" + scope.name);
     console.log("initial value for amount:" + scope.amount);

     element.css("background", "yellow");

     scope.$watch("amount", function (newVal, oldVal) {
     alert("amount has changed " + oldVal + " >> " + newVal);
     });


     scope.$watch("name", function (newVal, oldVal) {
     console.log("name has changed " + oldVal + " >> " + newVal);
     });
     }
     }
     })*/
})();
