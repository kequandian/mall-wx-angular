angular.module('userInfo.controller', ['userInfo.service'])

    .controller('UserInfoController', ['$scope','$state', 'UserInfoFty', function($scope,$state, UserInfoFty){

        //title
        document.title = "个人信息";

        //获取个人信息
        getUserInfo();
        //时间日期插件
        myInput();


        function myInput(){
            $("#data_time").calendar();
        }

        //获取个人信息
        function getUserInfo(){
            UserInfoFty.myInfoService()
                .then(function(json){
                    if(json.status_code == 0){
                        $scope.userInfo = json.data;
                        //alert(angular.toJson($scope.userInfo))
                    }
                }, function(error){
                    $.toast('获取信息失败', 'cancel');
                })
        }
    }]);