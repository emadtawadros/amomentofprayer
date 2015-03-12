Hull.component('createentityform', {
  templates: ['createentityform'],
  actions: {
    createentity: function(){
        var component = this;
        var newEntityName = this.$el.find('#newEntityField').val();
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
