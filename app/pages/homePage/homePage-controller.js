angular.module('homePage.controller', ['homePage.service'])

    .controller('HomePageController', ['$scope','$state', 'HomePageFty','$rootScope',
        function($scope,$state, HomePageFty,$rootScope){

            document.title = "首页";

            //获取推荐商品
            getAd();
            //获取推荐商品
            getRecommendProduct();
            //滚动图片设置
            detailSwiper();



            function getRecommendProduct(){
                HomePageFty.recommendProductService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.rec_product_01 = json.data[0];
                            //alert(angular.toJson(json.data[0]));
                        }
                    }, function(error){
                        $.toast('获取推荐商品失败','cancel');
                    })
            }

            function getAd(){
                HomePageFty.getAdService()
                    .then(function(json){
                        if(json.status_code == 0){
                            $scope.ad_list = json.data[0].ads;
                            //alert(angular.toJson($scope.ad_list));
                        }
                    }, function(error){
                        $.toast('获取广告信息失败','cancel');
                    })
            }

            function detailSwiper(){
                var homeHeaderSlider = new Swiper('#homeHeaderSlider', {
                    slidesPerView: 1,
                    paginationClickable: true,
                    centeredSlides: true,
                    autoplay: 2000,
                    autoplayDisableOnInteraction: false,
                    loop: true,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    // 改变自动更新
                    observer:true,
                    observeParents:true
                });
            }


    }]);