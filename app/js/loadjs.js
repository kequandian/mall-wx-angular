(function(){

    // Setup an event listener that will handle messages sent to the worker.
    self.addEventListener('message', function(e) {
        loadScript("bower_components/jquery/dist/jquery.min.js", function(){
            console.log('loaded jquery.min.js');
            loadScript("bower_components/jquery-weui/dist/js/jquery-weui.min.js", function(){
                console.log('loaded jquery-weui.min.js');
                loadScript('js/weui.js', function() {
                    console.log('loaded weui.js');
                })
            })
        })
        self.postMessage(e.data);
    }, false);

    function loadScript(src,callback){
        var script = document.createElement("script");
        script.type = "text/javascript";
        if(callback)script.onload=callback;

        var sc = document.getElementsByTagName("head")[0];
        if(!sc.contains(script)) {
            sc.appendChild(script);
            script.src = src;
        }else{
            if(callback){
                callback();
            }
        }
    }
})();