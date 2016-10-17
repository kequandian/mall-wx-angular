angular.module('homePage.controller', ['homePage.service'])
    .directive('onFinishRender', function ($timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    scope.$emit('$onFinishRender');
                });
                //  document.getElementById('content').scrollTop = 500;
            }
        };
    })
    .directive('scrolly', function () {
        return {
            scope: {
                scroll: '=scrollPosition'
            },
            link: function (scope, element, attrs) {
                var raw = element[0];
                element.bind('scroll', function () {
                    //console.log(raw.scrollTop + raw.offsetHeight);
                    if (raw.scrollHeight - (raw.scrollTop + raw.offsetHeight) < 2) { //at the bottom
                        scope.$emit('$onScrollBottom');
                        //scope.$apply(attrs.scrolly);
                    }

                    if (raw.scrollTop < 64) { //at the bottom
                        if(!scope.emittedOnScrollTop) {
                            scope.$emit('$onScrollTop');
                            //console.log('$onScrollTop');

                            scope.emittedOnScrollTop = true;
                        }
                        scope.emittedOnScrollTopCancelled = false;
                    }else{
                        if(!scope.emittedOnScrollTopCancelled) {
                            scope.$emit('$onScrollTopCancelled');
                           //console.log('$onScrollTopCancelled');

                            scope.emittedOnScrollTopCancelled = true;
                        }
                        scope.emittedOnScrollTop = false;
                    }
                })
            }
        };
    })
    .filter('defaultShortName', function () {
        return function (value) {
            if (!value || value===undefined || value.length==0){
                return '十美优品';
            }

            return value;
        };
    })
    //默认分类广告图片
    .filter('defaultImg',function(){
        return function(value){
            if(!value || value===undefined || value.length==0){
                return 'img/home/defaultImg.png';
            }
            return value;
        }
    })

    .controller('HomePageController', ['$scope', '$rootScope', '$state', 'HomePageFty', 'areasStatus', 'goodListParams',
        '$anchorScroll', '$ocLazyLoad','cateLeftIndex','$timeout','PointRate','BalanceSession',
        function ($scope, $rootScope, $state, HomePageFty, areasStatus, goodListParams, $anchorScroll, $ocLazyLoad,cateLeftIndex,$timeout,PointRate,BalanceSession) {

            document.title = "十美优品商城";

            $scope.point_rate = PointRate.rate;

            $ocLazyLoad.load('Jquery').then(function () {
                $ocLazyLoad.load('JqueryWeUI').then(function () {
                    //console.log("homePage:jquery loaded");
                })
            });

            $rootScope.tabsNumber = 1;
            cateLeftIndex.cate_nav_index = 0;
            cateLeftIndex.goods_list_index = 0;

            // recommend product session
            var PAGE_SIZE = $rootScope.rec_session.page_size;
            var page_number = $rootScope.rec_session.page_number;
            $scope.home_load_more_btn_show = $rootScope.rec_session.load_more;


            $scope.top_btn_show = true;

            $scope.followus = HomePageFty.getFollowusUrl();

            /* setTimeout(function(){
             document.title = "首页";
             var iframe = document.createElement('iframe');
             iframe.style.visibility = 'hidden';
             iframe.style.width = '1px';
             iframe.style.height = '1px';
             iframe.onload = function(){
             setTimeout(function(){
             document.body.removeChild(iframe);
             },0)
             }
             },0);*/


            /*TitleReSet("首页");
             function TitleReSet(title) {
             // body...
             document.title = title;
             //如果是IOS端微信,无法直接修改title.需要下面这一段神代码...
             //没看懂为什么添加一个iframe,然后remove掉就能动态修改title
             var $body = $('body');
             var $iframe = $('<iframe src="img/home/home-title-img.png" style="display:none;"></iframe>');
             $iframe.on('load', function (argument) {
             //console.log("loading....");
             setTimeout(function () {
             //console.log("remove....");
             $iframe.off('load').remove();
             }, 0);
             }).appendTo($body);
             }*/

            //fallbackRedirect("");

            //for share
            function fallbackRedirect(routeValue) {
                if(routeValue==null || routeValue.length==0){
                    // cut fallback
                    if (window.location.href.indexOf('?') >= 0) {
                        // has param here
                        var params = window.location.href.split('?');
                        var paramLong = params[1];  // append #
                        var param = paramLong.replace(/\&*fallback=[\w\-]+/, "");
                        console.log("paramLong?"+paramLong);
                        console.log("param    ?"+param);

                        if(param.indexOf('#')!=0){
                            param = '?' + param;
                        }

                        if(paramLong != param){
                            console.log("param !   ?"+param);
                            window.history.pushState(history.state, document.title, param);
                        }

                    }// else do nothing

                }else if (window.location.href.indexOf('fb_redirect=true') == -1) {

                    var currentState = history.state;

                    // convert from /home/my to home-my
                    var routes = routeValue.split('/');
                    var fallValue = routeValue.length >0 ? routes.join('-') : "";
                    if(fallValue.indexOf('-')==0){
                        fallValue = fallValue.substr(1,fallValue.length);
                        console.log("fallValue?"+fallValue);
                    }

                    var newurl = "";
                    if (window.location.href.indexOf('?') >= 0) {
                        var params = window.location.href.split('?');
                        var paramLong = params[1];  // append #
                        console.log("paramLong?"+paramLong);

                        if(paramLong.indexOf('fallback=')>=0) {

                            if(routeValue.length>0) {
                                //REGEX, replace previous fallback
                                var param = paramLong.replace(/\&*fallback=[\w\-]+/, "&fallback=" + fallValue);
                                if(param.indexOf('&')==0){
                                    param = param.substr(1, param.length);
                                }
                                newurl = param;
                                //console.log("param?   ", param);
                            }else{

                                // remove callback
                                var param = paramLong.replace(/\\?fallback=[\w\-]+/, "");
                                newurl = param;
                                //console.log('param: ' + param);
                            }

                        }else {
                            var param = paramLong.split('#')[0];
                            newurl = param + '&fallback=' + fallValue + '#' + routeValue;
                            //console.log('newurl2: ' + newurl);
                        }

                        //prevents browser from storing history with each change:
                        if( paramLong != newurl ) {
                            window.history.pushState(currentState, document.title, '?'+newurl);
                        }

                    } else {  /// rare
                        // no params, just add fallback data
                        newurl = '?fallback=' + fallValue + '#' + routeValue;
                        window.history.pushState(currentState, document.title, newurl);
                        console.log('newurl [no parms]: ' + newurl);
                    }

                }
            }



            //获取广告
            getAdHome();
            getAdBanner();
            //获取积分
            getBalance();

            //获取推荐商品
            if ($rootScope.rec_session.rec_product.length == 0) {

                $rootScope.rec_session.loading_in_progress = true;
                getRecommendProduct(page_number, PAGE_SIZE);

            } else {
                $scope.rec_product = $rootScope.rec_session.rec_product;

            }

            function getRecommendProduct(pageNumber, pageSize) {

                HomePageFty.recommendProductService(pageNumber, pageSize)
                    .then(function (json) {
                        if (json.status_code == 0) {

                            $scope.rec_product = json.data;
                            console.log(json.data);

                        /*    if (pageNumber == 1) {
                                $scope.rec_product = json.data;

                                if ($scope.rec_product.length >= pageSize) {
                                    $scope.home_load_more_btn_show = true;
                                } else {
                                    $scope.home_load_more_btn_show = false;
                                }

                            } else if (pageNumber > 1) {

                                if (json.data.length > 0) {
                                    angular.forEach(json.data, function (v, k) {
                                        $scope.rec_product.push(v);
                                    });

                                    if (json.data.length < pageSize) {
                                        $scope.home_load_more_btn_show = false;
                                        //$.toast("已加载全部的推荐商品");
                                    }
                                } else if (json.data.length == 0) {
                                    $scope.home_load_more_btn_show = false;
                                    //$.toast("暂无更多的推荐商品");
                                }

                            }*/

                            //ISSUE FIX: loaded
                            $rootScope.rec_session.rec_product = $scope.rec_product;
                            $rootScope.rec_session.load_more = $scope.home_load_more_btn_show;
                            //console.log(angular.toJson(json.data));
                        }

                        $rootScope.loading_in_progress = false;
                    }, function (error) {
                        console.log(error);
                        $rootScope.loading_in_progress = false;
                        //$.toast('获取推荐商品失败', 'cancel');
                    })
            }

            function getAdHome() {
                var loaded = false;
                if ($rootScope.ad_session) {
                    if ($rootScope.ad_session.ad_list) {
                        loaded = true;
                        //console.log('ad_list loaded')
                    }
                } else {
                    $rootScope.ad_session = {}
                }

                if (!loaded) {
                    HomePageFty.getAdService()
                        .then(function (json) {
                            if (json.status_code == 0) {
                                $scope.ad_list = json.data;
                                //console.log(angular.toJson($scope.ad_list));

                                $rootScope.ad_session.ad_list = $scope.ad_list;
                            }
                        }, function (error) {
                            console.log(error);
                            //$.toast('获取广告信息失败', 'cancel');
                        })
                } else {
                    $scope.ad_list = $rootScope.ad_session.ad_list;
                }
            }

            function getAdBanner() {
                var loaded = false;
                if ($rootScope.ad_session) {
                    if ($rootScope.ad_session.ad_banner) {
                        loaded = true;
                        //console.log('ad_banner loaded')
                    }
                } else {
                    $rootScope.ad_session = {}
                }

                if (!loaded) {
                    HomePageFty.getAdBanner()
                        .then(function (json) {
                            if (json.status_code == 0) {
                                $scope.ad_banner = json.data;
                                //console.log("ad?"+angular.toJson($scope.ad_banner ));
                                $scope.ad_banner_1 = $scope.ad_banner[0];
                                $scope.ad_banner_2 = $scope.ad_banner[1];
                                //console.log("ad-banner-1?"+angular.toJson($scope.ad_banner_1));

                                $rootScope.ad_session.ad_banner = $scope.ad_banner;
                            }
                        }, function (error) {
                            console.log(error);
                            //$.toast('获取广告列表失败', 'cancel');
                        })
                } else {
                    $scope.ad_banner = $rootScope.ad_session.ad_banner;

                    $scope.ad_banner_1 = $scope.ad_banner[0];
                    $scope.ad_banner_2 = $scope.ad_banner[1];
                }
            }


            //搜索栏
            $scope.goToSearchPage = function () {
                $state.go('searchPage');
            };

            $scope.gotoDetail = function () {
                // get scroll position
                if (!$rootScope.scrolls) {
                    $rootScope.scrolls = {}
                }

                $rootScope.scrolls.yOffset = document.getElementById('content').scrollTop;
                $rootScope.scrolls.stacked = true;  //remember home stacked to details and will come back.

                //console.log('anchor yOffset?' + $rootScope.scrolls.yOffset);
            };
            $scope.$on('$onFinishRender', function () {
                if ($rootScope.scrolls && $rootScope.scrolls.yOffset && $rootScope.scrolls.stacked) {
                    $rootScope.scrolls.stacked = false;

                    document.getElementById('content').scrollTop = $rootScope.scrolls.yOffset;

                    //$location.hash('content');
                    //$anchorScroll.yOffset = $rootScope.yOffset;
                }
            })
            //Do your $on in here, like this:
            $rootScope.$on("$locationChangeStart", function (event, next, current) {
                if ($rootScope.scrolls && !$rootScope.scrolls.stacked) {
                    $rootScope.scrolls.yOffset = 0;
                }
            });

            //分类区域
            $scope.areasStatus = function (number) {
                if (number == 1) {
                    areasStatus.areas_status = 1;
                    goodListParams.searchStatus = 3;
                    $state.go('goodsList');
                } else if (number == 3) {
                    areasStatus.areas_status = 3;
                    goodListParams.searchStatus = 3;
                    $state.go('goodsList');
                }
            };

            //加载更多
            $scope.home_load_more_product = function () {
                page_number += 1;
                $rootScope.rec_session.page_number = page_number;

                $rootScope.loading_in_progress = true;

                getRecommendProduct(page_number, PAGE_SIZE);

                //ISSUE: not yet loaded here
                //$rootScope.rec_session.rec_product = $scope.rec_product;
            };

            //返回顶部
            $scope.onTop = function(){
                document.getElementById('content').scrollTop = 0;
                $scope.pressed = true;
            };


            $scope.$on('$onScrollBottom', function () {
                if($rootScope.loading_in_progress) {
                   // do nothing
                }else{
                    if ($scope.home_load_more_btn_show) {
                        console.log('load more products...');
                        $scope.home_load_more_product();
                    }
                }
            });
            $scope.$on('$onScrollTop', function () {
                $timeout(function(){
                    $scope.top_btn_show = false;
                })
                //console.log('$onScrollTop');
            });
            $scope.$on('$onScrollTopCancelled', function () {
                $timeout(function(){
                    $scope.top_btn_show = true;
                })
                //console.log('$onScrollTopCancelled');
            });


            //获取积分
            function getBalance(){
                HomePageFty.getBalanceService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.owner_balance = json.data;
                            /// save session
                            BalanceSession.balance = $scope.owner_balance.balance;
                        }
                    }, function(error){
                        console.log('获取积分失败: ' + angular.toJson(error));
                    })
            }

        }]);