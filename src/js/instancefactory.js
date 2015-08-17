InstanceFactory =
{
    htmlBuilder : null,
    getHtmlBuilder : function ()
    {
        if (!this.htmlBuilder) this.htmlBuilder = new HtmlBuilder();
        return this.htmlBuilder;
    },
    
    trace : null,
    getTrace : function ()
    {
        if (!this.trace) this.trace = new Trace();
        return this.trace;
    },
    
    datetime : null,
    getDatetime : function ()
    {
        if (!this.datetime) this.datetime = new DateTime();
        return this.datetime;
    },
    
    dataLoader : null,
    getDataLoader : function ()
    {
        if (!this.dataLoader){
            this.dataLoader = new DataLoader();
        }
        return this.dataLoader;
    },
    
    eventListener : null,
    getEventListener : function ()
    {
        if (!this.eventListener){
            this.eventListener = new EventListener();
        }
        return this.eventListener;
    }
};
