angular.module('wholesale.controller', ['wholesale.service'])

        .controller('WholesaleController', ['$scope','$state', 'WholesaleFty',
        function($scope,$state, WholesaleFty){

            document.title = '商品批发';


        }]);