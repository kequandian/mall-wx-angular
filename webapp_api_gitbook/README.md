# 索芙特木瓜小屋详细设计说明书

# 用户API
    POST http://112.74.26.228:10080/rest/register
    可使用用户名/手机 注册。 使用手机时，验证码是必选的。 获取验证码的API见下面。
    {
        "username": "abc",
        "password": "abc",
        "phone": "13800000001",
        "captcha": "123456",
        "invite_code": "xfaEfw"  //optional
    }
    Successful Return:
    {
	    "message": "register.success",
	    "status_code": 0
    }

# 获取手机验证码
    POST http://112.74.26.228:10080/rest/pub/sms
    会发送短信到填写的手机上。
    {
        "phone": "13800000001",
        "name": "verify"  //指定不同的名字，可以拿到相应模版的消息
    }
    Return:
    {
	    "message": "ok",
	    "status_code": 0
    }

# 验证手机验证码
    POST http://112.74.26.228:10080/rest/pub/sms_verify
    {
        "phone": "13800000001",
        "captcha": "1234" 
    }
    Return:
    {
        "message": "ok",
        "status_code": 0
    }

# 登录
    POST http://112.74.26.228:10080/rest/login
    可以根据需要组合，如:
    username + password,
    phone + password,
    phone + captcha
    验证码获取API见上面。
    {
        "username": "abc",
        "password": "abc",
        "phone": "13800000001",
        "captcha": "134556"
    }
    Successful Return:
    {
        "status_code": 0,
        "data": {
            "access_token": "eyJ0b2tlbiI6IjU2MDlhMGJhOTBhZmFhMzI4NWZkZDk1ZjcxMTAyNjlmOGZmMGFiZDkiLCJsb2dpbl9uYW1lIjoiYWJjIn0="
        }
    }

# 登出系统
    GET http://112.74.26.228:10080/rest/logout
    Header: Authorization: eyJ0b2tlbiI6IjU2MDlhMGJhOTBhZmFhMzI4NWZkZDk1ZjcxMTAyNjlmOGZmMGFiZDkiLCJsb2dpbl9uYW1lIjoiYWJjIn0=
    Successful Return:
    {
        "message": "logout.success",
        "status_code": 0
    }

# 修改密码
    POST http://112.74.26.228:10080/rest/password
    Header: Authorization: eyJ0b2tlbiI6IjU2MDlhMGJhOTBhZmFhMzI4NWZkZDk1ZjcxMTAyNjlmOGZmMGFiZDkiLCJsb2dpbl9uYW1lIjoiYWJjIn0=
    Data:
    {
        "old_password": "abcdefg",
        "new_password": "123456"
    }
    Successful Return:
    {
        "message": "password.changed",
        "status_code": 0
    }
    Failure Return:
    {
        "message": "incorrect.old.password",
        "status_code": 1
    }

# 忘记密码
    POST http://112.74.26.228:10080/rest/pub/forget_password
    Header: Authorization: eyJ0b2tlbiI6IjU2MDlhMGJhOTBhZmFhMzI4NWZkZDk1ZjcxMTAyNjlmOGZmMGFiZDkiLCJsb2dpbl9uYW1lIjoiYWJjIn0=
    Data:
    {
        "phone": "13800000001",
        "captcha": "134566",
        "password": "123456"
    }
    Successful Return:
    {
        "message": "password.reset",
        "status_code": 0
    }
    Failure Return:
    {
        "message": "invalid.captcha",
        "status_code": 1
    }

# 绑定手机
    POST http://112.74.26.228:10080/rest/phone
    Header: Authorization: eyJ0b2tlbiI6IjU2MDlhMGJhOTBhZmFhMzI4NWZkZDk1ZjcxMTAyNjlmOGZmMGFiZDkiLCJsb2dpbl9uYW1lIjoiYWJjIn0=
    Data:
    {
        "phone": "13800000001",
        "captcha": "123456"
    }
    Successful Return:
    {
        "message": "phone.updated",
        "status_code": 0
    }
    Failure Return:
    {
        "message": "captcha.invalid",
        "status_code": 1
    }

# 移动应用的微信登录
    POST http://112.74.26.228:10080/rest/login_wxapp
    Param： code - app调起微信授权返回的code。
    Data:
    {
        "code": "abcdefg"
    }
    Successful Return:
    {
        "status_code": 0,
        "data": {
            "access_token": "eyJsb2dpbl9uYW1lIjoiMTM5MjIxMTIxMzAiLCJ0b2tlbiI6ImNlODM5M2NlNDQ0ZTViMTA5YzMyOWU4N2UyNjg4Yzk0ZDFjYzY4MzIifQ==",
            "openid": "o0_gg0X2M7gnHmJUm71JzaKSYg8w",
            "unionid": "o-nTCtw8c18ZTyOmzgSNjhbbJ67c"
        }
    }
    Failure Return:
    {
        "status_code": 1,
        "data": {
            "openid": "o0_gg0X2M7gnHmJUm71JzaKSYg8w",
            "unionid": "o-nTCtw8c18ZTyOmzgSNjhbbJ67c"
        },
        "message": "user.not.found"
    }

# 小程序登录
    POST http://112.74.26.228:10080/rest/login_wxa
    进入小程序时先调用这个接口，如果返回 错误码 user.not.found， 则弹出注册界面，让用户输入 手机/短信验证码，调用 /rest/register_wxa 接口进行注册。
    Param： code - 小程序的wx.login返回的code。
    Data:
    {
        "code": "abcdefg"
    }
    Successful Return:
    {
        "status_code": 0,
        "data": {
            "access_token": "eyJsb2dpbl9uYW1lIjoiMTM5MjIxMTIxMzAiLCJ0b2tlbiI6ImNlODM5M2NlNDQ0ZTViMTA5YzMyOWU4N2UyNjg4Yzk0ZDFjYzY4MzIifQ==",
            "openid": "o0_gg0X2M7gnHmJUm71JzaKSYg8w",
            "unionid": "o-nTCtw8c18ZTyOmzgSNjhbbJ67c"
        }
    }
    Failure Return:
    {
        "status_code": 1,
        "data": {
            "openid": "o0_gg0X2M7gnHmJUm71JzaKSYg8w",
            "unionid": "o-nTCtw8c18ZTyOmzgSNjhbbJ67c"
        },
        "message": "user.not.found"
    }

# 小程序注册
    POST http://112.74.26.228:10080/rest/register_wxa
    Param： phone - 手机号
        openid - login API返回的openid
        captcha - 短信验证码
    Data:
    {
        "phone": "13922112130", 
        "openid": "o0_gg0X2M7gnHmJUm71JzaKSYg8w", 
        "captcha":"123456"
    }
    Successful Return:
    {
        "status_code": 0,
        "data": {
            "access_token": "eyJsb2dpbl9uYW1lIjoiMTM5MjIxMTIxMzAiLCJ0b2tlbiI6ImNlODM5M2NlNDQ0ZTViMTA5YzMyOWU4N2UyNjg4Yzk0ZDFjYzY4MzIifQ==",
            "openid": "o0_gg0X2M7gnHmJUm71JzaKSYg8w"
        }
    }
    Failure Return:
    {
        "status_code": 1,
        "message": "phone.already.exist"
    }

# 查看个人Profile
    GET http://112.74.26.228:10080/rest/profile
    Header: Authorization: eyJ0b2tlbiI6IjU2MDlhMGJhOTBhZmFhMzI4NWZkZDk1ZjcxMTAyNjlmOGZmMGFiZDkiLCJsb2dpbl9uYW1lIjoiYWJjIn0=
    Return:
    {
        "status_code": 0,
        "data": {
            "uid": "U00000069",
            "birthday": "1999-01-22", //生日
            "inviter_name": null, //邀请者名字
            "invitation_code": "ff705d15b67bba191f84943e4972d08a", //我的邀请码
            "invitation_qrcode_url": "http://host/image/abc.png", //邀请码二维码图片url
            "invitation_qrcode": "http://www.kequandian.net/app/app?invite_code=ff705d15b67bba191f84943e4972d08a", //我的邀请码URL
            "inviter_id": null, //邀请者ID
            "sex": 2, //性别： 0 保密， 1 男， 2 女
            "register_date": "2016-06-07 13:27:17",
            "avatar": null,//头像,默认使用微信的头像
            "last_login_date": "2016-06-07 13:28:07",
            "login_name": "abc",
            "weixin": "abc",
            "token_expired_date": "2016-07-07 13:28:07",
            "phone": "1390000000",
            "name": "abc",
            "real_name": "Huang",
            "details": "sffffaaaa",
            "id": 2,
            "email": "h@a.com",
            "status": "NORMAL",
            "followed": 0, //是否关注公众号， 0 关注， 1 未关注
            "follow_time": "2016-06-04 21:00:00" //关注时间
        }
    }

# 更新个人Profile
    POST http://112.74.26.228:10080/rest/profile
    Header: Authorization: eyJ0b2tlbiI6IjU2MDlhMGJhOTBhZmFhMzI4NWZkZDk1ZjcxMTAyNjlmOGZmMGFiZDkiLCJsb2dpbl9uYW1lIjoiYWJjIn0=
    DATA:
    {
        "phone": "1390000000",
        "sex": 2,
        "details": "sffffaaaa",
        "birthday": "1999/01/22",
        "email": "h@a.com",
        "name": "axxvv",
        "real_name": "Huang"
    }
    Return:
    {
        "status_code": 0,
        "message": "profile.updated"
    }

# 根据userID列表查看用户头像等信息
    POST http://112.74.26.228:10080/rest/pub/user_info
    data:
    { "ids": [ 1, 2, 4 ] }
    Return:
    {
        "status_code": 0,
        "data": [
            {
                "sex": 0,
                "name": "Administrator",
                "id": 1,
                "avatar": "http://abc.com/1.jpg"
            },
                    {
                "sex": 0,
                "name": "Administrator2",
                "id": 2,
                "avatar": null
            },
            {
                "sex": 0,
                "name": "Administrator4",
                "id": 4,
                "avatar": null
            }
        ]
    }

# 省市区数据
    GET http://112.74.26.228:10080/rest/pcd?all=true&province=广东&city=广州
    Para:
    1. all - optinal, 一次性返回所有的数据
    2. province - optional, 返回该省下面所有的城市。
    3. city - optional, 返回该市下面所有的区。
    4. 不带任何参数，则返回所有的省。
    Header: Authorization: eyJ0b2tlbiI6IjU2MDlhMGJhOTBhZmFhMzI4NWZkZDk1ZjcxMTAyNjlmOGZmMGFiZDkiLCJsb2dpbl9uYW1lIjoiYWJjIn0=
    Return:
    {
        "status_code": 0,
        "data": [{
            "id": 30,
            "name": "广东",
            "type": "p",
            "parent_id": null
        }, {
            "id": 35,
            "name": "上海",
            "type": "p",
            "parent_id": null
        }]
    }
    有all参数时，return:
    {
        "status_code": 0,
        "data": [{
            "id": 2183,
            "area_list": [{
                "id": 2184,
                "area_list": [{
                    "id": 2185,
                    "name": "越秀区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2186,
                    "name": "荔湾区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2187,
                    "name": "海珠区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2188,
                    "name": "天河区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2189,
                    "name": "白云区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2190,
                    "name": "黄埔区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2191,
                    "name": "番禺区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2192,
                    "name": "花都区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2193,
                    "name": "南沙区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2194,
                    "name": "萝岗区",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2195,
                    "name": "增城市",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2196,
                    "name": "从化市",
                    "type": "d",
                    "parent_id": 2184
                }, {
                    "id": 2197,
                    "name": "其他",
                    "type": "d",
                    "parent_id": 2184
                }],
                "name": "广州",
                "type": "c",
                "parent_id": 2183
            }],
            "name": "广东",
            "type": "p",
            "parent_id": null
        }]
    }

# 商城API

# 获取商城全局配置项
    GET http://112.74.26.228:10080/rest/global_config
    Return:
    {
        "status_code": 0, 
        "data": {
            "point_exchange_rate": 100, 
            "auto_select_coupon": false, 
            "drawing_condition": 100
        }
    }

#获取产品类别列表
    GET http://112.74.26.228:10080/rest/product_category?promoted=true
    Parameter:
    promoted - optional, 如果指定该参数，则在一级类别下面返回类别该类别（包括它子类别）下的推荐产品列表。
    Return:
    {
        "status_code": 0,
        "data": [{
            "id": 1,
            "cover": null,
            "sub_categories": [{
                "id": 2,
                "cover": "http://112.74.26.228:8000/p/fb61f7180cb48a0d1bcff2a4edab9780.png",
                "sub_categories": [],
                "description": null,
                "name": "瓶装2.5L",
                "parent_id": 1
            }, {
                "id": 5,
                "cover": "http://112.74.26.228:8000/p/aa92d03568a42607011ca55815d48368.png",
                "sub_categories": [],
                "description": null,
                "name": "旅行装(袋)",
                "parent_id": 1
            }],
            "description": null,
            "name": "超效洁净",
            "parent_id": null,
            "is_show_products": 1, //点击类别时是否进入该类别下第1个产品的详情页（1 是 0 否）,
            "products": [{        //如果指定promoted时返回。
                "free_shipping": 0,
                "freight": 0.00,
                "last_modified_date": "2016-10-10 19:51:55",
                "promoted": 1,
                "stock_balance": 1000,
                "sales": 0,
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20161010195121988-gFvkrsAZ.jpeg",
                "unit": "a",
                "category_id": 3,
                "price": 33.00,
                "suggested_price": 33.00,
                "name": "aaaa",
                "short_name": "aa",
                "id": 1,
                "created_date": "2016-10-10 19:51:23",
                "fare_id": 1,
                "sort_order": 100,
                "partner_level_zone": 1,
                "barcode": null,
                "view_count": 0,
                "store_location": null,
                "status": "ONSELL",
                "cost_price": 33.00,
                "weight": 500, //重量， 单位克
                "bulk": 100 //体积
            }]
        }, {
            "id": 3,
            "cover": null,
            "sub_categories": [],
            "description": null,
            "name": "亮白增艳",
            "parent_id": null
        }, {
            "id": 4,
            "cover": null,
            "sub_categories": [],
            "description": null,
            "name": "活氧清洁剂",
            "parent_id": null
        }]
    }

# 获取某类别下的产品列表
    只列出 ONSELL 状态的产品
    GET http://112.74.26.228:10080/rest/product_category/id?pageNumber=1&pageSize=50&orderByDesc=view_count&orderBy=price&orderBy=sales&promoted=true
    para:
    id - 类别ID，如果指定-1 则返回所有产品
    pageNumber - 当前页，默认1
    pageSize - 每页记录数，默认50
    orderBy - 排序列。如果同时指定了超过1个orderBy，则前者优先于后者
    orderByDesc - 倒序排序列。如果同时指定了orderBy和orderByDesc，则orderBy优先于orderByDesc；
    orderBy and orderByDesc 可以用的值有： view_count : 人气， price : 价格， sales : 销量
    promoted - optional, 如果指定该参数，则分页查询该类别下的推荐产品。
    {
        "status_code": 0,
        "data": {
            "id": 2,
            "cover": "http://112.74.26.228:8000/p/fb61f7180cb48a0d1bcff2a4edab9780.png",
            "description": null,
            "name": "瓶装2.5L",
            "is_show_products": 1, //点击类别时是否进入该类别下第1个产品的详情页（1 是 0 否）,
            "products": [{
                "created_date": "2016-04-22 09:30:53",
                "cost_price": 20.00,
                "status": "ONSELL",
                "free_shipping": 1,
                "origin": "广东",
                "suggested_price": 50.00,
                "category_id": 2,
                "stock_balance": 10000,
                "id": 1,
                "unit": "件",
                "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
                "last_modified_date": "2016-04-23 12:27:59",
                "price": 34.80,
                "category_name": "瓶装2.5L",
                "promoted": 1,
                "sales": 0,
                "name": "超效洁净护理洗衣液2.5L【全国包邮】",
                "freight": 0.00,
                "brand": "大地",
                "sort_order": 100,
                "weight": 500, //重量， 单位克
                "bulk": 200 //体积
            }, {
                "created_date": "2016-04-22 11:16:14",
                "cost_price": 70.00,
                "status": "ONSELL",
                "free_shipping": 1,
                "origin": "广州",
                "suggested_price": 88.00,
                "category_id": 2,
                "stock_balance": 600,
                "id": 3,
                "unit": "件",
                "cover": "http://112.74.26.228:8000/p/2b3edeb3c3ca2a12b06893cb12286710.png",
                "last_modified_date": "2016-04-22 14:22:04",
                "price": 69.60,
                "category_name": "瓶装2.5L",
                "promoted": 0,
                "sales": 0,
                "name": "超效洁净护理洗衣液2.5Lx2瓶【全国包邮】",
                "freight": 0.00,
                "brand": "大陆",
                "sort_order": 100,
                "weight": 500, //重量， 单位克
                "bulk": 200 //体积
            }],
            "parent_id": 1
        }
    }

# 产品热门关键字
    GET http://112.74.26.228:10080/rest/product_hit_word
    return:
    {
        "status_code": 0,
        "data": [
            {
                "id": 1,
                "hit": 0,
                "name": "皂液"
            }
        ]
    }

# 产品搜索
    GET http://112.74.26.228:10080/rest/product_search?pageNumber=1&pageSize=20&name=abc&barCode=234234&orderByDesc=view_count&orderBy=price&orderBy=sales
    para: pageNumber - 当前页，默认1
    pageSize - 每页记录数，默认50
    name - 产品名称
    barCode - 条形码
    orderBy - 排序列
    orderByDesc - 倒序排序列
    orderBy and orderByDesc 可以用的值有： view_count : 人气， price : 价格， sales : 销量
    {
        "status_code": 0,
        "data":[{
            "created_date": "2016-04-22 09:30:53",
            "cost_price": 20.00,
            "status": "ONSELL",
            "free_shipping": 1,
            "origin": "广东",
            "suggested_price": 50.00,
            "category_id": 2,
            "stock_balance": 10000,
            "id": 1,
            "unit": "件",
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "last_modified_date": "2016-04-23 12:27:59",
            "price": 34.80,
            "category_name": "瓶装2.5L",
            "promoted": 1,
            "sales": 0,
            "name": "超效洁净护理洗衣液2.5L【全国包邮】",
            "short_name": "aa",
            "freight": 0.00,
            "brand": "大地",
            "sort_order": 100,
            "weight": 500, //重量， 单位克
            "bulk": 200 //体积
        }, {
            "created_date": "2016-04-22 11:16:14",
            "cost_price": 70.00,
            "status": "ONSELL",
            "free_shipping": 1,
            "origin": "广州",
            "suggested_price": 88.00,
            "category_id": 2,
            "stock_balance": 600,
            "id": 3,
            "unit": "件",
            "cover": "http://112.74.26.228:8000/p/2b3edeb3c3ca2a12b06893cb12286710.png",
            "last_modified_date": "2016-04-22 14:22:04",
            "price": 69.60,
            "category_name": "瓶装2.5L",
            "promoted": 0,
            "sales": 0,
            "name": "超效洁净护理洗衣液2.5Lx2瓶【全国包邮】",
            "freight": 0.00,
            "brand": "大陆",
            "sort_order": 100,
            "weight": 500, //重量， 单位克
            "bulk": 200 //体积
        }]
    }

# 获取所有产品列表
    只列出 ONSELL 状态的产品
    GET http://112.74.26.228:10080/rest/product?all=true
    参数： all - true 时查询所有产品列表。其他参数会忽略。
    {
        "status_code": 0,
        "data": [{
            "created_date": "2016-04-22 09:30:53",
            "cost_price": 20.00,
            "status": "ONSELL",
            "free_shipping": 1,
            "origin": "广东",
            "suggested_price": 50.00,
            "category_id": 2,
            "stock_balance": 10000,
            "id": 1,
            "unit": "件",
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "last_modified_date": "2016-04-23 12:27:59",
            "price": 34.80,
            "category_name": "瓶装2.5L",
            "promoted": 1,
            "sales": 0,
            "name": "超效洁净护理洗衣液2.5L【全国包邮】",
            "freight": 0.00,
            "brand": "大地",
            "sort_order": 100,
            "weight": 500, //重量， 单位克
            "bulk": 200, //体积
            "allow_coupon": 0, //是否可以使用优惠券 0:不可以， 1:可以用
            "credit": 0,  // 可用积分数量
        }]
    }

# 获取推荐产品列表
    只列出 ONSELL 状态的产品
    GET http://112.74.26.228:10080/rest/product?pageNumber=1&pageSize=50&zone=1
    Para:
    pageNumber - optional, 当前页，默认1
    pageSize - optional, 每页记录数，默认50
    zone - optional, 零元区／精品区／特价区 查询。如果不带这个参数，那么就查推荐产品。 零元区 1， 精品区 2， 特价区 3
    orderBy - 排序列
    orderByDesc - 倒序排序列
    orderBy and orderByDesc 可以用的值有： view_count : 人气， price : 价格， sales : 销量
    {
        "status_code": 0,
        "data": [{
            "created_date": "2016-04-22 09:30:53",
            "cost_price": 20.00,
            "status": "ONSELL",
            "free_shipping": 1,
            "origin": "广东",
            "suggested_price": 50.00,
            "category_id": 2,
            "stock_balance": 10000,
            "id": 1,
            "unit": "件",
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "last_modified_date": "2016-04-23 12:27:59",
            "price": 34.80,
            "category_name": "瓶装2.5L",
            "promoted": 1,
            "sales": 0,
            "name": "超效洁净护理洗衣液2.5L【全国包邮】",
            "freight": 0.00,
            "brand": "大地",
            "sort_order": 100,
            "weight": 500, //重量， 单位克
            "bulk": 200 //体积
        }]
    }

# 查看产品详情
    GET http://112.74.26.228:10080/rest/product/id
    {
        "status_code": 0,
        "data": {
            "created_date": "2016-04-22 09:30:53",
            "cost_price": 20.00,
            "status": "ONSELL",
            "free_shipping": 1,
            "origin": "广东",
            "suggested_price": 50.00,
            "category_id": 2,
            "stock_balance": 10000,
            "id": 1,
            "unit": "件",
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "last_modified_date": "2016-04-23 18:26:39",
            "price": 34.80,
            "promoted": 1,
            "sales": 0,
            "description": "<h1>超优惠<br/></h1><p><img src=\"/upload/upload/image/20160601/1464767352927011775.png\" title=\"1464767352927011775.png\" alt=\"logo.png\"/></p><p><br/></p>",
            "name": "超效洁净护理洗衣液2.5L【全国包邮】",
            "freight": 0.00,
            "images": [],
            "brand": "大地",
            "sort_order": 100,
            "weight": 500, //重量， 单位克
            "bulk": 200, //体积
            "properties": [{
                "value_type": "STRING",
                "product_id": 1,
                "id": 1,
                "property_value": "a1",
                "display_name": "a1",
                "property_id": 1
            }, {
                "value_type": "STRING",
                "product_id": 1,
                "id": 2,
                "property_value": "a2",
                "display_name": "a2",
                "property_id": 2
            }],
            "covers": [{
                "product_id": 1,
                "id": 1,
                "type": 0,
                "url": "http://localhost:9990/p/6255a9dd831b89aa92ec1df49054603a.jpeg"
            }, {
                "product_id": 1,
                "id": 2,
                "type": 0,
                "url": "http://localhost:9990/p/3b316bb6c6b939eb64c36d047a6c9d6e.jpg"
            }],
            "specifications": [{//产品规格，当购买产品时，弹出来的框提供的选择项。加入购物车和购买时需要把选择的项提交给后台，具体参考购物车和下单api的要求
                "price": 140, //售价
                "suggested_price": 140,
                "product_id": 1,
                "name": "a2", //规格名称
                "id": 1,
                "stock_balance": 1000, //库存
                "cost_price": 100,
                "weight": 500, //重量， 单位克
                "bulk": 200 //体积
            }, {
                "price": 120,
                "suggested_price": 130,
                "product_id": 1,
                "name": "a1",
                "id": 2,
                "stock_balance": 1000,
                "cost_price": 90,
                "weight": 500, //重量， 单位克
                "bulk": 200 //体积
            }],
            "fare_template": {
                "is_incl_postage_by_if": 0, // 1 条件包邮
                "dispatch_time": "24",
                "is_incl_postage": 1, // 1 包邮
                "name": "包邮",
                "title": "［省钱优惠］",
                "content": "满3KG更省钱哦。",
                "shop_addr": "广东-广州",
                "last_modified_date": "2016-08-31 10:56:16",
                "id": 1,
                "valuation_model": 0,
                "incl_postage_provisoes": [{  //条件包邮
                    "amount": 100.00,  // 满100包邮
                    "bulk_no": null,
                    "carry_way": 0,
                    "id": 2,
                    "fare_id": 2,
                    "region": null,
                    "type": 3,
                    "piece_no": null,
                    "weight_no": null
                }],
                "carry_modes": [{
                    "second_piece": 1,
                    "second_amount": 0.00,
                    "first_bulk": null,
                    "carry_way": 0,
                    "is_default": 0,
                    "first_piece": 1,
                    "first_weight": null,
                    "second_bulk": null,
                    "second_weight": null,
                    "id": 3,
                    "fare_id": 2,
                    "region": "广东-广州|广东-深圳", //这些地区的使用这个运费
                    "first_amount": 8.00
                }, {
                    "second_piece": 1,
                    "second_amount": 0.00, //续费
                    "first_bulk": null,
                    "carry_way": 0,
                    "is_default": 1, //没有满足地区，使用这个默认运费
                    "first_piece": 1,
                    "first_weight": null,
                    "second_bulk": null,
                    "second_weight": null,
                    "id": 2,
                    "fare_id": 2,
                    "region": null,
                    "first_amount": 10.00 //首费
                }],
            },
            "purchase_strategy": {
                "id": 1,
                "name": "关注公众号且限购1件",
                "description": "请先关注公众号，关注后可以购买1件。"
            }
        }
    }

# 订单状态说明
    CREATED_PAY_PENDING － 待支付
    CLOSED_PAY_TIMEOUT － 支付超时关闭
    CLOSED_CANCELED － 已取消
    PAID_CONFIRM_PENDING － 已支付
    CONFIRMED_DELIVER_PENDING － 待发货
    DELIVERING － 发货中
    DELIVERED_CONFIRM_PENDING－ 已发货
    CANCELED_RETURN_PENDING － 待退货
    CLOSED_CONFIRMED － 已确认收货
    CANCELED_REFUND_PENDING － 待退款
    CLOSED_REFUNDED － 已退款
    CONFIRMED_PICK_PENDING - 待取货

# 我的订单列表
    GET http://112.74.26.228:10080/rest/order?pageNumber=1&pageSize=20&status=CREATED_PAY_PENDDING
    Para:
    pageNumber - 页数，可空，默认1
    pageSize - 每页记录数，可空，默认50
    status - 订单状态, optional
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": [{
            "user_id": 1,
            "phone": "1380000000",
            "contact_user": "Mr Huang",
            "province": "GD",
            "city": "GZ",
            "district": "Tiahne",
            "street": "jianzhong road",
            "detail": "6F",
            "trade_number": null,
            "deal_date": null,
            "express_number": "1232323",
            "express_code": "24234",
            "express_company": "abc",
            "coupon_info": null,
            "zip": "510000",
            "id": 3,
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "confirm_date": null,
            "description": "超效洁净护理洗衣液2.5L【全国包邮】 x 1. ",
            "deliver_date": null,
            "created_date": "2016-04-26 10:27:56",
            "order_number": "0000000101461637676506360",
            "status": "CREATED_PAY_PENDING",
            "remark": null,
            "invoice": 1,
            "invoice_title": "ABC company",
            "receiving_time": "anytime",
            "deliver_order_number": null,
            "total_price": 34.80,
            "user_name": "Administrator",
            "freight": 0.00,
            "pay_date": null,
            "payment_type": "ALIPAY",
            "point_exchange_rate": 100,
            "pay_expiry_time": "2018-08-20 17:53:01",// 待支付订单支付的超时时间
            "order_items": [{
                "quantity": 2,
                "product_specification_id": null,
                "weight": 500,
                "product_specification_name": null,
                "product_name": "REJOICE飘柔家庭护理芦荟长效止痒滋润洗发露400ML",
                "marketing_description": null,
                "cover": "http://images.10mup.com/20161104102243958-v499XJvA.jpg",
                "marketing": null,
                "final_price": 25.8,
                "price": 12.9,
                "product_id": 335,
                "marketing_id": null,
                "id": 5920,
                "bulk": 0,
                "order_id": 3290,
                "partner_level_zone": 1,
                "barcode": "6903148126660",
                "store_location": null,
                "status": "CREATED",
                "cost_price": 10.21
            }]
        }]
    }

# 我的退货退款订单列表
    GET http://112.74.26.228:10080/rest/refund_order?pageNumber=1&pageSize=20
    Para:
    pageNumber - 页数，可空，默认1
    pageSize - 每页记录数，可空，默认50
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0, 
        "data": [{
            "trade_number": "test_trade_num", 
            "pay_date": "2016-12-14 13:42:33", 
            "deliver_order_number": null, 
            "order_customer_service": {  //售后单信息
                "reason": "AFSFSF", 
                "express_code": null, 
                "service_type": "REFUND", 
                "images": "[]", 
                "log": "[{\"time\":\"2016-12-14 01:42:47\",\"user\":\"Administrator\",\"content\":\"afaf\"}]", 
                "refund_fee": null, //退款金额
                "id": 5, 
                "created_date": "2016-12-14 13:42:47", 
                "express_number": null, 
                "order_id": 5, 
                "express_company": null, 
                "status": "CREATED"
            }, 
            "city": "GZ", 
            "invoice_title": "ABC company", 
            "receiving_time": "anytime", 
            "user_name": "Administrator", 
            "order_number": "1612141342218661", 
            "freight": 0, 
            "description": "aaaa x 2. ", 
            "remark": null, 
            "express_company": null, 
            "cover": "/p/7fe63684ff08bb7cb6414742232776ac.jpeg", 
            "express_code": null, 
            "is_deleted": 0, 
            "province": "GD", 
            "street": "jianzhong road", 
            "is_deliver_reminder": 0, 
            "id": 5, 
            "express_number": null, 
            "previous_status": "CONFIRMED_DELIVER_PENDING", 
            "delivered_date": null, 
            "zip": "510000", 
            "deal_date": null, 
            "total_price": 66, 
            "contact_user": "Mr Huang", 
            "settled": 0, 
            "coupon_info": null, 
            "payment_type": "WECHAT", 
            "user_id": 1, 
            "phone": "1380000000", 
            "point_exchange_rate": 100, 
            "deliver_date": null, 
            "confirm_date": "2016-12-14 13:42:33", 
            "district": "Tiahne", 
            "created_date": "2016-12-14 13:42:21", 
            "invoice": 1, 
            "detail": "6F", 
            "status": "CANCELED_REFUND_PENDING"
        }, 
        {
            "trade_number": "test_trade_num", 
            "pay_date": "2016-12-14 11:35:54", 
            "deliver_order_number": null, 
            "order_customer_service": {
                "reason": "rrr", 
                "express_code": null, 
                "service_type": "RETURN", 
                "images": "[]", 
                "log": "[{\"time\":\"2016-12-14 11:36:32\",\"user\":\"Administrator\",\"content\":\"yyy\"},{\"time\":\"2016-12-14 11:36:56\",\"user\":\"Administrator\",\"content\":\"ok\"},{\"time\":\"2016-12-14 11:37:00\",\"user\":\"Administrator\",\"content\":\"同意\"},{\"time\":\"2016-12-14 11:38:07\",\"user\":\"Administrator\",\"content\":\"退货收到确认\"},{\"time\":\"2016-12-14 01:10:24\",\"user\":\"Administrator\",\"content\":\"退款失败, 请稍后重试\"},{\"time\":\"2016-12-14 01:11:08\",\"user\":\"Administrator\",\"content\":\"已完成退款\"}]", 
                "refund_fee": 66, 
                "id": 4, 
                "created_date": "2016-12-14 11:36:32", 
                "express_number": null, 
                "order_id": 4, 
                "express_company": null, 
                "status": "REFUNDED"
            }, 
            "city": "GZ", 
            "invoice_title": "ABC company", 
            "receiving_time": "anytime", 
            "user_name": "Administrator", 
            "order_number": "1612141135416631", 
            "freight": 0, 
            "description": "aaaa x 2. ", 
            "remark": null, 
            "express_company": "afa", 
            "cover": "/p/7fe63684ff08bb7cb6414742232776ac.jpeg", 
            "express_code": "afsd", 
            "is_deleted": 0, 
            "province": "GD", 
            "street": "jianzhong road", 
            "is_deliver_reminder": 0, 
            "id": 4, 
            "express_number": "rwrwe4", 
            "previous_status": "DELIVERED_CONFIRM_PENDING", 
            "delivered_date": "2016-12-14 11:36:05", 
            "zip": "510000", 
            "deal_date": null, 
            "total_price": 66, 
            "contact_user": "Mr Huang", 
            "settled": 0, 
            "coupon_info": null, 
            "payment_type": "WECHAT", 
            "user_id": 1, 
            "phone": "1380000000", 
            "point_exchange_rate": 100, 
            "deliver_date": "2016-12-14 11:36:03", 
            "confirm_date": "2016-12-14 11:35:54", 
            "district": "Tiahne", 
            "created_date": "2016-12-14 11:35:41", 
            "invoice": 1, 
            "detail": "6F", 
            "status": "CLOSED_REFUNDED"
        }, 
        {
            "trade_number": "test_trade_num", 
            "pay_date": "2016-12-14 11:27:23", 
            "deliver_order_number": null, 
            "order_customer_service": {
                "reason": "AFSFSF", 
                "express_code": null, 
                "service_type": "REFUND", 
                "images": "[]", 
                "log": "[{\"time\":\"2016-12-14 11:27:52\",\"user\":\"Administrator\",\"content\":\"afaf\"},{\"time\":\"2016-12-14 11:31:17\",\"user\":\"Administrator\",\"content\":\"ok\"},{\"time\":\"2016-12-14 11:31:19\",\"user\":\"Administrator\",\"content\":\"同意\"},{\"time\":\"2016-12-14 11:32:14\",\"user\":\"Administrator\",\"content\":\"更新退款金额为 58 元\"},{\"time\":\"2016-12-14 11:33:08\",\"user\":\"Administrator\",\"content\":\"已完成退款\"}]", 
                "refund_fee": 58, 
                "id": 3, 
                "created_date": "2016-12-14 11:27:52", 
                "express_number": null, 
                "order_id": 3, 
                "express_company": null, 
                "status": "REFUNDED"
            }, 
            "city": "GZ", 
            "invoice_title": "ABC company", 
            "receiving_time": "anytime", 
            "user_name": "Administrator", 
            "order_number": "1612141127143691", 
            "freight": 0, 
            "description": "aaaa x 2. ", 
            "remark": null, 
            "express_company": null, 
            "cover": "/p/7fe63684ff08bb7cb6414742232776ac.jpeg", 
            "express_code": null, 
            "is_deleted": 0, 
            "province": "GD", 
            "street": "jianzhong road", 
            "is_deliver_reminder": 0, 
            "id": 3, 
            "express_number": null, 
            "previous_status": "CONFIRMED_DELIVER_PENDING", 
            "delivered_date": null, 
            "zip": "510000", 
            "deal_date": null, 
            "total_price": 66, 
            "contact_user": "Mr Huang", 
            "settled": 0, 
            "coupon_info": null, 
            "payment_type": "WECHAT", 
            "user_id": 1, 
            "phone": "1380000000", 
            "point_exchange_rate": 100, 
            "deliver_date": null, 
            "confirm_date": "2016-12-14 11:27:23", 
            "district": "Tiahne", 
            "created_date": "2016-12-14 11:27:14", 
            "invoice": 1, 
            "detail": "6F", 
            "status": "CLOSED_REFUNDED"
        }, 
        {
            "trade_number": "test_trade_num", 
            "pay_date": "2016-12-13 15:35:06", 
            "deliver_order_number": null, 
            "order_customer_service": {
                "reason": "AFSFSF", 
                "express_code": null, 
                "service_type": "RETURN", 
                "images": "[]", 
                "log": "[{\"time\":\"2016-12-13 03:35:30\",\"user\":\"Administrator\",\"content\":\"afaf\"},{\"time\":\"2016-12-13 03:35:38\",\"user\":\"Administrator\",\"content\":\"afd\"},{\"time\":\"2016-12-13 03:35:46\",\"user\":\"Administrator\",\"content\":\"同意\"},{\"time\":\"2016-12-13 03:35:51\",\"user\":\"Administrator\",\"content\":\"退货收到确认\"},{\"time\":\"2016-12-13 03:35:55\",\"user\":\"Administrator\",\"content\":\"更新退款金额为 60 元\"},{\"time\":\"2016-12-13 03:37:12\",\"user\":\"Administrator\",\"content\":\"更新退款金额为 61 元\"},{\"time\":\"2016-12-13 03:48:57\",\"user\":\"Administrator\",\"content\":\"a\"},{\"time\":\"2016-12-13 03:52:01\",\"user\":\"Administrator\",\"content\":\"com.jfeat.order.exception.RefundOrderException: order.refund.failure\"},{\"time\":\"2016-12-13 03:52:55\",\"user\":\"Administrator\",\"content\":\"java.lang.RuntimeException: com.jfeat.order.exception.RefundOrderException: order.refund.failure\"},{\"time\":\"2016-12-13 04:00:49\",\"user\":\"Administrator\",\"content\":\"com.jfeat.order.exception.RefundOrderException: order.refund.failure\"},{\"time\":\"2016-12-13 04:11:29\",\"user\":\"Administrator\",\"content\":\"fsdas\"},{\"time\":\"2016-12-13 04:11:36\",\"user\":\"Administrator\",\"content\":\"更新退款金额为 60 元\"},{\"time\":\"2016-12-13 04:11:41\",\"user\":\"Administrator\",\"content\":\"退款失败, 请稍后重试\"},{\"time\":\"2016-12-13 05:18:40\",\"user\":\"Administrator\",\"content\":\"退款失败, 请稍后重试\"},{\"time\":\"2016-12-14 11:26:17\",\"user\":\"Administrator\",\"content\":\"已完成退款\"}]", 
                "refund_fee": 60, 
                "id": 2, 
                "created_date": "2016-12-13 15:35:30", 
                "express_number": null, 
                "order_id": 2, 
                "express_company": null, 
                "status": "REFUNDED"
            }, 
            "city": "GZ", 
            "invoice_title": "ABC company", 
            "receiving_time": "anytime", 
            "user_name": "Administrator", 
            "order_number": "1612131532015531", 
            "freight": 0, 
            "description": "aaaa x 2. ", 
            "remark": "afafafafafafa", 
            "express_company": "afa", 
            "cover": "/p/7fe63684ff08bb7cb6414742232776ac.jpeg", 
            "express_code": "afsd", 
            "is_deleted": 0, 
            "province": "GD", 
            "street": "jianzhong road", 
            "is_deliver_reminder": 0, 
            "id": 2, 
            "express_number": "234", 
            "previous_status": "DELIVERED_CONFIRM_PENDING", 
            "delivered_date": "2016-12-13 15:35:16", 
            "zip": "510000", 
            "deal_date": null, 
            "total_price": 66, 
            "contact_user": "Mr Huang", 
            "settled": 0, 
            "coupon_info": null, 
            "payment_type": "WECHAT", 
            "user_id": 1, 
            "phone": "1380000000", 
            "point_exchange_rate": 100, 
            "deliver_date": "2016-12-13 15:35:14", 
            "confirm_date": "2016-12-13 15:35:06", 
            "district": "Tiahne", 
            "created_date": "2016-12-13 15:32:01", 
            "invoice": 1, 
            "detail": "6F", 
            "status": "CLOSED_REFUNDED"
        }, 
        {
            "trade_number": "test_trade_num", 
            "pay_date": "2016-12-13 14:01:47", 
            "deliver_order_number": null, 
            "order_customer_service": {
                "reason": "AFSFSF", 
                "express_code": null, 
                "service_type": "RETURN", 
                "images": "[]", 
                "log": "[{\"time\":\"2016-12-13 02:03:26\",\"user\":\"Administrator\",\"content\":\"afaf\"},{\"time\":\"2016-12-13 02:03:41\",\"user\":\"Administrator\",\"content\":\"同意\"},{\"time\":\"2016-12-13 02:03:44\",\"user\":\"Administrator\",\"content\":\"退货收到确认\"},{\"time\":\"2016-12-13 02:12:38\",\"user\":\"Administrator\",\"content\":\"更新退款金额为 {0} 元\"},{\"time\":\"2016-12-13 02:13:42\",\"user\":\"Administrator\",\"content\":\"更新退款金额为 62 元\"},{\"time\":\"2016-12-13 02:17:23\",\"user\":\"Administrator\",\"content\":\"\"},{\"time\":\"2016-12-13 02:24:43\",\"user\":\"Administrator\",\"content\":\"更新退款金额为 61 元\"},{\"time\":\"2016-12-13 02:33:33\",\"user\":\"Administrator\",\"content\":\"\"},{\"time\":\"2016-12-13 02:34:49\",\"user\":\"Administrator\",\"content\":\"更新退款金额为 60 元\"},{\"time\":\"2016-12-13 02:35:04\",\"user\":\"Administrator\",\"content\":\"已完成退款\"}]", 
                "refund_fee": 60, 
                "id": 1, 
                "created_date": "2016-12-13 14:03:26", 
                "express_number": null, 
                "order_id": 1, 
                "express_company": null, 
                "status": "REFUNDED"
            }, 
            "city": "GZ", 
            "invoice_title": "ABC company", 
            "receiving_time": "anytime", 
            "user_name": "Administrator", 
            "order_number": "1612131401365671", 
            "freight": 0, 
            "description": "aaaa x 2. ", 
            "remark": null, 
            "express_company": "afa", 
            "cover": "/p/7fe63684ff08bb7cb6414742232776ac.jpeg", 
            "express_code": "afsd", 
            "is_deleted": 0, 
            "province": "GD", 
            "street": "jianzhong road", 
            "is_deliver_reminder": 0, 
            "id": 1, 
            "express_number": "324242", 
            "previous_status": "DELIVERED_CONFIRM_PENDING", 
            "delivered_date": "2016-12-13 14:02:41", 
            "zip": "510000", 
            "deal_date": null, 
            "total_price": 66, 
            "contact_user": "Mr Huang", 
            "settled": 0, 
            "coupon_info": null, 
            "payment_type": "WECHAT", 
            "user_id": 1, 
            "phone": "1380000000", 
            "point_exchange_rate": 100, 
            "deliver_date": "2016-12-13 14:02:15", 
            "confirm_date": "2016-12-13 14:01:47", 
            "district": "Tiahne", 
            "created_date": "2016-12-13 14:01:36", 
            "invoice": 1, 
            "detail": "6F", 
            "status": "CLOSED_REFUNDED"
        }]
    }

# 我的订单详情
    GET http://112.74.26.228:10080/rest/order/0000000401456137520088034
    Query Para: Order Number - 订单号
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": {
            "detail": "6F",
            "phone": "1380000000",
            "contact_user": "Mr Huang",
            "remark": null,
            "invoice": 1,
            "street": "jianzhong road",
            "trade_number": null,
            "deal_date": null, //收货成交时间
            "city": "GZ",
            "id": 3,
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "confirm_date": null, //平台确认时间
            "description": "超效洁净护理洗衣液2.5L【全国包邮】 x 1. ",
            "province": "GD",
            "order_items": [{
                "id": 5,
                "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
                "price": 34.80,
                "cost_price": 20.00,
                "final_price": 34.80,
                "product_id": 1,
                "status": "CREATED",
                "product_name": "超效洁净护理洗衣液2.5L【全国包邮】",
                "quantity": 1,
                "order_id": 3,
                "product_specification_id": 2,
                "product_specification_name": "a1" //用户选择的规格
            }],
            "user_id": 1,
            "district": "Tiahne",
            "deliver_date": null, //开始发货时间
            "delivered_date": null, //完成发货时间
            "created_date": "2016-04-26 10:27:56", //创建时间
            "order_number": "0000000101461637676506360",
            "zip": "510000",
            "status": "CREATED_PAY_PENDING",
            "invoice_title": "ABC company",
            "receiving_time": "anytime",
            "deliver_order_number": null,
            "total_price": 34.80,
            "freight": 0.00,
            "pay_date": null, //支付时间
            "payment_type": "ALIPAY",
            "point_exchange_rate": 100, //积分支付时的兑换率
            "pay_expiry_time": "2018-08-20 17:53:01",// 待支付订单支付的超时时间
            "order_customer_service": {
                "reason": "afaf", //退货原因
                "express_code": null,
                "service_type": "RETURN", //售后类型： RETURN－退货退款， REFUND－仅退款
                "id": 1,
                "created_date": "2016-06-16 13:57:12",
                "express_number": "23234324", //快递单号
                "order_id": 1,
                "express_company": "ABC" //快递公司名
            }
        }
    }
    Error Return:
    {
        "message": "invalid.order.id",
        "status_code": 1
    }

# 我的订单数量统计
    GET http://112.74.26.228:10080/rest/order_count
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data" {
        "total": 12,   // 总订单
        "payPending": 2,  //待支付
        "delivering": 4,  //待发货
        "delivered": 2,  //待收货
        "commentPending": 2 //待评价
        }
    }

# 提醒发货
    GET http://112.74.26.228:10080/rest/order_deliver_reminder/0000000401456137520088034
    Query Para: Order Number - 订单号
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "message": "order.deliver.reminded",
        "status_code": 0
    }

# 订单评价
    PUT http://112.74.26.228:10080/rest/order_comment/0000000401456137520088034
    Query Para: Order Number - 订单号
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    { "comment_id": "12345" }
    Return:
    {
        "message": "ok",
        "status_code": 0
    }

# 新建订单
    POST http://112.74.26.228:10080/rest/order
    参考 下单前计算优惠信息 api 返回的优惠券，选择一个优惠劵进行下单。
    到支付宝支付时，把order-number的值赋给out_trade_no进行支付。
      微信支付 - WECHAT
      积分支付 - POINT
      钱包支付 - WALLET

    /**
    * 订单来源
    */
    public enum Origin {
        //微信公众号(Wechat public account)
        WPA,
        //小程序
        MINI_PROGRAM,
        //手机应用程序
        APP_ANDROID,
        APP_IOS,
        //其他
        OTHER
    }
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {       
        //配送方式：
        //1.EXPRESS-快递（默认，当不传此参数或传递null时会使用此方式）
        //2. SELF_PICK-自提（当使用此方式时，必须同时指定store_id和store_name）
        //3.FLASH-极速送达（当使用此方式时，必须同时指定store_id和store_name)
        //SELF_PICK和FLASH方式的线上订单，需要店员登录ipad端处理
        "delivery_type": null, 
        
        //订单来源
        //optional。default OTHER
        //WPA（Wechat public account)-微信公众号 MINI-PROGRAM-小程序 APP-手机应用程序 OTHER-其他
        "origin": "APP", 
        "pay_credit": 120, //使用积分抵扣
        "store_id": "123", //门店id
        "store_name": "门店1", //门店名
        "payment_type": "WECHAT",
        "remark": null,
        "receiving_time": "anytime", //收货时间
        "invoice": 1, //是否开发票
        "invoice_title": "ABC company", //发票抬头
        "contact": {
            "contact_user": "Mr Huang",
            "phone": "1380000000",
            "zip": "510000",
            "province": "GD",
            "city": "GZ",
            "district": "Tiahne",
            "street": "jianzhong road",
            "detail": "6F"
        },
        "order_items": [{
            "product_id": 1,
            "quantity": 2,
            "product_specification_id": 1  //optional， 用户选择的产品规格，如果没有则不需要这个项
        }]
    }
    Return:
    {
        "status_code": 0,
        "data": {
            "created_date": "2016-04-25",
            "order_number": "0000000101461584134091428",
            "status": "CREATED_PAY_PENDING",
            "remark": null,
            "total_price": 290.00,
            "id": 2,
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "description": "p1 x 2. ",
            "freight": 0.00,
            "province": "GD",
            "city": "GZ",
            "district": "LW",
            "street": "AX",
            "detail": null,
            "zip": "510000",
            "phone": "1390000000",
            "contact_user": "ABC",
            "receiving_time": "anytime",
            "invoice": 1,
            "invoice_title": "ABC company",
            "order_items": [{
                "id": 1,
                "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
                "price": 145.00,
                "final_price": 290.00,
                "cost_price": 0.00,
                "product_id": 1,
                "status": "CREATED",
                "product_name": "p1",
                "quantity": 2,
                "order_id": 2，
                "product_specification_id": 2, 
                "product_specification_name": "a1" //用户选择的产品规格
            }],
            "user_id": 1,
            "payment_type": null
        }
    }

# 店员新建订单
    POST http://112.74.26.228:10080/rest/store/order
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {       
        //以下两个字段是店员新建订单api额外需要提供的
        "store_id": 123,  //required 店铺id
        "store_name": "龙门客栈",  //required 店铺名称
        
        //其他需要提供的域同"新建订单api"
        "payment_type": "WECHAT",

        // 使用积分抵扣
        "pay_credit": 120,

        //订单来源
        //optional。default OTHER
        //WPA（Wechat public account)-微信公众号 MINI-PROGRAM-小程序 APP-手机应用程序 OTHER-其他
        "origin": "APP", 
            
        "remark": null,
        "receiving_time": "anytime", //收货时间
        "invoice": 1, //是否开发票
        "invoice_title": "ABC company", //发票抬头
        "contact": {
            "contact_user": "Mr Huang",
            "phone": "1380000000",
            "zip": "510000",
            "province": "GD",
            "city": "GZ",
            "district": "Tiahne",
            "street": "jianzhong road",
            "detail": "6F"
        },
        "order_items": [{
            "product_id": 1, //required, 产品id
            "product_specification_id": 1,  //optional,产品规格id
            "quantity": 2 //数量
        }]
    }
    Return: 同“新建订单api”

# 店员更新订单状态
    PUT http://112.74.26.228:10080/rest/store/order/<order-number>
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    注：店员操作的订单有两种：
    1.线下订单。
    收银员调用 `店员创建订单API` 下单，此API下单后会立刻返回此订单的信息，此订单的状态为“未支付”，配送方式为“自提”。

    稍后收银员收到钱之后，认为交易完成了，可以执行“完成(complete)"操作 来完成交易。

    当然客户可以随时取消交易，此时收银员需执行 “取消(cancel)"操作。
    2.终端用户下的线上订单。这种订单又可分为3种：
    （1）配送方式为“快递”的订单。这种是以前的方式。
    （2）配送方式为“自提”的订单（delivery_type: SELF_PICK)。这种方式的订单在下单时就指定了门店自提，即订单是关联一个店铺的。
        对于这种订单，终端用户在下单并支付之后，订单的状态为“已支付待确认”（即待处理），此时店员可以在ipad端对此订单执行
        
        “受理(accept)”操作,只能受理，受理后会关联结算店员，订单状态变为 CONFIRMED_PICK_PENDING 待取货。
        
        “受理(accept)”后的自提单 (订单状态是CONFIRMED_PICK_PENDING)，如果用户上门取货了，店员可以“完成(complete)”此订单。
        
    （3）配送方式为“极速送达”的订单（delivery_type: FLASH)。这种方式的订单在下单时就指定了极速送达（可能是用门店相关的物流系统），即订单也是关联一个店铺
    的。
    对于这种订单，终端用户在下单并支付之后，订单的状态为“已支付待确认”（即待处理），此时店员可以在ipad端对此订单执行
        
    “受理(accept)”/“拒绝(reject)”操作。
        
    拒绝通常是店员发现该店铺没货或其他原因导致本店铺不能处理该订单，这种情况下，api收到拒绝操作的请求，会把该订单所关联的店
        
    铺清空，好让平台可以指定其他门店来处理此订单。
        
    “受理(accept)”后的极速送达单处于待配送状态，如果店铺开始配送了，可以执行“开始配送delivering”操作。
        
    开始配送的订单，在店铺把货物送达客户，店员就执行“完成(complete)”来完成订单，不需终端用户自己按完成。
        
    注：不关联店铺的订单，店员是看不到的。比如上面介绍的本来是关联了一个店铺，但后来被店员拒绝的订单，拒绝之后，该订单就不关联此店
    铺了，需要由平台自行重新指定这个订单关联的店铺。
    Data:
    {
        "store_id": "123",  //required，店铺id
        "action": "complete"  //required, （complete-完成 cancel-取消 accept-受理 reject-拒绝 delivering-开始配送）
    }
    Return:
    { 
        "status_code": 0,
        "message": "更新订单成功"
    }

# 店员查看门店订单列表（线上，线下订单都在这里查看）
    GET http://112.74.26.228:10080/rest/store/order?pageNumber=1&pageSize=30&storeId=xxx&type=STORE_ORDER&status=CREATED_PAY_PENDING&status=PAID_CONFIRM_PENDING&contactUser=zhangsan&phone=111111&orderNumber=aaa&startTime=2018-05-01&endTime=2018-05-20
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Paras:
    storeId: required，店铺id
    type: required，订单类型（ORDER 线上订单 STORE_ORDER 线下订单）
    status: optional。可多个
    contactUser: 联系人姓名
    phone: 联系人电话
    orderNumber: 订单号
    startTime ~ endTime：返回的订单的创建时间在startTime ~ endTime之间
    注意：
    type：(1)STORE_ORDER：线下订单（由店员下的单） （ipad端收银 → 历史订单页面需传type=STORE_ORDER）
          (2)ORDER：线上订单（由终端用户下的单）（分两种：1.配送方式为“快递”的单  2.配送方式为“自提”或“极速送达”的单，这样的单在下单时是关联了一个店铺的。
    由于本api必须传递storeId，因此返回的订单只可能是“线下订单”或者“配送方式为自提或极速送达的线上订单” （ipad端 → 线上待处理订单 → 全部订单需传type=ORDER）
    Return:
    {
        "status_code": 0,
        "data": {
            "totalRow": 1,
            "pageNumber": 1,
            "firstPage": true,
            "lastPage": true,
            "totalPage": 1,
            "pageSize": 30,
            "list": [{
                "trade_number": null,
                "type": "STORE_ORDER",
                "express_company": null,
                "cover": "http://120.79.77.207:8080/images/p/0ea3308197aaccd2635c4b7d31717537.jpeg",
                "store_user_name": "user123",
                "express_code": null,
                "province": "",
                "delivery_type": "SELF_PICK",
                "id": 1,
                "previous_status": null,
                "delivered_date": null,
                "zip": "",
                "deal_date": null,
                "pay_credit": 0,
                "contact_user": "",
                "settled": 0,
                "coupon_info": null,
                "payment_type": "STORE",
                "store_user_id": "2",
                "user_id": 2,
                "phone": "",
                "point_exchange_rate": 100,
                "deliver_date": null,
                "confirm_date": null,
                "district": "",
                "detail": "",
                "status": "CREATED_PAY_PENDING",
                "pay_date": null,
                "deliver_order_number": null,
                "city": "",
                "invoice_title": null,
                "receiving_time": "anytime",
                "user_name": "user123",
                "order_number": "1807181114341472",
                "freight": 0,
                "description": "测试1 x 8. ",
                "mid": null,
                "remark": "iPad 端收银界面",
                "mname": null,
                "is_deleted": 0,
                "street": "",
                "store_name": null,
                "is_deliver_reminder": 0,
                "express_number": null,
                "store_id": null,
                "total_price": 8,
                "marketing_description": null,
                "marketing": null,
                "marketing_id": null,
                "created_date": "2018-07-18 11:14:34",
                "invoice": 0
            }]
        }
    }

# 店员查看门店订单详情
    GET http://112.74.26.228:10080/rest/store/order/<order-number>
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": {
            "trade_number": null,
            "type": "STORE_ORDER",
            "express_company": null,
            "cover": "http://120.79.77.207:8080/images/p/0ea3308197aaccd2635c4b7d31717537.jpeg",
            "store_user_name": "user123",
            "express_code": null,
            "province": "",
            "delivery_type": "SELF_PICK",
            "id": 1,
            "previous_status": null,
            "delivered_date": null,
            "order_items": [{
                "quantity": 8,
                "product_specification_id": null,
                "weight": 111,
                "product_specification_name": null,
                "product_name": "测试1",
                "marketing_description": null,
                "cover": "http://120.79.77.207:8080/images/p/0ea3308197aaccd2635c4b7d31717537.jpeg",
                "marketing": null,
                "final_price": 8,
                "price": 1,
                "product_id": 1,
                "marketing_id": null,
                "id": 1,
                "bulk": null,
                "order_id": 1,
                "partner_level_zone": 1,
                "barcode": null,
                "store_location": null,
                "status": "CREATED",
                "cost_price": 1
            }],
            "zip": "",
            "deal_date": null,
            "pay_credit": 0,
            "contact_user": "",
            "settled": 0,
            "coupon_info": null,
            "payment_type": "STORE",
            "store_user_id": "2",
            "user_id": 2,
            "phone": "",
            "point_exchange_rate": 100,
            "deliver_date": null,
            "confirm_date": null,
            "district": "",
            "detail": "",
            "status": "CREATED_PAY_PENDING",
            "pay_date": null,
            "deliver_order_number": null,
            "order_customer_service": null,
            "city": "",
            "invoice_title": null,
            "receiving_time": "anytime",
            "order_number": "1807181114341472",
            "freight": 0,
            "description": "测试1 x 8. ",
            "mid": null,
            "remark": "iPad 端收银界面",
            "mname": null,
            "is_deleted": 0,
            "street": "",
            "store_name": null,
            "is_deliver_reminder": 0,
            "express_number": null,
            "store_id": null,
            "total_price": 8,
            "marketing_description": null,
            "marketing": null,
            "marketing_id": null,
            "created_date": "2018-07-18 11:14:34",
            "invoice": 0
        }
    }

# 店员新建售后单
    POST http://112.74.26.228:10080/rest/store/order_customer_service
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {
        "store_id": "1", //required，店铺id
        "store_name": "总店", // required，店铺名
        
        //退货单分为"有关联订单的退货单“和”没有关联订单的退货单“，换货单必须关联订单。因此对于没有关联订单的退货单，不需
        //传递order_number，对于其他两种，则必须传递order_number
        "order_number": "2342323432432", 
        
        "service_type": "RETURN", //required，REFUND-仅退款 RETURN-退货退款   EXCHANGE-换货
        "reason": "AFSFSF", //required
        "content": "afaf", //optional
        "images": ["http://host/a.jpg", "http://host/b.jgp"], //optional
        "returns": [ //退货项
                {
                    "product_id": 130, //required（无论是否提供product_specification_id，都要提供product_id）
                    "product_specification_id": 22, //optional
                    
                    // 1.对于需要关联订单的退货单，不需要传递quantity，会使用其对应的order item的quantity；
                    // 2.对于不需要关联订单的退货单，必须传递quantity
                    // 3.对于一定要关联订单的换货单，这种单据有两个清单（退货项清单和置换项清单）。无论是退货项还是置换项，
                    //都必须指定quantity
                    "quantity": 3,
                    
                    //对于退货单的退货项，必须指定refund_fee；
                    //对于换货单的退货项，无需指定refund_fee，refund_fee由 
                    //“此换货单关联的订单对应的订单项的 price * 传上来的退回数量“ 决定
                    "refund_fee": 40
                }],
        "exchanges": [ //置换项
                {
                    "product_id": 122, //required
                    "quantity": 2 //required
                    //refund_fee无需提供
                },
                {
                    "product_id": 130, //required
                    "product_specification_id": 22, //optional
                    
                    // 1.对于需要关联订单的退货单，不需要传递quantity，会使用其对应的order item的quantity；
                    // 2.对于不需要关联订单的退货单，必须传递quantity
                    // 3.对于一定要关联订单的换货单，这种单据有两个清单（退货项清单和置换项清单）。无论是退货项还是置换项，
                    //都必须指定quantity
                    
                    "quantity": 3, //required
                    //refund_fee无需提供
                }]
    }
    
    Return:
    {
        "status_code": 0,
        "message": "order.customer.service.created"
    }

# 店员查看单个售后单
    GET http://112.74.26.228:10080/rest/store/order_customer_service/<service_number>
    Para:
    service_number: 售后单号
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": {
            "store_id": "1",
            "reason": "AFSFSF",
            "images": "[\"http://host/a.jpg\",\"http://host/b.jgp\"]",
            "log": "[{\"time\":\"2018-07-21 02:38:10\",\"user\":\"Administrator\",\"content\":\"afaf\"}]",
            "exchanges": [ //置换项（置换清单）（仅换货单有此项）
                {
                    "quantity": 2,  //数量
                    "product_specification_id": null, //产品规格id
                    "weight": 111,  //重量
                    
                    //项类型（RETURN - 退货项（退货单的项和换货单中的退货清单的项都属于此类型） EXCHANGE - 置换项）
                    "type": "EXCHANGE",
                    
                    "product_specification_name": null,
                    "order_customer_service_id": 3, //售后单id
                    "product_name": "水桶",  //产品名
                    "marketing_description": null,  //营销活动描述
                    "cover": "/p/dbe108b7e5c0283013ebc956f2cc2f4b.jpg",
                    "marketing": null,
                    "final_price": 22, //总价值
                    "price": 11, //价格
                    "refund_fee": null, //置换项没有退回金额，此处必为null
                    "product_id": 2, //产品id
                    "marketing_id": null, //营销活动id
                    "id": 6,
                    "cost_price": 1 //成本价
                }
                
            ],
            "express_company": null,
            "store_user_name": "Administrator", //店员名
            "express_code": null, //快递单号
            "service_type": "EXCHANGE", //售后单类型（REFUND-仅退款 RETURN-退货退款 EXCHANGE-换货）
            "store_user_id": "1",  //店员id
            
            //1.如果是退货单，此金额为此次退回应退回的金额。
            //2.如果是换货单，且退回项总价值大于置换项总价值，则有refund_fee；若小于，则有supplementary_fee
            "refund_fee": 68,   //退回金额
            "supplementary_fee": null, //补交金额
            
            "store_name": "总店", //店铺名
            "returns": [ //退货清单
                {                
                    "quantity": 3,
                    "product_specification_id": null,
                    "weight": 0,
                    
                    //项类型（RETURN - 退货项（退货单的项和换货单中的退货清单的项都属于此类型） EXCHANGE - 置换项）
                    "type": "RETURN", 
                    
                    "product_specification_name": null,
                    "order_customer_service_id": 3,
                    "product_name": "IPHONE",
                    "marketing_description": null,
                    "cover": null,
                    "marketing": null,
                    "final_price": 90,
                    "price": 30,
                    "refund_fee": 90, //退回金额
                    "product_id": 1,
                    "marketing_id": null,
                    "id": 5,
                    "cost_price": 0
                }
            ],
            "id": 3,
            "created_date": "2018-07-21 14:38:13",
            "express_number": null,
            "service_number": "180721143813797Administrator",
            "order_id": 1,
            "status": "CREATED",
            
            "order": { //该售后单所关联的订单（如果售后单没有关联订单，则order不存在）
                "trade_number": null,
                "type": "ORDER",
                "express_company": null,
                "cover": null,
                "store_user_name": null,
                "express_code": null,
                "province": "广东",
                "delivery_type": "EXPRESS",
                "id": 1,
                "previous_status": "DELIVERED_CONFIRM_PENDING",
                "delivered_date": "2018-07-20 12:58:40",
                "zip": null,
                "deal_date": null,
                "pay_credit": 0,
                "contact_user": "admin",
                "settled": 0,
                "coupon_info": null,
                "payment_type": "WECHAT",
                "store_user_id": null,
                "user_id": 1,
                "phone": "111",
                "point_exchange_rate": 100,
                "deliver_date": "2018-07-20 12:58:36",
                "confirm_date": "2018-07-20 12:58:32",
                "district": "荔湾区",
                "detail": null,
                "status": "CANCELED_RETURN_PENDING",
                "pay_date": "2018-07-21 12:58:23",
                "deliver_order_number": "111",
                "city": "广州",
                "invoice_title": null,
                "receiving_time": null,
                "order_number": "17072614522001811012",
                "freight": 0,
                "description": null,
                "mid": null,
                "remark": null,
                "mname": null,
                "is_deleted": 0,
                "street": null,
                "store_name": null,
                "is_deliver_reminder": 0,
                "express_number": null,
                "store_id": null,
                "total_price": 500,
                "marketing_description": null,
                "marketing": null,
                "marketing_id": null,
                "created_date": "2018-07-20 12:58:19",
                "invoice": 0
            },
            "order_items": [ ////该售后单所关联的订单的订单项
                {
                    "quantity": 3,
                    "product_specification_id": null,
                    "weight": 0,
                    "product_specification_name": null,
                    "product_name": "IPHONE",
                    "marketing_description": null,
                    "cover": null,
                    "marketing": null,
                    "final_price": 90,
                    "price": 30,
                    "product_id": 1,
                    "marketing_id": null,
                    "id": 1,
                    "bulk": 0,
                    "order_id": 1,
                    "partner_level_zone": null,
                    "barcode": null,
                    "store_location": null,
                    "status": "CREATED",
                    "cost_price": 0
                }
            ]
        }
    }

# 店员查看订单数量统计
    GET http://112.74.26.228:10080/rest/store/order_count?storeId=1
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Param:
    storeId - 门店的ID
    Return:
    {
        "status_code": 0,
        "data": {
            "totalPrice": 14566, //订单总金额
            "delivering": 0, // 配送中
            "total": 6,  //总订单数
            "handlePending": 0,  //待处理
            "cancled": 0, //取消
            "closed": 2,  // 完成
            "pickPending": 0,  // 待取货
            "deliverPending": 1  //待配送
        }
    }

# 店员查看售后单列表
    GET http://112.74.26.228:10080/rest/store/order_customer_service?pageNumber=1&pageSize=30&
    storeId=123&serviceType=RETURN&serviceNumber=1234&startTime=2018-01-01&endTime=2018-02-02
    Para:
    storeId: optional,门店id
    service_number: optional,售后单号
    serviceType: optional, 售后单类型(REFUND-仅退款 RETURN-退货退款 EXCHANGE-换货）
    startTime ~ endTime: 若同时提供，则返回创建时间在此范围内的售后单列表
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": {  
            "totalRow": 1,
            "pageNumber": 1,
            "lastPage": true,
            "firstPage": true,
            "totalPage": 1,
            "pageSize": 30,
            "list": [
                {
                    "store_id": "1",  //门店id
                    "reason": "AFSFSF", //原因
                    "images": "[\"http://host/a.jpg\",\"http://host/b.jgp\"]",
                    "log": "[{\"time\":\"2018-07-21 02:38:10\",\"user\":\"Administrator\",\"content\":\"afaf\"}]",
                    "user_name": "Administrator", //订单用户id
                    "order_number": "17072614522001811012", //订单号
                    "express_company": null, //快递公司
                    "store_user_name": "Administrator", //店员名
                    "express_code": null,
                    "service_type": "EXCHANGE", //售后单类型（REFUND-仅退款 RETURN-退货退款 EXCHANGE-换货）
                    "store_user_id": "1", //店员id
                    "refund_fee": 68,  //退款金额
                    "supplementary_fee": null, //补交金额
                    "store_name": "总店", //门店名称
                    "id": 3,
                    "created_date": "2018-07-21 14:38:13",
                    "express_number": null, //快递单号
                    "service_number": "180721143813797Administrator",  //售后单单号
                    "order_id": 1,
                    "status": "CREATED"
                }
            ]
        }
    }

# 删除订单
    DELETE http://112.74.26.228:10080/rest/order/<order-number>
    注意：
    只有订单状态为一下四种时可以删除：
    1. CLOSED_PAY_TIMEOUT
    2. CLOSED_CANCELED
    3. CLOSED_CONFIRMED 同时 settled 字段是 1
    4. CLOSED_REFUNDED
    parameter:
    order-number : 订单号
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "message": "order.delete.success"
    }

# 分享订单拿优惠券
    POST http://112.74.26.228:10080/rest/order_share
    只有CLOSED_CONFIRMED的订单才可以分享。
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data：
    {
        "order_number": "2343243242"
    }
    Return:
    {
        "STATUS_CODE": 1,
        "DATA": {
            "CODE": "WRWFAFEF",  //分享CODE，用这个CODE去构建分享到朋友圈时的链接的参数。
            "ORDER_NUMBER": "2343243242"
        }
    }

# 查看售后原因列表
    GET http://112.74.26.228:10080/rest/customer_service_type
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": [
            {
                "name": "fasfa",
                "id": 1
            },
            {
                "name": "e34543kkk",
                "id": 2
            }
        ]
    }

# 新建售后单
    POST http://112.74.26.228:10080/rest/order_customer_service
    订单到达 DELIVERED_CONFIRM_PENDING (待收货） 可以发起退货申请  
    订单状态变成 CANCELED_RETURN_PENDING  （待退货），订单项状态变为 退货中， 退货单状态为新建
    后台通过后，退货单变为 待退货 
    后台收到退货后，变成 待退款
    后台完成退款，订单状态变为 DELIVERED_CONFIRM_PENDING （如果还有其他商品没有退货），变为 REFUNDED （已退款，如果所有商品都退了），订单项状态变为 已退款，退货单状态变为 已退款。

    退货单状态  ： 待处理（CREATED）， RETURN_PENDING (待退货）， REFUND_PENDING (待退款） REFUNDED  （已退款）， CANCELED （取消/拒绝）
    当订单状态是CONFIRMED_DELIVER_PENDING 或者DELIVERED_CONFIRM_PENDING 时，可以发起退款 （service_type is REFUND) 请求。
    当订单状态是DELIVERED_CONFIRM_PENDING 时，可以发起退货退款 （service_type is RETURN) 请求 或 换货 （service_type is EXCHANGE) 请求。
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {
        "order_number": "2342323432432", //订单号
        "service_type": "RETURN",  //RETURN: 退货退款, REFUND: 仅退款， EXCHANGE: 换货
        "reason": "AFSFSF", //原因
            "content": "不要了。", //回复信息
            "images": ["http://localhost/image/a.jpg", "http://loalhost/image/b.jpg"],
            "returns": [  //退货产品
                {
                    "product_id": 1,
                    "quantity": 2
                },
                {
                    "product_id": 2,
                    "quantity": 2
                }
            ]
    }

# 查看售后单
    GET http://112.74.26.228:10080/rest/order_customer_service/:id
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Parameter: id
    售后单状态说明：
        CREATED - 待处理
        HANDLING - 处理中
        RETURN_PENDING - 等待货品寄回
        DELIVING - 换货中
        REFUND_PENDING - 待退款
        REFUNDED - 已退款
        CANCELED - 已取消
        EXCHANGED - 已换货
    Return:
    {
        "status_code": 0,
        "data": {
            "reason": "AFSFSF",
            "express_code": null,
            "service_type": "RETURN",
            "images": [
                "http://o9ixtumvv.bkt.clouddn.com/20160729173227596-Vo1I7nGC.png",
                "http://o9ixtumvv.bkt.clouddn.com/20160729173227596-Vo1I7nGC.png"
            ],
            "log": [
            {
                "time": "2016-07-29 05:39:19",
                "user": "Administrator",
                "content": "不要了。"
            }
            ],
            "id": 1,
            "created_date": "2016-07-29 17:39:19",
            "express_number": null,
            "order_id": 1,
            "express_company": null,
            "status": "CREATED"
        }
    }

# 更新售后单
    PUT http://112.74.26.228:10080/rest/order_customer_service/:id
    对申请退货的订单更新物流信息.
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Parameter: id
    Data:
    {
        "express_company": "ABC",  //optional, 快递公司名称
        "express_number": "23234324", //optional, 快递单号
        "content": "anymessage" //optional， 回复给平台的消息
    }

# 微信支付
    GET http://www.kequandian.net/app/payment/wpay/<order-number>
    微商城专用支付URL。
    注意： 这个URL不是API的地址，是app所在服务器的地址. 可以直接访问 /app/payment/wpay/<order_number>
    新建订单成功后，把order_number作为参数调用这个URL，会发引微信支付请求。

# 微信支付码生成
    POST http://112.74.26.228:10080/rest/wx/push_order
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    PC商城/PAD端 用于生成支付二维码。
    PC端应该根据返回的codeUrl生成二维码，给用户扫码
    Data:
    {
        “order_type": "Order",
        "order_number": "12346", //订单号
        "type": "NATIVE"  //type必须是NATIVE
    }
    Return:
    {
        "status_code": 0,
        "data": {
            "timeStamp": "1533188289",
            "codeUrl": "weixin://wxpay/bizpayurl?pr=bJ1XIh4",
            "package": "prepay_id=wx02133732079021563094f24c1615005248",
            "paySign": "7EEC46D61249DD469759CF598284A0DC",
            "totalFee": "11",
            "appId": "wx117676b671891683",
            "signType": "MD5",
            "title": "DEMO",
            "nonceStr": "1533188289855"
        }
    }

# 确认订单
    PUT http://112.74.26.228:10080/rest/order/0000000101455770560193531
    用户收货后确认订单。订单当前状态是 DELIVERED_CONFIRM_PENDING 时才可以确认。
    parameter: ORDER-NUMBER
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {
        "status":"CLOSED_CONFIRMED"
    }
    Return:
    {
        "message": "order.updated",
        "status_code": 0
    }
    Error Return:
    {
        "message": "order.status.transfer.error",
        "status_code": 1
    }

# 查看订单物流信息
    GET http://112.74.26.228:10080/rest/express_info?order_number=0000000101455770560193531
    parameter:
    order_number - ORDER-NUMBER
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    state: 
        /* 快递单当前的状态 ：　
        0：在途，即货物处于运输过程中；
        1：揽件，货物已由快递公司揽收并且产生了第一条跟踪信息；
        2：疑难，货物寄送过程出了问题；
        3：签收，收件人已签收；
        4：退签，即货物由于用户拒签、超区等原因退回，而且发件人已经签收；
        5：派件，即快递正在进行同城派件；
        6：退回，货物正处于退回发件人的途中；
        */
    Return:
    {
        "com": "baishiwuliu",
        "data": [{
            "context": "镇江市|签收|镇江市【新句容】，百世邻里下蜀代理点 已签收",
            "time": "2016-06-19 18:12:40"
        }, {
            "context": "镇江市|派件|镇江市【新句容】，【下蜀 陈龙/18112812262】正在派件",
            "time": "2016-06-19 11:26:05"
        }, {
            "context": "镇江市|到件|到镇江市【新句容】",
            "time": "2016-06-19 07:20:20"
        }, {
            "context": "南京市|发件|南京市【南京转运中心】，正发往【新句容】",
            "time": "2016-06-19 02:24:17"
        }, {
            "context": "南京市|到件|到南京市【南京转运中心】",
            "time": "2016-06-19 01:31:20"
        }, {
            "context": "广州市|到件|到广州市【广州转运中心】",
            "time": "2016-06-18 02:24:44"
        }, {
            "context": "广州市|发件|广州市【广州白云石槎分部】，正发往【广州转运中心】",
            "time": "2016-06-18 01:12:42"
        }, {
            "context": "广州市|收件|广州市【广州白云石槎分部】，【田001/02036450972】已揽收",
            "time": "2016-06-17 18:45:46"
        }, {
            "context": "广州市|发件|广州市【广州转运中心】，正发往【南京转运中心】",
            "time": "2016-06-10 04:13:25"
        }],
        "comcontact": "400-8856-561",
        "succeed": true,
        "nu": "70534708088780",
        "company": "baishiwuliu",
        "state": "3",
        "message": "ok",
        "status": "1"
    }
    Failure Return:
    {
        "message": "cannot.find.express.info",
        "status_code": 1
    }

# 购物车列表
    GET http://112.74.26.228:10080/rest/shopping_cart
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": [{
            "created_date": "2016-04-25 19:15:45",
            "id": 3,
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "price": null, //price正常情况是有的，如果为null，则表示出错了，对应两种出错原因：1.由于用户未配置默认配 
                           //送区域而不能计算价格；2.用户配置了默认配送区域，但对应的批发活动的区域价格定义中没有匹配 
                           //的，也不能计算价格
            "msg": "尚未配置默认配送区域，将不能计算价格",  //如果price为  //null，则会提供该msg域，提示错误信息，有两种错误信息，分别对应上述两种出错原因
            "marketing": "WHOLESALE",  //营销活动 （WHOLESALE代表批发活动）
            "marketing_id": "1",  //批发活动id
            "product_id": 1,
            "fare_id": 1,  //运费模版ID
            "product_name": "超效洁净护理洗衣液2.5L【全国包邮】",
            "quantity": 1,
            "user_id": 4,
            "product_specification_name": "a1",//规格名称
            "product_specification_id": 2  //规格ID，提交订单时用
        },{
            "created_date": "2016-04-25 19:15:45",
            "id": 3,
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "price": 34.80,
            "product_id": 1,
            "fare_id": 1,  //运费模版ID
            "product_name": "超效洁净护理洗衣液2.5L【全国包邮】",
            "quantity": 1,
            "user_id": 4,
            "product_specification_name": "a1",//规格名称
            "product_specification_id": 2  //规格ID，提交订单时用
        }, {
            "created_date": "2016-04-25 19:15:45",
            "id": 4,
            "cover": "http://112.74.26.228:8000/p/2b3edeb3c3ca2a12b06893cb12286710.png",
            "price": 69.60,
            "product_id": 3,
            "fare_id": 1,
            "product_name": "超效洁净护理洗衣液2.5Lx2瓶【全国包邮】",
            "quantity": 1,
            "user_id": 4
        }]
    }

# 添加到购物车
    POST http://112.74.26.228:10080/rest/shopping_cart?increase=false
    如果已存在，则更新，如果quantity是0，则删除。
    parameter:
    increase - optional, default true. 如果为true则累加购物车数量，为false则替换数量。
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    [{
        "product_id": 1,
        "quantity": 1,
        "product_specification_id": 1, //optional, 选择的产品规格ID
        "marketing_id": 1, //optional 营销活动id
        "marketing": "WHOLESALE"  //optional 营销活动(一般是批发 WHOLESALE,团购是直接下单的）
    }, {    //非批发产品不需要提供 marketing_id 和 marketing 字段
        "product_id": 3,
        "quantity": 1
    }]
    Return 购物车列表:
    {
        "status_code": 0,
        "data": [{
            "created_date": "2016-04-25 19:15:45",
            "id": 3,
            "cover": "http://112.74.26.228:8000/p/516c02b5e8ceb745b6dd61b6e77b3e17.png",
            "price": 34.80,
            “weight": 1000, // 重量
            "bulk": 1000, //体积
            "product_id": 1,
            "free_shipping": 1,
            "product_name": "超效洁净护理洗衣液2.5L【全国包邮】",
            "freight": 0.00,
            "quantity": 1,
            "product_specification_name": "a1",//规格名称
            "user_id": 4,
            "marketing_id": 1,
            "marketing": "WHOLESALE"  
        }, {
            "created_date": "2016-04-25 19:15:45",
            "id": 4,
            "cover": "http://112.74.26.228:8000/p/2b3edeb3c3ca2a12b06893cb12286710.png",
            "price": 69.60,
            “weight": 1000, // 重量
            "bulk": 1000, //体积
            "product_id": 3,
            "free_shipping": 1,
            "product_name": "超效洁净护理洗衣液2.5Lx2瓶【全国包邮】",
            "freight": 0.00,
            "quantity": 1,
            "user_id": 4,
            "marketing_id": null
            "marketing": null
        }]
    }

# 删除购物车
    清空购物车
    DELETE http://112.74.26.228:10080/rest/shopping_cart
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": "shopping_cart.delete.success"
    }

# 我的地址列表
    GET http://112.74.26.228:10080/rest/contact
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": [{
            "id": 3,
            "zip": "510000",
            "detail": "6F",
            "phone": "1380000000",
            "contact_user": "Mr Huang",
            "street": "jianzhong road",
            "province": "GD",
            "is_default": 1,
            "street_number": "50",
            "user_id": 4,
            "district": "Tiahne",
            "city": "GZ"
        }]
    }

# 添加新地址
    POST http://112.74.26.228:10080/rest/contact
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {
        "contact_user": "Mr Huang",
        "phone": "1380000000",
        "zip": "510000",
        "province": "GD",
        "city": "GZ",
        "district": "Tiahne",
        "street": "jianzhong road",
        "street_number": "50",
        "detail": "6F",
        "is_default": 1
    }
    Return:
    {
        "status_code": 0,
        "data": "contact.saved"
    }

# 更新地址
    PUT http://112.74.26.228:10080/rest/contact/id
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {       
        "contact_user": "Mr Huang",
        "phone": "1380000000",
        "zip": "510000",
        "province": "GD",
        "city": "GZ",
        "district": "Tiahne",
        "street": "jianzhong road",
        "street_number": "50",
        "detail": "6F",
        "is_default": 0
    }
    Return:
    {       
        "status_code": 0,
        "data": {
            "id": 1,
            "contact_user": "Mr Huang",
            "phone": "1380000000",
            "zip": "510000",
            "province": "GD",
            "city": "GZ",
            "district": "Tiahne",
            "street": "jianzhong road",
            "street_number": "50",
            "detail": "6F"
            "is_default": 0,
            "user_id": 1
        }
    }

# 删除地址
    DELETE http://112.74.26.228:10080/rest/contact/id
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": "contact.deleted"
    }

# 得到默认地址
    GET http://112.74.26.228:10080/rest/default_contact
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": {
            "id": 73,
            "zip": "510000",
            "detail": "5F",
            "phone": "1380000000",
            "contact_user": "Mr Huang",
            "street": "jianzhong roadxxxxx",
            "province": "广东省",
            "is_default": 1,
            "street_number": "50",
            "user_id": 4,
            "district": "天河区",
            "city": "广州市"
        }
    }

# 更新默认地址
    PUT http://112.74.26.228:10080/rest/default_contact/id
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "message": "contact.updated",
        "status_code": 0
    }

# 默认快递
    GET http://112.74.26.228:10080/rest/default_express
    Return:
    {
        "status_code": 0,
        "data": {
            "code": "ff",
            "name": "天天快递",
            "id": 2,
            "is_default": 1,
            "enabled": 1
        }
    }

# 运费计算
    POST http://112.74.26.228:10080/rest/product_carriage
    Data:
        {
            "delivery_type": "EXPRESS",  //可选项：EXPRESS, SELF_PICK, FLASH, 默认EXPRESS
            "province": "广东",
            "city": "广州",
            "data":[
                {
                    "fare_id": 1,
                    "price": 23.20,
                    "quantity": 4,
                    "weight": 500, //该产品的重量，从product可以拿到，单位是g
                    "bulk": 100 //该产品的体积， 可以忽略
                }
            ]
        }
    Return:
    {
        "status_code": 0,
        "data": {
            "carriage": 4.00,  //运费
            "message": "付同样的运费,还可以拼单0.30KG哦.", 
            "delta": -180.00  //可忽略。距离满包邮的差额。注意：这是一个负数。只有是负数时才表示离满包邮有差额。
        }
    }

# 查询产品限购
    GET http://112.74.26.228:10080/rest/product_purchase_strategy?productId=234&quantity=2
    parameter:
    productId - 产品ID
    quantity - 购买数量
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    可以购买，
    Return:
    {
        "status_code": 0,
        "message": "ok"
    }
    限购了， 不能购买，
    Return:
    {
        "status_code": 1,
        "message": "超出购买限额, 限购2件, 你过去10天内已购买过1件. "
    }

# 拥金API

# 查看提现账号信息
    GET http://112.74.26.228:10080/rest/withdraw_account
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": [{
            "id": 1,
            "bank_name": null,
            "owner_name": "Mr.A",
            "account": "234234234324",
            "user_id": 1,
            "type": "ALIPAY"
        }]
    }

# 添加提现账号信息
    POST http://112.74.26.228:10080/rest/withdraw_account
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Type:
        public enum Type {
            ALIPAY, //支付宝
            WECHAT, //微信 
            BANK //银行
        }
    Data:
    {
        "owner_name": "Mr.A",
        "type": "ALIPAY",
        "account": "234234234324",
        "bank_name":"中国工商银行科韵路支行" //当type为BANK时需要
    }
    Return:
    {
        "message": "withdraw.account.created",
        "status_code": 0
    }

# 删除提现账号信息
    DELETE http://112.74.26.228:10080/rest/withdraw_account/id
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Parameter:
    id - 账户ID
    Return:
    {
        "message": "withdraw.account.deleted",
        "status_code": 0
    }

# 查看余额
    GET http://112.74.26.228:10080/rest/owner_balance
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Success Return:
    {
        "status_code": 0,
        "data": {
            "total_reward": 8, //总提成
            "balance": 2, //可用余额
            "is_agent": true, //是否是代理商
            "is_seller": true, //是否是销售商
            "is_partner": true, //是否是经销商
            "is_crown": true, //是否皇冠
            "is_crown_ship_temp": true,  //是否为临时皇冠，临时皇冠不能进入线下门店
            "is_physical": true, //是否线下资格
            "is_copartner": true, //是否合伙人
            "partner_pool_count": 9, //合伙人池人数
            "partner_level": {   //如果不是经销商，那么就为null
                "id": 1,
                "level": 1,  //表示该经销商的级别，1表示一星
                "headcount_quota": 3,
                "name": "一星经销商"
            },
            "next_partner_level": {  //如果没有下一级，那么就为null
                "id": 2,
                "level": 2,  //下一级别
                "headcount_quota": 3, //下一星的人数
                "name": "二星经销商"
            },    
        }，
        "msg": "您现在是临时线下皇冠商，成为永久线下皇冠商需要在4小时内完成2000元的批发任务"  //如果是临时线下皇冠商，则会出现 //此提示
    }

# 申请提现
    POST http://112.74.26.228:10080/rest/owner_balance
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
        { 
            "withdraw_type": "Wallet", // optional, wallet为提现到零钱帐户
            "withdraw_account_id": 1, // optional, 账户ID
            "withdraw_cash": 100.00  //提现金額
        }
    Success Return:
    {
        "message": "apply.success",
        "status_code": 1
    }
    Failure Return:
    {
        "message": "apply.failure",
        "status_code": 1
    }

# 查看提现历史记录
    GET http://112.74.26.228:10080/rest/reward_cash
    Parameters:
    page_number - optional, 页码，default 1;
    page_size - optional, 每页记录数，default 30;
    start_date - optional, 开始时间， default 上个月;
    end_date - optional, 结束时间， default 今天。
    Header: Authorization: eyJ0b2tlbiI6IjQzN2NhZjRiYjQxOWZhZGEwZDgwYmFmMTEzYjY0OGNlMzdiM2NmYWQiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    状态：
        public enum Status {
            APPLYING,
            REJECTED,
            HANDLING,
            COMPLETED
        }
    Return:
    {
        "status_code": 0,
        "data": [
            {
                "id": 2,
                "apply_time": "2016-06-16 13:23:39",
                "bank_name": null,
                "account_number": "oXauMwcMqGeV6zdHGL_1CcmjlQUg",
                "status": "APPLYING",
                "name": "Jacky.D.H",
                "cash": 100,
                "owner_id": 62,
                "complete_time": null,
                "reject_time": null,
                "account_name": "Jacky.D.H",
                "account_type": "WECHAT"
            }
        ]
    }

# 查看分成订单汇总信息
    GET http://112.74.26.228:10080/rest/order_item_reward
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    查询参数:
    page_number - optional, 页数
    page_size - optional, 每页记录数
    start_date - optional, 开始时间
    end_date - optional, 结束时间
    默认查当月的数据。
    分成类型：
        public enum Type {
            SELLER, //分销商
            AGENT, //代理商
            PLATFORM,//平台
            PARTNER //合伙人
        }
    拥金状态：
        public enum State {
            PENDING_SETTLEMENT, //待结算
            SETTLED, //已结算， 只有已结算的拥金才会有余额里体现
            REFUNDED //已退款， 表示该订单已发生退货退款，本分成无效。
        }
    resp:
    {
        "status_code": 0,
        "data": {
        "order_item_rewards": [
            {
                "reward": 2,
                "created_time": "2016-06-05 11:11:22",
                "level": 1, //结合type一起使用，表示参与分成时的级别，比如type=SELLER, level=1, 表示作为一级分销商参与分成
                "owner_id": 1,
                "order_number": "1234567890", //订单号
                "order_profit": 20, //整个订单项的利润,页面不应显示出来
                "settled_time": null,
                "type": "AGENT", //分成的角色，AGENT：作为代理商分成
                "percent": 10, //分成比例，前端ignore，页面不应显示出来
                "withdrawn_time": null,
                "product_name": "A", //产品名称
                "product_price": 20.00, //产品价格
                "product_quantity": 1, //产品数量
                "order_item_id": 1,
                "cover": "/assets/img/find_user.png", //产品图片
                "name": "Administrator", 
                "id": 4,
                "state": "SETTLED", //分成状态
                "order_id": 1,
                "payment_type": "WECHAT",
                "point_exchange_rate": 100
            },
            {
                "reward": 2,
                "created_time": "2016-06-05 11:11:22",
                "level": 3,
                "owner_id": 1,
                "order_number": "1234567890",
                "order_profit": 20,
                "settled_time": null,
                "type": "PARTNER",
                "percent": null,
                "withdrawn_time": null,
                "product_name": "A",
                "order_item_id": 1,
                "cover": "/assets/img/find_user.png",
                "name": "Administrator",
                "id": 3,
                "state": "PENDING_SETTLEMENT",
                "order_id": 1,
                "payment_type": "WECHAT",
                "point_exchange_rate": 100
            },
            {
                "reward": 2,
                "created_time": "2016-06-05 11:11:22",
                "level": 1,
                "owner_id": 1,
                "order_number": "1234567890",
                "order_profit": 20,
                "settled_time": null,
                "type": "SELLER",
                "percent": 10,
                "withdrawn_time": null,
                "product_name": "A",
                "order_item_id": 1,
                "cover": "/assets/img/find_user.png",
                "name": "Administrator",
                "id": 2,
                "state": "PENDING_SETTLEMENT",
                "order_id": 1,
                "payment_type": "WECHAT",
                "point_exchange_rate": 100
            },
            {
                "reward": 2,
                "created_time": "2016-06-05 11:11:22",
                "level": null,
                "owner_id": 1,
                "order_number": "1234567890",
                "order_profit": 20,
                "settled_time": null,
                "type": "SELF",
                "percent": 10,
                "withdrawn_time": null,
                "product_name": "A",
                "order_item_id": 1,
                "cover": "/assets/img/find_user.png",
                "name": "Administrator",
                "id": 1,
                "state": "PENDING_SETTLEMENT",
                "order_id": 1,
                "payment_type": "WECHAT",
                "point_exchange_rate": 100
            }
        ],
        "pending_reward": 6,
        "settled_reward": 2,
        "total_order_count": 2,
        "settled_order_count": 1,
        "pending_order_count": 1
        }
    }

# 查看产品分成
    GET http://112.74.26.228:10080/rest/product_settlement?id=<product-id>&marketingType=<type>&marketingId=<id>
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    查询参数:
    	id - integer,required, 产品ID
    	marketingType - string, optional, 营销活动类型，如拼团为PIECE-GROUP
    	marketingId - integer, optinal, 营销活动ID
    Return:
    {
        "status_code": 0,
        "data": 30.00
    }

# 分销API

# 我的分销商层次信息
    GET http://112.74.26.228:10080/rest/seller_level
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return:
    {
        "status_code": 0,
        "data": {
            "result": true,
            "levels": [2, 1, 0], //各级的分销商总数
            "max_level": 3  //三级分销
        }
    }

# 我的分销商信息
    GET http://112.74.26.228:10080/rest/seller
    返回下一级的朋友
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return:
    {
        "status_code": 0,
        "data": {
            "id": 1,
            "user_name": "Administrator",
            "partner_id": null,  //合伙人ID
            "level": 1,
            "partner_ship": 1, //是否是合伙人 
            "partner_pool_count": 9, //合伙人池人数
            "seller_ship_time": "2016-04-28 13:08:35", //成为分销商时间
            "partner_ship_time": "2016-04-28 13:08:35", //成为合伙人时间
            "user_id": 1,
            "seller_ship": 1, //是否是分销商
            "parent_id": null,
            "followed": 1, //是否关注公众号
            "follow_time": "2016-05-06 12:00:00", //关注时间
            "unfollowed_children_count": 0, //未关注的下级总数
            "followed_children_count": 0, //已关注的下级总数
            "agent_ship": 1, //是否是代理商
            "partner_level": {   //如果不是经销商，那么就为null
                "id": 1,
                "level": 1,  //表示该经销商的级别，1表示一星
                "headcount_quota": 3,
                "name": "一星经销商"
            },
            "next_partner_level": {  //如果没有下一级，那么就为null
                "id": 2,
                "level": 2,  //下一级别
                "headcount_quota": 3, //下一星的人数
                "name": "二星经销商"
            },
            "children": [{
                "seller_ship_time": null,
                "level": 2, //没用，忽略
                "partner_ship_time": null,
                "user_name": "abc", //用户名
                "avatar": null, //头像URL
                "sa_level": 1, //属于该分销商的第几级分销商.只有type=all时才有这个属性。
                "partner_id": null,
                "user_id": 3,
                "partner_ship": 0,
                "parent_id": 1,
                "id": 3,
                "seller_id": 3,
                "seller_ship": 0,
                "followed": 1, //是否关注公众号
                "follow_time": "2016-05-06 12:00:00", //关注时间
                "agent_ship": 1, //是否是代理商
                "register_date": "2018-10-11", //注册时间
                "grade": "1" // VIP系统的会员级别ID
            }, {
                "seller_ship_time": null,
                "level": 2,
                "partner_ship_time": null,
                "user_name": "xyz",
                "avatar": null,
                "sa_level": 1,
                "partner_id": null,
                "user_id": 9,
                "partner_ship": 0,
                "parent_id": 1,
                "id": 9,
                "seller_id": 9,
                "seller_ship": 0,
                "followed": 1, //是否关注公众号
                "follow_time": "2016-05-06 12:00:00", //关注时间
                "agent_ship": 0 //是否是代理商
            }, {
                "seller_ship_time": null,
                "level": 3,
                "partner_ship_time": null,
                "user_name": "a",
                "avatar": null,
                "sa_level": 2,
                "partner_id": null,
                "user_id": 4,
                "partner_ship": 0,
                "parent_id": 3,
                "id": 4,
                "seller_id": 4,
                "seller_ship": 0,
                "followed": 1, //是否关注公众号
                "follow_time": "2016-05-06 12:00:00", //关注时间
                "agent_ship": 0 //是否是代理商
            }, {
                "seller_ship_time": null,
                "level": 3,
                "partner_ship_time": null,
                "user_name": "b",
                "avatar": null,
                "sa_level": 2,
                "partner_id": null,
                "user_id": 5,
                "partner_ship": 0,
                "parent_id": 3,
                "id": 5,
                "seller_id": 5,
                "seller_ship": 0,
                "followed": 1, //是否关注公众号
                "follow_time": "2016-05-06 12:00:00", //关注时间
                "agent_ship": 1 //是否是代理商
            }]
        }
    }

# 下级分销商信息
    GET http://112.74.26.228:10080/rest/seller/seller_id
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Parameter: seller_id - 下级分销商ID
    Return:
    {
        "status_code": 0,
        "data": {
            "id": 2,
            "user_name": "a",
            "partner_id": 1,
            "level": 2,
            "partner_ship": 0,
            "seller_ship_time": null,
            "partner_ship_time": null,
            "followed": 1, //是否关注公众号
            "follow_time": "2016-05-06 12:00:00", //关注时间
            "children": [{
                "id": 4,
                "user_name": "a1",
                "partner_id": 1,
                "level": 3,
                "partner_ship": 0,
                "seller_ship_time": null,
                "partner_ship_time": null,
                "user_id": 4,
                "seller_ship": 0,
                "parent_id": 2,
                "followed": 1, //是否关注公众号
                "follow_time": "2016-05-06 12:00:00" //关注时间
            }, {
                "id": 5,
                "user_name": "a2",
                "partner_id": 1,
                "level": 3,
                "partner_ship": 0,
                "seller_ship_time": null,
                "partner_ship_time": null,
                "user_id": 5,
                "seller_ship": 0,
                "parent_id": 2,
                "followed": 1, //是否关注公众号
                "follow_time": "2016-05-06 12:00:00"//关注时间
            }],
            "user_id": 2,
            "seller_ship": 0,
            "parent_id": 1
        }
    }

# 申请成为分销商
    POST http://112.74.26.228:10080/rest/seller
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    申请成为皇冠商时的前提：申请成为皇冠商开关已打开
    Data:
    {
        "real_name": "Huang",
        "phone": "1308888899",
        "type": "CROWN" //申请类型，默认不填则为申请 分销商 资格。 CROWN为申请线下皇冠商资格。
    }
    Return:
    {
        "status_code": 0,
        "data": {
            "seller_ship": 1
        }
    }

# 以扫码方式申请成为某皇冠商的"线下经销商"或"线下皇冠商"
    POST http://112.74.26.228:10080/rest/physical_seller
    成为皇冠商前提：以扫码方式申请成为皇冠商的开关已经打开
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Tips:
    1.若申请人是一个Seller，申请内容是线下经销商，则递交成为线下经销商的申请
    2.若申请人本身是一个线下经销商，申请内容是皇冠商，此时会根据自动审核皇冠商机制来自动给予皇冠商资格
    3.若申请人是一个Seller,申请内容是线下皇冠，此时会先申请成为线下并自动通过，然后申请成为皇冠，根据自动审核皇冠商机制来自动给予皇冠商资格
    Req:

    { 
        "uid": "U00001", //required,推荐人的UID
        "real_name": "黄", //required,申请人真实姓名，用于更新个人信息
        "phone": "13800000000", //required,申请人手机，用于更新个人信息
        "type": "CROWN", //optional，省略表示申请成为线下经销商，CROWN表示申请成为线下皇冠商
        "province": "广东", //required
        "city": "广州", //required
        "district": "荔湾区" //required
    }
    Success Resp:
    {
        "status_code": 0, 
        "message": "apply.success"
    }
    Error Return:
    {
        "status_code": 1, 
        "message": "user.is.not.crownship"
    }
    {
        "status_code": 1, 
        "message": "invalid.user"
    }
    {
        "status_code": 1, 
        "message": "invalid.phone"
    }
    {
        "status_code": 1, 
        "message": "cannot.apply.yourself"
    }

# 线下经销商查看线下信息
    GET http://112.74.26.228:10080/rest/physical_seller
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return:
    {
        "status_code": 0,
        "data": {
            "parent_seller_id": null,
            "parent": null,
            "city": null,
            "children_count": 2, //physical_seller_children_count, physical_seller_children 只有具
                                 //有皇冠商资格时才返回。
            "user_name": "Administrator",
            "total_settled_amount": 0,
            "avatar": null,
            "uid": "U00000001",
            "province": null,
            "total_amount": 0,
            "children": [], //星级经销商下线列表
            "crown_children": [ //皇冠商下线列表（包含下级和下下级皇冠商）
                {
                    "parent_seller_id": 1,
                    "city": null,
                    "level": 1, //1.下级皇冠商  2.下下级皇冠商
                    "user_name": "user123",
                    "total_settled_amount": 0,
                    "crown_ship": 1,
                    "real_name": "user123",
                    "avatar": null,
                    "followed": 1,
                    "uid": "U011707251055190003",
                    "follow_time": null,
                    "province": null,
                    "total_amount": 0,
                    "phone": null,
                    "district": null,
                    "latest_bonus_date": null,
                    "id": 182,
                    "created_date": "2017-09-19 10:59:06",
                    "seller_id": 11014
                },
                {
                    "parent_seller_id": 11014,
                    "city": null,
                    "level": 2,
                    "user_name": "关应康",
                    "total_settled_amount": 0,
                    "crown_ship": 1,
                    "real_name": null,
                    "avatar": "http://wx.qlogo.cn/mmopen/vi_32/AWrNt30IeSoibiaaicZafBbkw39icOzMibCfDSMhQH9uRYxRLQMzUp4hJBHtvYMZn9FwXMkpibM47C0OW94nJU0lyOjw/0",
                    "followed": 1,
                    "uid": "U011707271136230002",
                    "follow_time": null,
                    "province": null,
                    "total_amount": 0,
                    "phone": null,
                    "district": null,
                    "latest_bonus_date": null,
                    "id": 181,
                    "created_date": "2017-09-19 10:58:36",
                    "seller_id": 11019
                }
            ],
            "district": null,
            "crown_children_count": 1, //只有具有皇冠商资格时才返回。下级皇冠商数量  
            "crown_children_count_lv2": 1, // 只有具有皇冠商资格时才返回。 下下级皇冠商数量
            "latest_bonus_date": null,
            "id": 179,
            "created_date": "2017-08-09 12:03:07",
            "seller_id": 1
        }
    }

# 线下皇冠商查看进货结算明细
    GET http://112.74.26.228:10080/rest/physical_purchase_summary?month=2017-06
    Parameter:
    month - optional, 要查询的月份，格式yyyy-MM,如果不传该参数，则返回所有月份的记录，用于‘结算记录‘UI。如果传了参数，则返回该月的明细，用于‘我的推荐’UI。
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return:
    {
        "status_code": 0,
        "data": [
            { 
                "transferred": 0, //是否已转积分系统
                "statistic_month": "2017-09-01", //统计月份
                "monthly_amount": 5600, //本月进货
                "total_settled_amount": 848, //累计总提成. 当有month参数时才返回该项
                "monthly_settled_amount": 848, //提成金额
                "monthly_expected_settled_amount": 0, //上级期望提成（前端用不到）
                "monthly_expected_settled_amount_lv2": 0, //上上级期望提成（前端用不到）
                "my_recommended_sellers": [ //我的推荐线下经销商. 当有month参数时才返回该项（包含两级，下级排前面，下下级排                
                                            //后面）
                    {
                        "transferred": 0,
                        "level": 1,          //1.下级  2.下下级
                        "user_name": "user123",
                        "statistic_month": "2017-09-01",
                        "monthly_amount": 3200,
                        "avatar": null,
                        "monthly_settled_amount": 960,
                        "monthly_expected_settled_amount_lv2": 0,
                        "uid": "U011707251055190003",
                        "transferred_amount": 0,
                        "monthly_expected_settled_amount": 728,
                        "settlement_proportion": 100,
                        "id": 192,
                        "seller_id": 11014
                    },
                    {
                        "transferred": 0,
                        "level": 2,
                        "user_name": "关应康",
                        "statistic_month": "2017-09-01",
                        "monthly_amount": 6000,
                        "avatar": "http://wx.qlogo.cn/mmopen/vi_32/AWrNt30IeSoibiaaicZafBbkw39icOzMibCfDSMhQH9uRYxRLQMzUp4hJBHtvYMZn9FwXMkpibM47C0OW94nJU0lyOjw/0",
                        "monthly_settled_amount": 0,
                        "monthly_expected_settled_amount_lv2": 120,
                        "uid": "U011707271136230002",
                        "transferred_amount": 0,
                        "monthly_expected_settled_amount": 960,
                        "settlement_proportion": 100,
                        "id": 191,
                        "seller_id": 11019
                    }
                ],
                "transferred_amount": 0,
                "total_amount": 5600,
                "settlement_proportion": 100,
                "id": 193,
                "seller_id": 1
            }
        ]
    }

# 线下代理商查看进货结算明细
    GET http://112.74.26.228:10080/rest/agent_summary?month=2017-08
    Parameter:
    month - optional, 要查询的月份，格式yyyy-MM,如果不传该参数，则返回所有月份的记录，用于‘结算记录‘UI。如果传了参数，则返回该月的明细。
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Tips: 1.对于每个线下代理，其最后一次生成年终奖的时间假设为2016-08-04，则程序会于2017-08-04生成他的年终奖（如果从来未生成过年终奖，则把他成为线下的日期作为最后一次生成年终奖时间）。 因此在2017-08-04之前访问此api将会看不到由2016-08-04~2017-08-04的年终奖。 2.为简单起见，只有生成年终奖的月份才会看到年终奖。
    Return:
    {
        "status_code": 0,
        "data": [
            {
                "amount": 2600,  //进货额
                "transferred": 0, //是否已转积分系统
                "pcd_name": "广东", //地区名称
                "bonus": { //年终奖金
                    "settled_amount": 11969,
                    "amount": 23938,
                    "transferred": 0,
                    "transferred_amount": 0,
                    "statistic_month": "2017-07-25",
                    "pcd_id": 2147,
                    "year_statistic_amount": 0, //奖金项没有“年累计订单额”
                    "settlement_proportion": 50, 
                    "id": 19,
                    "end_month": "2018-07-25", //代表从statistic_month到end_month的年终奖金
                    "seller_id": 11014
                },
                "statistic_month": "2017-10-01", //开始月份
                "pcd_id": 2147,
                "year_statistic_amount": 2600, //年累计订单额
                "settled_amount": 7.8, //提成额
                "transferred_amount": 0, //已转积分
                "agentPurchaseJournals": [ //根据产品，提成比例来汇总的订单明细
                    {
                        "sum_settled_amount": 6, //本月提成
                        "sum_final_price": 2000, //进货金额
                        "product_id": 149, //产品id
                        "agent_proportion_percentage": "0.30", //提成比例（0.30表示0.30%）
                        "product_name": "碧丽雅超效洁净手洗专用洗衣液1.25L*10瓶/箱" //产品名称
                    },
                    {
                        "sum_settled_amount": 12,
                        "sum_final_price": 4000,
                        "product_id": 673,
                        "agent_proportion_percentage": "0.30",
                        "product_name": "十美优品净澈水润型沐浴露600ml*4瓶/箱"
                    },
                    {
                        "sum_settled_amount": 1.3,
                        "sum_final_price": 432,
                        "product_id": 675,
                        "agent_proportion_percentage": "0.30",
                        "product_name": "十美优品滋养修护型护发素600ml*4瓶/箱"
                    }
                ],
                "settlement_proportion": 0, //提成比例
                "id": 39,
                "end_month": null, //结束月份
                "seller_id": 11014
            },
            {
                "amount": 2600,
                "transferred": 0,
                "pcd_name": "广东-广州",
                "bonus": {
                    "settled_amount": 212.16,
                    "amount": 10608,
                    "transferred": 0,
                    "transferred_amount": 0,
                    "statistic_month": "2017-07-25",
                    "pcd_id": 2148,
                    "year_statistic_amount": 0,
                    "settlement_proportion": 2,
                    "id": 22,
                    "end_month": "2018-07-25",
                    "seller_id": 11014
                },
                "statistic_month": "2017-10-01",
                "pcd_id": 2148,
                "year_statistic_amount": 2600,
                "settled_amount": 7.8,
                "transferred_amount": 0,
                "agentPurchaseJournals": [
                    {
                        "order_user_id": 11019,
                        "agent_proportion": 3,
                        "quantity": 20,
                        "pcd_name": "广州",
                        "pcd_id": 2148,
                        "product_specification_name": null,
                        "product_name": "十美优品净澈水润型沐浴露600ml*4瓶/箱",
                        "order_item_id": 5529,
                        "settled_amount": 4.8,
                        "order_user_name": "关应康",
                        "final_price": 1600,
                        "price": 80,
                        "product_id": 673,
                        "percentage": 10,
                        "marketing_name": "十美优品净澈水润型沐浴露600ml*4瓶/箱",
                        "marketing_id": 14,
                        "id": 7,
                        "create_date": "2017-10-09 11:21:34",
                        "seller_id": 11014,
                        "product_cover": "http://images.10mup.com/20170708154457918-gkpUE7r4.jpg"
                    },
                    {
                        "order_user_id": 11019,
                        "agent_proportion": 3,
                        "quantity": 10,
                        "pcd_name": "广州",
                        "pcd_id": 2148,
                        "product_specification_name": null,
                        "product_name": "碧丽雅超效洁净手洗专用洗衣液1.25L*10瓶/箱",
                        "order_item_id": 5530,
                        "settled_amount": 3,
                        "order_user_name": "关应康",
                        "final_price": 1000,
                        "price": 100,
                        "product_id": 149,
                        "percentage": 10,
                        "marketing_name": "碧丽雅超效洁净手洗专用洗衣液1.25L*10瓶/箱",
                        "marketing_id": 11,
                        "id": 8,
                        "create_date": "2017-10-09 11:21:34",
                        "seller_id": 11014,
                        "product_cover": "http://images.10mup.com/20160914142106802-oFWNcqv1.jpg"
                    }
                ],
                "settlement_proportion": 0,
                "id": 42,
                "end_month": null,
                "seller_id": 11014
            }
        ]
    }

# 线下代理商查看年终奖励对照表
    GET http://112.74.26.228:10080/rest/physical_agent_bonus?pcd_id=1
    Paras:
    pcd_id: required，地区id
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    {
        "status_code": 0,
        "data": [
            {
                "id": 1,
                "percentage": 10, //奖金比例   （当min_amount<销售额<=max_amount ，应用此percentage）
                "min_amount": 0,  //销售额下限
                "max_amount": 1000, //销售额上限
                "pcd_id": 1
            },
            {
                "id": 2,
                "percentage": 20,
                "min_amount": 1000,
                "max_amount": -1,  //-1表示无上限
                "pcd_id": 1
            }
        ]
    }

# 线下皇冠商查看被推荐人的进货明细列表
    GET http://112.74.26.228:10080/rest/physical_purchase_journal/:seller_id?month=2017-06
    Req Para:
    seller_id: required，被推荐人的seller_id
    month: optional，省略则列出所有月份的进货明细，格式为yyyy-MM
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Resp:
    {
        "status_code": 0,
        "data": [
            {
                "order_number": "123456xxx",  //订单号
                "created_date": "2017-06-12 13:53:00",  
                "amount": 1000,  //进货额（不是指该订单的进货额，而是该订单其中1个订单项的进货额）
                "id": 2,
                "order_item_id": 1,  //订单项id
                "product_name": "油条",  //产品名称
                "seller_id": 2,  //被推荐人的seller_id（即传过来的）
                "order_id": 1,  //订单id
                "product_settlement_proportion": 20,  //产品提成比例
                "expected_reward": 30,  //预期提成金额，不是真正的提成金额
                "note": null
            },
            {
                "order_number": "123456xxx",
                "created_date": "2017-06-12 13:53:20",
                "amount": 3000,
                "id": 1,
                "order_item_id": 2,
                "product_name": "飞机",
                "seller_id": 2,
                "order_id": 1,
                "product_settlement_proportion": 30,
                "expected_reward": 50,
                "note": null
            }
        ]
    }

# 线下分成比例对照表
    GET http://112.74.26.228:10080/rest/physical_proportion
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Resp:
    {
        "status_code": 0,
        "data": [
            {
                "id": 1,
                "percentage": 2,  //分成比例（%）
                "min_amount": 1000,  //最小进货额
                "max_amount": 5000  //最大进货额
            },
            {
                "id": 2,
                "percentage": 5,
                "min_amount": 5001,
                "max_amount": 10000
            },
            {
                "id": 3,
                "percentage": 6,
                "min_amount": 10001,
                "max_amount": 50000
            },
            {
                "id": 4,
                "percentage": 8,
                "min_amount": 50001,
                "max_amount": -1
            }
        ]
    }

# 皇冠经销商,星级经销商申请需知
    GET http://112.74.26.228:10080/rest/physical_apply_tips?type=CROWN
    para:
    type: required，（CROWN 皇冠经销商， STAR星级经销商, ANNOUNCE 线下门店系统公告)
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Resp:
    {
        "status_code": 0,
        "data": {
            "created_date": null,
            "content": "<p>内容。。。。</p>",
            "type": "CROWN",
            "id": 1,
            "enabled": 1,  //是否启用
            "last_modified_date": "2017-06-23 12:26:50",  //最后一次的修改时间
            "name": "皇冠需知"
        }
    }

# 申请成为合伙人
    POST http://112.74.26.228:10080/rest/copartner
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "phone": "13900000001",
        "name": "黄小二",
        "address": "广东广州荔湾区周门路16号"
    }
    Success Resp:
    {
        "status_code": 0,
        "message": "ok"
    }

    Failure Resp:
    {
        "status_code": 1,
        "message": "already.copartner"
    }

# 合伙人查看团队列表
    GET http://112.74.26.228:10080/rest/copartner
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Success Resp:
    {
        "status_code": 0,
        "data": {
            "create_time": "2018-08-23 11:52:14",
            "children_count": 1,
            "children": [
                {
                    "uid": "U011808231159370001",
                    "follow_time": null,
                    "create_time": "2018-08-23 12:32:15",
                    "phone": "13800000000",
                    "user_name": "13922112131",
                    "real_name": "黄",
                    "avatar": null,
                    "followed": 0,
                    "seller_id": 3
                }
            ],
            "id": 2,
            "seller_id": 2,
            "status": "NORMAL"
        }
    }

    Failure Resp:
    {
        "status_code": 1,
        "message": "not.a.copartner"
    }

# 合伙人查看分成
    GET http://112.74.26.228:10080/rest/copartner_settlement?month=2018-08
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Success Resp:
    {
        "status_code": 0,
        "data": {
            "settlement_proportion": 4,  //分成比例
            "total_settlement_amount": 0,  //总分成
            "total_amount": 0,  //总进货量
            "monthly_amount": 0, //当月进货量
            "monthly_settlement_amount": 0, //当月提成
            "create_time": "2018-08-23 11:52:14",
            "children": [
                {
                    "seller_ship_time": "2018-08-23 11:59:37",
                    "create_time": "2018-08-23 12:32:15",
                    "level": 1,
                    "partner_ship_time": "2018-08-23 12:32:15",
                    "crown_id": null,
                    "user_name": "13922112131",
                    "crown_ship": 1,
                    "crown_apply_failure_times": 0,
                    "real_name": "黄",
                    "avatar": null,
                    "followed": 0,
                    "uid": "U011808231159370001",
                    "follow_time": null,
                    "crown_ship_temp": 1,
                    "partner_id": null,
                    "user_id": 3,
                    "partner_ship": 1,
                    "crown_ship_time": "2018-08-23 12:32:55",
                    "phone": "13800000000",
                    "parent_id": null,
                    "id": 3,
                    "seller_ship": 1,
                    "seller_id": 3,
                    "partner_level_id": 1,
                    "monthly_amount": 0, //当月进货量
                    "monthly_settlement_amount": 0 //当月提成
                }
            ],
            "id": 2,
            "seller_id": 2,
            "status": "NORMAL"
        }
    }

# 合伙人查看结算记录
    GET http://112.74.26.228:10080/rest/copartner_settlement
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Success Resp:
    {
        "status_code": 0,
        "data": [{
            "statistic_month": "2018-02", 
            "settled_amount": 100,  //分成
            "transferred_amount": 10000  //转积分
        }]
    }

# 合伙人查看团队成员的进货提成明细
    GET http://112.74.26.228:10080/rest/copartner_settlement/:sellerid?month=2018-08
    Param: sellerId - 团队成员的sellerid
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Success Resp:
    {
        "status_code": 0,
        "data": [
            {
                "product_name": "洗衣液",
                "amount": 100, //进货量
                "reward": 10, //提成
                "settlement_proportion": 10 //提成比例
            }
        ]
    }

# 会员API

# 会员级别列表
    GET http://112.74.26.228:10080/rest/member_level
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    resp:
    {
        "status_code": 0,
        "data": [{
            "id": 1,
            "point": 1000,
            "description": null,
            "name": "Level 1"
        }, {
            "id": 2,
            "point": 2000,
            "description": null,
            "name": "Level 2"
        }, {
            "id": 3,
            "point": 5000,
            "description": null,
            "name": "Level 3"
        }, {
            "id": 4,
            "point": 10000,
            "description": null,
            "name": "Level 4"
        }]
    }

# 会员信息
    GET http://112.74.26.228:10080/rest/member
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    resp:
    {
        "status_code": 0,
        "data": {
            "id": 3,
            "point": 0,
            "birthday": null,
            "sex": null,
            "address": null,
            "description": null,
            "name": "abc",
            "user_id": 4,
            "level_id": 1,
            "mobile": null
        }
    }

# 更新会员信息
    PUT http://112.74.26.228:10080/rest/member
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    data:
    {
        "birthday": "1999-10-10",
        "sex": 1,
        "address": "GZ liwan",
        "description": "xxvv",
        "name": "abc",
        "mobile": "138000000"
    }
    resp:
    {
        "message": "member.updated",
        "status_code": 0
    }

# 优惠券列表
    GET http://112.74.26.228:10080/rest/coupon?status=ACTIVATION&pageNumber=1&pageSize=10
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    查询参数： status - optional, 状态， 默认返回 ACTIVATION 状态的。
    pageNumber - optional, 分页页数
    pageSize - optional, 每页记录数
    状态类型：
        public enum Status {
            NON_ACTIVATION, //未激活
            ACTIVATION,  //已激活
            OVERDUE, //已过期
            USED //已使用
        }
    resp:
    如果discount不是0，那么就是折扣券，比如“discount”: 60, 表示打六折。
    如果money不是0， 那么就是代金券。
    {
        "status_code": 0, 
        "data": {
            "ACTIVATION": 1, 
            "USED": 0, 
            "NON_ACTIVATION": 1, 
            "OVERDUE": 0,
            "coupons": [
                {
                    "code": "9e0f38da-8a05-4243-a338-c1d373b2943d", 
                    "discount": 0, 
                    "description": null, 
                    "type": "ORDER", 
                    "display_name": "a", 
                    "cond": "
                        <rule-set name=\"getFinalPrice\" >
                            <mvel-rule id=\"step1\" multipleTimes=\"false\" exclusive=\"true\" valid=\"true\">
                                <condition><![CDATA[true]]></condition>
                                <action><![CDATA[finalPrice=totalPrice-4]]></action>
                            </mvel-rule>
                        </rule-set>
                        ", 
                    "valid_date": "2017-01-13 18:01:44", 
                    "money": 4, 
                    "user_id": 1, 
                    "name": "q", 
                    "id": 1, 
                    "created_date": "2017-01-11 18:01:44", 
                    "attribute": "{\"source\":\"SYSTEM\"}", 
                    "auto_give": 0, 
                    "status": "ACTIVATION"
                }
            ]
        }
    }

# 点击分享链接领取优惠券
    POST http://112.74.26.228:10080/rest/coupon
    用户须关注公众号才可以激活优惠券。
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "code": "werwqerweqfaf"  //分享码
    }
    Success resp:
    {
        "status_code": 0, 
        "data": {
            "coupon_taken_records": [  //该分享被领取的记录
                {
                    "share_id": 1, 
                    "user_id": 1, 
                    "name": "Administrator", 
                    "created_date": "2016-11-28 10:43:08", 
                    "message": "又有券可用了。", 
                    "coupon_value": 6
                }
            ], 
            "coupons": [  //该用户领取的优惠券列表，对于第一次点击链接领取时才有这个属性。
                {
                    "code": "1982dbcf-442a-4111-923f-6b20b67eb31e", 
                    "description": null, 
                    "type": "ORDER", 
                    "display_name": "式", 
                    "valid_date": "2016-12-01", 
                    "money": 4, 
                    "user_id": 1, 
                    "name": "aaaa", 
                    "created_date": "2016-11-28", 
                    "id": 1, 
                    "status": "ACTIVATION"
                }, 
                {
                    "code": "0d0cf6c8-58c4-4df7-91e3-a14e74046b97", 
                    "description": null, 
                    "type": "ORDER", 
                    "display_name": "33", 
                    "valid_date": "2016-12-02", 
                    "money": 2, 
                    "user_id": 1, 
                    "name": "发啊发", 
                    "created_date": "2016-11-28", 
                    "id": 2, 
                    "status": "ACTIVATION"
                }
            ], 
            "coupon_value": 6  //领取的优惠券价值
        }
    }

# 激活优惠券
    PUT http://112.74.26.228:10080/rest/coupon/id
    领取（激活）优惠券, 用户须关注公众号才可以激活优惠券。
    parameter:
    id - integer, 优惠券ID
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "status": "ACTIVATION"
    }
    Failure Resp：
    {
        "status_code": 1, 
        "message": "user.must.be.followed"
    }
    Success resp:
    {
        "status_code": 0, 
        "message": "activate.success"
    }

# 删除优惠券
    DELETE http://112.74.26.228:10080/rest/coupon/id
    parameter:
    id - integer, 优惠券ID
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Success resp:
    {
        "status_code": 0, 
        "message": "delete.success"
    }

# 用户优惠券通知
    GET http://112.74.26.228:10080/rest/coupon_notify
    如果还没通知过用户，那么首页可以弹出红包框。
    如果 ‘has_unread_coupon' 为true，那么需要对‘个人中心，优惠券’ 添加红点 提示用户。
    notify为总开关，只有notify为true时才需要弹出红包。
    当notify为true时： 
    如果new_user为true，则显示‘新用户红包’，否则就是显示‘恭喜您获得X张优惠券’。
    如果is_user_followed为true，则显示点击关注领取， 否则显示点击查看。
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Success resp:
    {
        "status_code": 1,
        "data": {
            "notify": true, //需要弹出红包通知用户
            "new_user": true, //是否是新注册用户
            "coupon_count": 2, //当notify为true时才返回
            "coupon_value": 34, //当notify为true时才返回
            "is_user_followed": true, //用户是否关注公众号
            "has_unread_coupon": true, //表示用户有未读优惠券, 这时'个人中心'需要显示红点
            "activation_coupons": [
            {
                "id": 1,
                "name": "拼团免单券",
                "type": "MARKETING_PIECE_GROUP", // 类型为MARKETING_PIECE_GROUP表示拼团券
                "status": "ACTIVATION"
            }
            ]
        }
    }

# 下单前计算优惠信息
    POST http://112.74.26.228:10080/rest/coupon_calculation?phone=13800000001
    Para:
    phone - optional， 用户手机号，查询该用户的优惠券优惠信息,pad端用
    传入订单的产品和价格列表，返回该用户的优惠券对这个订单优惠后的信息
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    [
        {
            "product_id": 1, 
            "price": 20  //该产品的总价格，注意：不是单价，比如买啦2件，那这里的值应该是单价＊2
        }, 
        {
            "product_id": 2, 
            "price": 39.9
        }
    ]
    Return:
    [
        {
            "coupon_id": 1, 
            "coupon_name": "全单8折", 
            “valid_date“：”2016-11-30 11:11:11", //有效时间
            "final_price": 47.92  //这个订单使用这个优惠劵后的总价格
        }, 
        {
            "coupon_id": 2, 
            "coupon_name": "单品买立减8元", 
            “valid_date“：”2016-11-30 11:11:11", //有效时间
            "final_price": 51.9
        }, 
        {
            "coupon_id": 3, 
            "coupon_name": "满50立减5元", 
            “valid_date“：”2016-11-30 11:11:11", //有效时间
            "final_price": 55.9
        }
    ]

# 查看我的优惠券分享信息
    GET http://112.74.26.228:10080/rest/coupon_share
    下单完成后用户对红包进行了分享，这个api可以查看分享过的列表。
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return:
    {
        "status_code": 0, 
        "data": [
            {
                "valid_date": "2016-12-06 12:18:43", 
                "code": "e58a9055-f966-4b59-b36d-b8de66bbfc25", 
                "user_id": 1, 
                "order_number": "12345", 
                "share_date": "2016-12-01 12:18:43", 
                "link": "http://www.kequandian.net/app/app/coupon?share_code=e58a9055-f966-4b59-b36d-b8de66bbfc25&invite_code=a1b2c3", 
                "id": 1
            }
        ]
    }

# 我的钱包
    GET http://112.74.26.228:10080/rest/wallet?phone=1380000001
    Param: phone - 可选，要查看的会员手机号码，管理员可以根据这个参数查看该用户的钱包
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return:
    {
        "status_code": 0,
        "data": {
            "accumulative_amount": 0,  //累计金额
            "accumulative_gift_amount": 0, //累计赠送
            "balance": 0, //余额
            "user_id": 1,
            "gift_balance": 0, //赠送余额
            "id": 1
        }
    }

# 钱包充值
    POST http://112.74.26.228:10080/rest/wallet_charge
    充值后调用 支付 页面接口 /payment/wpay/:id?orderType=Wallet
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        “id"; 1, // depoist package id
        "amount": 121,  //充值金额
        "description": "xxyy" //描述
    }

    Return:
    {
        "status_code": 0,
        "data": {
            "created_time": "2018-08-08",
            "wallet_id": 1,
            "amount": 121,
            "description": "xxyy",
            "id": 1,
            "gift_amount": 0,
            "status": "PAY_PENDING"
        }
    }

# 钱包流水记录
    GET http://112.74.26.228:10080/rest/wallet_history?pageNumber=1&pageSize=30
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    amount 本次充值额。 balance 本次充值后账户的余额。 gift_amount: 本次充值赠送额 gift_balance: 充值后赠送帐户的余额。
    Return:
    {
        "status_code": 0,
        "data": []
    }

# 使用钱包支付
    POST http://112.74.26.228:10080/rest/wallet_pay
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "orderType": "Order",
        "orderNumber": "22334",
        "password": "134545" // 支付密码
    }

    Error Return:
    {
        "status_code": 1,
        "message": "wallet.insufficient.balance"
    }

    Success Return:
    {
        "status_code": 0,
        "message": "ok"
    }

# PAD端使用钱包支付
    POST http://112.74.26.228:10080/rest/admin/wallet_pay
    Pre-cond:
    先调用发送短信验证码给会员手机。
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "orderType": "Order",
        "orderNumber": "22334",
        "phone": "1308888888",
        "captcha": "2345"
    }
    Error Return:
    {
        "status_code": 1,
        "message": "wallet.insufficient.balance"
    }
    Success Return:
    {
        "status_code": 0,
        "message": "ok"
    }

# 重置钱包支付密码
    POST http://112.74.26.228:10080/rest/wallet_password
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "oldPassword": "122222", //旧密码，第一次设置密码不用这个字段
        "password": "134545" // 支付密码
    }
    Success Return:
    {
        "status_code": 0,
        "message": "ok"
    }

# 验证钱包支付密码
    POST http://112.74.26.228:10080/rest/wallet_verify_password
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "password": "134545" // 支付密码
    }
    Success Return:
    {
        "status_code": 0,
        "message": "ok"
    }

# 检查是否已设置支付密码
    GET http://112.74.26.228:10080/rest/wallet_password
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Success Return:
    {
        "status_code": 0,
        "data": true
    }

# 优惠券类型列表
    GET http://localhost:8080/rest/admin/coupon_type
    Return:

# 后台赠送优惠券
    POST http://localhost:8080/rest/admin/coupon
    Data:
    {
        "phone": "1390000000",
        "couponTypeIds": [ 1, 2, 3 ]
    }

    REturn:
    {
        "status_code": 1,
        "message": "ok"
    }

# 营销API

# 拼团列表
    GET http://112.74.26.228:10080/rest/piece_group_purchase?pageNumber=1&pageSize=0&masterFree=1
    Req Paras:
    pageNumber: optional, 页码, default 1
    pageSize: optional, 每页记录数, default 30
    masterFree: optional, 是否团长免单 （1列出团长免单的活动 0列出非团长免单活动）
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Resp:
    {
        "status_code": 0,
        "data": {
            "pageNumber": 1,
            "pageSize": 30,
            "totalPage": 1,
            "totalRow": 1,
            "list": [{
                "id": 4,  //拼团活动id
                "product_id": 1,  //拼团活动所关联的产品id
                "payment_type": "POINT|WECHAT",  //该拼团活动支持的支付方式。(WECHAT微信支付 POINT 积分 若两
                                                 //种都支持，则用“|”分隔。如 WECHAT|POINT）
                "marketing_name": "活动1",  //拼团活动名称
                "status": "ONSELL",  //拼团活动状态。INIT/ONSELL/OFFSELL/LOCK （LOCK不允许开团，但已开的团
                                     //仍然生效  （成员仍能加入已开的团） OFFSELL：不允许开团，已开的团若已
                                     //拼团成功，则继续生效（但成员不能再加入已开的团了），若拼团未成功，则到时
                                     //间就退款）
                "free_shipping": 0,  //是否包邮。 default 1（0 根据产品定义的邮费计算，1 包邮）
                "suggested_price": 1000,  //市场价（元）
                "sale": 0,  //已团件数
                "min_participator_count": 2,  //最小成团人数，default 2
                "duration": 118800,  //活动有效时间，单位秒。
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20170510152514628-dssIB8U8.jpg",  //活动封面
                "price": 1134,  //团购价（元）
                "coupon_usage": 0,  //优惠券使用。default 0（0 不能用优惠券；1 可以用专用优惠券； //2 可以用系统  优惠券）    
                "master_free": 1,  //团长是否免单。default 0（0 非免单活动, 1 可以使用免单优惠券）
                "description": null  //描述
            }],
            "promoted_master": {  //这是随机抽取出来的一位"被推荐"且"已支付"的团长
                "id": 1,  //团长id（当团员要入团时，需要指定要加入哪个团长的团，此时用到团长id）
                "product_id": 1,  //产品id
                "payment_type": "POINT|WECHAT",  //该拼团活动支持的支付方式。(WECHAT微信支付 POINT 积分 若两 //种都支持，则用“|”分隔。如 WECHAT|POINT）
                "marketing_name": "活动1",  //拼团活动名称
                "marketing_short_name": "活动1缩略名",
                "free_shipping": 0,  //是否包邮。 default 1（0 根据产品定义的邮费计算，1 包邮）
                "suggested_price": 1000,  //市场价（元）
                "piece_group_purchase_status": "ONSELL",  //拼团活动状态。INIT/ONSELL/OFFSELL/LOCK 
                                                          //（LOCK  不允许开团，但已开的团仍然生效（成员仍
                                                          //能加入已开的团） OFFSELL： 不允许开团，已开的
                                                          //团若已拼团成功，则继续生效（但成员不能再加入已
                                                          //开的团了），若拼团未成功，则到时间就退款）
                "sale": 0,  //已团件数
                "min_participator_count": 2,  //最小成团人数，default 2
                "user_name": "aaa",  //该团长的用户名
                "duration": 118800,  //活动有效时间，单位秒
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20170510152514628-dssIB8U8.jpg",  //活动封面
                "price": 1134,  //团购价（元）
                "coupon_usage": 0,  //优惠券使用。default 0（0 不能用优惠券；1 可以用专用优惠券； //2 可以用系统  优惠券）    
                "master_free": 1,  //团长是否免单。default 0（0 非免单活动, 1 可以使用免单优惠券）
                "end_time": "2017-05-12 09:52:28",  //结束时间
                "description": null,
                "promoted": 1,  //推荐进入活动详情页方便其他用户参团, 0 不推荐, 1 推荐, 当免单开团的时候该团 //为不推荐,需要团长自己拉人参团
                "start_time": "2017-05-12 09:49:49",  //开团时间
                "piece_group_purchase_master_status": "OPENING",  //拼团状态（OPENING正在开团/DEAL拼团 //成功/FAIL拼团失败）
                "member_status": "PAID",  //该团长的支付状态（PAID/UNPAID/REFUND）
                "piece_group_purchase_id": 4,  //拼团活动id
                "user_id": 2,  //该团长的user_id
                "user_avatar": null  //该团长的头像
            }
        }
    }

# 拼团详情
    GET http://112.74.26.228:10080/rest/piece_group_purchase/:id
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Req Paras:
    id: required, 活动id
    Resp：
    {
        "status_code": 0,
        "data": {
            "id": 1,
            "marketing_name": "活动1",  //拼团活动名称
            "marketing_short_name": "活动1缩略名",
            "product_id": 1,
            "payment_type": "WECHAT",  //该拼团活动支持的支付方式。(WECHAT微信支付 POINT 积分 若两种都支持，
                                       //则用“|”分隔。如 WECHAT|POINT）
            "status": "ONSELL",  //状态。INIT/ONSELL/OFFSELL/LOCK （LOCK不允许开团，但已开的团仍然生效
                                 //（成员仍能加入已开的团） OFFSELL：不允许开 团，已开的团若已拼团成功，则
                                 //继续生效（但成员不能再加入已开的团了），若拼团未成功，则到时间就退款）
            "min_participator_count": 2,  //最小成团人数，default 2
            "price": 50.00,  //团购价（元）
            "suggested_price": 233.00,  //市场价（元）
            "sale": 0,  //已团件数
            "coupon_usage": 1,  //优惠券使用。default 0（0 不能用优惠券；1 可以用专用优惠券；2 可以用系统优惠券）
            "cover": "http://o9ixtumvv.bkt.clouddn.com/20170511111002449-3OUYLBt6.jpg",  //活动封面
            "duration": 7200,  //有效时间，单位秒。比如有效时间为 3600秒，某用户在01:00:00开团，则该团的结束时间 //为02:00:00
            "free_shipping": 0,  //是否包邮。 default 1（0 根据产品定义的邮费计算，1 包邮）
            "master_free": 1,  //团长是否免单。default 0（0 非免单活动, 1 可以使用免单优惠券）
            "description": null,
            "product": {  //参考产品api的说明
                "free_shipping": 0,
                "freight": 0.00,
                "last_modified_date": "2017-05-11 11:09:40",
                "promoted": 0,
                "specifications": [],
                "sales": 0,
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20170511110938953-VIdliaE0.jpg",
                "category_id": 1,
                "price": 233.00,
                "id": 1,
                "sort_order": 100,
                "barcode": null,
                "store_location": null,
                "cost_price": 33.00,
                "covers": ["http://o9ixtumvv.bkt.clouddn.com/20170511110938953-VIdliaE0.jpg"],
                "weight": 33,
                "stock_balance": 1000,
                "brand_id": null,
                "unit": "件",
                "suggested_price": 3333.00,
                "name": "产品1",
                "short_name": "缩略名1",
                "created_date": "2017-05-11 11:09:39",
                "fare_id": 1,
                "bulk": null,
                "partner_level_zone": 1,
                "view_count": 0,
                "status": "ONSELL",
                "description": "产品描述"
            },
            "promoted_masters": [
                {  //这是由该拼团活动所有"被推荐"且"已支付"的团长组成的列表
                    "id": 1,  //团长id（当团员要入团时，需要指定要加入哪个团长的团，此时用到团长id）
                    "members_count": 2,  //目前参团人数
                    "paid_members_count": 1,  //目前已支付人数
                    "status": "OPENING",
                    "member_status": "PAID",  //该团长的支付状态（PAID/UNPAID/REFUND）
                    "end_time": "2017-05-12 20:52:25",  //结束时间
                    "promoted": 1,  //推荐进入活动详情页方便其他用户参团, 0 不推荐, 1 推荐, 当免单开团的时候该团
                                    //为不推荐,需要团长自己拉人参团
                    "start_time": "2017-05-12 18:08:44",  //开团时间
                    "user_id": 1,
                    "user_name": "张三",  //团长名
                    "user_avatar": null,  //团长头像
                    "piece_group_purchase_id": 1  //拼团活动id
                },{
                    "id": 2,
                    "members_count": 2,  //目前参团人数
                    "paid_members_count": 1,  //目前已支付人数
                    "status": "OPENING",
                    "member_status": "PAID",  //该团长的支付状态（PAID/UNPAID/REFUND）
                    "end_time": "2017-05-12 11:52:28",
                    "promoted": 1,
                    "start_time": "2017-05-12 09:49:49",
                    "user_id": 2,
                    "user_name": "张三",  //团长名
                    "user_avatar": null,  //团长头像
                    "piece_group_purchase_id": 1
                }]
        }
    }
    Error Resp
    {
        "status_code": 1,
        "message": "pieceGroupPurchase.not.found"
    }

# 我的拼团列表
    GET http://112.74.26.228:10080/rest/my_piece_group_purchase?pageNumber=1&pageSize=10&status=OPENING
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Req Paras:
    pageNumber: optional,default 1
    pageSize: optional,default 30
    status: optional, 拼团状态（OPENING正在开团/DEAL拼团成功/FAIL拼团失败）
    Resp:
    {
        "status_code": 0,
        "data": {
            "pageNumber": 1,
            "pageSize": 30,
            "totalPage": 1,
            "totalRow": 1,
            "list": [{
                "order_number": "order_number1",
                "total_members_count": 2,  //拼团成员总数
                "paid_members_count": 1,   //已支付的成员总数
                "product_id": 1,
                "status": "PAID",  //支付状态（UNPAID未支付/PAID已支付/REFUND已退款）
                "marketing_name": "活动1",  //拼团活动名称
                "marketing_short_name": "活动1缩略名",
                "payment_type": "POINT"  //该用户支付订单的方式
                "free_shipping": 0,  //是否包邮。 default 1（0 根据产品定义的邮费计算，1 包邮）
                "suggested_price": 1000,  //市场价（元）
                "piece_group_purchase_status": "ONSELL",  //拼团活动状态。INIT/ONSELL/OFFSELL/LOCK （
                                                          //LOCK不允许开团，但已开的团仍然生效（成员仍能加入已
                                                          //开的团） OFFSELL：不允许开 团，已开的团若已拼团成
                                                          //功，则继续生效（但成员不能再加入已开的团了），若拼团
                                                          //未成功，则到时间就退款）
                "sale": 0,  //已团件数
                "min_participator_count": 2,  //最小成团人数，default 2
                "duration": 118800,  //有效时间，单位秒。比如有效时间为 3600秒，某用户在01:00:00开团，则该团
                                     //的结束时间为02:00:00
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20170510152514628-dssIB8U8.jpg",  //活动封面
                "price": 1134,  //团购价（元）
                "coupon_usage": 0,  //优惠券使用。default 0（0 不能用优惠券；1 可以用专用优惠券；2 可以用系统优惠券）
                "master_free": 1,  //团长是否免单。default 0（0 非免单活动, 1 可以使用免单优惠券）
                "end_time": "2017-05-12 09:52:25",  //结束时间
                "description": null,
                "promoted": 1,  //推荐进入活动详情页方便其他用户参团, 0 不推荐, 1 推荐, 当免单开团的时候该团
                                //为不推荐,需要团长自己拉人参团
                "start_time": "2017-05-10 18:08:44",  //开团时间
                "piece_group_purchase_master_status": "OPENING",  //拼团状态（OPENING正在开团/DEAL拼团 //成功/FAIL拼团失败）
                "user_id": 1,
                "piece_group_purchase_id": 4,  //拼团活动id
                "created_time": "2017-05-12 11:31:09"  //加入该拼团的时间
            }]
        }
    }

# 我的拼团详情
    GET http://112.74.26.228:10080/rest/my_piece_group_purchase/:id
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Req Paras:
    id: required, 拼团活动id
    Resp Paras：
    同我的拼团列表API。
    Resp:
    {
        "status_code": 0,
        "data": {
            "id": 1,
            "marketing_name": "活动1",
            "marketing_short_name": "活动1缩略名",
            "payment_type": "POINT"  //该用户支付订单的方式
            "product_id": 1,
            "piece_group_purchase_status": "ONSELL",
            "min_participator_count": 2,
            "price": 200.00,
            "suggested_price": 233.00,
            "sale": 50,
            "coupon_usage": 1,
            "cover": "http://o9ixtumvv.bkt.clouddn.com/20170511111002449-3OUYLBt6.jpg",
            "duration": 7200,
            "free_shipping": 0,
            "master_free": 1,
            "description": "描述1",
            "start_time": "2017-05-11 12:22:57",
            "end_time": "2017-05-25 12:22:59",
            "piece_group_purchase_id": 1,
            "promoted": 1,
            "piece_group_purchase_master_status": "OPENING",
            "total_members_count": 2,
            "paid_members_count": 1,   
            "created_time": "2017-05-10 17:05:07",
            "user_id": 1,
            "order_number": "order_number1",
            "piece_group_purchase_member_status": "PAID",
            "order": {  //订单 请参考订单api
                "detail": null,
                "phone": "13155555555",
                "is_deliver_reminder": 0,
                "contact_user": "张三",
                "remark": "备注1",
                "invoice": 0,
                "street": null,
                "trade_number": null,
                "express_number": null,
                "deal_date": null,
                "express_company": null,
                "city": "广州市",
                "id": 1,
                "cover": null,
                "confirm_date": null,
                "description": "描述1",
                "province": "广东省",
                "user_id": 1,
                "coupon_info": null,
                "express_code": null,
                "district": "荔湾区",
                "deliver_date": null,
                "delivered_date": null,
                "created_date": "2017-06-05 15:01:13",
                "order_number": "xxx",
                "zip": null,
                "point_exchange_rate": 100,
                "marketing": null,
                "status": "DELIVERING",
                "invoice_title": null,
                "marketing_description": null,
                "receiving_time": null,
                "deliver_order_number": null,
                "total_price": 1000,
                "previous_status": null,
                "is_deleted": 0,
                "marketing_id": null,
                "settled": 0,
                "freight": 500,
                "pay_date": "2017-06-05 15:01:15",
                "payment_type": "POINT"
            },
        }
    }
    Error Resp 1：
    {
        "status_code": 1,
        "message": "pieceGroupPurchase.not.found"
    }
    Error Resp 1：
    {
        "status_code": 1,
        "message": "not.your.pieceGroupPurchase"
    }

# 团长详情
    GET http://112.74.26.228:10080/rest/piece_group_purchase_master/:id
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Req para: id: 团长id
    Return:
    {
        "status_code": 0,
        "data": {
            "id": 1,  //团长id
            "user_id": 1,  //团长的user id
            "piece_group_purchase_id": 1,  //拼团活动id
            "start_time": "2017-05-27 09:28:19",  //创团时间
            "end_time": "2017-05-28 09:28:21",  //结束时间
            "promoted": 1,  //是否为推荐团长
            "piece_group_purchase_status": "ONSELL",  //状态。INIT/ONSELL/OFFSELL/LOCK （LOCK不允许开团，但已开的团仍  
                                                      //然生效（成员仍能加入已开的团） OFFSELL：不允许开 团，已开的团
                                                      //若已拼团成功，则继续生效（但成员不能再加入已开的团了），若拼团未成功，
                                                      //则到时间就退款）
            "piece_group_purchase_master_status": "OPENING",  //拼团状态（OPENING正在开团/DEAL拼团成功/FAIL拼团失败）
            "marketing_name": "活动1",  //拼团活动名称
            "marketing_short_name": "活动1缩略名",
            "min_participator_count": 2,  //最小成团人数，default 2
            "price": 800, //团购价（元）
            "suggested_price": 1000, //市场价（元）
            "sale": 0, //已团件数
            "coupon_usage": 0, //优惠券使用。default 0（0 不能用优惠券；1 可以用专用优惠券；2 可以用系统优惠券）
            "cover": "http://o9ixtumvv.bkt.clouddn.com/20170526143343912-37RImHeW.jpg", //活动封面
            "duration": 7200,  //有效时间，单位秒。比如有效时间为 3600秒，某用户在01:00:00开团，则该团的结束时间
                               //为02:00:00
            "free_shipping": 1, //是否包邮。 default 1（0 根据产品定义的邮费计算，1 包邮）
            "payment_type": "WECHAT", //该拼团活动支持的支付方式。(WECHAT微信支付 POINT 积分 若两种都支持，
                                    //则用“|”分隔。如 WECHAT|POINT）
            "master_free": 1, //团长是否免单。default 0（0 非免单活动, 1 可以使用免单优惠券）
            "description": null,
            "product": {  //参考产品api的说明
                "weight": 10,
                "partner_level_zone": 1,
                "stock_balance": 1000,
                "fare_id": 1,
                "id": 1,
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20170526142339324-YHykFlst.jpg",
                "sales": 0,
                "promoted": 0,
                "name": "产品1",
                "created_date": "2017-05-26 14:23:40",
                "cost_price": 500,
                "status": "ONSELL",
                "free_shipping": 0,
                "brand_id": null,
                "category_id": 1,
                "suggested_price": 2000,
                "barcode": null,
                "short_name": "缩略名1",
                "bulk": null,
                "specifications": [],
                "unit": "个",
                "last_modified_date": "2017-05-26 14:23:42",
                "price": 1000,
                "covers": [
                    "http://o9ixtumvv.bkt.clouddn.com/20170526142339324-YHykFlst.jpg"
                ],
                "freight": 0,
                "store_location": null,
                "sort_order": 100,
                "view_count": 0,
                "description": "产品描述"
            }
        }
    }

# 开团
    POST http://112.74.26.228:10080/rest/order
    参考 下单前计算优惠信息 api 返回的优惠券，选择一个优惠劵进行下单。
    到支付宝支付时，把order-number的值赋给out_trade_no进行支付。
    微信支付 - WECHAT
    积分支付 - POINT
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==

    Data:
    {       
        //这两个是 "新建订单api" 新增的域
        "marketing": "PIECE-GROUP",  //required。开团必须是PIECE-GROUP
        
        "order_items": [
        {
            "product_id": 1,
            "product_specification_id": 1,
            "quantity": 2,
            "marketing_id": 1,  //required。拼团活动的ID, 即piece_group_purchase的id
        }
        
        ...其他需要提供的域同"新建订单api"
    }
    Return: 同“新建订单api”

# 参团
    POST http://112.74.26.228:10080/rest/order
    参考 下单前计算优惠信息 api 返回的优惠券，选择一个优惠劵进行下单。
    到支付宝支付时，把order-number的值赋给out_trade_no进行支付。
    微信支付 - WECHAT
    积分支付 - POINT
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {       
        //这两个是 "新建订单api" 新增的域
        "marketing": "PIECE-GROUP-JOINT",  //required。参团必须是 PIECE-GROUP-JOINT
        
        "order_items": [
        {
            "product_id": 1,
            "product_specification_id": 1,
            "quantity": 2,
            "marketing_id": 1,  //required。所参加拼团的团长ID, 即piece_group_purchase_master的id
        }

    
        ...其他需要提供的域同"新建订单api"
    }
    Return: 同“新建订单api”

# 批发类别列表
    GET http://112.74.26.228:10080/rest/wholesale_category
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Returns:
    {
        "status_code": 0,
        "data": {
            "contact": {  //用户默认配送地区
                "id": 1,
                "zip": null,
                "detail": null,
                "phone": "1234567",
                "contact_user": "张三",
                "street": null,
                "province": "广东",
                "is_default": 1,
                "street_number": null,
                "user_id": 1,
                "district": "荔湾区",
                "city": "广州"
            },
            "categories": [
                {
                    "id": 2,
                    "name": "批发类别2",  //类别名
                    "sort_order": 5  //排序，小的在前面
                },
                {
                    "id": 1,
                    "name": "批发类别1",
                    "sort_order": 100
                }
            ]
        }
    }

# 批发列表
    GET http://112.74.26.228:10080/rest/wholesale?categoryId=1
    Tips：如果用户没有设置默认配送地区，则此api不返回批发列表。如果有设置，则只返回配送到用户的默认配送地区的批发列表。
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Req Raras:
    categoryId: optional, 批发活动类别id （如提供则列出该类别的批发活动）
    Return:
    {
        "status_code": 0,
        "data": {
            "totalRow": 1,
            "pageNumber": 1,
            "firstPage": true,
            "lastPage": true,
            "totalPage": 1,
            "pageSize": 10,
            "list": [{
                "category_id": 1,
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20170525151147892-Koka1giH.jpg",//批发活动封面     
                "sale": 0,  //已售个数                                                                
                "product": { //参考产品api
                    "free_shipping": 0,
                    "freight": 0.00,
                    "last_modified_date": "2017-05-25 15:09:29",
                    "promoted": 0,
                    "specifications": [{    //产品规格列表
                        "price": 10000.00,
                        "suggested_price": 20000.00,
                        "product_id": 1,
                        "name": "红色",
                        "weight": 20,
                        "id": 1,
                        "bulk": 0,
                        "stock_balance": 1000,
                        "cost_price": 100.00
                    }, {
                        "price": 3000.00,
                        "suggested_price": 10000.00,
                        "product_id": 1,
                        "name": "银色",
                        "weight": 10,
                        "id": 2,
                        "bulk": 0,
                        "stock_balance": 1000,
                        "cost_price": 100.00
                    }],
                    "sales": 0,
                    "cover": "http://o9ixtumvv.bkt.clouddn.com/20170525103606389-6Vu95yiR.jpg", //产品默认的封面图
                    "price": 1000.00,
                    "id": 1,
                    "sort_order": 100,
                    "barcode": null,
                    "store_location": null,
                    "cost_price": 10.00,
                    "covers": [
                        "http://o9ixtumvv.bkt.clouddn.com/20170525153019061-qsQ1cWAF.jpg",
                        "http://o9ixtumvv.bkt.clouddn.com/20170525153019363-kLyFRGJS.jpg"
                    ],  //产品的封面图列表
                    "weight": 200,
                    "stock_balance": 1000,
                    "brand_id": null,
                    "unit": "台",
                    "suggested_price": 2000.00,
                    "name": "诺基亚",
                    "short_name": "诺基亚缩略名",
                    "created_date": "2017-05-25 10:36:06",
                    "fare_id": 1,
                    "bulk": null,
                    "partner_level_zone": 1,
                    "view_count": 0,
                    "status": "ONSELL"
                },
                "pricing": {  //与用户默认配送地区相匹配的价格项
                    "suggested_retail_price": 22,
                    "region": "辽宁",
                    "id": 8,
                    "enabled": 1,
                    "price": 11,
                    "is_default": 0,
                    "wholesale_id": 1,
                    "suggested_wholesale_price": 44
                },
                "product_id": 1,  //产品id
                "marketing_name": "批发1",  //批发活动名称
                "marketing_short_name": "活动1缩略名",
                "description": "机会难得！！！",  //描述
                "id": 1,
                "status": "ONSELL" //状态。INIT/ONSELL/OFFSELL
                "settlement_proportion": 30,  //分成比例
                "agent_proportion": 20,  //代理分成比例
                "unit": 件 //单位
            }]
        }
    }

# 批发详情
    GET http://112.74.26.228:10080/rest/wholesale/:id
    Tips：如果用户没有设置默认配送地区，则此api不返回指定的批发详情。
    Para:
    id: required,批发活动id
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": {
            "category_id": 1,
            "cover": "http://o9ixtumvv.bkt.clouddn.com/20170525151147892-Koka1giH.jpg", //批发活动封面 
            "sale": 0,  //已售个数                                              
            "pricings": [{  //价格列表。不同地区的批发价格不同。
                            //1.is_default为1的价格项表示该价格适合于所有地区（不含专门设置的地区）
                            //  enabled若为1，则所有地区都配送（除去is_default为0且enabled为0的价格项）； 
                            //  enabled若为0，则所有地区都不配送（除去is_default为0且enabled为1的价格项）  
                            
                            //2.is_default为0的价格项表示专门设置的地区对应的价格（优先于默认价格项），
                            //  enabled若为1，则覆盖默认价格项；
                            //  enabled若为0，则该地区不配送
                            
                            //3.某些地区不设置，则不配送到该地区。例如 pricings的返回结果为空数组[]，则表示
                            //  所有地区都不配送。
                "region": null,
                "id": 47,
                "price": 900,
                "is_default": 1,
                "enabled": 1,
                "wholesale_id": 1,
                "suggested_retail_price": 1000,
                "suggested_whole_price": 800, 
            },{
                "region": "江苏-苏州|江苏-南通",
                "id": 48,
                "price": 1100,
                "is_default": 0,
                "enabled": 0,
                "wholesale_id": 1,
                "suggested_retail_price": 850, //产品在该地区的线下建议零售价
                "suggested_whole_price": 800 //产品在该地区的星级经销价
            }], 
            "product": {  //参考产品api
                "free_shipping": 0,
                "freight": 0.00,
                "last_modified_date": "2017-05-25 15:30:19",
                "promoted": 0,
                "specifications": [{
                    "price": 10000.00,
                    "suggested_price": 20000.00,
                    "product_id": 1,
                    "name": "红色",
                    "weight": 20,
                    "id": 1,
                    "bulk": 0,
                    "stock_balance": 1000,
                    "cost_price": 100.00
                }, {
                    "price": 3000.00,
                    "suggested_price": 10000.00,
                    "product_id": 1,
                    "name": "银色",
                    "weight": 10,
                    "id": 2,
                    "bulk": 0,
                    "stock_balance": 1000,
                    "cost_price": 100.00
                }],
                "sales": 0,
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20170525153019061-qsQ1cWAF.jpg",
                "category_id": 1,
                "price": 1000.00,
                "id": 1,
                "sort_order": 100,
                "barcode": null,
                "store_location": null,
                "cost_price": 10.00,
                "covers": ["http://o9ixtumvv.bkt.clouddn.com/20170525153019061-qsQ1cWAF.jpg", "http://o9ixtumvv.bkt.clouddn.com/20170525153019363-kLyFRGJS.jpg"],
                "weight": 200,
                "stock_balance": 1000,
                "brand_id": null,
                "unit": "台",
                "suggested_price": 2000.00,
                "name": "诺基亚",
                "short_name": "诺基亚缩略名",
                "created_date": "2017-05-25 10:36:06",
                "fare_id": 1,
                "bulk": null,
                "partner_level_zone": 1,
                "view_count": 0,
                "status": "ONSELL"
            },
            "pricing": {  //与用户默认配送地区相匹配的价格项
                "suggested_retail_price": 22,
                "region": "辽宁",
                "id": 8,
                "enabled": 1,
                "price": 11,
                "is_default": 0,
                "wholesale_id": 1,
                "suggested_wholesale_price": 44
            },
            "product_id": 1,  //产品id
            "marketing_name": "批发1",  //批发活动名称
            "marketing_short_name": "批发1缩略名",
            "description": "<p>机会难得！！！<br/></p>",  //描述
            "id": 1,  //活动id
            "status": "ONSELL"  //活动状态（INIT/ONSELL/OFFSELL）,
            "settlement_proportion": 30,  //分成比例
            "agent_proportion": 44,  //代理分成比例
            "proportionLv1": 24, //下级线下皇冠批发产品时的分成比例 = 分成比例*下级线下皇冠分成比例
            "proportionLv2": 6, //下下级线下皇冠批发产品时的分成比例 = 分成比例*下下级线下皇冠分成比例
            "unit": "件" //单位
        }
    }

# 新建批发订单
    POST http://112.74.26.228:10080/rest/order
    参考 下单前计算优惠信息 api 返回的优惠券，选择一个优惠劵进行下单。
    到支付宝支付时，把order-number的值赋给out_trade_no进行支付。
    微信支付 - WECHAT
    积分支付 - POINT
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {       
        //这两个是 "新建订单api" 新增的域
        "marketing": "WHOLESALE",  //required。新建批发订单必须是WHOLESALE
        "order_items": [
        {
            "product_id": 1,
            "product_specification_id": 1,  
            "quantity": 2,
            "marketing_id": 1,  //required。批发活动的ID, 即wholesale的id
        }
        ...其他需要提供的域同"新建订单api"
    }
    Return: 同“新建订单api”

# 试用装列表
    GET http://112.74.26.228:10080/rest/trial
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": [
            {
                "short_note": "洗发水试用",
                "note": null,
                "end_time": null,
                "shipping_type": 0,
                "index": 100,
                "version": 1,
                "enabled": 1,
                "cover": "http://o9ixtumvv.bkt.clouddn.com/20180709182906045-hyEDbt5L.jpeg",
                "start_time": null,
                "payment_type": null,
                "price": 0,
                "product_id": 335,
                "name": "洗发水试用-免费",
                "id": 1,
                "partaken": true   //已经参加过
            }
        ]
    }

# 试用装详情
    GET http://112.74.26.228:10080/rest/trial/:id
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Return:
    {
        "status_code": 0,
        "data": {
            "short_note": "洗发水试用",
            "note": null,
            "product": {
                "free_shipping": 0,
                "freight": 0,
                "last_modified_date": "2016-12-22 10:10:36",
                "mid": null,
                "promoted": 1,
                "sales": 9,
                "cover": "http://images.10mup.com/20161104102243958-v499XJvA.jpg",
                "category_id": 83,
                "price": 12.9,
                "sku_name": null,
                "id": 335,
                "sort_order": 1,
                "barcode": "6903148126660",
                "store_location": null,
                "cost_price": 10.21,
                "weight": 500,
                "sku_id": null,
                "stock_balance": 13,
                "brand_id": null,
                "unit": "瓶",
                "suggested_price": 20,
                "name": "REJOICE飘柔家庭护理芦荟长效止痒滋润洗发露400ML",
                "bar_code": null,
                "short_name": "止痒滋润洗发露",
                "created_date": "2016-10-07 14:11:51",
                "fare_id": 4,
                "bulk": 0,
                "partner_level_zone": 1,
                "sku_code": null,
                "view_count": 2172,
                "status": "ONSELL"
            },
            "end_time": null,
            "shipping_type": 0,
            "index": 100,
            "version": 2,
            "enabled": 1,
            "cover": "http://o9ixtumvv.bkt.clouddn.com/20180709182906045-hyEDbt5L.jpeg",
            "start_time": null,
            "payment_type": null,
            "price": 0,
            "product_id": 335,
            "name": "洗发水试用-免费",
            "id": 1,
            "partaken": true,
            "covers": [
                {
                    "product_id": 335,
                    "id": 1298,
                    "type": 0,
                    "sort_order": 1,
                    "url": "http://images.10mup.com/20161104102243958-v499XJvA.jpg"
                },
                {
                    "product_id": 335,
                    "id": 1299,
                    "type": 0,
                    "sort_order": 2,
                    "url": "http://images.10mup.com/20161104102242227-T17IgsG8.jpg"
                },
                {
                    "product_id": 335,
                    "id": 1300,
                    "type": 0,
                    "sort_order": 3,
                    "url": "http://images.10mup.com/20161104102241687-lfedAC1r.jpg"
                }
            ]
        }
    }

# 新建试用装申请订单
    POST http://112.74.26.228:10080/rest/order
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    Data:
    {       
        //这两个是 "新建订单api" 新增的域
        "marketing": "TRIAL",  //required。新建试用装订单必须是TRIAL
        "order_items": [
        {
            "product_id": 1,  // 该试用装的产品ID
            "product_specification_id": 1,  //规格号，如果有就带上
            "quantity": 1,  //数量，必须是1
            "marketing_id": 1,  //required。批发活动的ID, 即trial的id
        }
        ...其他需要提供的域同"新建订单api"
    }
    Return: 同“新建订单api”

# 我的试用装申请列表
    GET http://112.74.26.228:10080/rest/trial/application?pageNumber=1&pageSize=30
    Header: Authorization: eyJ0b2tlbiI6IjczYmI2MWFjNmRlN2E0NDVlOGI4MzNmZjlkYWJlYjI4NTBhMzg0NmMiLCJsb2dpbl9uYW1lIjoiYWRtaW4ifQ==
    public static enum Status {
        APPLYING, //申请中
        AUDITING, //审核中
        DELIVERING, //发货中
        DELIVERED, //已发货
        REJECTED  //未获得试用资格
    }
    Return:
    {
        "status_code": 0,
        "data": {
            "totalRow": 1,
            "pageNumber": 1,
            "lastPage": true,
            "firstPage": true,
            "totalPage": 1,
            "pageSize": 30,
            "list": [
                {
                    "cover": "http://o9ixtumvv.bkt.clouddn.com/20180709182906045-hyEDbt5L.jpeg",
                    "trial_id": 1,
                    "created_time": "2018-08-06 17:27:21",
                    "note": null,
                    "user_id": 11080,
                    "order_number": "18080617272155711080",
                    "shipping_type": 0,
                    "name": "洗发水试用-免费",
                    "id": 1,
                    "order_id": 3288,
                    "version": 1,
                    "status": "AUDITING"
                }
            ]
        }
    }

# 其它配置

# 意见反馈
    POST http://112.74.26.228:10080/rest/feedback
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "content": "建议门槛更低些，可以让更多人参与。",  //必选
        "images": [                                 //可选
            "http://image.url",
            "http://image2.url"
        ]
    }
    Return:
    {
        "message": "feedback.created",
        "status_code": 0
    }
    Error Return:
    {
        "message": "invalid.input.json",
        "status_code": 1
    }

# 常见问题类型
    GET http://112.74.26.228:10080/rest/faq_type
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return:
    {
        "status_code": 0,
        "data": [{
            "id": 1,
            "name": "FN"
        }, {
            "id": 2,
            "name": "UI"
        }]
    }

# 常见问题
    GET http://112.74.26.228:10080/rest/faq?typeId=1&pageNumber=1&pageSize=20
    Header: Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Query Parameter:
    typeId - optional, 问题类型ID
    pageNumber - optional, 页数
    pageSize - optional, 每页记录数
    Return:
    {
        "status_code": 0,
        "data": [{
            "created_date": "2016-05-16 12:52:15",
            "content": "分销拥金可提现时间是订单关闭后一天。",
            "id": 1,
            "last_modified_date": "2016-05-16 12:52:15",
            "title": "分销拥金可提现时间",
            "type_id": 1
        }]
    }

# 关于商城
    GET http://112.74.26.228:10080/rest/about_mall
    Return:
    {
        "status_code": 0,
        "data": {
            "content": null,
            "id": 1,
            "image": "http://host:port/images/a.jpg"
        }
    }

# 广告
    GET http://112.74.26.228:10080/rest/ad
    返回所有广告组别的广告。
    Return:
    {
        "status_code": 0,
        "data": [{
            "id": 1,
            "name": "头位广告",
            "ads": [{
                "id": 1,
                "enabled": 1,
                "name": "a",
                "group_id": 1,
                "image": "/ad/7ce3c3f9662b92b759ecb8f523070631.jpg",
                "type": "a",
                "target_url": "http://localhost:9990"
            }]
        }, {
            "id": 2,
            "name": "首页banner",
            "ads": []
        }]
    }
    GET http://112.74.26.228:10080/rest/ad/<group-name>
    返回该组别下的广告列表。
    Return:
    {
        "status_code": 0,
        "data": [{
            "id": 1,
            "enabled": 1,
            "name": "a",
            "group_id": 1,
            "image": "/ad/7ce3c3f9662b92b759ecb8f523070631.jpg",
            "type": "a",
            "target_url": "http://localhost:9990"
        }]
    }

# 客服QQ
    GET http://112.74.26.228:10080/rest/kf_qq
    返回QQ列表。
    Return:
    {
        "status_code": 0,
        "data": [
            {
            "number": "234234", //QQ号
            "name": "AAA",
            "id": 1,
            "enabled": 1
            },
            {
            "number": "2342",
            "name": "BBB",
            "id": 2,
            "enabled": 1
            }
        ]
    }

# Base64上传图片
    POST http://112.74.26.228:10080/rest/upload_image
    通过POST base64 编码的图片来上传
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
        data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2.........
    return:
    {
        "status_code": 0,
        "data": "http://112.74.26.228:8000/upload/2016-06-30/20160630113427-00803.jpg"
    }

    #form上传图片
    POST http://112.74.26.228:10080/rest/upload_image_x
    通过POST form 上传
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    return:
    {
        "status_code": 0,
        "data": [
            {
                "file_name": "e39936cbc10f49cef1316342a3938fec.png",
                "original_file_name": "20180427-231841-把祷告事项从应用内分享到微信群~显示错误.png",
                "url": "https://www.kequandian.net/upload/2018-05-30/e39936cbc10f49cef1316342a3938fec.png"
            },
            {
                "file_name": "ba87f98c1028d55f5978fca64a6bce29.jpeg",
                "original_file_name": "20161104133328890-xfTkpZAK.jpeg",
                "url": "https://www.kequandian.net/upload/2018-05-30/ba87f98c1028d55f5978fca64a6bce29.jpeg"
            }
        ]
    }

# 系统公告
    GET http://112.74.26.228:10080/rest/system_announcement
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    return:
    {
        "status_code": 0, 
        "data": [
            {
                "name": "fdsf", 
                "id": 33, 
                "created_date": "2016-10-17 15:49:40", 
                "content": "safas afds afadsfas"
            }, 
            {
                "name": "fdsfsd", 
                "id": 34, 
                "created_date": "2016-10-17 15:51:08", 
                "content": "sfdsfds"
            }
        ]
    }

# 微信公众号访问域名
    GET http://112.74.26.228:10080/rest/wx/host_prefix
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=

    return:
    {
        "status_code": 0, 
        "data": "https://www.muaskin.com/wx"
    }

# 收藏宝贝

# 返回收藏宝贝列表
    GET http://112.74.26.228:10080/rest/product_favorite?pageNumber=1&pageSize=20
    Query Parameter:
    pageNumber - optional, 页数
    pageSize - optional, 每页记录数
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return：
    {
        "status_code": 0,
        "data": [{
            "id": 1,
            "user_id": 1,
            "product_id": 1,
            "collect_date": "2016-05-18 16:52:15",
            "category_id": 1,
            "name": p1,
            "cover": imag/xx.png,
            "brand": ,
            "origin":,
            "stock_balance":,
            "sales":,
            "description":,
            "status":,
            "created_date":,
            "last_modified_date":,
            "unit":,
            "price":,
            "cost_price":,
            "suggested_price":,
            "promoted":,
            "freight":,
            "free_shipping":,
            "sort_order":;
        }]
    }

# 添加收藏宝贝
    POST http://112.74.26.228:10080/rest/product_favorite
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    {
        "product_id": 1
    }
    Return：
    {
        "status_code": 0,
        "message": "product.favorite.created",
    }
    Error Return:
    {
        "message": "invalid.input.json",
        "status_code": 1
    }

# 删除收藏宝贝
    DELETE http://112.74.26.228:10080/rest/product_favorite/id
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Parameter:
    id -商品id
    Return：
    {
        "message": "product.favorite.deleted",
        "status_code": 0
    }
    Error Return:
    {
        "message": "no.such.product.favorite",
        "status_code": 1
    }

# 打单系统API

# 快递公司列表
    GET http://112.74.26.228:10080/rest/admin/express
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return：
    {
        "status_code": 0,
        "data": [{
            "id": 3,
            "enabled": 1,
            "name": "百世快递",
            "is_default": 1,
            "code": "baishiwuliu"
        }, {
            "id": 1,
            "enabled": 1,
            "name": "天天快递",
            "is_default": 0,
            "code": "tiantian"
        }, {
            "id": 2,
            "enabled": 1,
            "name": "万象物流",
            "is_default": 0,
            "code": "wanxiangwuliu"
        }]
    }

# 订单列表
    GET http://112.74.26.228:10080/rest/admin/order?status=CONFIRMED_DELIVER_PENDING&status=DELIVERING&started_date=1313432434&end_date=1334453432424&order_number=32432432432&order_number=23432432432
    Query Parameter:
    status - optional, 订单状态，可以同时提供多个值，各个值间是“或”的关系。如果为空，则查询CONFIRMED_DELIVER_PENDING状态的订单。
    started_date - optional，整数类型， 开始时间
    end_date - optional, 整数类型， 结束时间
    order_number - optional， 订单号，可以同时提供多个值，各个值间是“或”的关系。
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Return：
    {
        "status_code": 0,
        "data": [{
            "detail": "和平区 89652号",
            "phone": "13652698536",
            "is_deliver_reminder": 1,
            "contact_user": "huang",
            "remark": null,
            "invoice": 0,
            "street": null,
            "trade_number": "TEST1467273404816",
            "express_number": null,
            "deal_date": null,
            "express_company": null,
            "city": "天津",
            "id": 299,
            "cover": "http://112.74.26.228:8000/p/c45bb9fda6d985a3be40b40bdb693bb0.jpg",
            "confirm_date": null,
            "description": "超效洁净护理洗衣液2.5L【运费10元】 x 1. ",
            "province": "天津",
            "user_id": 2,
            "express_code": null,
            "district": "和平区",
            "deliver_date": null,
            "delivered_date": null,
            "created_date": "2016-06-30 15:55:40",
            "order_number": "2016063015554024000000201",
            "zip": null,
            "status": "CONFIRMED_DELIVER_PENDING",
            "invoice_title": null,
            "receiving_time": null,
            "deliver_order_number": null,
            "total_price": 44.80,
            "previous_status": null,
            "settled": 0,
            "freight": 10.00,
            "pay_date": "2016-06-30 15:56:44",
            "payment_type": "WECHAT",
            "order_items": [{
                "quantity": 12,
                "product_specification_id": null,
                "weight": 22,
                "product_specification_name": null,
                "product_name": "a",
                "cover": "/p/b06260c587244e867209a5ba374a16ed.jpeg",
                "final_price": 132.00,
                "price": 11.00,
                "product_id": 1,
                "id": 3,
                "bulk": null,
                "order_id": 2,
                "partner_level_zone": 1,
                "barcode": null,
                "store_location": null,
                "status": "CREATED",
                "cost_price": 1.00
            }, {
                "quantity": 21,
                "product_specification_id": 1,
                "weight": 32,
                "product_specification_name": "sfsf",
                "product_name": "b",
                "cover": "/p/39df6836637605a5c86e8aec6ac8a43d.jpeg",
                "final_price": 693.00,
                "price": 33.00,
                "product_id": 2,
                "id": 4,
                "bulk": null,
                "order_id": 2,
                "partner_level_zone": 1,
                "barcode": null,
                "store_location": null,
                "status": "CREATED",
                "cost_price": 22.00
            }]
        }, {
            "detail": "同德乡田心西路富新大厦202",
            "phone": "13430377263",
            "is_deliver_reminder": 1,
            "contact_user": "邓棋云",
            "remark": null,
            "invoice": 0,
            "street": null,
            "trade_number": "TEST1469777476820",
            "express_number": null,
            "deal_date": null,
            "express_company": null,
            "city": "广州",
            "id": 478,
            "cover": "http://images.10mup.com/20160722155600409-t2lJM6oT.jpg",
            "confirm_date": null,
            "description": "亮白增艳护理洗衣液2.5L【全国包邮（甘肃、宁夏、新疆、西藏、青海、内蒙古除外）】法国香薰 x 1. ",
            "province": "广东",
            "user_id": 210,
            "express_code": null,
            "district": "白云区",
            "deliver_date": null,
            "created_date": "2016-07-29 15:30:30",
            "order_number": "160729153030841210",
            "zip": null,
            "status": "CONFIRMED_DELIVER_PENDING",
            "invoice_title": null,
            "receiving_time": null,
            "deliver_order_number": null,
            "total_price": 38.80,
            "previous_status": null,
            "settled": 0,
            "freight": 0.00,
            "pay_date": "2016-07-29 15:31:16",
            "payment_type": "WECHAT",
            "order_items": []
        }, {
            "detail": "西槎路田心西路",
            "phone": "13822222291",
            "is_deliver_reminder": 1,
            "contact_user": "肖生",
            "remark": null,
            "invoice": 0,
            "street": null,
            "trade_number": "TEST1471255826887",
            "express_number": null,
            "deal_date": null,
            "express_company": null,
            "city": "广州",
            "id": 497,
            "cover": "http://images.10mup.com/20160723174322764-pmKT58D2.jpg",
            "confirm_date": null,
            "description": "纳爱斯柠檬绿茶牙膏天然柠檬绿茶口腔清洁160gX3支 x 1. ",
            "province": "广东",
            "user_id": 205,
            "express_code": null,
            "district": "白云区",
            "deliver_date": null,
            "created_date": "2016-08-15 18:09:13",
            "order_number": "160815180913014205",
            "zip": null,
            "status": "CONFIRMED_DELIVER_PENDING",
            "invoice_title": null,
            "receiving_time": null,
            "deliver_order_number": null,
            "total_price": 19.83,
            "previous_status": null,
            "settled": 0,
            "freight": 0.00,
            "pay_date": "2016-08-15 18:10:26",
            "payment_type": "WECHAT",
            "order_items": []
        }, {
            "detail": "西槎路田心西路",
            "phone": "13822222291",
            "is_deliver_reminder": 1,
            "contact_user": "肖生",
            "remark": null,
            "invoice": 0,
            "street": null,
            "trade_number": "TEST1471363956667",
            "express_number": null,
            "deal_date": null,
            "express_company": null,
            "city": "广州",
            "id": 504,
            "cover": "http://images.10mup.com/20160722155600409-t2lJM6oT.jpg",
            "confirm_date": null,
            "description": "亮白增艳护理洗衣液2.5L【全国包邮（甘肃、宁夏、新疆、西藏、青海、内蒙古除外）】薰衣草 x 1. ",
            "province": "广东",
            "user_id": 205,
            "express_code": null,
            "district": "白云区",
            "deliver_date": null,
            "created_date": "2016-08-17 00:11:38",
            "order_number": "160817001138232205",
            "zip": null,
            "status": "CONFIRMED_DELIVER_PENDING",
            "invoice_title": null,
            "receiving_time": null,
            "deliver_order_number": null,
            "total_price": 38.80,
            "previous_status": null,
            "settled": 0,
            "freight": 0.00,
            "pay_date": "2016-08-17 00:12:36",
            "payment_type": "WECHAT",
            "order_items": []
        }]
    }

# 批量更新订单发货信息
    POST http://112.74.26.228:10080/rest/admin/deliver
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    [{
        "order_number": "23432432432",
        "express_id": 2,
        "express_number": "23423432432"
    }]
    Return:
    {
        "message": "order.delivered",
        "status_code": 0
    }

# 批量完成订单发货
    POST http://112.74.26.228:10080/rest/admin/delivered
    Header:
    Authorization: eyJ0b2tlbiI6IjMxODhiZmUxMzM2ZjY0MGQ5ZmU3OTUxMDZkYTUzMjE5MDJlODAwZjAiLCJsb2dpbl9uYW1lIjoiMTIzIn0=
    Data:
    [{
        "order_number": "23432432432"
    }]
    Return:
    {
        "message": "order.delivered",
        "status_code": 0
    }

# 支付宝支付
    POST http://host:port/rest/ali/push_order

    Data:
    {
        "order_number": "1234",  //账单号
        "order_type": "Order",  //账单类型，订单：Order, 钱包充值： Wallet, 预约： Appointment 
        "type": "QRCODE" // QRCODE： PAD端生成支付宝二维码， APP： 移动应用调起支付宝支付
    }
    PAD端拿到 qrCode 字段生成二维码给用户使用支付宝扫码进行支付。
    APP端拿到 orderString后 发给支付宝唤起支付宝支付。
    Response:
    {
        "status_code": 0,
        "data": {
            "qr_code": "https://qr.alipay.com/bax01098eimzy9vigelm00c7" // type是QRCODE时返回
            "order_string": "alipay_sdk=alipay-sdk-java-3.4.27.ALL&app_id=2016092200567241&biz_content=%7B%22body%22%3A%22DEMO%22%2C%22out_trade_no%22%3A%221234%22%2C%22subject%22%3A%22DEMO%22%2C%22timeout_express%22%3A%2230m%22%2C%22total_amount%22%3A%2211.1%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=%2Frest%2Fpub%2Fali%2Fpay_notify&sign=JP1AxixqyWqz8n4CRNAvkhysh8dCH86fV6oMkftLzRdyZqWIQIHW%2FHWhnwHgw4Xfj4lkwoJFPVCi1pYw0Ef0zFE5PVFBRaABLFQcX3sRB4pO6UDrXvo%2BR8vqFTrnuYwXCS91VxKlU4Fj%2FMa94ZJ4eUtm62qvyqS9wbyGTEaVy9vddjSiEgPS8fAch9V3qNobNYFGC7Mfhi8BjHX1zgONQusR75DnqH4DOywdmarzZFHrtlVBeQg1gI89dyeiLZOthiZ0jsBHxmS4jNxkiw%2BRF7Sr8HDyKV9Ubd0po6rdLsInHtVivom6hVKjzvM1kJkltXIpUZ39jiTTD6iaUy%2B9Bw%3D%3D&sign_type=RSA2&timestamp=2018-11-05+18%3A25%3A16&version=1.0" //type是 APP 时返回
        }
    }