/**
 * Created by vincent on 2016/6/24.
 */
loadCssFile = function(path){
    var element = document.createElement("link");
    element.setAttribute('rel','stylesheet');
    element.setAttribute('type','text/css');
    element.setAttribute('href',path);
    document.getElementsByTagName('head')[0].appendChild(element);
}

loadJsFile= function(path){
    var element = document.createElement("script");
    element.setAttribute('type','text/javascript');
    element.setAttribute('src',path);
    element.setAttribute('defer','defer');
    document.getElementsByTagName('head')[0].appendChild(element);

}