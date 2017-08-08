$(function () {

    //if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
    //    $('body').addClass('index_body');//添加禁止滚动的样式
    //}else{
    //    $('body').removeClass('index_body');//去除禁止滚动的样式
    //}

    //$('body').on('touchmove', function(event){
    //    event.preventDefault();
    //});

    var overscroll = function(el) {
        el.addEventListener('touchstart', function() {
            var top = el.scrollTop
                , totalScroll = el.scrollHeight
                , currentScroll = top + el.offsetHeight;
            //If we're at the top or the bottom of the containers
            //scroll, push up or down one pixel.
            //
            //this prevents the scroll from "passing through" to
            //the body.
            if(top === 0) {
                el.scrollTop = 1;
            } else if(currentScroll === totalScroll) {
                el.scrollTop = top - 1;
            }
        });
        el.addEventListener('touchmove', function(evt) {
            //if the content is actually scrollable, i.e. the content is long enough
            //that scrolling can occur
            if(el.offsetHeight < el.scrollHeight)
                evt._isScroller = true;
        });
    };
    overscroll(document.querySelector('.scroll'));
    document.body.addEventListener('touchmove', function(evt) {
        //In this case, the default behavior is scrolling the body, which
        //would result in an overflow.  Since we don't want that, we preventDefault.
        if(!evt._isScroller) {
            evt.preventDefault();
        }
    });


    // searchbar
    $('#container').on('focus', '#search_input', function () {
        var $weuiSearchBar = $('#search_bar');
        $weuiSearchBar.addClass('weui_search_focusing');
    }).on('blur', '#search_input', function () {
        var $weuiSearchBar = $('#search_bar');
        $weuiSearchBar.removeClass('weui_search_focusing');
        if ($(this).val()) {
            $('#search_text').hide();
        } else {
            $('#search_text').show();
        }
    }).on('input', '#search_input', function () {
        var $searchShow = $("#search_show");
        if ($(this).val()) {
            $searchShow.show();
        } else {
            $searchShow.hide();
        }
    }).on('touchend', '#search_cancel', function () {
        $("#search_show").hide();
        $('#search_input').val('');
    }).on('touchend', '#search_clear', function () {
        $("#search_show").hide();
        $('#search_input').val('');
    })

        //cart settlement action sheet
        //结算页地址弹出框
        .on('click', '#showAddress', function () {
            var mask = $('#mask');
            var weuiActionsheet = $('#weui_actionsheet');
            weuiActionsheet.addClass('weui_actionsheet_toggle');
            mask.show().addClass('weui_fade_toggle').on('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            $('#actionsheet_cancel').on('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            $('.selectContact').on('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');

            function hideActionSheet(weuiActionsheet, mask) {
                weuiActionsheet.removeClass('weui_actionsheet_toggle');
                mask.removeClass('weui_fade_toggle');
                weuiActionsheet.on('transitionend', function () {
                    mask.hide();
                }).on('webkitTransitionEnd', function () {
                    mask.hide();
                })
            }
        })

        //结算页添加收货地址
        .on('click', '#createAddress', function () {
            var s_contact_user = $('#s_contact_user');
            var s_contact_phone = $('#s_contact_phone');
            var city_picker = $('#city-picker');
            var s_contact_detail = $('#s_contact_detail');
            var add_mask = $('#add_mask');
            var weui_action_add_sheet = $('#weui_action_add_sheet');
            weui_action_add_sheet.addClass('weui_actionsheet_toggle');
            add_mask.show().addClass('weui_fade_toggle').on('click', function () {
                hideActionSheet_add(weui_action_add_sheet, add_mask);
            });
            $('#action_add_sheet_cancel').on('click', function () {
                if(s_contact_user.val().length <= 0){
                    return;
                }
                if(s_contact_phone.val().length <= 0){
                    return;
                }
                if(city_picker.val().length <= 0){
                    return;
                }
                if(s_contact_detail.val().length <= 0){
                    return;
                }
                hideActionSheet_add(weui_action_add_sheet, add_mask);
                $('#actionsheet_cancel').click();
            });
            $('.selectContact').one('click', function () {
                hideActionSheet_add(weui_action_add_sheet, add_mask);
            });
            weui_action_add_sheet.unbind('transitionend').unbind('webkitTransitionEnd');

            function hideActionSheet_add(weui_action_add_sheet, add_mask) {
                weui_action_add_sheet.removeClass('weui_actionsheet_toggle');
                add_mask.removeClass('weui_fade_toggle');
                weui_action_add_sheet.on('transitionend', function () {
                    add_mask.hide();
                }).on('webkitTransitionEnd', function () {
                    add_mask.hide();
                })
            }
        })

        //address list add action
        .on('click', '#c_address_action',function(){
            //$("#createAddress").click();
            $('#actionsheet_cancel').click();
            var s_contact_user = $('#s_contact_user');
            var s_contact_phone = $('#s_contact_phone');
            var city_picker = $('#city-picker');
            var s_contact_detail = $('#s_contact_detail');
            var add_mask = $('#add_mask');
            var weui_action_add_sheet = $('#weui_action_add_sheet');
            weui_action_add_sheet.addClass('weui_actionsheet_toggle');
            add_mask.show().addClass('weui_fade_toggle').on('click', function () {
                hideActionSheet_add(weui_action_add_sheet, add_mask);
            });
            $('#action_add_sheet_cancel').on('click', function () {
                if(s_contact_user.val().length <= 0){
                    return;
                }
                if(s_contact_phone.val().length <= 0){
                    return;
                }
                if(city_picker.val().length <= 0){
                    return;
                }
                if(s_contact_detail.val().length <= 0){
                    return;
                }
                hideActionSheet_add(weui_action_add_sheet, add_mask);
                $('#actionsheet_cancel').click();
            });
            $('.selectContact').one('click', function () {
                hideActionSheet_add(weui_action_add_sheet, add_mask);
            });
            weui_action_add_sheet.unbind('transitionend').unbind('webkitTransitionEnd');

            function hideActionSheet_add(weui_action_add_sheet, add_mask) {
                weui_action_add_sheet.removeClass('weui_actionsheet_toggle');
                add_mask.removeClass('weui_fade_toggle');
                weui_action_add_sheet.on('transitionend', function () {
                    add_mask.hide();
                }).on('webkitTransitionEnd', function () {
                    add_mask.hide();
                })
            }
        })


        //details action sheet
        .on('click', '.product_info', function () {
            var p_value = $('#property_hidden');
            var p_list_null = $('#propertis_null');
            var mask = $('#details_mask');
            var weuiActionsheet = $('#weui_actionsheet');

            var product_stock_balance = $('#product_stock_balance');
            var details_stock_balance = $('#details_stock_balance');

            var details_product_count = $('.detail_product_count');

            weuiActionsheet.addClass('weui_actionsheet_toggle');
            mask.show().addClass('weui_fade_toggle').on('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });

            $('#action_sheet_cancel').on('click', function () {
                if(p_list_null.val() == 0 && details_stock_balance.val() > 0) {
                    if(details_product_count.val() > 0) {
                        hideActionSheet(weuiActionsheet, mask);
                    }
                }else if(p_list_null.val() > 0){
                    if (p_value.val().length > 0 && product_stock_balance.val() > 0) {
                        if(details_product_count.val() > 0){
                            hideActionSheet(weuiActionsheet, mask);
                        }
                    }
                }

            });

            //$('.select_contact').one('click', function () {
            //    hideActionSheet(weuiActionsheet, mask);
            //});
            weuiActionsheet.unbind('transitionend').unbind('webkitTransitionEnd');

            function hideActionSheet(weuiActionsheet, mask) {
                weuiActionsheet.removeClass('weui_actionsheet_toggle');
                mask.removeClass('weui_fade_toggle');
                weuiActionsheet.on('transitionend', function () {
                    mask.hide();
                }).on('webkitTransitionEnd', function () {
                    mask.hide();
                })
            }
        })


        //.on('click', '#showReceivingTime', function () {
        //    var mask_time = $('#mask_time');
        //    var weuiActionsheetTime = $('#weui_actionsheet_time');
        //    weuiActionsheetTime.addClass('weui_actionsheet_toggle');
        //    mask_time.show().addClass('weui_fade_toggle').one('click', function () {
        //        hideActionSheet(weuiActionsheetTime, mask_time);
        //    });
        //    $('#actionsheet_cancel_time').one('click', function () {
        //        hideActionSheet(weuiActionsheetTime, mask_time);
        //    });
        //    weuiActionsheetTime.unbind('transitionend').unbind('webkitTransitionEnd');
        //
        //    function hideActionSheet(weuiActionsheetTime, mask_time) {
        //        weuiActionsheetTime.removeClass('weui_actionsheet_toggle');
        //        mask_time.removeClass('weui_fade_toggle');
        //        weuiActionsheetTime.on('transitionend', function () {
        //            mask_time.hide();
        //        }).on('webkitTransitionEnd', function () {
        //            mask_time.hide();
        //        })
        //    }
        //})

        //
        //.on('click', '#addressPcd', function () {
        //    var mask_pcd = $('#mask_pcd');
        //    var weui_actionsheet_pcd = $('#weui_actionsheet_pcd');
        //    weui_actionsheet_pcd.addClass('weui_actionsheet_toggle');
        //    mask_pcd.show().addClass('weui_fade_toggle').one('click', function () {
        //        hideActionSheet(weui_actionsheet_pcd, mask_pcd);
        //    });
        //    $('#actionsheet_cancel_pcd').one('click', function () {
        //        hideActionSheet(weui_actionsheet_pcd, mask_pcd);
        //    });
        //    weui_actionsheet_pcd.unbind('transitionend').unbind('webkitTransitionEnd');
        //
        //    function hideActionSheet(weui_actionsheet_pcd, mask_pcd) {
        //        weui_actionsheet_pcd.removeClass('weui_actionsheet_toggle');
        //        mask_pcd.removeClass('weui_fade_toggle');
        //        weui_actionsheet_pcd.on('transitionend', function () {
        //            mask_pcd.hide();
        //        }).on('webkitTransitionEnd', function () {
        //            mask_pcd.hide();
        //        })
        //    }
        //})

        //bar 点击事件
        .on('click', '.weui_navbar_item', function () {
            $(this).addClass('custom_tab_underline_active').siblings('.custom_tab_underline_active').removeClass('custom_tab_underline_active');
        })
        .on('click', '.weui_tabbar_item', function () {
            $(this).addClass('weui_bar_item_on').siblings('.weui_bar_item_on').removeClass('weui_bar_item_on');
            $(this).siblings("a").children('.home_tab_icon').removeClass('home_tab_icon_color');
            $(this).children('.home_tab_icon').addClass('home_tab_icon_color');
        })

        //地址管理页---新增收件地址
        .on('click', '#contactMan', function () {
            $("#city-picker").cityPicker({
                title: "请选择收货地址"
            });
        })
        //结算页---新增收件地址
        .on('click', '#settl_add_pcd', function () {
            $("#city-picker").cityPicker({
                title: "请选择收货地址"
            });
        })
        //经销商申请页--地址
        .on('click', '#auth_pcd', function () {
            $("#city-picker").cityPicker({
                title: "请选择配送地址"
            });
        })

        .on('click', '.click_radio label', function () {
            var radioId = $(this).attr('name');
            $('.click_radio label').removeAttr('class').addClass('detail_label_radio');
            $(this).attr('class', 'detail_label_radio_checked');
            $('.detail_input_radio').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
        });



});