Hull.component('createentityform', {
  templates: ['createentityform'],
  actions: {
    createentity: function(){
        var component = this;
        var newEntityName = this.$el.find('#newEntityField').val();
        this.$el.find('#fadeout').fadeOut(300);
        this.$el.find('#fadein').delay(300).fadeIn(300);
        if(newEntityName)
        {
          component.api('/app/entities', 'post',{
            "uid": null,
            "name": newEntityName
          }).then(function(response) {
            console.log(response);
          });
        }
    }
  }
});
