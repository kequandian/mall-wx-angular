angular.module('my.controller', ['my.service'])

    .controller('MyController', ['$scope','$state','$rootScope', 'MyFty',
        function($scope,$state,$rootScope, MyFty){

            //title
            document.title = "个人中心";

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