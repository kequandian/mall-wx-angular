angular.module('my.controller', ['my.service'])

    .controller('MyController', ['$scope','$state','$rootScope','MyFty','$ocLazyLoad',
        function($scope,$state,$rootScope, MyFty, $ocLazyLoad){

            //title
            document.title = "个人中心";

            $ocLazyLoad.load('Jquery').then(function(){
                $ocLazyLoad.load('JqueryWeUI').then(function(){
                    console.log("my:jquery loaded");
                })
            });

            $rootScope.tabsNumber = 5;

            //用户信息
            getUserInfo();

            function getUserInfo(){
                MyFty.userInfoService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.userInfo = json.data;
                        }
                    }, function(error){
                        $.toast('获取信息失败', 'cancel');
                    })
            }


    }]);