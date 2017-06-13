angular.module('wholesale.controller', ['wholesale.service'])

        .controller('WholesaleController', ['$scope','$state','$stateParams', 'WholesaleFty','WholesalePCDCode','wCateCache',
        function($scope,$state,$stateParams, WholesaleFty,WholesalePCDCode,wCateCache){

            document.title = '商品批发';
            var isCrown = null;
            var wholesaleInfo = null;
            var pcd = null;

            initCode();
            function initCode(){
                if(wCateCache.isPcs == 0){
                    $state.go('home.sellerPage');
                }else if(wCateCache.isPcs == -1){
                    isCrown = $stateParams.isCrown;
                    if(isCrown != null && isCrown == 'true'){
                        $scope.is_crown = true;
                        //获取省市区
                        AllPCD();
                        //getWholesaleInfo();
                    }else if(isCrown != null && isCrown == 'false'){
                        $scope.is_crown = false;
                    }
                }
            }

            //获取商品批发信息
            function getWholesaleInfo(){
                WholesaleFty.getWholesaleInfoService()
                    .then(function(json){
                        if(json.status_code == 0){
                            wholesaleInfo = json.data;
                            console.log("商品批发分类：" + angular.toJson(json));

                            if(wholesaleInfo != null){
                                if(wholesaleInfo.wholesaleRegion != null){
                                    var wholesaleRegion = wholesaleInfo.wholesaleRegion;
                                    WholesalePCDCode.province = wholesaleRegion.province;
                                    WholesalePCDCode.city = wholesaleRegion.city;
                                    WholesalePCDCode.district = wholesaleRegion.district;
                                    console.log('wCateCache.isPcs > ' + wCateCache.isPcs);
                                    $state.go('wholesaleGoodsList');
                                }else{
                                }
                            }
                        }else{
                            console.log("获取商品批发信息失败：" + angular.toJson(json));
                        }
                    }, function(error) {
                        console.log("获取商品批发信息失败：" + angular.toJson(error));
                    }).finally(function(){
                        console.log("finally");
                    })

            }

            //进入商品批发列表
            $scope.goToWholesaleGoodsList = function(){

                var pcd = document.getElementById('city-picker');

                if(pcd.value === undefined || pcd.value === null || pcd.value == ''){
                    $.toast('请选择配送地区', 'cancel');
                    return;
                }

                var pcd_body = {};
                var pcd_list = pcd.value.split(' ');
                WholesalePCDCode.province = pcd_list[0];
                WholesalePCDCode.city = pcd_list[1];
                WholesalePCDCode.district = pcd_list[2];

                pcd_body.province = pcd_list[0];
                pcd_body.city = pcd_list[1];
                pcd_body.district = pcd_list[2];
                console.log('pcdBody：' + angular.toJson(pcd_body));
                //saveWholesaleRegion(pcd_body);
                //$state.go('wholesaleGoodsList');
            };

            //申请皇冠按钮
            $scope.crownApplyAction = function(){
                $state.go('crownSellerAuthentication', {levelStatus: true});
            };

            //取消按钮
            $scope.crownApplyCancelAction = function(){
                $state.go('home.sellerPage');
            };

            //保存配送地址
            function saveWholesaleRegion(pcdBody){
                WholesaleFty.saveWholesaleRegionService(pcdBody)
                    .then(function (json) {
                        //$scope.provinces = result.data;
                        if(json.status_code == 0){
                            console.log('保存成功：' + angular.toJson(json));
                            $state.go('wholesaleGoodsList');
                        }else{
                            console.log('保存配送地址失败：' + angular.toJson(json));
                        }
                    }, function (error) {
                        console.log('保存配送地址失败：' + angular.toJson(error));
                    })
            }


            //判断是否为苹果
            var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE')!= -1;

            // 元素失去焦点隐藏iphone的软键盘
            function objBlur(id,time){
                if(typeof id != 'string') throw new Error('objBlur()参数错误');
                var obj = document.getElementById(id),
                    time = time || 500,
                    docTouchend = function(event){
                        if(event.target!= obj){
                            setTimeout(function(){
                                obj.blur();
                                document.removeEventListener('touchend', docTouchend,false);
                            },time);
                        }
                    };
                if(obj){
                    obj.addEventListener('focus', function(){
                        document.addEventListener('touchend', docTouchend,false);
                    },false);
                }else{
                    throw new Error('objBlur()没有找到元素');
                }
            }

            //隐藏键盘
            $scope.keyboard_hidden = function(){

                document.getElementById('city-picker').blur();

                var userInput = document.getElementById('contact_user');
                userInput.blur();
                var phoneInput = document.getElementById('contact_phone');
                phoneInput.blur();
                var contactInput = document.getElementById('contact_detail');
                contactInput.blur();

                if(isIPHONE){
                    var input1 = new objBlur('contact_user');
                    input1=null;
                    var input2 = new objBlur('contact_phone');
                    input2=null;
                    var input3 = new objBlur('contact_detail');
                    input3=null;
                }
            };

            /*
            * 获取省市区
            * */
            function AllPCD() {
                WholesaleFty.getPCDService()
                    .then(function (result) {
                        //$scope.provinces = result.data;
                        if(result.status_code == 0){
                            pcd = result.data;
                            showPCD();
                        }else{
                            console.log('获取省市区失败：' + angular.toJson(result));
                        }
                    }, function (error) {
                        console.log('获取省市区失败：' + angular.toJson(error));
                    })
            }

            function showPCD() {
                // jshint ignore: start
                +function ($) {

                    $.rawCitiesData = pcd;
                    //console.log(pcd);

                }($);
                // jshint ignore: end

                /* global $:true */
                /* jshint unused:false*/

                +function ($) {
                    "use strict";

                    var defaults;

                    $.fn.cityPicker = function (params) {
                        params = $.extend({}, defaults, params);
                        return this.each(function () {

                            var format = function (data) {
                                var result = [];
                                for (var i = 0; i < data.length; i++) {
                                    var d = data[i];
                                    if (d.name === "请选择") continue;
                                    result.push(d.name);
                                }
                                if (result.length) return result;
                                return [""];
                            };

                            var area_list = function (data) {
                                if (!data.area_list) return [""];
                                return format(data.area_list);
                            };

                            var getCities = function (d) {
                                for (var i = 0; i < raw.length; i++) {
                                    if (raw[i].name === d) return area_list(raw[i]);
                                }
                                return [""];
                            };

                            var getDistricts = function (p, c) {
                                for (var i = 0; i < raw.length; i++) {
                                    if (raw[i].name === p) {
                                        for (var j = 0; j < raw[i].area_list.length; j++) {
                                            if (raw[i].area_list[j].name === c) {
                                                return area_list(raw[i].area_list[j]);
                                            }
                                        }
                                    }
                                }
                                return [""];
                            };

                            var raw = $.rawCitiesData;
                            var provinces = raw.map(function (d) {
                                return d.name;
                            });
                            var initCities = area_list(raw[0]);
                            var initDistricts = area_list(raw[0].area_list[0]);

                            var currentProvince = provinces[0];
                            var currentCity = initCities[0];
                            var currentDistrict = initDistricts[0];

                            var cols = [
                                {
                                    values: provinces,
                                    cssClass: "col-province"
                                },
                                {
                                    values: initCities,
                                    cssClass: "col-city"
                                }
                            ];

                            if (params.showDistrict) cols.push({
                                values: initDistricts,
                                cssClass: "col-district"
                            });

                            var config = {

                                cssClass: "city-picker",
                                rotateEffect: false,  //为了性能

                                onChange: function (picker, values, displayValues) {
                                    var newProvince = picker.cols[0].value;
                                    var newCity;
                                    if (newProvince !== currentProvince) {
                                        var newCities = getCities(newProvince);
                                        newCity = newCities[0];
                                        var newDistricts = getDistricts(newProvince, newCity);
                                        picker.cols[1].replaceValues(newCities);
                                        if (params.showDistrict) picker.cols[2].replaceValues(newDistricts);
                                        currentProvince = newProvince;
                                        currentCity = newCity;
                                        picker.updateValue();
                                        return;
                                    }
                                    if (params.showDistrict) {
                                        newCity = picker.cols[1].value;
                                        if (newCity !== currentCity) {
                                            picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
                                            currentCity = newCity;
                                            picker.updateValue();
                                        }
                                    }
                                },

                                cols: cols
                            };

                            if (!this) return;
                            var p = $.extend(config, params);
                            //计算value
                            var val = $(this).val();
                            if (val) {
                                p.value = val.split(" ");
                                if (p.value[0]) {
                                    currentProvince = p.value[0];
                                    p.cols[1].values = getCities(p.value[0]);
                                }

                                if (p.value[1]) {
                                    currentCity = p.value[1];
                                    params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.value[1]));
                                } else {
                                    currentDistrict = p.value[2];
                                    params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]));
                                }
                            }
                            $(this).picker(p);
                        });
                    };

                    defaults = $.fn.cityPicker.prototype.defaults = {
                        showDistrict: true //是否显示地区选择
                    };

                }($);
            }



        }]);