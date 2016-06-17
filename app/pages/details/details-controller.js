angular.module('details.controller', ['details.service'])

    .controller('DetailsController', ['$scope', '$state', '$stateParams', 'DetailsFty',
        function ($scope, $state, $stateParams, DetailsFty) {

            //title
            document.title = "商品详情";
            //适应屏幕大小
            ReImgSize();
            //商品详情
            detailsInfo();

            function ReImgSize() {
                for (j = 0; j < document.images.length; j++) {
                    document.images[j].width = (document.images[j].width > 420) ? "420" : document.images[j].width;
                }
            }


            $scope.properties_list = [];
            function detailsInfo() {
                var product_id = $stateParams.productId;
                DetailsFty.detailsService(product_id)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.details = json.data;
                            if ($scope.details.covers.length > 0) {
                                $scope.details_content_sheet_img = $scope.details.covers[0].url;
                            }
                            if ($scope.details.properties.length > 0) {
                                var properties = [];

                                angular.forEach($scope.details.properties, function (v, k) {
                                    if (v.property_value != null) {
                                        properties.push(v);
                                    }
                                })

                                $scope.details.properties = properties;
                            }
                        } else {
                            console.log("获取商品详情失败");
                        }
                    }, function (error) {
                        console.log("获取商品详情失败");
                    })
            }

            //滚动图片设置
            detailSwiper();
            function detailSwiper() {
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
                    observer: true,
                    observeParents: true
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

            $scope.get_input_value = function (value) {
                $scope.product_property_value = value;
            };

            $scope.q_count = 1;
            $scope.downQ = function () {
                if ($scope.q_count > 1) {
                    $scope.q_count--;
                } else {
                    $scope.q_count = 1;
                }
            };
            $scope.upQ = function () {
                if ($scope.q_count < 99) {
                    $scope.q_count++;
                } else {
                    $scope.q_count = 99;
                }
            };

            //购买状态
            $scope.buy_status = function (number) {
                if (number == 1) {
                    $scope.b_status = "cart";
                } else if (number == 2) {
                    $scope.b_status = "buy";
                }
            };

            //确认购买option
            $scope.buy_product_option = function (productInfo, productId, quantity) {

                var product_property = $scope.product_property_value;
                if ($scope.details.properties.length > 0 && product_property == null) {
                    $.toast('请选择商品规格');
                    return;
                }

                var b_status = $scope.b_status;
                if (b_status == "cart") {
                    $scope.addProductToCart(productId, quantity, product_property);
                } else if (b_status == "buy") {
                    $scope.buy_immediately(productInfo, quantity, product_property);
                }
            };


            //添加购物车
            $scope.addProductToCart = function (productId, quantity, product_property) {
                DetailsFty.addProToCatService(productId, quantity, product_property)
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $.toast.prototype.defaults.duration = 2000;
                            $.toast("成功添加商品");
                        } else {
                            $.toast("添加失败", "cancel");
                        }
                    }, function (error) {
                        $.toast("添加失败", "cancel");
                    })
            };

            //立即购买
            $scope.checkedCarts = [];
            $scope.buy_immediately = function (item, quantity, product_property) {
                console.log("product.item?" + angular.toJson(item));

                item.product_id = (item.properties != null && item.properties.length > 0) ?
                    item.properties[0].product_id : item.id;
                item.quantity = $scope.q_count;
                item.product_name = item.name;
                item.price = item.price * quantity;
                item.product_property = product_property;
                $scope.checkedCarts.push(item);

                $state.go('cart-settlement', {
                    carts: $scope.checkedCarts,
                    totalToPay: item.price,
                    totalFreight: item.freight
                });
            };

            //添加收藏
            $scope.addProductToCollection = function (productId) {
                DetailsFty.addCollectionService(productId)
                    .then(function (json) {
                        //alert(angular.toJson(json));
                        if (json.status_code == 0) {
                            $.toast('收藏成功');
                        } else {
                            $.toast('收藏失败', 'cancel');
                        }
                    }, function (error) {
                        $.toast('收藏失败', 'cancel');
                    })
            }


        }])

;