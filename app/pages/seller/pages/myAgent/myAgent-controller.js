/*
* 我的代理
* */
angular.module('myAgent.controller', ['myAgent.service'])
    .controller('MyAgentController', ['$scope', 'MyAgentFty', function($scope, MyAgentFty){

        $scope.my_agent_groups = [
            {
                name: "最近更新",
                items: [{
                    finish:'测试1'
                }],
                show: false
            },{
                name: "一周内",
                items: [{
                    finish:'测试3'
                }],
                show: false
            },{
                name: "一个月内",
                items: [{
                    finish:'测试5'
                }],
                show: false
            },{
                name: "更早",
                items: [{
                    finish:'测试7'
                }],
                show: false
            }
        ];

        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
            group.show = !group.show;
        };
        $scope.isGroupShown = function(group) {
            return group.show;
        };

    }]);