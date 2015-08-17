function Settings(values)
{
    var self = this;
    
    this.defaultLanguage = "en";
    this.languages = null;
    this.languageSelectVisible = true;
    
    this.defaultSkin = "classic";
    this.skins = null;
    this.skinSelectVisible = true;
    
    
    this.init = function (values)
    {
        self.defaultLanguage = values.defaultLanguage;
        self.languages = new Array();
        var array = values.languages;
        for (var i = 0; i < array.length; i++) {
            var language = new Language(array[i]);
            if (language.visible) self.languages.push(language);
        }
        self.languageSelectVisible = values.languageSelectVisible;
        
        self.defaultSkin = values.defaultSkin;
        self.skins = new Array();
        var array = values.skins;
        for (var i = 0; i < array.length; i++) {
            var skin = new Skin(array[i]);
            if (skin.visible) self.skins.push(skin);
        }
        self.skinSelectVisible = values.skinSelectVisible;
    };
    
    this.getLangList = function()
    {
        var langList = new Array();
        for (var i = 0; i < self.languages.length; i++) {
            langList.push(self.languages[i].id);
        }
        return langList;
    };
    
    this.getSkinList = function()
    {
        var skinList = new Array();
        for (var i = 0; i < self.skins.length; i++) {
            skinList.push(self.skins[i].id);
        }
        return skinList;
    };
    
    self.init(values);
}