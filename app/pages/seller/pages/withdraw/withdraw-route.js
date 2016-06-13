/**
 * Created by jimmie on 2016/6/7.
 */

angular.module('withdraw.route', ['withdraw.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('withdraw', {
            url: '/withdraw',
            templateUrl: '/withdraw.html',
            controller: 'WithdrawController'
        })
    }]);