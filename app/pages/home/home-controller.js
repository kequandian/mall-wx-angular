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
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-home'
        },{
            'id':'2',
            'name':'搜索',
            'srefName':'.category',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-search'
        },{
            'id':'3',
            'name':'销售中心',
            'srefName':'.sellerPage',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-team'
        },{
            'id':'4',
            'name':' 购物车',
            'srefName':'.cart',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-cart'
        },{
            'id':'5',
            'name':'个人中心',
            'srefName':'.my',
            'home_tab_icon':'weui_tabbar_icon ion-app-biliya-tabs-user'
        }];

    }]);