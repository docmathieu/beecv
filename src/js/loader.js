function Loader()
{
    var self = this;
    var styleArray = [
        "src/libs/bootstrap/bootstrap-3.3.5-dist.min.css",
        "src/libs/bootstrap/bootstrap-3.3.5-dist-theme.min.css",
        "src/css/global-style.css",
        "src/libs/jquery/jquery.mCustomScrollbar.css",
        "http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
    ];
        
    var scriptArray = [
        "src/libs/bootstrap/bootstrap-3.3.5-dist.min.js",
        "src/libs/jquery/jquery.mCustomScrollbar.min.js",
        "src/js/trace.js",
        "src/js/htmlbuilder.js",
        "src/js/dataloader.js",
        "src/js/instancefactory.js",
        "src/js/datetime.js",
        "src/js/eventlistener.js",
        "src/js/models/setting/language.js",
        "src/js/models/setting/skin.js",
        "src/js/models/setting/settings.js",
        "src/js/models/dt/data.js"
    ];
    
    var nbScriptsLoaded = 0;
    var startScript = "src/js/main.js";
    
    this.init = function ()
    {
        self.loadStyles();
        self.loadScripts();
    };
    
    this.loadStyles = function ()
    {
        for (var i = 0; i < styleArray.length; i++) {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', styleArray[i]) );
        }
    };
    
    this.loadScripts = function ()
    {
        for (var i = 0; i < scriptArray.length; i++) {
            $.getScript(scriptArray[i])
                .done(function(script, textStatus) {
                    nbScriptsLoaded ++;
                    if(nbScriptsLoaded >= scriptArray.length) self.start();
                })
                .fail(function(jqxhr, settings, exception) {
                    InstanceFactory.getTrace().err("script load: " + scriptArray[i]);
                }
            );
        }
    };
    
    this.start = function ()
    {
        $.getScript(startScript)
            .done(function(script, textStatus) {
                
            })
            .fail(function(jqxhr, settings, exception) {
                InstanceFactory.getTrace().err("script load: " + startScript);
            }
        );
    };
    
    self.init();
}

var loader = new Loader();
