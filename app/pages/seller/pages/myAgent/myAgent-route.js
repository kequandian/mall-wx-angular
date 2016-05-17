angular.module('myAgent.route', ['myAgent.controller'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('myAgent', {
            url:'/myAgent',
            templateUrl: 'pages/seller/pages/myAgent/myAgent.html',
            controller:'MyAgentController'
        })
    }]);