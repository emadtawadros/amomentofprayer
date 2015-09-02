Hull.component('quotes', {
  templates: ['quotes'],
  refreshEvents: ['model.hull.me.change'],
  datasources: {
    quotes: function() {
      return this.api('5504676b91e0cb0be00014cd/conversations', 'get', {
      });
    }
  },
  beforeRender: function(data, errors) {
  },
  afterRender: function(data) {


    $('#quotes').on('init', function(event){
         $('#quotes').find('.slick-slide blockquote').addClass('animate');
     
    });

    $('#main_content').css('opacity','1');
    $('#loader').hide();

    $('#quotes').slick({
      fade: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 10000,
      infinite: true,
      pauseOnHover: false,
      speed: 0
    });

    $(window).blur(function() {
        if($('#quotes').css('display') != 'none') {
          $('#quotes').find('.slick-slide blockquote').removeClass('animate');
        }
    });

    $(window).focus(function() {
      if($('#quotes').css('display') != 'none') {
        $('#quotes').find('.slick-slide blockquote').addClass('animate');
      }
    });

  

    // $('#quotes').slick("slickPause");

    // setInterval(function(){
    //   $('#main_content #quotes .slick-active blockquote').css('opacity',0);
    //   setTimeout(function(){
    //     $('#quotes').slick("slickNext");
    //   },00)
    // },5000)

    // $('#quotes').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    //   console.log(currentSlide, nextSlide);
    //   $('#quotes').slick("slickPause");
    //   $('#main_content #quotes .slick-slide').removeClass('p');
    //   $('#main_content #quotes [data-slick-index=' + currentSlide + ']').addClass('p').css('opacity',0);
    //   // $('#main_content #quotes .slick-active blockquote').css('opacity',0).addClass('p');
    //   $('#main_content #quotes .slick-slide.slick-active').on('transitionend webkitTransitionEnd oTransitionEnd', function () {
    //       $('#quotes').slick("slickPlay");
    //       // $('#main_content #quotes .slick-active').css('opacity',1);
    //       $(this).unbind('transitionend webkitTransitionEnd oTransitionEnd')
    //   });
    // });

    $(document).on('click','#main_content .pause_quotes',function(event) {
        $(this).toggleClass('paused');
        if($(this).hasClass('paused')) {
          $('#quotes').slick('slickPause');
          $('#quotes').find('.slick-slide blockquote').removeClass('animate').addClass('paused');
        } else {
          $('#quotes').slick('slickPlay');
          $('#quotes').find('.slick-slide blockquote').addClass('animate').removeClass('paused');;
        }
    });
   
  }
});


Hull.component('allquotes', {
  templates: ['allquotes'],
  refreshEvents: ['model.hull.me.change'],
  datasources: {
    quotes: function() {
      return this.api('5504676b91e0cb0be00014cd/conversations', 'get', {
      });
    }
  },
  actions: {
    deletequote: function(){
    }
  },
  beforeRender: function(data, errors) {
  },
  afterRender: function(data) {
    $(document).on('click', '#deleteQuote', function(event) {
      event.preventDefault();
      c = confirm('Are you sure?');
      if(c) {
        var item = $(this);
        Hull.api(item.attr('data-id'), 'delete').then(function() {
          item.parent('div').fadeOut('300', function() {
            $(this).remove();
          });
        }); 
      }
    });
  }
});


Hull.component('allprayers', {
  templates: ['allprayers'],
  refreshEvents: ['model.hull.me.change'],
  datasources: {
    prayers: function() {
      return this.api('550467c3528154b44e0011c0/conversations', 'get', {
       'order_by': 'extra.lastKnownPrayersNumber ASC',
        where: {
          'extra.approved': true,
        }
     });
    }
  },
  beforeRender: function(data, errors) {
  },
  afterRender: function(data) {
    $(document).on('click', '#deletePrayer2', function(event) {
      event.preventDefault();
      c = confirm('Are you sure?');
      if(c) {
        var item = $(this);
        Hull.api(item.attr('data-id'), 'delete').then(function() {
          item.parent('div').fadeOut('300', function() {
            $(this).remove();
          });
        }); 
      }
    });
  }
});


Hull.component('createquoteform', {
  templates: ['createquoteform'],
  refreshEvents: ['model.hull.me.change'],
  actions: {
    createquote: function(){
        var component = this;
        var newQuoteText = this.$el.find('#newQuoteField').val();
        var newQuoteAuthor = this.$el.find('#newQuoteAuthor').val();

        if(newQuoteText && newQuoteAuthor)
        {
          $('#admin .createquoteform .status').html('Creating....');
          component.api('/5504676b91e0cb0be00014cd/conversations', 'post',{
            "public": "true",
            "name": newQuoteText,
            "description": newQuoteAuthor,
          }).then(function(response) {
            component.$el.find('#newQuoteField').val('');
            component.$el.find('#newQuoteAuthor').val('');
            $('#admin .createquoteform .status').html('Done.');
            setTimeout(function(){
                $('#admin .createquoteform .status').html('');
            },1000)
          });
        } else {
          $('#admin .createquoteform .status').html('Please fill the fields.');
            setTimeout(function(){
                $('#admin .createquoteform .status').html('');
            },1000)
        }
    }
  }
});


Hull.component('submitprayerform', {
  templates: ['submitprayerform'],
  refreshEvents: ['model.hull.me.change'],
  actions: {
    submitprayer: function(){
        var component = this;
        
        var prayerTitle = this.$el.find('#prayerTitle').val();
        var prayerOwner = this.$el.find('#prayerOwner').val();
        var prayerText = this.$el.find('#prayerText').val();


        if(prayerTitle && prayerOwner && prayerText)
        {
          this.$el.find('#submitPrayerForm > div:not(.loader)').css('opacity', '0.4');
          this.$el.find('#submitPrayerForm > div.loader').show();
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
              component.$el.find('#submitPrayer').prop('disabled', false);
              component.$el.find('#prayerOwner').val('');
              component.$el.find('#prayerText').val('');
              component.$el.find('#prayerTitle').val('');
              component.$el.find('#submitPrayerForm > div:not(.loader)').css('opacity', '1');
              component.$el.find('#submitPrayerForm > div.loader').hide();
              $('.notification').html('Your prayer hass successfully been submited for approval. Don\'t worry, we only check for spam and inappropriate material. If everything looks good, it\'ll be approved in no time!').slideDown(300);
              setTimeout(function(){ $('.notification').slideUp(300); },3000)
              $('.home_buttons, #quotes').show();
              $('#submitPrayerForm').hide();
              $('#prayershub').slick('slickNext');
          });
        } else {
          $('.notification').html('Oops! Looks like you\'ve missed a field!').slideDown(300);
          setTimeout(function(){ $('.notification').slideUp(300); },3000)
        }
    }
  },
  afterRender: function(data) {
     $('#submit_button').removeClass('disabled');
    $('#submitPrayerForm .input_wrap .info a').magnificPopup({
          type:'inline',
          removalDelay: 500, //delay removal by X to allow out-animation
          callbacks: {
            beforeOpen: function() {
               this.st.mainClass = this.st.el.attr('data-effect');
            },
          },
          midClick: true
        });
  }
});


Hull.component('login', {
  templates: ['login'],
  refreshEvents: ['model.hull.me.change'],
})

Hull.component('submitprayerform', {
  templates: ['submitprayerform'],
  refreshEvents: ['model.hull.me.change'],
})


Hull.component('admin', {
  templates: ['admin'],
  refreshEvents: ['model.hull.me.change'],
  afterRender: function(data) {
    $('.admin_button').magnificPopup({ 
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
          beforeOpen: function() {
             this.st.mainClass = this.st.el.attr('data-effect');
          },
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
  }
})

Hull.component('unapprovedprayers', {
  templates: ['unapprovedprayers'],
  refreshEvents: ['model.hull.me.change'],
  datasources: {
    unapprovedprayerslist: function() {
      return this.api('550467c3528154b44e0011c0/conversations', 'get', {
        'limit': 500,
        where: {
          'extra.approved': false
        }
      });
    }
  },
  afterRender: function(data) {
    $(document).on('click','#admin .unapproved ul li h5',function(){
      $(this).siblings('div').toggle();
    })
    $(document).on('click','#approvePrayer',function(e){
      e.preventDefault();
        var item = $(this).parents('li');
        Hull.api(item.data('postid'), 'put', {
          "extra": {
            "approved": true,
            "approved_date": get_date()
          }
        }).then(function() {
          item.fadeOut('300', function() {
            $(this).remove();
          });
        });
    })
    $(document).on('click','#deletePrayer',function(e){
        e.preventDefault();
        alert(true)
        var item = $(this).parents('li');
        Hull.api(item.data('postid'), 'delete').then(function() {
          item.fadeOut('300', function() {
            $(this).remove();
          });
        }); 
    })
  },
  beforeRender: function(data, errors) {
  }
});

function get_date() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth(); //January is 0!
  var yyyy = today.getFullYear();

  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var n = month[mm];

  var h = today.getHours(); 
  var mins = today.getMinutes();

  if(dd<10) {
    dd='0'+dd
  } 

  if(mm<10) {
    mm='0'+mm
  } 

  today = dd + ' ' + n + ' ' + yyyy + ' at ' + h +':' + mins;
  return today;
}

Hull.component('profile', {
  templates: ['profile'],
  refreshEvents: ['model.hull.me.change'],
  afterRender: function(data) {
    if(Hull.currentUser()) {
    var n = [];

     this.api('/550467c3528154b44e0011c0/conversations', 'get', {
        where: {
          "actor_id": Hull.currentUser().id
        }
      }).then(function(response) {
        var unread = '<ul class="n">';
        var c = 0;
        var obj = {};
        var objs = [];

        console.log(response);

        newlyApprovedPrayers = $.grep(response, function(currentElement, i){
          return (currentElement.extra.approved && (!currentElement.extra.lastKnownApprovalStatus));
        });
        
        newlyPrayedForPrayers = $.grep(response, function(currentElement, i){
          return currentElement.messages_count > currentElement.extra.lastKnownPrayersNumber;
        });

       

        $.each(newlyApprovedPrayers, function(index, value){
            unread += '<div id="unread-popup_' + index + '" class="white-popup single_not mfp-hide">' + value.description + '<a href="#notifications" class="single_notification">Back</a></div>';
            unread += "<li><a href='#unread-popup_" + index + "' class='single_notification'>Your prayer " + value.name + " has been approved!<span>" + value.extra.approved_date + "</span></a></li>";
            obj.message = "Your prayer " + value.name + " has been approved!";
            obj.read = true;
            obj.date = value.extra.approved_date;
            obj.description = value.description;
            obj.id = value.id;
            objs.push(obj);
            obj = {};
            c++;
        });
        
        $.each(newlyPrayedForPrayers, function(index, value){
          unread += '<div id="unread-popup_' + index + '" class="white-popup single_not mfp-hide">' + value.description + '<a href="#notifications" class="single_notification">Back</a></div>';
           unread += "<li><a href='#unread-popup_" + index + "' class='single_notification'>Your prayer " + value.name + " has been prayed for " + (value.messages_count - value.extra.lastKnownPrayersNumber) + " times since your last login!<span>" + get_date() + "</span></a></li>";
           obj.message = "Your prayer " + value.name + " has been prayed for " + (value.messages_count - value.extra.lastKnownPrayersNumber) + " times since your last login!";
           obj.read = true;
           obj.date = get_date();
           obj.description = value.description;
           obj.id = value.id;
           objs.push(obj);
           obj = {};
           c++;
        });

         n = objs.concat(Hull.currentUser().extra.readNotifications);


        unread += '</ul>';

        if(c != 0) {
          $('#profile_icon .bubble').html('<span>' + c + '</span>');
        }

        $('#profile_icon .profile_menu ul li a').click(function(event) {

        });
        if(objs.length) {
          $('#notifications .unread').html(unread);
        } else {
          $('#notifications .unread').html('<div class="no_not">No Notifications</div>');
        }
        $('.single_notification').magnificPopup({
          type:'inline',
          closeBtnInside:true,
          midClick: true 
        });


      });

         // return newlyApprovedPrayers;

    
    $('.notifications').magnificPopup({ 
        removalDelay: 500, //delay removal by X to allow out-animation
        closeBtnInside:true,
        callbacks: {
          beforeOpen: function() {
             this.st.mainClass = this.st.el.attr('data-effect');
          },
          close: function(){
            $('#profile_icon .bubble').html('');
            $.each(newlyApprovedPrayers, function(index, value){
               Hull.api(value.id, 'put', {
                "extra": {
                  "lastKnownApprovalStatus": true
                }
              }); 
            });
            
            $.each(newlyPrayedForPrayers, function(index, value){
                Hull.api(value.id, 'put', {
                  "extra": {
                    "lastKnownPrayersNumber": value.messages_count
                  }
                });
            });
            Hull.api(Hull.currentUser().id, 'put', {
              'extra': {
                'readNotifications': n
              }
            });
          }
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
  }
}
})


Hull.component('mynotifications', {
  templates: ['mynotifications'],
  refreshEvents: ['model.hull.me.change'],
  datasources: {
   read: function() {
     return Hull.currentUser().extra.readNotifications
   },

  },
  afterRender: function(data) {

   
    $('.single_notification').magnificPopup({
      type:'inline',
      closeBtnInside:true,
      midClick: true 
    });

    

  }
})


Hull.component('prayershub', {
  templates: ['prayershub'],
  refreshEvents: ['model.hull.me.change'],
  datasources: {
   prayers: function() {
     return this.api('550467c3528154b44e0011c0/conversations', 'get', {
       'limit': 500,
       'order_by': 'extra.lastKnownPrayersNumber ASC',
        where: {
          'extra.approved': true,
           'actor_id': {
             '$ne': Hull.currentUser().id
           }
        }
     });
   }
  },
  afterRender: function(data) {
    $('#start_button').removeClass('disabled');
    $('#prayershub').slick({
      fade: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 10000,
      infinite: true,
      pauseOnHover: false,
      speed: 0
    });

    $('#prayerintro').slick({
      fade: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite: false,
      pauseOnHover: false,
      speed: 0
    });

    $('#prayeroutro').slick({
      fade: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      pauseOnHover: false,
      speed: 0
    });

     $(document).on('click','#pause_session',function(event) {
        event.preventDefault();
        $(this).toggleClass('paused');
        if($(this).hasClass('paused')) {
          $('#prayershub').slick('slickPause');
          $('#prayershub').find('.slick-slide .prayer_wrap').removeClass('animate').addClass('paused');
        } else {
          $('#prayershub').slick('slickPlay')
          $('#prayershub').find('.slick-slide .prayer_wrap').addClass('animate').removeClass('paused');;
        }
    });

    $(window).blur(function() {
        if($('#prayershub').css('display') != 'none') {
          $('#prayershub').find('.slick-slide .prayer_wrap').removeClass('animate');
        }
        if($('#prayerintro').css('display') != 'none') {
          $('#prayerintro').find('.slick-slide .prayer_wrap').removeClass('animate');
        }
        if($('#prayeroutro').css('display') != 'none') {
          $('#prayeroutro').find('.slick-slide .prayer_wrap').removeClass('animate');
        }
        // $('#prayershub, #prayerintro, #prayeroutro').find('.slick-slide .prayer_wrap').removeClass('animate');
    });

    $(window).focus(function() {
        if($('#prayershub').css('display') != 'none') {
          $('#prayershub').find('.slick-slide .prayer_wrap').addClass('animate');
        }
        if($('#prayerintro').css('display') != 'none') {
          $('#prayerintro').find('.slick-slide .prayer_wrap').addClass('animate');
        }
        if($('#prayeroutro').css('display') != 'none') {
          $('#prayeroutro').find('.slick-slide .prayer_wrap').addClass('animate');
        } else
         {
        $('#prayeroutro').slick('slickPause');
         }        
        // $('#prayershub, #prayerintro, #prayeroutro').find('.slick-slide .prayer_wrap').addClass('animate');
    });

    $('#prayershub').slick('slickGoTo',1);

    $('#prayershub').slick('slickPause');
    $('#prayerintro').slick('slickPause');
    $('#prayeroutro').slick('slickPause');
    

    $('#prayerintro').on('afterChange', function(event, slick, currentSlide){
      if(currentSlide == 5) {
        setTimeout(function(){
            $('#prayerintro').slick('slickGoTo',0);
            $('#prayerintro').slick('slickPause');
            $('#prayerintro').find('.slick-slide .prayer_wrap').removeClass('animate');
          $('#prayerintro').fadeOut(400,function(){
            $('#prayershub').fadeIn(400);
            $('#pause_session').css('display','inline-block');
            $('#prayershub').slick('slickGoTo',0);
            $('#prayershub').slick('slickPlay');
            $('#prayershub').find('.slick-slide .prayer_wrap').addClass('animate');
            
          })
        },3000)
      }
    });

    $('#prayeroutro').on('afterChange', function(event, slick, currentSlide){
      if(currentSlide == 2) {
        setTimeout(function(){
          $('#prayershub,#prayerintro,#prayeroutro').slick('slickPause');
          $('#prayershub,#prayerintro,#prayeroutro').find('.slick-slide .prayer_wrap').removeClass('animate');
          $('.prayershub_wrap').fadeOut(400, function() {
            $('.home_buttons, #quotes').fadeIn(400);
            $('#quotes').slick('slickNext');
            $('#pause_quotes').trigger('click');
          });
        },3000)
      }
    });

    

    $('#prayershub').on('beforeChange', function(event, slick, currentSlide, nextSlide){

      var id = $('#prayershub .slick-track > div').eq(currentSlide).data('id');

      Hull.api(id+'/messages', 'post',{
        "body": "Prayed"
      });

    });
  }
})
