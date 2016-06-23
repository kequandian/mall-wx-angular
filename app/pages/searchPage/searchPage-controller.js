angular.module('searchPage.controller', ['searchPage.service'])

    .controller('SearchPageController', ['$scope', '$state', '$stateParams', 'SearchPageFty', 'searchInfo',
        function ($scope, $state, $stateParams, SearchPageFty,searchInfo) {

            //title
            document.title = "商品搜索";
            //搜索页
            input_focus();
            function input_focus(){
                var o_focus = document.getElementById('search_page_input');
                o_focus.focus();

                //$scope.dddd = localStorage['productNameList'];
                //angular.forEach($scope.dddd, function(v, f){
                //    alert(angular.toJson(v));
                //})

                //localStorage.removeItem('productNameList');
                if(localStorage['productNameList'] != null){
                    $scope.product_name_list = JSON.parse(localStorage['productNameList']);
                }

            }

            var p_n_list = {
                product_name : null
            };

            var p_list = [];

            if(localStorage['productNameList'] != null){
                p_list = JSON.parse(localStorage['productNameList']);
            }
            //
            $scope.search_procudt_name = function($event){
                if($event.keyCode == 13){
                    var p_name = $scope.product_name;
                    SearchPageFty.searchProductService(p_name)
                        .then(function(json){
                            //alert(angular.toJson(json));
                            if(json.status_code == 0){
                                p_n_list.product_name = p_name;
                                p_list.push(p_n_list);
                                localStorage['productNameList'] = JSON.stringify(p_list);
                                $scope.product_name_list = JSON.parse(localStorage['productNameList']);
                                searchInfo.search_info = json.data;
                                $state.go('goodsList',{typeNumber: null ,searchStatus:2})
                            }
                        }, function(error){
                            console.log(error)
                        })
                }
            };

            //清楚历史搜索
            $scope.clear_history = function(){
                localStorage.removeItem('productNameList');
                $scope.product_name_list = null;
            }
        }])

;