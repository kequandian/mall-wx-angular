angular.module('addressManager.controller', ['addressManager.service'])

    .controller('AddressManagerController', ['$scope', '$state', '$stateParams', 'AddressManagerFty',
        '$ocLazyLoad', function ($scope, $state, $stateParams, AddressManagerFty, $ocLazyLoad) {
            var pcd;

            AllContacts();

            $ocLazyLoad.load('Jquery').
                then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {
                        AllPCD();
                    })
                });

            $scope.contact = {};
            var editingContact = $stateParams.data;
            if (editingContact != null) {
                $scope.editC = editingContact;

                if (editingContact.province == null) {
                    $scope.pcd = '';
                    //console.log($scope.pcd);
                } else {
                    $scope.pcd = editingContact.province + ' ' + editingContact.city + ' ' + editingContact.district;
                    //console.log('edit pcd:' + $scope.pcd);
                }
            }

            function AllContacts() {

                //title
                document.title = "地址管理";

                AddressManagerFty.getContacts().then(
                    function (result) {
                        $scope.contacts = result.data;
                        //alert(angular.toJson($scope.contacts));
                        angular.forEach($scope.contacts, function (data, index) {
                            if (data.is_default == 1) {
                                $scope.currentContact = data;
                                //console.log($scope.currentContact);
                            }
                        });
                    }, function (error) {
                        console.log(error);
                    })
            }

            /*$scope.isDefault=[
             {key:1,value:'是'},
             {key:0,value:'否'}
             ];*/
            $scope.receivingTime = [
                {key: '收货时间不限', value: '收货时间不限'},
                {key: '周六日/节假日收货', value: '周六日/节假日收货'},
                {key: '周一至周五收货', value: '周一至周五收货'}
            ];

            // never hit
            $scope.changePcd = function ($event) {
                //$scope.contact.pcd=$event.target.value;
                $scope.pcd = $event.target.value;
            };

            //提交添加地址
            $scope.addContactSubmit = function () {

                var pcd_1 = document.getElementById('city-picker');
                $scope.pcd = pcd_1.value;

                if (!angular.isString($scope.contact.contact_user)
                    || $scope.contact.contact_user.length == 0) {
                    $.toast('收货人不能为空', 'cancel');
                    return
                }
                if (!angular.isString($scope.contact.phone)
                    || $scope.contact.phone.length == 0) {
                    $.toast('手机号不能为空', 'cancel');
                    return
                } else if (!checkPhone($scope.contact.phone)) {
                    $.toast('手机号码无效', 'cancel');
                    return
                }
                if (!angular.isString($scope.pcd)
                    || $scope.pcd.length == 0) {
                    $.toast('所在地区不能为空', 'cancel');
                    return
                }
                if (!angular.isString($scope.contact.detail)
                    || $scope.contact.detail.length == 0) {
                    $.toast('详细地址不能为空', 'cancel');
                    return
                }

                var pcd = $scope.pcd;
                var pcds = pcd.split(/\s/);
                if (pcds.length > 0) {
                    $scope.contact.province = pcds[0];
                }
                if (pcds.length > 1) {
                    $scope.contact.city = pcds[1];
                }
                if (pcds.length > 2) {
                    $scope.contact.district = pcds[2];
                }

                // convert is_default from boolean to int
                $scope.contact.is_default = $scope.contact.is_default ? 1 : 0;

                // 判断是否只有一个地址，唯一地址，自动设为默认
                if ($scope.contacts.length == 0) {
                    $scope.contact.is_default = 1;
                }

                AddressManagerFty.addContact($scope.contact).then(
                    function (result) {
                        //console.log(result);
                        $state.go('addressManager');
                    }, function (error) {
                        console.log(error);
                    });
            };

            //提交修改地址
            $scope.editContactSubmit = function () {

                var pcd = document.getElementById('city-picker');
                $scope.pcd = pcd.value;

                if (!angular.isString($scope.contact.contact_user)
                    || $scope.contact.contact_user.length == 0) {
                    $.toast('收货人不能为空', 'cancel');
                    return
                }
                if (!angular.isString($scope.contact.phone)
                    || $scope.contact.phone.length == 0) {
                    $.toast('手机号不能为空', 'cancel');
                    return
                } else if (!checkPhone($scope.contact.phone)) {
                    $.toast('手机号码无效', 'cancel');
                    return
                }

                if (!angular.isString($scope.pcd)
                    || $scope.pcd.length == 0) {
                    $.toast('所在地区不能为空', 'cancel');
                    return
                }
                if (!angular.isString($scope.contact.detail)
                    || $scope.contact.detail.length == 0) {
                    $.toast('详细地址不能为空', 'cancel');
                    return
                }

                $scope.contact.is_default = $scope.contact.is_default ? 1 : 0;

                var pcd = $scope.pcd;
                var pcds = pcd.split(/\s/);
                if (pcds.length > 0) {
                    $scope.contact.province = pcds[0];
                }
                if (pcds.length > 1) {
                    $scope.contact.city = pcds[1];
                }
                if (pcds.length > 2) {
                    $scope.contact.district = pcds[2];
                }

                AddressManagerFty.editContact($scope.contact.id, $scope.contact).then(
                    function (result) {
                        //console.log(result);
                        $state.go('addressManager');
                    }, function (error) {
                        $.toast('更新地址失败', 'cancel');
                        console.log(error);
                    });
            };

            //添加地址
            $scope.addAddress = function () {

                //title
                document.title = "新增地址";

                $state.go('add-address');
            };
            //修改地址
            $scope.editAddress = function (item) {

                //title
                document.title = "修改地址";

                //console.log(item);
                $state.go('edit-address', {data: item});
            };
            //删除地址
            $scope.deleteContact = function (id) {
                $.confirm("", "确认删除?", function () {
                    AddressManagerFty.deleteContact(id).then(
                        function (result) {
                            //console.log(result);
                            $state.go('addressManager', {}, {reload: true});
                        }, function (error) {
                            console.log(error);
                        });
                    $.toast("已经删除!");
                }, function () {
                    //取消操作
                });
            };

            $scope.defaultContact = function (id) {
                if (checkDefault(id)) {
                    AllContacts();
                    return;
                }

                $.confirm("", "是否设为默认地址?", function () {
                    AddressManagerFty.defaultContact(id).then(
                        function (result) {
                            //$scope.contact.is_default=1;
                            angular.forEach($scope.contacts, function (data, index) {
                                data.is_default = 0;
                                if (data.id == id) {
                                    data.is_default = 1;
                                    $scope.currentContact = data;
                                }
                            });

                        }, function (error) {
                            AllContacts();
                            console.log(error);
                        });
                }, function () {
                    //取消操作
                    AllContacts();
                });
            }

            function checkDefault(id) {

                var isDefault = false;
                angular.forEach($scope.contacts, function (data, index) {
                    if (data.id == id) {
                        isDefault = data.is_default;
                    }
                });
                return isDefault;
            }

            //选择地址
            //$scope.changeContact= function(item) {
            //    $scope.currentContact = item;
            //    console.log($scope.currentContact);
            //};


            function checkPhone(str) {
                var isphone = /^((\+|0)86)?\d{11}$/.test(str);
                return isphone;
            }

            function AllPCD() {
                AddressManagerFty.getPCD().then(
                    function (result) {
                        //$scope.provinces = result.data;
                        pcd = result.data;
                        showPCD();
                    }, function (error) {
                        console.log(error);
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