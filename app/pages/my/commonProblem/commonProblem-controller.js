angular.module('commonProblem.controller', ['commonProblem.service'])

    .controller('CommonProblemController', ['$scope', '$state', 'CommonProblemFty', function($scope, CommonProblemFty){
        //title
        document.title = "常见问题";

    }])

    /*售后策划Ctrl*/
    .controller('ServiceProblemPageController', ['$scope', '$state', 'CommonProblemFty', function($scope, CommonProblemFty){

        //title
        document.title = "售后策划";


    }])

    /*常见问题Ctrl*/
    .controller('CommProblemPageController', ['$scope', '$state', 'CommonProblemFty', function($scope, CommonProblemFty){

        //title
        document.title = "常见问题";

    }])

    /*商品配送Ctrl*/
    .controller('DistributionProblemPageController', ['$scope', '$state', 'CommonProblemFty', function($scope, CommonProblemFty){

        //title
        document.title = "商品配送";

    }])

;