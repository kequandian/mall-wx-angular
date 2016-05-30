angular.module('my.controller', ['my.service'])

    .controller('MyController', ['$scope','$state', 'MyFty','TabIndex', function($scope,$state, MyFty,TabIndex){

        //title
        document.title = "个人中心";
        TabIndex.number = 5;

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