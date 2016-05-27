angular.module('integral.controller', ['integral.service'])

    //积分兑换controller
    .controller('IntegralController', ['$scope', '$state', 'IntegralFty', function($scope, IntegralFty){
        //title
        document.title = "积分兑换";

    }])


    //积分规则controller
    .controller('IntegralRuleController', ['$scope', '$state', 'IntegralFty', function($scope, IntegralFty){

        //title
        document.title = "积分规则";

    }]);