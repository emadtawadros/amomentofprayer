window.fbAsyncInit = function() {
    FB.init({
      appId      : '624324014362410',
      xfbml      : true,
      version    : 'v2.2'
    });
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
Hull.init({
  "appId": "54ff68ccf874f9df8f000167",
  "orgUrl": "https://amomentofprayer.hullapp.io",
}, function(hull, me, app, org){
     // console.log('Here we go!');
     Hull.api('/app/entities', 'get').then(function(response) {
         // console.log("Entities");
         // console.log(response);
     });
     
     Hull.api('5504676b91e0cb0be00014cd/conversations', 'get').then(function(response) {
         // console.log("Quotes");
         // console.log(response);
     });
     
     Hull.api('550467c3528154b44e0011c0/conversations', 'get', {order_by: "extra.lastKnownPrayersNumber ASC"}).then(function(response) {
         // console.log("Prayers");
         // console.log(response);
     });

     // console.log(Hull.currentUser().extra.readNotifications);


});



    var audio = [];
    // Array of files you'd like played
    audio.playlist = [
      // {
      //   "link": "http://www.stephaniequinn.com/Music/Brahms%20Symphony%20-%20from%20Fourth%20Movement.mp3",
      //   "title": "Fourth Movement",
      //   "artist": "Brahms"
      // },
      {
        "link": "http://amomentofprayer.com/Tracks/track1.mp3",
        "title": "Cathedral",
        "artist": "Kip Mazuy"
      },
      {
        "link": "http://amomentofprayer.com/Tracks/track2.mp3",
        "title": "No Water no Moon",
        "artist": "Kip Mazuy"
      },
      {
        "link": "http://amomentofprayer.com/Tracks/track3.mp3",
        "title": "A Sensual Dawn",
        "artist": "Kip Mazuy"
      },
      {
        "link": "http://amomentofprayer.com/Tracks/track4.mp3",
        "title": "I Can Hear The Moon Rising",
        "artist": "Kip Mazuy"
      },
   
    ];

    $('.audio_controls .volume').click(function(event) {
         soundManager.toggleMute('sk4Audio');
         $(this).toggleClass('muted');
    });
     
    function playAudio(playlistId){
        // Default playlistId to 0 if not supplied 
        playlistId = playlistId ? playlistId : 0;
        // If SoundManager object exists, get rid of it...
        
        if (audio.nowPlaying){
            audio.nowPlaying.destruct();
            // ...and reset array key if end reached
            if(playlistId == audio.playlist.length){
                playlistId = 0;
            }
        }
        // Standard Sound Manager play sound function...
        soundManager.onready(function() {
          $('.audio_controls .info .content .title').html(audio.playlist[playlistId]['artist'] + ' - ' + audio.playlist[playlistId]['title']);
            audio.nowPlaying = soundManager.createSound({
                id: 'sk4Audio',
                url: audio.playlist[playlistId]['link'],
                autoLoad: true,
                autoPlay: true,
                volume: 50,
                // ...with a recursive callback when play completes
                onfinish: function(){
                    playlistId ++;
                    playAudio(playlistId);
                }
            })
            if($('.audio_controls .volume').hasClass('muted')) {
                soundManager.mute('sk4Audio');     
            }
        });
    }
     
    // Start
    playAudio(0);

    $(document).on('touchstart', function(event) {
      event.preventDefault();
      playAudio(0);
      $(document).unbind('touchstart')
    });

    Modernizr.addTest('ipad', function () {
      return !!navigator.userAgent.match(/iPad/i);
    });

    Modernizr.addTest('iphone', function () {
      return !!navigator.userAgent.match(/iPhone/i);
    });

    Modernizr.addTest('ipod', function () {
      return !!navigator.userAgent.match(/iPod/i);
    });

    Modernizr.addTest('appleios', function () {
      return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
    });

    if (Modernizr.appleios) {
      $('#main_menu .audio_controls .volume').hide();
    }

      jQuery(document).ready(function($) {




        $('#main_menu ul li a:not(.home)').click(function(event) {
           $('body').removeClass('menu_opened');
        });

        $('#main_menu ul li a.home').click(function(event) {
           $('body').removeClass('menu_opened');
        });

        $('.close_menu').click(function(event) {
           $('body').removeClass('menu_opened');
        });


        $(document).on('click','.notification_tabs li',function(event) {
          $('.notification_tabs li').removeClass('active');
          $(this).addClass('active');
          $('.notification_tabs_content .content').removeClass('active');
          $('.notification_tabs_content .content').eq($(this).index()).addClass('active');
        });


      

        $('#main_menu ul li a:not(.home)').magnificPopup({
          removalDelay: 500, //delay removal by X to allow out-animation
           midClick: true,
            callbacks: {
              
                beforeOpen: function() {
                  this.st.mainClass = this.st.el.attr('data-effect');
                },
          }
        });



        $('.menu_toggle').click(function(event) {
          $('body').toggleClass('menu_opened');
        });

        $(document).on('click','#profile_icon',function(event) {
           $('#profile_icon .profile_menu').toggle();
        });

        $(document).on('click',function(event) {
          event.stopPropagation()
          if($(event.target).parents('#profile_icon').length) {
            return false;
          }
          $('#profile_icon .profile_menu').hide();
        })


        $(document).on('click','#pause_quotes',function(event) {
          $(this).toggleClass('paused');
          if($(this).hasClass('paused')) {
            $('#quotes').slick('slickPause')
            $('#quotes').find('.slick-slide blockquote').removeClass('animate').addClass('paused');;
          } else {
            $('#quotes').slick('slickPlay')
            $('#quotes').find('.slick-slide blockquote').addClass('animate').removeClass('paused');;
          }
        });

       

        $(document).on('click','#submit_button',function(event) {
          event.preventDefault();
          if($(this).hasClass('disabled')) {
            return false;
          }
          $('#pause_quotes').trigger('click');
          $('.home_buttons, #quotes').fadeOut(400, function() {
            $('#submitPrayerForm').fadeIn(400);
          });
        });

        $(document).on('click','#start_button',function(event) {
          event.preventDefault();
          if($(this).hasClass('disabled')) {
            return false;
          }
          // $('#quotes').slick('slickPause');
          $('#pause_quotes').trigger('click');
          $('#prayeroutro').hide();
          $('#prayeroutro').slick('slickGoTo',0);
          $('#prayeroutro').slick('slickPause');

          $('#end_session').show();
          $('#pause_session').hide();

          $('.home_buttons, #quotes').fadeOut(400,function(){
            $('.prayershub_wrap').fadeIn(400);
            $('#prayerintro').show();
            $('#prayerintro').find('.slick-slide .prayer_wrap').addClass('animate');
            $('#prayershub').hide();

            $('#prayerintro').slick('slickPlay')
            $('#prayerintro').slick('slickGoTo',1);
          });
          // $('.prayershub_wrap').show();
          // $('#prayershub').slick('slickPlay')
          // $('#prayershub').slick('slickNext');
        });

        $(document).on('click','#cancelPrayer',function(event) {
          event.preventDefault();

          $('#submitPrayerForm').fadeOut(400, function() {
             $('.home_buttons, #quotes').fadeIn(400, function(){
              
             });
             // $('#quotes').slick('slickPlay');
            $('#pause_quotes').trigger('click');
             $('#quotes').slick('slickNext');
          });
 
          // $('.home_buttons, #quotes').show();
          // $('#submitPrayerForm').hide();
          // $('.prayershub_wrap').hide();
          // $('#quotes').slick('slickNext');
        });

        $(document).on('click','#end_session',function(event) {
          $('#prayershub,#prayerintro,#prayeroutro').slick('slickPause');
          $('#prayershub,#prayerintro,#prayeroutro').find('.slick-slide .prayer_wrap').removeClass('animate');
          $('#prayershub,#prayerintro').hide()
          $('#pause_session').hide();
          $('#end_session').hide();
            $('#prayeroutro').fadeIn(400);
             $('#prayeroutro').slick('slickGoTo',1);
            $('#prayeroutro').slick('slickPlay');
            $('#prayeroutro').find('.slick-slide .prayer_wrap').addClass('animate');

           
          // });
          // $('.prayershub_wrap').fadeOut(400, function() {
          //   $('.home_buttons, #quotes').fadeIn(400);
          //   $('#prayershub').slick('slickPause')
          //   $('#quotes').slick('slickNext');
          // });
          // event.preventDefault();
          // $('.home_buttons, #quotes').show();
          // $('#submitPrayerForm').hide();
          // $('.prayershub_wrap').hide();
          // $('#prayershub').slick('slickPause')
          // $('#quotes').slick('slickNext');
        });


        // $('#main_menu ul li').hover(function() {
        //   $('#main_menu ul li').css({
        //     '-webkit-filter': 'blur(2px)',
        //     'filter': 'blur(2px)',
        //   });
        //   $(this).css({
        //     '-webkit-filter': 'blur(0)',
        //     'filter': 'blur(0)',
        //   });
        // }, function() {
        //   $('#main_menu ul li').css({
        //     '-webkit-filter': 'blur(0)',
        //     'filter': 'blur(0)',
        //   });
        // });
      });

jQuery(document).ready(function($) {

  $('#main_menu').on('click', '.audio_controls .info', function(event) {
    event.preventDefault();
    $(this).toggleClass('active');
  });

    $('#support .t').sharrre({
      share: {
        twitter: true
      },
      template: '<a href="#">Twitter</a>',
      enableHover: false,
      enableTracking: true,
      // buttons: { twitter: {via: '_JulienH'}},
      click: function(api, options){
        api.simulateClick();
        api.openPopup('twitter');
      }
    });

    $('#support .f').sharrre({
      share: {
        facebook: true
      },
      template: '<a href="#">Facebook</a>',
      enableHover: false,
      enableTracking: true,
      click: function(api, options){
        api.simulateClick();
        api.openPopup('facebook');
      }
    });

    $('#support .g').sharrre({
      share: {
        googlePlus: true
      },
      template: '<a href="#">Google</a>',
      urlCurl: '',
      enableHover: false,
      enableTracking: true,
      click: function(api, options){
        api.simulateClick();
        api.openPopup('googlePlus');
      }
    });

    $('#support .l').sharrre({
      share: {
        linkedin: true
      },
      template: '<a href="#">linkedin</a>',
      enableHover: false,
      enableTracking: true,
      click: function(api, options){
        api.simulateClick();
        api.openPopup('linkedin');
      }
    });

});