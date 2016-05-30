angular.module('details.controller', ['details.service'])

    .controller('DetailsController', ['$scope', '$state','$stateParams', 'DetailsFty',
        function($scope,$state,$stateParams, DetailsFty){

            //title
            document.title = "商品详情";
            //适应屏幕大小
            ReImgSize();
            //商品详情
            detailsInfo();

            function ReImgSize(){
                for (j=0;j<document.images.length;j++)
                {
                    document.images[j].width=(document.images[j].width>420)?"420":document.images[j].width;
                }
            }


            function detailsInfo() {
                var product_id= $stateParams.productId;
                DetailsFty.detailsService(product_id)
                    .then(function (json) {
                        if(json.status_code == 0) {
                            $scope.details = json.data;
                            //alert(angular.toJson($scope.details));
                        }else{
                            console.log("获取商品详情失败");
                        }
                    },function (error){
                        console.log("获取商品详情失败");
                    })
            }

            //滚动图片设置
            detailSwiper();
            function detailSwiper(){
                var headerSwiper = new Swiper('#headerSlider', {
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

            /*TitleReSet("商品详情");
            function TitleReSet(title) {
                // body...
                document.title = title;
                //如果是IOS端微信,无法直接修改title.需要下面这一段神代码...
                //没看懂为什么添加一个iframe,然后remove掉就能动态修改title
                var $body = $('body');
                var $iframe = $('<iframe src="" style="display:none;"></iframe>');
                $iframe.on('load', function (argument) {
                    //console.log("loading....");
                    setTimeout(function () {
                        //console.log("remove....");
                        $iframe.off('load').remove();
                    }, 0);
                }).appendTo($body);
            }*/

            //添加购物车
            $scope.addProductToCart = function(productId){
                var proId = productId;
                var count = 1;
                DetailsFty.addProToCatService(proId)
                    .then(function(json){
                        if(json.status_code == 0){
                            $.toast.prototype.defaults.duration = 2000;
                            $.toast("成功添加商品");
                        }else{
                            $.toast("添加失败", "cancel");
                        }
                    }, function(error){
                        $.toast("添加失败", "cancel");
                    })
            };
            $scope.testToast = function(){
                //$.toast.prototype.defaults.duration = 2000;
                //$.toast("toast测试");
            };

            //添加收藏
            $scope.addProductToCollection = function(productId){
                DetailsFty.addCollectionService(productId)
                    .then(function(json){
                        if(json.status_code == 0){
                            //alert(angular.toJson(json));
                        }
                    }, function(error){
                        $.toast('收藏失败', 'cancel');
                    })
            }


        }]);