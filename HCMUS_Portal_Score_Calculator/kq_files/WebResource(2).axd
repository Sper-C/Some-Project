if(typeof Obout=="undefined")if(typeof Type!="undefined"&&typeof Type.registerNamespace!="undefined")Type.registerNamespace("Obout");else Obout=function(){};if(typeof Obout.Interface=="undefined")Obout.Interface=function(){};Obout.Interface.OboutControlFactory=function(){};Obout.Interface.OboutControlFactory.destructControlAfterAJAXPostback=function(c,a){if(a._panelsUpdating)for(var b=0;b<a._panelsUpdating.length;b++)Obout.Interface.OboutControlFactory.isInsideAJAXPostback(c.Container,a._panelsUpdating[b])&&c.destruct()};Obout.Interface.OboutControlFactory.isInsideAJAXPostback=function(a,b){while(a){if(a==b)return true;a=a.parentNode}return false};try{if(Sys)Sys.Application&&Sys.Application.notifyScriptLoaded()}catch(ex){};