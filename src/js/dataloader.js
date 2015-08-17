function DataLoader()
{
    var self = this;
    this.settings = null;
    this.data = null;
    this.localizedPage = null;
    this.lpCallBack = null;
    
    this.loadSettings = function(callBack)
    {
        var jsonFile = "data/" + GET['name'] + "/settings.json";
        $.getJSON(jsonFile)
            .done(function(result) {            
                self.settings = new Settings(result);
                InstanceFactory.getTrace().deb("settings loaded");
            })
            .fail(function() {
                InstanceFactory.getTrace().err("settings load");
                window.location.href += '/load-error';
            })
            .always(function() {
                callBack();
            });
    };
    
    this.loadLocalizedPage = function(callBack)
    {
        self.getTemplateFile();
        self.getDataFile();
        self.getFlags();
        self.lpCallBack = callBack;
    };
    
    
    this.getTemplateFile = function()
    {
        var templateFile = "src/html/template.html";
        
        $.ajax(templateFile)
            .done(function(result) {
                self.template = result;
                InstanceFactory.getTrace().deb("Template File loaded");
                self.localizeData();
            })
            .fail(function() {
                InstanceFactory.getTrace().err("Template does not exist");
            });
    };
    
    this.getDataFile = function()
    {
        var lang = $('html').attr('lang');
        var dataFile = "data/" + GET['name'] + "/data-" + lang + ".json";

        $.getJSON(dataFile)
            .done(function(result) {
                self.data = new Data(result);
                InstanceFactory.getTrace().deb(lang + " data file loaded");
                self.localizeData();
            })
            .fail(function() {
                InstanceFactory.getTrace().err(lang + " data file does not exist");
            });
    };
    
    this.getFlags = function()
    {
        var array = self.settings.languages;
        for (var i = 0; i < array.length; i++) {
            var css =  'src/libs/phoca-cssflags/' + array[i].id + ".css";
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', css));
        }
        return false;
    };
    
    this.localizeData = function()
    {
        if (self.data === null) return;
        if (self.template === null) return;
        
        self.localizedPage = self.data.fillTemplate(self.template);
        
        $("body").html(self.localizedPage);
        self.lpCallBack();
    };
    
    this.addBlock = function(name, data)
    {
        name = "[" + name + "]";
        self.template = self.template.split(name).join(data);
    };
    
    this.authorizedLanguage = function(lang)
    {
        var array = self.settings.languages;
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === lang) return true;
        }
        return false;
    };
    
    this.authorizedSkin = function(skin)
    {
        var array = self.settings.skins;
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === skin) return true;
        }
        return false;
    };
    
    this.getStyleFromSkin = function(target)
    {
        var array = self.settings.skins;
        for (var i = 0; i < array.length; i++) {
            var skin = array[i];
            if (skin.id === target) return skin.path + "style.css";
        }
        InstanceFactory.getTrace().err("style file not found");
    };
    
    this.getStylePrintFromSkin = function(target)
    {
        var array = self.settings.skins;
        for (var i = 0; i < array.length; i++) {
            var skin = array[i];
            if (skin.id === target) return skin.path + "style-print.css";
        }
        InstanceFactory.getTrace().err("style print file not found");
    };
}

