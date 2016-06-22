angular.module('home.controller', [])
    .controller('HomeController', ['$scope', '$state','$rootScope','$timeout', function($scope,$state,$rootScope,$timeout){

        //nav 样式
        var scope = $rootScope;
        scope.$watch('tabsNumber',function(nValue, oValue){
            $scope.currentId = nValue;
            //console.log("new："+ nValue + "  " + "old: " + oValue);
        });

        $scope.clickme = function(id) {
            $scope.currentId = id;
        };
        //title li
        $scope.home_tabs = [{
            'id':'1',
            'name':'首页',
            'srefName':'.homePage',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-home',
            'c_count': null,
            'c_number': ""
        },{
            'id':'2',
            'name':'分类',
            'srefName':'.category',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-search',
            'c_count': null,
            'c_number': ""
        },{
            'id':'3',
            'name':'销售中心',
            'srefName':'.sellerPage',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-team',
            'c_count': null,
            'c_number': ""
        },{
            'id':'4',
            'name':' 购物车',
            'srefName':'.cart',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-cart',
            'c_count': 'cart_count',
            'c_number': "12"
        },{
            'id':'5',
            'name':'个人中心',
            'srefName':'.my',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-user',
            'c_count': null,
            'c_number': ""
        }];

    }]);