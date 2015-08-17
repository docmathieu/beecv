function Skin(values)
{
    var self = this;
    this.id = "en";
    this.path = "";
    this.visible = false;
    
    this.init = function (values)
    {
        self.id = values.id;
        self.path = values.path;
        self.visible = values.visible;
    };
    
    self.init(values);
}