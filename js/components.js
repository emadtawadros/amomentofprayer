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

Hull.component('mynotifications', {
  templates: ['mynotifications'],
  initialize: function() {
    this.options.firstTime = true;
  },
  beforeRender: function(data, errors) {
  },
  afterRender: function(data) {
    if(this.options.firstTime) {
      var notifications = new $.ttwNotificationMenu({
        notificationList:{
        anchor:'item',
        offset:'0 15'
      },
        notificationClickCallback:function(notification){
          window.location.href = '#/prayer/'+ notification.settings.value;
      },
        notificationMenuCloseCallback:function(notifications, menuItems){
          $.each(notifications['someCategory']['unread'], function (index, value) {
            value.markRead();
            menuItems['someCategory'].updateBubble();
          });
        }
      }); 
      
      notifications.initMenu({ 
        someCategory: '#notificationsDiv'
      });
      
      this.api('/550467c3528154b44e0011c0/conversations', 'get', {
        where: {
          "actor_id": data.me.id
        }
      }).then(function(response) {
        $.each(response, function(index, value){
          var notification = notifications.createNotification({
            message: value.name,
            category: 'someCategory',
            value: value.id
          });
        });
      });
      this.options.firstTime = false;
    }
  }
});

Hull.component('submitprayerform', {
  templates: ['submitprayerform'],
  actions: {
    submitprayer: function(){
        var component = this;
        
        var prayerTitle = this.$el.find('#prayerTitle').val();
        var prayerOwner = this.$el.find('#prayerOwner').val();
        var prayerText = this.$el.find('#prayerText').val();

        if(prayerTitle && prayerOwner && prayerText)
        {
          component.api('/550467c3528154b44e0011c0/conversations', 'post',{
            "public": "true",
            "name": prayerTitle,
            "description": prayerText,
            "extra": {
                			"owner": prayerOwner,
                			"approved": false,
                			"lastKnownApprovalStatus": false,
                			"lastKnownPrayersNumber": 0
            }
          }).then(function(response) {
            console.log(response);
          });
        }
    }
  }
});

Hull.component('unapprovedprayers', {
  templates: ['unapprovedprayers'],
  datasources: {
    unapprovedprayerslist: function() {
      return this.api('550467c3528154b44e0011c0/conversations', 'get', {
        where: {
          'extra.approved': false
        }
      });
    }
  },
  beforeRender: function(data, errors) {
  }
});

Hull.component('prayer', {
  templates: ['prayer'],
  datasources: {
    prayer: ':id'
  },
  actions: {
    approve: function() {
      this.api(this.options.id, 'put', {
        "extra": {
          "approved": true
        }
      }).then(function() {
        window.location.href = '#/main';
      }); 
    },
    delete: function () {
      this.api(this.options.id, 'delete').then(function() {
        window.location.href = '#/main';
      }); 
    }
  }
});

Hull.component('prayershub', {
  templates: ['prayershub'],
  datasources: {
   prayers: function() {
     return this.api('550467c3528154b44e0011c0/conversations', 'get', {
       'wrapped': true,
       'page': this.options.page,
       'per_page': 2,
       where: {
          'extra.approved': true
        }
     });
   }
  },
  initialize: function(){
    this.options.page = 1;
    this.options.currentPrayerIndex = 0;
    this.options.nextPrayerIndex = 1;
  },
  beforeRender: function(data, errors) {
    this.options.data = data;
    this.options.currentPrayer = data.prayers.data[this.options.currentPrayerIndex];
    if(data.prayers.data.length >=2)
    {
      this.options.nextPrayer = data.prayers.data[this.options.nextPrayerIndex];
    }
    
    this.options.fetchedPrayersLength = data.prayers.data.length;
  },
  afterRender: function(data) {
   // if(data.prayers.data.length == 0) {
      //this.refresh()
   // } else {
      var component = this;
    
      var currentPrayer = this.$el.find('[data-isActive="true"]');
      currentPrayer.fadeOut(500, function(){
        if(component.options.currentPrayer) {
          currentPrayer.find('#prayerText').text(component.options.currentPrayer.description);
          currentPrayer.find('#prayerOwner').text(component.options.currentPrayer.extra.owner);
        }
        currentPrayer.fadeIn(500, function(){
          setTimeout(function(){
            if(component.options.fetchedPrayersLength >= 2)
            {
              var nextPrayer = component.$el.find('[data-isActive="false"]');
              if(component.options.nextPrayer)
              {
                nextPrayer.find('#prayerText').text(component.options.nextPrayer.description);
                nextPrayer.find('#prayerOwner').text(component.options.nextPrayer.extra.owner);
              }
            }
            
            if(component.options.nextPrayerIndex != 0) {
              component.rotatePrayers(component);
            }
          }, prayerFlipTime);
  
        });
      });
    //}


  },
  actions: {
  },
  rotatePrayers: function (component) {
    var currentActiveDiv = component.$el.find('[data-isActive="true"]');
    var currentInactiveDiv = component.$el.find('[data-isActive="false"]');
    
    currentActiveDiv.fadeOut(500, function() {
      currentActiveDiv.attr("data-isActive", "false");
      //Setting the next prayer
      component.options.nextPrayerIndex++;

      var flipping = false; 
      if(component.options.nextPrayerIndex >= component.options.fetchedPrayersLength) // we reached the end of the fetched prayer
      {
        flipping = true;
        component.options.currentPrayerIndex = 0;
        component.options.nextPrayerIndex = 1;
        component.options.page++;
        if(component.options.page > component.options.data.prayers.pagination.pages)
        {
          component.options.page = 1;
        }
      }
      
      if(component.options.fetchedPrayersLength >= 2 && !flipping)
      {
        component.options.nextPrayer = component.options.data.prayers.data[component.options.nextPrayerIndex];
        currentActiveDiv.find('#prayerText').text(component.options.nextPrayer.description);
        currentActiveDiv.find('#prayerOwner').text(component.options.nextPrayer.extra.owner);
      }


      currentInactiveDiv.fadeIn(500, function() {
        currentInactiveDiv.attr("data-isActive", "true");
        
        setTimeout(function(){
          if(flipping)
          {
            flipping = false;
            component.render();
          }
          else {
            component.rotatePrayers(component)
          }
        }, prayerFlipTime);
      });
    });
  }
});

Hull.component('quotes', {
  templates: ['quotes'],
  datasources: {
   quotes: function() {
     return this.api('5504676b91e0cb0be00014cd/conversations', 'get', {
       'wrapped': true,
       'page': this.options.page
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
        }, quoteFlipTime);

      });
    });

  },
  actions: {
  },
  rotateQuotes: function (component) {
    var currentActiveDiv = component.$el.find('[data-isActive="true"]');
    var currentInactiveDiv = component.$el.find('[data-isActive="false"]');
    
    currentActiveDiv.fadeOut(500, function() {
      currentActiveDiv.attr("data-isActive", "false");
      //Setting the next quote
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
      
      if(component.options.fetchedQuotesLength >= 2 && !flipping)
      {
        component.options.nextQuote = component.options.data.quotes.data[component.options.nextQuoteIndex];
        currentActiveDiv.find('#quoteText').text(component.options.nextQuote.name);
        currentActiveDiv.find('#quoteAuthor').text(component.options.nextQuote.description);
      }


      currentInactiveDiv.fadeIn(500, function() {
        currentInactiveDiv.attr("data-isActive", "true");
        
        setTimeout(function(){
          if(flipping)
          {
            flipping = false;
            component.render();
          }
          else {
            component.rotateQuotes(component)
          }
        }, quoteFlipTime);
      });
    });
  }
});

Hull.component('main', {
  templates: ['main', 'prayer'],
  initialize: function(){
    var myRouter = Backbone.Router.extend({
      routes: {
        ':view(/:id)(/:action)' : 'view'
      }
    });
    var router  = new myRouter();
    router.on('route:view', function(view, id, action) {
      var tpl = action || view || 'main';
      this.currentView = tpl;
      this.render(tpl, { id: id });
    }, this);
    
  Backbone.history.start();
  //router.navigate('/main');
  },
  beforeRender: function(data) {
    data.currentView = this.currentView;
    return data;
  }
});
