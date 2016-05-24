angular.module('home.controller', [])
    .controller('HomeController', ['$scope', '$state','$timeout','TabIndex', function($scope,$state,$timeout,TabIndex){

        //nav 样式
        $scope.currentId = TabIndex.number;
        $scope.clickme = function(id) {
            $scope.currentId = id;
        };
        //title li
        $scope.home_tabs = [{
            'id':'1',
            'name':'首页',
            'srefName':'.homePage',
            'tabs_img':'img/indexTab/Home.png'
        },{
            'id':'2',
            'name':'搜索',
            'srefName':'.category',
            'tabs_img':'img/indexTab/Thumbnails.png'
        },{
            'id':'3',
            'name':'分销中心',
            'srefName':'.sellerPage',
            'tabs_img':'img/indexTab/seller.png'
        },{
            'id':'4',
            'name':'购物车',
            'srefName':'.cart',
            'tabs_img':'img/indexTab/cart.png'
        },{
            'id':'5',
            'name':'个人中心',
            'srefName':'.my',
            'tabs_img':'img/indexTab/my.png'
        }];

    }]);