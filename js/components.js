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
    var component = this;
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
            
            //update the prayer itself with the new data
            switch(value.settings.type) {
              case 0: //newly approved prayers
                component.api(value.settings.value, 'put', {
                  "extra": {
                    "lastKnownApprovalStatus": true
                  }
                }); 
                break;
              case 1: //newly prayed for prayers
                component.api(value.settings.value, 'put', {
                  "extra": {
                    "lastKnownPrayersNumber": value.settings.currentPrayedTimes
                  }
                });
                break;
            }
          });
          
          //Updating the read notifications in the user object
          component.api(Hull.currentUser().id, 'put', {
            'extra': {
              'readNotifications': notifications.someCategory.read
            }
          });
        }
      }); 
      
      notifications.initMenu({ 
        someCategory: '#notificationsDiv'
      });
      
      //Getting all owned prayers then filtering locally
      this.api('/550467c3528154b44e0011c0/conversations', 'get', {
        where: {
          "actor_id": data.me.id
        }
      }).then(function(response) {
        var newlyPrayedForPrayers = $.grep(response, function(currentElement, i){
          return currentElement.messages_count > currentElement.extra.lastKnownPrayersNumber;
        });
        
        var newlyApprovedPrayers = $.grep(response, function(currentElement, i){
          return (currentElement.extra.approved && (!currentElement.extra.lastKnownApprovalStatus));
        });
        
        $.each(newlyPrayedForPrayers, function(index, value){
          var notification = notifications.createNotification({
            message: "Your prayer " + value.name + " has been prayed for " + (value.messages_count - value.extra.lastKnownPrayersNumber) + " times since your last login!",
            category: 'someCategory',
            value: value.id,
            type: 1,
            currentPrayedTimes: value.messages_count
          });
        });
        
        $.each(newlyApprovedPrayers, function(index, value){
          var notification = notifications.createNotification({
            message: "Your prayer " + value.name + " has been approved!",
            category: 'someCategory',
            value: value.id,
            type: 0
          });
        });
      });
      
      //getting the user's read notifications
      $.each(Hull.currentUser().extra.readNotifications.someCategory.read, function(index, value){
        notifications.createNotification(value.settings);
      });
      
      this.options.firstTime = false;
    }
  }
});

Hull.component('submitprayerform', {
  templates: ['submitprayerform'],
  actions: {
    enableSubmitForm: function() {
      var component = this;
      this.$el.find('#submitPrayer').prop('disabled', false);
      this.$el.find('#enableSubmitForm').fadeOut(500, function(){
        component.$el.find('#submitPrayerForm').fadeIn(500, function(){
          $('.tooltip').tooltipster();
        });
      });
    },
    submitprayer: function(){
        var component = this;
        
        var prayerTitle = this.$el.find('#prayerTitle').val();
        var prayerOwner = this.$el.find('#prayerOwner').val();
        var prayerText = this.$el.find('#prayerText').val();

        if(prayerTitle && prayerOwner && prayerText)
        {
          component.$el.find('#submitPrayer').prop('disabled', true);
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
            var n = noty({
              layout: 'top',
              theme: 'relax', // or 'defaultTheme'
              type: 'success',
              text: "Your prayer hass successfully been submited for approval. Don't worry, we only check for spam and inappropriate material. If everything looks good, it'll be approved in no time!", // can be html or string
              dismissQueue: false, // If you want to use queue feature set this true
              template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
              animation: {
                  open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
                  close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
                  easing: 'swing',
                  speed: 500 // opening & closing animation speed
              },
              timeout: false, // delay for closing event. Set false for sticky notifications
              force: false, // adds notification to the beginning of queue when set to true
              modal: false,
              maxVisible: 5, // you can set max visible notification for dismissQueue true option,
              killer: false, // for close all notifications before show
              closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
              callback: {
                  onShow: function() {},
                  afterShow: function() {},
                  onClose: function() {},
                  afterClose: function() {},
                  onCloseClick: function() {},
              },
              buttons: false // an array of buttons
            });
            
            component.$el.find('#submitPrayerForm').fadeOut(500, function(){
              component.$el.find('#enableSubmitForm').fadeIn(500);
            });
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
          'extra.approved': true,
           'actor_id': {
             '$ne': Hull.currentUser().id
           }
        }
     });
   }
  },
  initialize: function(){
    this.options.page = 1;
    this.options.currentPrayerIndex = 0;
    this.options.nextPrayerIndex = 1;
    this.options.prayingInProgress = false;
    this.options.sessionEnding = false;
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
      var component = this;
      if(component.options.sessionEnding) {
        var sessionEndingTextDiv = component.$el.find('#sessionEndingText');
        sessionEndingTextDiv.fadeIn(500, function() {
          setTimeout(function() {
            sessionEndingTextDiv.fadeOut(500, function() {
              sessionEndingTextDiv.text("We wish you everything that's good in the world!");
              sessionEndingTextDiv.fadeIn(500, function() {
                setTimeout(function(){
                  sessionEndingTextDiv.fadeOut(500, function(){
                    component.options.sessionEnding = false;
                    component.render();
                  });
                }, 3000);
              });
            });
          }, 3000);
        });
      }
      if(component.options.prayingInProgress) {
        var currentPrayer = this.$el.find('[data-isActive="true"]');
        currentPrayer.fadeOut(500, function(){
          //Here, next prayer would be the one just faded out, make a call to add a message to it
          component.api(component.options.nextPrayer.id+'/messages', 'post',{
            "body": "Prayed"
          }).then(function(response) {
            console.log(response);
          });
      
          if(component.options.currentPrayer) {
            currentPrayer.find('#prayerText').text(component.options.currentPrayer.description);
            currentPrayer.find('#prayerOwner').text(component.options.currentPrayer.extra.owner);
            currentPrayer.find('#prayerID').text(component.options.currentPrayer.id);
  
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
                  nextPrayer.find('#prayerID').text(component.options.nextPrayer.id);
  
                }
              }
              
              if(component.options.nextPrayerIndex != 0) {
                component.rotatePrayers(component);
              }
            }, prayerFlipTime);
          });
        });
      }
  },
  actions: {
    startPraying: function() {
      var component = this;
      this.$el.find('#startPraying').fadeOut(500, function() {
        component.countdown(component);
      });
    },
    endPraying: function() {
      this.options.sessionEnding = true;
      this.options.prayingInProgress = false;
      this.render();
    }
  },
  countdown: function (component) {
    var counterDiv = component.$el.find('#counter');
    var introductionDiv = component.$el.find('#introductionText');
    
    if(introductionDiv.is(":visible")) {
      introductionDiv.fadeOut(500, function (){
        counterDiv.text(counterDiv.text() - 1);
        switch(counterDiv.text()) {
          case "4":
            introductionDiv.text("You're about to read real prayers of real people, and they're counting on you to pray for them");
            break;
          case "3":
            introductionDiv.text("Send every prayer owner your love, good intentions and good energy, hoping that what they pray for comes true");
            break;
          case "2":
            introductionDiv.text("And remember, what goes around comes around!");
            break;
          case "1":
            introductionDiv.text("Here we go!");
            break;
          default:
            component.options.prayingInProgress = true;
            component.render();
            break;
        }
        component.countdown(component);
      });
    } else {
      introductionDiv.fadeIn(500, function (){
        setTimeout(function() {
          component.countdown(component);
        }, 3000);
      });
    }

  },
  rotatePrayers: function (component) {
    var currentActiveDiv = component.$el.find('[data-isActive="true"]');
    var currentInactiveDiv = component.$el.find('[data-isActive="false"]');
    
    currentActiveDiv.fadeOut(500, function() {
      //Here, current prayer is the one that just faded out, make a call to add a message to it
      component.api(component.options.currentPrayer.id+'/messages', 'post',{
        "body": "Prayed"
      }).then(function(response) {
        console.log(response);
      });

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
        currentActiveDiv.find('#prayerID').text(component.options.nextPrayer.id);

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
