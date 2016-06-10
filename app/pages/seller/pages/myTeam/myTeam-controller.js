angular.module('myTeam.controller', ['myTeam.service'])

    .controller('MyTeamController', ['$scope', '$state', 'MyTeamFty',
        function ($scope, $state, MyTeamFty) {

            //title
            document.title = "我的朋友";

            myTeams();
            function myTeams() {

                MyTeamFty.myTeamsService()
                    .then(function (json) {
                        //alert(angular.toJson(json));
                        if (json.status_code == 0) {
                            $scope.myTeams = json.data;
                        } else {
                            $.toast('获取朋友信息失败', 'cencal');
                        }
                    }, function (error) {
                        $.toast('获取朋友信息失败', 'cencal');
                    });
            }

            //团队分类
            $scope.isSeller = function (result) {

                if (result == 0) {
                    return "分销商";
                } else if (result == 1) {
                    return "消费者"
                }
            }


        }]);