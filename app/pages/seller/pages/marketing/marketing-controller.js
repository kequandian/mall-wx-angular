angular.module('marketing.controller', ['marketing.service'])

    .controller('MarketingController', ['$scope','$state', 'MarketingFty',
        function($scope,$state, MarketingFty){
            //title
            document.title = "推广海报";

        }]);