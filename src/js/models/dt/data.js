function Data(values)
{
    var self = this;
    
    this.template = null;
    
    this.beeCVLink = '<a href="https://github.com/docmathieu/beecv"><h5>BeeCV v1.0.0</h5></a>';
    
    this.name = "";
    this.firstBlockInfo = "";
    this.nameHtml = "";
    this.job = "";
    this.jobHtml = "";
    this.photo = "";
    this.after_photo = "";
    this.links = "";
    this.description = "";
    this.tags = "";
    this.datas = "";
    
    this.init = function (values)
    {
        values = self.replaceUserTag(values);
        var length = values.length;
        
        for(var i=0; i<length; i++){
            self.fillBlock(values[i]);
        }
    };
    
    this.replaceUserTag = function(values)
    {
        var jsonValues = JSON.stringify(values);
        jsonValues = jsonValues.split('[user]').join('data/' + GET['name'] + '/');
        return JSON.parse(jsonValues);
    };
    
    this.fillBlock = function(block)
    {
        //if (block.visible === false) return;
        var visible = self.getVisible(block.visible);
        
        switch (block.type){
            
            case "LAST_UPDATE":
                self.getFirstBlockInfo(visible, block.text);
                break;
            
            case "NAME":
                self.getName(visible, block.text);
                break;
            
            case "JOB":
                self.getJob(visible, block.text);
                break;
            
            case "PHOTO":
                self.photo = self.getPhoto(visible, block.link);
                break;
            
            case "AFTER_PHOTO":
                self.after_photo = self.getAfterPhoto(visible, block.array);
                break;
                
            case "LINKS":
                self.links = self.getLinks(visible, block.array);
                break;
                
            case "DESCRIPTION":
                self.description = self.getDescription(visible, block.text);
                break;
                
            case "TAGS":
                self.tags = self.getTags(visible, block.array);
                break;
                
            case "DATAS":
                self.datas  = self.getDatas(visible, block.array);
        }
    };
    
    this.fillTemplate = function(template)
    {
        self.template = template;
        self.setTitle();
        
        self.replace("FIRST_BLOCK_INFO", self.firstBlockInfo);
        self.replace("NAME", self.nameHtml);
        self.replace("JOB", self.jobHtml);
        self.replace("PHOTO", self.photo);
        self.replace("AFTER_PHOTO", self.after_photo);
        self.replace("LINKS", self.links);
        self.replace("DESCRIPTION", self.description);
        self.replace("TAGS", self.tags);
        self.replace("DATAS", self.datas);
        
        return self.template;
    };
    
    this.replace = function(name, data)
    {
        if (self.template === null) return;
        name = "[" + name + "]";
        self.template = self.template.split(name).join(data);
    };
    
    this.setTitle = function()
    {
        $("title").html(self.name);
    };
    
    this.getFirstBlockInfo = function(visible, text)
    {
        if (text){
            self.firstBlockInfo = '<div class="info">' + self.beeCVLink + '<h5 ' + visible + '>' + text + '</h5></div>';
        }
    };
    
    this.getName = function(visible, text)
    {
        if (text){
            self.nameHtml = '<h1 ' + visible + '>' + text + '</h1>';
            self.name = text;
        }
    };
    
    this.getJob = function(visible, text)
    {
        if (text){
            self.jobHtml = '<h2 ' + visible + '>' + text + '</h2>';
            self.job = text;
        }
    };
    
    this.getPhoto = function(visible, link)
    {
        var html = "";
        html = '<img ' + visible + ' class="photo-image" src="' + link + '" alt="' + self.name + '"/>';
        return html;
    };
    
    this.getAfterPhoto = function(globalVisible, list)
    {
        var html = "";
        
        var length = list.length;
        
        for(var i=0; i<length; i++){
            var visible = "";
            if (globalVisible !== ""){
                visible = globalVisible;
            }else{
                visible = self.getVisible(list[i].visible);
            }
            
            switch (list[i].type){
                
                case "TEXT":
                    html += '<h3 ' + visible + '>' + list[i].text + '</h3>';
                    
            }
        }
        
        return html;
    };
    
    this.getLinks = function(globalVisible, list)
    {
        var html = "";
        
        for(var i=0; i<list.length; i++){
            var visible = "";
            if (globalVisible !== ""){
                visible = globalVisible;
            }else{
                visible = self.getVisible(list[i].visible);
            }
            
            if (list[i].type === "LIST"){
                html += '<div ' + visible + ' class="hList">';
                for(var j=0; j<list[i].array.length; j++){
                    html += self.getLink(String(i) + String(j), list[i].array[j]);
                }
                html += '</div>';
            }else{
                html += self.getLink(list[i]);
            }
        }
        
        return html;
    };
    
    this.getLink = function(inc, data)
    {
        if (data.class === "") return "";
        
        // add listener for "copied to the clipboard"
        var id = "link_" + inc;
        var visible = "";
        visible = self.getVisible(data.visible);
        var html = "";
        
        if (data.type === "PRINT"){
            html = '<a id="' + id + '_parent" ' + visible + ' href="" class="print-button"><i id="' + id + '" class="fa ' + data.class + ' fa-3x"></i></a>';
        }else{
            html = '<a id="' + id + '_parent" ' + visible + ' href="' + data.href + '"><i id="' + id + '" class="fa ' + data.class + ' fa-3x"></i></a>';
        }
        
        return html;
    };
    
    this.getProjectDescription = function(text)
    {
        var array = text.split('\n');
        var length = array.length;
        var html = '<div class="block">';
        
        for(var i=0; i<length; i++){
            html += '<p class="description">' + array[i] + '</p>';
        }
        
        html += '</div>';
        return html;
    };
    
    this.getTags = function(visible, list)
    {
        var html = '<div ' + visible + ' class="tagList">';
        for(var i=0; i<list.length; i++){
            html += '<span>' + list[i] + '</span>';
        }
        html += '</div>';
        return html;
    };
    
    this.getDatas = function(globalVisible, list)
    {
        var html = "";
        
        var length = list.length;
        
        for(var i=0; i<length; i++){
            var visible = "";
            if (globalVisible !== ""){
                visible = globalVisible;
            }else{
                visible = self.getVisible(list[i].visible);
            }
            
            switch (list[i].type){
                
                case "TITLE":
                    html += self.getTitle(1, visible, list[i].text);
                    break;
                    
                case "TABLE":
                    html += '<div ' + visible + ' class="company-block">';
                    html += self.getTable(list[i].array);
                    html += '</div>';
                    break;
                    
                case "COMPANY":
                    html += '<div ' + visible + ' class="company-block">';
                    html += '<div class="company">';
                    
                    if (list[i].logo){
                        if (list[i].link){
                            html += '<a href="' + list[i].link + '" class="imgDesign hoverBorder ' + list[i].class + '">';
                            html += '<img class="logo-company" src="' + list[i].logo + '" alt="' + list[i].name + '"/>';
                            html += '</a>';
                        }else{
                            html += '<div class="imgDesign">';
                            html += '<img class="logo-company" src="' + list[i].logo + '" alt="' + list[i].name + '"/>';
                            html += '</div>';
                        }
                    }
                    
                    html += '</div>';
                    if (list[i].title) html += self.getTitle(2, "", list[i].title);
                    html += self.getProjets(list[i].projects);
                    html += '</div>';
                    break;
            }
        }
        
        return html;
    };
    
    this.getTitle = function(level, visible, data)
    {
        var htype = 'h3';
        var className = 'right-title';
        if (level === 2){
            htype = 'h4';
            className = 'project-title';
        }
        
        var html = '<div class="' + className + '" ' + visible + '>';
        var array = data.split('\n');
        var length = array.length;
        
        for(var i=0; i<length; i++){
            html += '<' + htype + '>' + array[i] + '</' + htype + '>';
        }
        html += '</div>';
        
        return html;
    };
    
    this.getTable = function(list)
    {
        var html = "";
        html += '<table>';
        for(var i=0; i<list.length; i++){
            html += '<tr>';
            for(var j=0; j<list[i].length; j++){
                html += '<td>';
                html += list[i][j];
                html += '</td>';
            }
            html += '</tr>';
        }
        html += '</table>';
        return html;
    };
    
    this.getProjets = function(list)
    {
        var html = "";
        html += '<ul class="projects">';
        for(var i=0; i<list.length; i++){
            var visible = self.getVisible(list[i].visible);
            html += '<li ' + visible + ' ' + visible + '><div class="project">';
            html += '<h5>' + list[i].name + '</h5>';
            html += '<h6>' + list[i].time + '</h6>';
            html += '<div class="clear"></div><div class="line"></div>';
            //html += '<p class="description">' + list[i].description + '</p>';
            html += self.getProjectDescription(list[i].description);
            
            if (list[i].list){
                html += self.getList(list[i].list);
            }
            if (list[i].table){
                html += self.getTable(list[i].table);
            }
            html += '</div></li>';
        }
        html += '</ul>';
        return html;
    };
    
    this.getDescription = function(visible, data)
    {
        var html = '<div class="description" ' + visible + '>';
        var array = data.split('\n');
        var length = array.length;
        
        for(var i=0; i<length; i++){
            html += '<p class="description">' + array[i] + '</p>';
        }
        html += '</div>';
        
        return html;
    };
    
    this.getVisible = function(value)
    {
        var visible = "";
        if (value === false) visible = 'style="display: none;"';
        return visible;
    };
    
    this.getList = function(list)
    {
        var html = "";
        html += '<div class="hList">';
        for(var i=0; i<list.length; i++){
            html += list[i];
        }
        html += '</div>';
        return html;
    };
    
    self.init(values);
}