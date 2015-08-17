function HtmlBuilder()
{
    var self = this;
    this.settings = null;
    
    this.init = function (callBack)
    {
        self.filData();
        self.buildAll();
        callBack();
    };
    
    this.filData = function ()
    {
        self.settings = InstanceFactory.getDataLoader().settings;
    };
    
    this.buildAll = function ()
    {
        self.builSkin();
        self.buildSettingLanguages();
        self.buildSettingSkins();
    };
    
    this.builSkin = function (skin)
    {
        if (!skin) skin = $('html').attr('skin');
        var skinFile = InstanceFactory.getDataLoader().getStyleFromSkin(skin);
        var skinPrintFile = InstanceFactory.getDataLoader().getStylePrintFromSkin(skin);
        $("link[rel='stylesheet'][href^='/skin/']").remove();                                           // remove last skin
        $('head').append( $('<link rel="stylesheet" media="screen" type="text/css" />').attr('href', skinFile) );
        $('head').append( $('<link rel="stylesheet" media="print" type="text/css" />').attr('href', skinPrintFile) );
    };
    
    this.buildSettingLanguages = function ()
    {
        if (this.settings.languageSelectVisible !== true) return;
        
        // Build image select
        var select = '';
        var values = self.settings.getLangList();
        var defaultValue = $('html').attr('lang');
        select += '<div class="phoca-box">';
        select += '<div id="language-selected"><div value="' + defaultValue + '" class="phoca-flag ' + defaultValue + '"></div></div>';
        select +=     '<div class="languages">';
        for (var i = 0; i < values.length; i++) {
            var selected = "";
            if (values[i] === defaultValue) selected = "selected";
            select +=         '<div value="' + values[i] + '" ' + selected + ' class="phoca-flag ' + values[i] + '"></div>';
        }
        select +=     '</div>';
        select += '</div>';
        
        $("#first-block").prepend(select);
        $("#first-block .languages").hide();
    };
    
    this.buildSettingSkins = function ()
    {
        if (this.settings.skinSelectVisible !== true) return;
        
        $('#setting-block').append(self.buildSelect("skins", self.settings.getSkinList(), $('html').attr('skin')));
        
        $("#setting-block .skins").change(function () {
            
            InstanceFactory.getEventListener().getNewURL(
                $('html').attr('lang'),
                $("#setting-block .skins option:selected" ).text()
            );
        });
    };
    
    this.buildSelect = function(className, values, defaultValue)
    {
        var select = '<select class="' + className + '">';
        for (var i = 0; i < values.length; i++) {
            var selected = "";
            if (values[i] === defaultValue) selected = "selected";
            select += '<option value="' + values[i] + '" ' + selected + '>' + values[i]+ '</option>';
        }
        select += '</select>';
        return select;
    };
}


