angular.module('myTeam.controller', ['myTeam.service'])

    .controller('MyTeamController', ['$scope','$state', 'MyTeamFty',
        function($scope,$state, MyTeamFty){


            //nav 样式
            $scope.currentId = 1;
            $scope.clickme = function(id) {
                $scope.currentId = id;
            };
            //title li
            $scope.my_team_titles = [{
                'id':'1',
                'name':'一级推荐',
                'srefName':'.all'
            },{
                'id':'2',
                'name':'二级推荐',
                'srefName':'.pay'
            },{
                'id':'3',
                'name':'三级推荐',
                'srefName':'.payed'
            }];








            myTeams();
            function myTeams(){

                MyTeamFty.myTeamsService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.myTeamList = json.data.children;

                        }
                    },function(error){

                    });

            }



            //团队分类
            $scope.isSeller = function(result){

                if(result == 0){
                    return "分销商";
                }else if(result == 1){
                    return "消费者"
                }
            }




    }]);