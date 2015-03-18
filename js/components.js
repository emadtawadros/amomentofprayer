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
       'wrapped': true,
       'page': this.options.page,
       'per_page': 2
     });
   }
  },
  initialize: function(){
    this.options.page = 1;
    this.options.currentQuoteIndex = 0;
    this.options.nextQuoteIndex = 1;
  },
  beforeRender: function(data, errors) {
    this.options.data = data;
    this.options.currentQuote = data.quotes.data[this.options.currentQuoteIndex];
    if(data.quotes.data.length >=2)
    {
      this.options.nextQuote = data.quotes.data[this.options.nextQuoteIndex];
    }
    
    this.options.fetchedQuotesLength = data.quotes.data.length;
  },
  afterRender: function(data) {
    var component = this;
    
    var currentQuote = this.$el.find('[data-isActive="true"]');
    currentQuote.fadeOut(500, function(){
      currentQuote.find('#quoteText').text(component.options.currentQuote.name);
      currentQuote.find('#quoteAuthor').text(component.options.currentQuote.description);
      
      currentQuote.fadeIn(500, function(){
        setTimeout(function(){
          if(component.options.fetchedQuotesLength >= 2)
          {
            var nextQuote = component.$el.find('[data-isActive="false"]');
            nextQuote.find('#quoteText').text(component.options.nextQuote.name);
            nextQuote.find('#quoteAuthor').text(component.options.nextQuote.description);
          }
          
          if(component.options.nextQuoteIndex != 0) {
            component.rotateQuotes(component);
          }
        }, 5000);

      });
    });

  },
  actions: {
  },
  rotateQuotes: function (component) {
    var currentActiveDiv = component.$el.find('[data-isActive="true"]');
    var currentInactiveDiv = component.$el.find('[data-isActive="false"]');
    
    currentActiveDiv.fadeOut(500 , function() {
      currentActiveDiv.attr("data-isActive", "false");
      //Setting the next quote

      if(component.options.fetchedQuotesLength >= 2)
      {
        component.options.nextQuote = component.options.data.quotes.data[component.options.nextQuoteIndex];
        currentActiveDiv.find('#quoteText').text(component.options.nextQuote.name);
        currentActiveDiv.find('#quoteAuthor').text(component.options.nextQuote.description);
      }

      currentInactiveDiv.fadeIn(500, function() {
        currentInactiveDiv.attr("data-isActive", "true");
        
      component.options.nextQuoteIndex++;
      
      var flipping = false; 
      if(component.options.nextQuoteIndex >= component.options.fetchedQuotesLength) // we reached the end of the fetched quotes
      {
        flipping = true;
        component.options.currentQuoteIndex = 0;
        component.options.nextQuoteIndex = 1;
        component.options.page++;
        if(component.options.page > component.options.data.quotes.pagination.pages)
        {
          component.options.page = 1;
        }
      }
      
        setTimeout(function(){
          console.log("Current page: " + component.options.page);
          console.log("next quote index: " + component.options.nextQuoteIndex);
          if(flipping)
          {
            flipping = false;
            component.render();
          }
          else {
            component.rotateQuotes(component)
          }
        }, 5000);
      });
    });
  }
});
