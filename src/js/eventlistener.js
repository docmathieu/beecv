function EventListener()
{
    var self = this;
   
    var classAssociation = new Array();
    
    this.init = function ()
    {
        $('img').on('dragstart', function(event) {
            event.preventDefault();
        });
        
        $('a').on('dragstart', function(event) {
            event.preventDefault();
        });
        
        self.addSearchListener();
        self.addPhotoListener();
        self.addLinksOnClipboardInput();
        self.addLanguageListener();
        self.addPrintListener();
    };
    
    this.addSearchListener = function ()
    {
        $('#leftSection .tagList span').on( "click", function() {
            self.clickOnTag($(this));
        });
    };
    
    this.addPhotoListener = function ()
    {
        $('.photo-image').on( "click", function() {
            location.reload(true);                      //Reloads the current page from the server
        });
    };
    
    this.clickOnTag = function(elem)
    {
        if (elem.hasClass('selected')){
            elem.removeClass('selected');
            self.searchTagAndRemove(elem.text());
        }else{
            if (self.searchTagAndAdd(elem.text())) elem.addClass('selected');
        }
    };
    
    this.searchTagAndAdd = function (text)
    {
        var firstClass = "";
        
        $('#rightSection').each(function() {
            var content = $(this).html();
            var regexp1 = new RegExp(">[^><]*" + text,"gi");
            var regexp2 = new RegExp(text,"gi");
            
            if (content.match(regexp1)){
                if (firstClass === ""){
                    firstClass = self.getClassAssociation(text);
                }

                var newStr = content.replace(regexp1, function(str){
                    var beforeText = str.split(regexp2)[0];
                    var newText = str.split(beforeText)[1];
                    
                    if (beforeText.toUpperCase() === text.toUpperCase()){
                        newText = beforeText;
                        beforeText = "";
                    }
                    return beforeText + '<span class="highlight ' + self.getClassAssociation(text) + '">' + newText + '</span>';
                });

                $(this).html(newStr);
            }
        });
        
        if (firstClass === ""){
            return false;
        }else{
            $('html, body').animate( {scrollTop: $('.' + firstClass).offset().top}, 500 );
        }
        return true;
    };
   
    this.searchTagAndRemove = function (text)
    {
        var classTag = self.getClassAssociation(text);
        $('#rightSection .' + classTag).each(function() {
            $(this).replaceWith($(this).html());
        });
    };
    
    this.getClassAssociation = function(text)
    {
        for (var i = 0; i < classAssociation.length; i++) {
            if (classAssociation[i].tag === text){
                return classAssociation[i].class;
            }
        }
        
        return self.setClassAssociation(text);
    };
    
    this.setClassAssociation = function(text)
    {
        var className = '___' + classAssociation.length;
        classAssociation.push({
            'tag':      text,
            'class':    className
        });
        
        return className;
    };
    
    this.addLinksOnClipboardInput = function(id)
    {
        $('#leftSection .hList a').each(function(index, element) {
            var href = $(element).attr('href');
            if ((href.search("mailto:") !== -1) || (href.search("tel:") !== -1)){
                $(element).children().on( "click", function() {
                    var data = $(this).parent().attr('href').replace("mailto:", "").replace("tel:", "");
                    self.showClipboard_block(data);
                });
            }
        });
        return;
    };
    
    this.showClipboard_block = function(data){
        $('#clipboard_block input').val(data);
        $('#clipboard_block').finish().show().delay(5000).slideUp(400);
        $('#clipboard_block input').select();
    };
    
    this.addLanguageListener = function(){
        
        $(".phoca-box")
            .mouseout(function() {
                $("#first-block .languages").stop().slideUp(200);
            })
            .mouseover(function() {
                $("#first-block .languages").stop().slideDown(200);
            });
        
        $(".languages .phoca-flag").on("click", function() {
            self.getNewURL($(this).attr("value"), $('html').attr('skin'));
        });
    };
    
    this.getNewURL = function(lang, skin)
    {
        /*
        var path = GET['name'] + '/';
        if (skin !== InstanceFactory.getDataLoader().settings.defaultSkin){
            path += lang + '/' + skin + '/';
        }else if (lang !== InstanceFactory.getDataLoader().settings.defaultLanguage){
            path += lang + '/';
        }
        */
       
        var path = 'params/' + GET['name'] + '/';
        if (skin !== InstanceFactory.getDataLoader().settings.defaultSkin){
            path += lang + '/' + skin + '/';
        }else if (lang !== InstanceFactory.getDataLoader().settings.defaultLanguage){
            path += lang + '/';
        }
        
        window.location.href = path;
    };
    
    this.addPrintListener = function(){
        $(".print-button").on("click", function(event) {
            event.preventDefault();
            window.print();
        });
    };
}