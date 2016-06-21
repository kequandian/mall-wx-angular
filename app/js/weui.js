$(function () {

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
        .on('click', '#showAddress', function () {

            var s_contact_user = $('#s_contact_user');
            var s_contact_phone = $('#s_contact_phone');
            var city_picker = $('#city-picker');
            var s_contact_detail = $('#s_contact_detail');

            var show_status = $("#show_address_status").val();
            if (show_status == "add") {
                var add_mask = $('#add_mask');
                var weui_action_add_sheet = $('#weui_action_add_sheet');
                weui_action_add_sheet.addClass('weui_actionsheet_toggle');
                add_mask.show().addClass('weui_fade_toggle').one('click', function () {
                    hideActionSheet_add(weui_action_add_sheet, add_mask);
                });
                $('#action_add_sheet_cancel').one('click', function () {
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

            } else {

                var mask = $('#mask');
                var weuiActionsheet = $('#weui_actionsheet');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show().addClass('weui_fade_toggle').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                });
                $('#actionsheet_cancel').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                });
                $('.selectContact').one('click', function () {
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
            }

        })


        .on('click', '#c_address_action',function(){

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
            $('.selectContact').on('click', function () {
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
            weuiActionsheet.addClass('weui_actionsheet_toggle');
            mask.show().addClass('weui_fade_toggle').on('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });

            $('#action_sheet_cancel').on('click', function () {
                if(p_list_null.val() == 0) {
                    hideActionSheet(weuiActionsheet, mask);
                }else if(p_list_null.val() > 0){
                    if (p_value.val().length > 0) {
                        hideActionSheet(weuiActionsheet, mask);
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
            $(this).addClass('goods_bar_item_on').siblings('.goods_bar_item_on').removeClass('goods_bar_item_on');
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

        .on('click', '.click_radio label', function () {
            var radioId = $(this).attr('name');
            $('.click_radio label').removeAttr('class').addClass('detail_label_radio');
            $(this).attr('class', 'detail_label_radio_checked');
            $('.detail_input_radio').removeAttr('checked') && $('#' + radioId).attr('checked', 'checked');
        })

    ;

});