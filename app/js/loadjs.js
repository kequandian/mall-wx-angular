(function () {
    /*function doLoad() {
     var worker = new Worker("js/loadjs.js");
     worker.onmessage = function (event) {
     self.close();
     };
     worker.onerror = function (error) {
     self.close();
     };
     worker.postMessage("5");
     }*/

    // Setup an event listener that will handle messages sent to the worker.
    self.addEventListener('message', function (e) {
        console.log('worker message?' + typeof e.data);
        self.postMessage(e.data);
    }, false);

    function loadScript(src, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (callback)script.onload = callback;

        var sc = document.getElementsByTagName("head")[0];
        if (!sc.contains(script)) {
            sc.appendChild(script);
            script.src = src;
        } else {
            if (callback) {
                callback();
            }
        }
    }
})();