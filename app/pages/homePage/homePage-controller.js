angular.module('homePage.controller', ['homePage.service'])

    .controller('HomePageController', ['$scope','$state', 'HomePageFty','$rootScope',
        function($scope,$state, HomePageFty,$rootScope){

            //document.title = "首页";

            $scope.$watch("title",function(value){
                $("title").text(value);
            });
            $scope.title="首页";

            $scope.goToGoodsList = function(){
                $state.go('home.goodsList');
            };



            //滚动图片设置
            detailSwiper();
            function detailSwiper(){
                var headerSwiper = new Swiper('#homeHeaderSlider', {
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