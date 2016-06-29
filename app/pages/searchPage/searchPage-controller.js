angular.module('searchPage.controller', ['searchPage.service'])

    .controller('SearchPageController', ['$scope', '$state', '$stateParams','$timeout', 'SearchPageFty', 'searchInfo','goodListParams',
        function ($scope, $state, $stateParams,$timeout, SearchPageFty, searchInfo,goodListParams) {

            //title
            document.title = "商品搜索";

            //搜索页
            input_focus();

            $scope.p_n_item = {
                product_name : null
            };
            $scope.p_list = localStorage['productNameList'] != null ? JSON.parse(localStorage['productNameList']) : [];

            function input_focus(){
                var o_focus = document.getElementById('search_page_input');
                o_focus.focus();

                if(localStorage['productNameList'] != null){
                    $scope.product_name_list = JSON.parse(localStorage['productNameList']);
                    $scope.p_list = JSON.parse(localStorage['productNameList']);
                }

                //热门关键字
                hot_word();
            }

            //
            $scope.search_procudt_name = function($event){
                if($event.keyCode == 13){
                    var p_name = $scope.product_name;
                    search_product(p_name);
                }
            };

            //关键字搜索商品
            $scope.hot_word_search = function(hot_word){
                search_product(hot_word);
            };


            //搜索商品
            function search_product(p_name){

                SearchPageFty.searchProductService(p_name)
                    .then(function(json){
                        //alert(angular.toJson(json));
                        if(json.status_code == 0){

                            var n_item = {};

                            n_item.product_name = p_name;

                            if(!(p_name === undefined || p_name === null || p_name.length==0)) {
                                var new_product_name_list = [];
                                if($scope.p_list != null) {
                                    angular.forEach($scope.p_list, function (v, k) {
                                        if (v.product_name != p_name) {
                                            new_product_name_list.push(v);
                                        }
                                    });
                                }
                                $scope.p_list = new_product_name_list;

                                if($scope.p_list.length > 0){
                                    $scope.p_list.unshift(n_item);
                                }else{
                                    $scope.p_list.push(n_item);
                                }
                                localStorage['productNameList'] = JSON.stringify($scope.p_list);
                                $scope.product_name_list = JSON.parse(localStorage['productNameList']);

                            }
                            searchInfo.search_info = json.data;
                            searchInfo.search_name = p_name;
                            goodListParams.typeNumber = null;
                            goodListParams.searchStatus = 2;
                            $state.go('goodsList');
                        }
                    }, function(error){
                        console.log(error)
                    })
            }

            //清楚历史搜索
            $scope.clear_history = function(){
                localStorage.removeItem('productNameList');
                $scope.product_name_list = [];
                $scope.p_list = [];
            };


            //热门关键字
            function hot_word(){
                SearchPageFty.productHitWordService()
                    .then(function(json){
                        //alert(angular.toJson(json));
                        if(json.status_code == 0){
                            $scope.p_hot_word = json.data;
                        }
                    }, function(error){
                        console.log("错误："+error);
                    })
            }
        }])

;