/*
* 分销信息
* */
angular.module('distributionInfo.controller', ['distributionInfo.service'])

    .controller('DistributionInfoController', ['$scope', 'DistributionInfoFty', function($scope, DistributionInfoFty){

        //title
        document.title = "分销信息";

    }]);