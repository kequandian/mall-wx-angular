angular.module('commonProblem.controller', ['commonProblem.service'])
    .value("queryData", {
        queryInfo: "info"
    })

    .controller('CommonProblemController', ['$scope', '$state', 'CommonProblemFty', "queryData", function($scope, $state, CommonProblemFty, queryData){
        //title
        document.title = "常见问题";

        // 获取常见问题数据
        getCommonProblemInfo();

        $scope.queryData = $scope.commonProblemInfo;

        
        function getCommonProblemInfo() {
            CommonProblemFty.commonProblemService()
                .then(function (json) {
                    if (json.status_code == 0) {
                        $scope.commonProblemInfo = json.data;
                        queryData.queryInfo = json.data;

                        // queryData.queryInfo = json.data[0];
                        // console.log(queryData.queryInfo);
                        // $scope.testInfo = json.data[0]
                    }
                }, function(error) {
                    $.toast("获取信息失败", "cancel");
                })
        }


    }])

    /*售后策划Ctrl*/
    .controller('ServiceProblemPageController', ['$scope', '$state', 'CommonProblemFty', "queryData", function($scope, $state, CommonProblemFty, queryData){

        //title
        document.title = "售后策划";

        // 获取售后策划数据
        $scope.query = queryData.queryInfo;
        // console.log(queryData.queryInfo);

    }])

    /*常见问题Ctrl*/
    .controller('CommProblemPageController', ['$scope', '$state', 'CommonProblemFty', "queryData", function($scope, $state, CommonProblemFty, queryData){

        //title
        document.title = "常见问题";

        // 获取常见问题数据
        $scope.query = queryData.queryInfo;
        // console.log(queryData.queryInfo);


    }])

    /*商品配送Ctrl*/
    .controller('DistributionProblemPageController', ['$scope', '$state', 'CommonProblemFty', "queryData", function($scope, $state, CommonProblemFty, queryData){

        //title
        document.title = "商品配送";

        // 获取商品配送数据
        $scope.query = queryData.queryInfo;
        // console.log(queryData.queryInfo);

    }])

;