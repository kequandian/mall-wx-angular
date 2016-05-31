angular.module('myTeam.controller', ['myTeam.service'])

    .controller('MyTeamController', ['$scope','$state', 'MyTeamFty',
        function($scope,$state, MyTeamFty){



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