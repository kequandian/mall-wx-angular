angular.module('userInfo.controller', ['userInfo.service'])


    .controller('UserInfoController', ['$scope', '$state', 'UserInfoFty', function ($scope, $state, UserInfoFty) {

        //title
        document.title = "个人信息";

        //获取个人信息
        getUserInfo();
        //时间日期插件
        myInput();

        $scope.sexDefault = [
            {key: 0, value: "保密"},
            {key: 1, value: "男"},
            {key: 2, value: "女"}
        ];


        function myInput() {
            $("#data_time").calendar();
        }

        //获取个人信息
        function getUserInfo() {

            UserInfoFty.myInfoService()
                .then(function (json) {
                    if (json.status_code == 0) {
                        $scope.userInfo = json.data;
                        //console.log(json.data);
                        //alert(angular.toJson($scope.userInfo))
                    }
                }, function (error) {
                    $.toast('获取信息失败', 'cancel');
                })
        }

        //提交个人信息
        $scope.postUserInfo = function () {
            $scope.userInfo.birthday = document.getElementById("data_time").value;

            var name = $scope.userInfo.name;
            var sex = $scope.userInfo.sex;
            var birthday = $scope.userInfo.birthday;
            var details = $scope.userInfo.details;
            console.log(name, sex, birthday, details);

            // if(true){return}

            UserInfoFty.postInfoService(name, sex, birthday, details)
                .then(function (json) {
                    if (json.status_code == 0) {
                        //alert(angular.toJson($scope.userInfo))
                        $state.go('userInfo',{}, {reload: true});
                        $.toast('修改成功')
                    }
                }, function (error) {
                    $.toast('提交信息失败', 'cancel');
                })
        }
    }]);