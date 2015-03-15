Hull.component('createentityform', {
  templates: ['createentityform'],
  actions: {
    createentity: function(){
        var component = this;
        var newEntityName = this.$el.find('#newEntityField').val();
        var newEntityID = this.sandbox.util.entity.encode("http://amomentofprayer.azurewebsites.net/prayers");
        this.$el.find('#fadeout').fadeOut(300, function(){
                  component.$el.find('#fadein').fadeIn(300);
        });

        if(newEntityName)
        {
          component.api('/app/entities', 'post',{
            "uid": newEntityID,
            "name": newEntityName
          }).then(function(response) {
            console.log(response);
          });
        }
    }
  }
});

Hull.component('createquoteform', {
  templates: ['createquoteform'],
  actions: {
    createquote: function(){
        var component = this;
        var newQuoteText = this.$el.find('#newQuoteField').val();
        var newQuoteAuthor = this.$el.find('#newQuoteAuthor').val();

        if(newQuoteText && newQuoteAuthor)
        {
          component.api('/5504676b91e0cb0be00014cd/conversations', 'post',{
            "public": "true",
            "name": newQuoteText,
            "description": newQuoteAuthor,
          }).then(function(response) {
            console.log(response);
          });
        }
    }
  }
});

Hull.component('quotes', {
  templates: ['quotes'],
  datasources: {
    quotes: function() {
      return this.api('5504676b91e0cb0be00014cd/conversations', 'get', {
        order_by: 'created_at DESC'
      });
    }
  },
  initialize: function(){
    this.options.currentQuoteIndex = 0;
    this.options.NextQuoteIndex = 1;
  },
  beforeRender: function(data, errors) {
    this.options.currentQuote = data.quotes[this.options.currentQuoteIndex];
  },
  afterRender: function(data) {
    this.$el.find('[data-isActive="true"]').text(this.options.currentQuoteIndex);
  }
});
