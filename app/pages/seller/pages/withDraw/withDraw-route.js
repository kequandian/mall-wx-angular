/**
 * Created by jimmie on 2016/6/7.
 */

angular.module('withDraw.route', ['withDraw.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('withDraw', {
            url: '/withDraw',
            templateUrl: 'pages/seller/pages/withDraw/withDraw.html',
            controller: 'WithDrawController'
        })
    }]);