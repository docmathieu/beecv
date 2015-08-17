function Main()
{
    var self = this;
    this.defaultLocale = "";
    this.defaultSkin = "";

    this.init = function ()
    {
        InstanceFactory.getDataLoader().loadSettings(self.loadSettingComplete);
    };

    this.loadSettingComplete = function ()
    {
        self.defaultLocale = InstanceFactory.getDataLoader().settings.defaultLanguage;
        self.defaultSkin = InstanceFactory.getDataLoader().settings.defaultSkin;
        self.setLocale();
        self.setSkin();
        InstanceFactory.getDataLoader().loadLocalizedPage(self.loadPageComplete);
    };

    this.loadPageComplete = function()
    {
        InstanceFactory.getHtmlBuilder().init(self.htmlBuilComplete);
    };

    this.htmlBuilComplete = function()
    {
        InstanceFactory.getEventListener().init();
        $('#all').delay(500).fadeIn("fast");
        
        /*$('#leftSection').mCustomScrollbar({  */                       /* add beautifull scrollers */
        $('#leftSkin').mCustomScrollbar({
            theme: 'light-thin',
            autoHideScrollbar: true,
            axis:'y',
            advanced:{autoExpandVerticalScroll:true}
        });
    };

    this.setLocale = function ()
    {
        $('html').attr('lang', self.getLocale());
    };
    
    this.getLocale = function ()
    {
        var locale = self.defaultLocale;
        if (GET['lang']) locale = GET['lang'];
        if (InstanceFactory.getDataLoader().authorizedLanguage(locale)){
            return locale;
        }
        return self.defaultLocale;
    };
   
    this.setSkin = function ()
    {
        $('html').attr('skin', self.getSkin());
    };
    
    this.getSkin = function ()
    {
        var skin = self.defaultSkin;
        if (GET['skin']) skin = GET['skin'];
        if (InstanceFactory.getDataLoader().authorizedSkin(skin)){
            return skin;
        }
        return self.defaultSkin;
    };
    
    self.init();
}

var main = new Main();
