/*
* 我的代理
* */
angular.module('myAgent.controller', ['myAgent.service'])
    .controller('MyAgentController', ['$scope','$state', 'MyAgentFty', function($scope,$state, MyAgentFty){

        //title
        document.title = "我的代理";

        //提成明细
        $scope.commission_action = function(){
            $state.go('commissionPage');
        };

        //结算记录
        $scope.settlement_action = function(){
            $state.go('comPageSettlementRecord');
        };

    }]);