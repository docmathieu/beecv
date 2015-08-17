function Language(values)
{
    var self = this;
    this.id = "en";
    this.text = "";
    this.image = "";
    this.link = "";
    this.typeMail = false;
    this.visible = false;
    
    this.init = function (values)
    {
        self.id = values.id;
        self.text = values.text;
        self.image = values.image;
        self.link = values.link;
        self.typeMail = values.typemail;
        self.visible = values.visible;
    };
    
    self.init(values);
}