/*
* 分销信息
* */
angular.module('distributionInfo.controller', ['userInfo.service', 'seller.session'])

    .controller('DistributionInfoController', ['$scope','$state','$timeout','UserInfoFty','DWStatus',
        function($scope,$state,$timeout,UserInfoFty,DWStatus){

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    console.log('settlement:jquery loaded');
                })
            });
            //title
            document.title = "我的信息";

            $scope.distributionInfoBtn = true;  //修改我的信息按钮
            $scope.becomeDistributorBtn = false;   //成为分销商按钮

            //获取个人信息
            getUserInfo();

            function getUserInfo() {

                UserInfoFty.myInfoService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.userInfo = json.data;
                            //console.log(json.data);

                            $scope.real_name_settled = $scope.userInfo.real_name && $scope.userInfo.real_name.length > 0;
                        }
                    }, function (error) {
                        $.toast('获取信息失败', 'cancel');
                    })
            }

            //提交个人信息
            $scope.postUserInfo = function () {

                var real_name = $scope.userInfo.real_name;
                var phone = $scope.userInfo.phone;

                if(!angular.isString($scope.userInfo.real_name)
                    || $scope.userInfo.real_name.length==0){
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

                UserInfoFty.postInfoService(real_name, phone)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            //alert(angular.toJson(json));
                            $.toast.prototype.defaults.duration = 1000;
                            $.toast('修改成功');

                            if(DWStatus.d_w_status == 1){
                                $timeout(function(){
                                    $state.go('home.sellerPage');
                                }, 1100);
                            }else if(DWStatus.d_w_status == 2){
                                $timeout(function(){
                                    $state.go('withdraw',{accountPhone:phone});
                                }, 1100);
                            }

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