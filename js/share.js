
// Let's include a minified version of our libs
var NO_JQUERY={};(function(a,b,c){var suppress=false;if(!("console"in a)||suppress){var d=a.console={};d.log=d.warn=d.error=d.debug=function(){}}if(b===NO_JQUERY){b={fn:{},extend:function(){var a=arguments[0];for(var b=1,c=arguments.length;b<c;b++){var d=arguments[b];for(var e in d){a[e]=d[e]}}return a}}}b.fn.pm=function(){console.log("usage: \nto send:    $.pm(options)\nto receive: $.pm.bind(type, fn, [origin])");return this};b.pm=a.bufferpm=function(a){e.send(a)};b.pm.bind=a.bufferpm.bind=function(a,b,c,d){e.bind(a,b,c,d)};b.pm.unbind=a.bufferpm.unbind=function(a,b){e.unbind(a,b)};b.pm.origin=a.bufferpm.origin=null;b.pm.poll=a.bufferpm.poll=200;var e={send:function(a){var c=b.extend({},e.defaults,a),d=c.target;if(!c.target){console.warn("postmessage target window required");return}if(!c.type){/*console.warn("postmessage type required");*/return}var f={data:c.data,type:c.type};if(c.success){f.callback=e._callback(c.success)}if(c.error){f.errback=e._callback(c.error)}if("postMessage"in d&&!c.hash){e._bind();d.postMessage(JSON.stringify(f),c.origin||"*")}else{e.hash._bind();e.hash.send(c,f)}},bind:function(c,d,f,g){if("postMessage"in a&&!g){e._bind()}else{e.hash._bind()}var h=e.data("listeners.postmessage");if(!h){h={};e.data("listeners.postmessage",h)}var i=h[c];if(!i){i=[];h[c]=i}i.push({fn:d,origin:f||b.pm.origin})},unbind:function(a,b){var c=e.data("listeners.postmessage");if(c){if(a){if(b){var d=c[a];if(d){var f=[];for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i.fn!==b){f.push(i)}}c[a]=f}}else{delete c[a]}}else{for(var g in c){delete c[g]}}}},data:function(a,b){if(b===c){return e._data[a]}e._data[a]=b;return b},_data:{},_CHARS:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),_random:function(){var a=[];for(var b=0;b<32;b++){a[b]=e._CHARS[0|Math.random()*32]}return a.join("")},_callback:function(a){var b=e.data("callbacks.postmessage");if(!b){b={};e.data("callbacks.postmessage",b)}var c=e._random();b[c]=a;return c},_bind:function(){if(!e.data("listening.postmessage")){if(a.addEventListener){a.addEventListener("message",e._dispatch,false)}else if(a.attachEvent){a.attachEvent("onmessage",e._dispatch)}e.data("listening.postmessage",1)}},_dispatch:function(a){try{var b=JSON.parse(a.data)}catch(c){/*console.warn("postmessage data invalid json: ",c);*/return}if(!b.type){/*console.warn("postmessage message type required");*/return}var d=e.data("callbacks.postmessage")||{},f=d[b.type];if(f){f(b.data)}else{var g=e.data("listeners.postmessage")||{};var h=g[b.type]||[];for(var i=0,j=h.length;i<j;i++){var k=h[i];if(k.origin&&a.origin!==k.origin){console.warn("postmessage message origin mismatch",a.origin,k.origin);if(b.errback){var l={message:"postmessage origin mismatch",origin:[a.origin,k.origin]};e.send({target:a.source,data:l,type:b.errback})}continue}try{var m=k.fn(b.data);if(b.callback){e.send({target:a.source,data:m,type:b.callback})}}catch(c){if(b.errback){e.send({target:a.source,data:c,type:b.errback})}}}}}};e.hash={send:function(b,c){var d=b.target,f=b.url;if(!f){console.warn("postmessage target window url is required");return}f=e.hash._url(f);var g,h=e.hash._url(a.location.href);if(a==d.parent){g="parent"}else{try{for(var i=0,j=parent.frames.length;i<j;i++){var k=parent.frames[i];if(k==a){g=i;break}}}catch(l){g=a.name}}if(g==null){console.warn("postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list");return}var m={"x-requested-with":"postmessage",source:{name:g,url:h},postmessage:c};var n="#x-postmessage-id="+e._random();d.location=f+n+encodeURIComponent(JSON.stringify(m))},_regex:/^\#x\-postmessage\-id\=(\w{32})/,_regex_len:"#x-postmessage-id=".length+32,_bind:function(){if(!e.data("polling.postmessage")){setInterval(function(){var b=""+a.location.hash,c=e.hash._regex.exec(b);if(c){var d=c[1];if(e.hash._last!==d){e.hash._last=d;e.hash._dispatch(b.substring(e.hash._regex_len))}}},b.pm.poll||200);e.data("polling.postmessage",1)}},_dispatch:function(b){if(!b){return}try{b=JSON.parse(decodeURIComponent(b));if(!(b["x-requested-with"]==="postmessage"&&b.source&&b.source.name!=null&&b.source.url&&b.postmessage)){return}}catch(c){return}var d=b.postmessage,f=e.data("callbacks.postmessage")||{},g=f[d.type];if(g){g(d.data)}else{var h;if(b.source.name==="parent"){h=a.parent}else{h=a.frames[b.source.name]}var i=e.data("listeners.postmessage")||{};var j=i[d.type]||[];for(var k=0,l=j.length;k<l;k++){var m=j[k];if(m.origin){var n=/https?\:\/\/[^\/]*/.exec(b.source.url)[0];if(n!==m.origin){console.warn("postmessage message origin mismatch",n,m.origin);if(d.errback){var o={message:"postmessage origin mismatch",origin:[n,m.origin]};e.send({target:h,data:o,type:d.errback,hash:true,url:b.source.url})}continue}}try{var p=m.fn(d.data);if(d.callback){e.send({target:h,data:p,type:d.callback,hash:true,url:b.source.url})}}catch(c){if(d.errback){e.send({target:h,data:c,type:d.errback,hash:true,url:b.source.url})}}}}},_url:function(a){return(""+a).replace(/#.*$/,"")}};b.extend(e,{defaults:{target:null,url:null,type:null,data:null,success:null,error:null,origin:"*",hash:false}})})(this,typeof jQuery==="undefined"?NO_JQUERY:jQuery)

var BufferShare = {

  //this is set if 3rd party cookies are disabled
  tpc_disabled: false,

  //append load event to window.onload
  addLoadEvent: function(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  },

  getMetaContentFromProperty: function(p){
    var m = document.getElementsByTagName('meta');
    for(var i in m){
      try {
        if(m[i].getAttribute('property') == p){
          return m[i].content;
        }
      } catch(err) {}
    }
    return null;
  },
  getTitle: function() {
    return document.title;
  },
  getText: function(text) {
    text = text
      || BufferShare.getMetaContentFromProperty('og:title')
      || BufferShare.getTitle();
    return encodeURIComponent(text); 
  },
  getAddUrl: function(widget) {
    var attributes = [
      'url',
      'text',
      'via',
      'picture',
      'preferred_login',
      'partner_source',
      'partner_placement',
      'retweeted_tweet_id',
      'retweeted_user_id',
      'retweeted_user_name',
      'retweeted_user_display_name'
    ];

    var query = [
      'client_assistance=1',
      'signup_client=sharejs'
    ];

    var attr, dataAttr, value;
    for (var i = attributes.length - 1; i >= 0; i--) {
      attr = attributes[i];
      dataAttr = 'data-' + attr.replace(/_/g, '-');
      if (value = widget.getAttribute(dataAttr)) {
        query.push(attr + '=' + encodeURIComponent(value));
      }
    };

    return 'http://bufferapp.com/bookmarklet?' + query.join('&');
  },

  createBufferIframe: function(src) {
    BufferShare.closeBufferIframe(); 
    var iframe = document.createElement('iframe');
    iframe.allowtransparecny = 'true';
    iframe.scrolling = 'no';
    iframe.id = 'buffer_iframe';
    iframe.name = 'buffer_iframe';
    iframe.style.cssText = "border: none;height: 100%;width: 100%;position: fixed;z-index: 9999999999;top: 0px;left: 0; margin: 0; background: none; background-color: transparent; background-color: rgba(0, 0, 0, 0.1); zoom: 1; height: 100%; ";
    iframe.src = src; 
    var body = document.getElementsByTagName('body')[0];

    var footer = document.createElement('div');
    footer.id = 'buffer_share_footer';
    footer.style.cssText = "z-index:99999999999;background: #ffffff url(https://d389zggrogs7qo.cloudfront.net/images/bookmarklet_icon.png) 35px 16px no-repeat; background-size: 30px; box-shadow: 0 -1px 8px rgba(0, 0, 0, 0.1); border-top: 1px solid #ccc; border-bottom-left-radius: 4px; height: 60px; width: 100%; position: fixed; bottom: 0; right: 0;";
    footer.innerHTML = '<ul style="float: right; margin-top: 21px; margin-right: 20px; min-width: 170px;"> <li style="list-style-type: none; background:none;"><a          href="https://bufferapp.com/app" target="_blank" style="background: #eee; background: -moz-linear-gradient(top, #ffffff 0%, #ececec 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ffffff), color-stop(100%, #ececec)); background: -webkit-linear-gradient(top, #ffffff 0%, #ececec 100%); background: -o-linear-gradient(top, #ffffff 0%, #ececec 100%); background: -ms-linear-gradient(top, #ffffff 0%, #ececec 100%); background: linear-gradient(top, #ffffff 0%, #ececec 100%); border: 1px solid #aaa; border-top: 1px solid #ccc; border-left: 1px solid #ccc; padding: 8px 10px; font-size: 12px; font-weight: bold; text-decoration: none; text-shadow: 0 1px #fff; cursor: pointer; font-family: \'HelveticaNeue\',\'Helvetica Neue\',Helvetica,Arial,sans-serif !important; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; -moz-background-clip: padding; -webkit-background-clip: padding-box; background-clip: padding-box;">Visit Buffer Dashboard</a></li> </ul>'; 


    body.appendChild(iframe);
    body.appendChild(footer);

    var footerHoverCss = document.createElement('style');
    footerHoverCss.type="text/css";
    footerHoverCss.innerHTML = "#buffer_share_footer a{color: #5f5f5f!important;opacity: 0.8;-moz-opacity: 0.8;-webkit-opacity: 0.8;-o-opacity: 0.8;} #buffer_share_footer a:hover{color: #4f4f4f!important;opacity: 1;-moz-opacity: 1;-webkit-opacity: 1;-o-opacity: 1;}";
    document.body.appendChild(footerHoverCss);

    BufferShare.bindCloseListener();
    return iframe;
  },

  init: function()
  {
    document.addEventListener('click', function(event) {
      var node = event.target;
      if (node.getAttribute('data-buffer-share') !== "false") {
        var src = BufferShare.getAddUrl(node);
        if (BufferShare.tpc_disabled) {
          window.open(src, null, "height=600,width=850");
        }
        else {
          BufferShare.createBufferIframe(src);
        }
        return false;  
      }
    })
  },

  closeBufferIframe: function() 
  {
    (elem=document.getElementById('buffer_iframe')); 
    if(elem) { elem.parentNode.removeChild(elem); }
    (elem=document.getElementById('buffer_share_footer')); 
    if(elem) { elem.parentNode.removeChild(elem); }
  },

  bindCloseListener: function()
  {
    bufferpm.bind("buffermessage", function(data){
      BufferShare.closeBufferIframe(); 
      return false;
    });
  },
  TPCDisabledCheck: function()
  {


    //if the 3rd party cookies check is done, remove the iframe
    bufferpm.bind("buffer_3pc_done", function(){
      elem = document.getElementById('buffer_tpc_check');
      if(elem) { elem.parentNode.removeChild(elem); }
      return false;
    });

    //if the 3rd party cookies check is disabled, store it
    bufferpm.bind("buffer_3pc_disabled", function(){
      BufferShare.tpc_disabled = true; 
      return false;
    });

    var iframe = document.createElement('iframe');
    iframe.id = 'buffer_tpc_check';
    iframe.src = 'https://d3ijcis4e2ziok.cloudfront.net/tpc-check.html';
    iframe.style.display="none";
    document.body.appendChild(iframe);
  }
}

BufferShare.init();
BufferShare.addLoadEvent(BufferShare.TPCDisabledCheck);
