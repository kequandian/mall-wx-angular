/*
* 分销信息
* */
angular.module('distributionInfo.controller', ['userInfo.service'])

    .controller('DistributionInfoController', ['$scope', 'UserInfoFty', function($scope, UserInfoFty){

        //title
        document.title = "我的信息";

        //获取个人信息
        getUserInfo();


        //获取个人信息
        function getUserInfo() {

            UserInfoFty.myInfoService()
                .then(function (json) {
                    if (json.status_code == 0) {
                        $scope.userInfo = json.data;
                        //console.log(json.data);
                    }
                }, function (error) {
                    $.toast('获取信息失败', 'cancel');
                })
        }

        //提交个人信息
        $scope.postUserInfo = function () {

            var name = $scope.userInfo.name;
            var phone = $scope.userInfo.phone;

            if(!angular.isString($scope.userInfo.name)
                || $scope.userInfo.name.length==0){
                $.toast('姓名不能为空', 'cancel');
                return
            }
            if(!angular.isString($scope.userInfo.phone)
                || $scope.userInfo.phone.length==0){
                $.toast('手机号不能为空', 'cancel');
                return
            }else if(!checkPhone($scope.userInfo.phone)){
                $.toast('手机号码无效', 'cancel');
                return
            }

            UserInfoFty.postInfoService(name, phone)
                .then(function (json) {
                    if (json.status_code == 0) {
                        $state.go('home.sellerPage',{}, {reload: true});
                        $.toast('修改成功')
                    }
                }, function (error) {
                    $.toast('提交信息失败', 'cancel');
                })
        }

        function checkPhone(str){
            var isphone = /^((\+|0)86)?\d{11}$/.test(str);
            return isphone;
        }

    }]);