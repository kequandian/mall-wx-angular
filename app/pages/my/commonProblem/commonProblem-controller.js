angular.module('commonProblem.controller', [/*'commonProblem.service'*/])
    .value("queryData", {
        queryInfo: "info",
        name:null
    })

    .controller('CommonProblemController', ['$scope', '$state', 'CommonProblemFty', "queryData", function($scope, $state, CommonProblemFty, queryData){
        //title
        document.title = "常见问题";

        // 获取常见问题数据
        //getCommonProblemInfo();
        // 获取问题类型数据
        getmyCommonProblemInfo();

        function getCommonProblemInfo(item) {
            console.log(item.id)
            CommonProblemFty.commonProblemService(item.id)
                .then(function (json) {
                    console.log("json数据：" + angular.toJson(json));
                    if (json.status_code == 0) {
                        $scope.commonProblemInfo = json.data;
                        console.log(angular.toJson($scope.commonProblemInfo));
                        queryData.queryInfo = json.data;
                        queryData.name = item.name;

                        $state.go('serviceProblemPage');
                        // queryData.queryInfo = json.data[0];
                        // console.log(queryData.queryInfo);
                        // $scope.testInfo = json.data[0]
                    }
                }, function(error) {
                    //$.toast("获取信息失败", "cancel");
                    console.log("获取信息失败: ", angular.toJson(error));
                })
        }

        function getmyCommonProblemInfo(){
            CommonProblemFty.problemTypeService()
                .then(function(json){
                    //console.log(angular.toJson(json));
                    if(json.status_code==0){
                        $scope.mycommonProblemInfo=json.data;
                    }
                }, function(error){
                    console.log('获取问题类型失败：' + angular.toJson(error));
                })
        }

        $scope.goToServiceProblemPage = function(item){
            //console.log(angular.toJson(item));
            if(item != null) {
                getCommonProblemInfo(item);
            }
        };

    }])

    /*售后策划Ctrl*/
    .controller('ServiceProblemPageController', ['$scope', '$state', 'CommonProblemFty', "queryData", function($scope, $state, CommonProblemFty, queryData){

        //title
        document.title = "售后策划";

        // 获取售后策划数据
        $scope.query = queryData.queryInfo;
        $scope.titleName = queryData.name;
        // console.log(queryData.queryInfo);

    }])

    ///*常见问题Ctrl*/
    //.controller('CommProblemPageController', ['$scope', '$state', 'CommonProblemFty', "queryData", function($scope, $state, CommonProblemFty, queryData){
    //
    //    //title
    //    document.title = "常见问题";
    //
    //    // 获取常见问题数据
    //    $scope.query = queryData.queryInfo;
    //    // console.log(queryData.queryInfo);
    //
    //
    //}])
    //
    ///*商品配送Ctrl*/
    //.controller('DistributionProblemPageController', ['$scope', '$state', 'CommonProblemFty', "queryData", function($scope, $state, CommonProblemFty, queryData){
    //
    //    //title
    //    document.title = "商品配送";
    //
    //    // 获取商品配送数据
    //    $scope.query = queryData.queryInfo;
    //    // console.log(queryData.queryInfo);
    //
    //}])

;