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

