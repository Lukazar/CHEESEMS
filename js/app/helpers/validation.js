(function(){
  
  helper.process = function(el){
    var attr_list = {}, input = el.val();
    
    $(el[0].attributes).each(function(){
      attr_list[this.nodeName] = this.nodeValue;
    });
        
    //if required, cannot be blank
    if(attr_list.hasOwnProperty('required')){
      if(input.length == 0){
        return false;
      }
    }
    
    if(el.is('select')){
      if(el.val() === 'select'){
        return false;
      }
    } else {
    
      //if length required, make sure its that length
      if(attr_list.size){
        if(input.length != attr_list.size){
          return false;
        }
      }
      
      switch(attr_list.type){
        case 'email':
          var regex = new RegExp("^[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$");
          if(!regex.test(input)){
            return false;
          }
          break;
        case 'number':
        case 'phone':          
          if(!$.isNumeric(input)){
            return false;
          }
          break;
        case 'checkbox':
          if(!attr_list.hasOwnProperty('checked')){
            return false;
          }
          break;
        case 'datetime':
          break;
        case 'text':
          break;
      }
    }
    
    return true;
  };
  
  helper.listen = function(){
    var that = this;
    $('body').on('focusout', '.validate', function(e){
      if(helper.process($(this))){
        $(this).removeClass('invalid');
        $(this).addClass('valid');
      } else {
        $(this).removeClass('valid');
        $(this).addClass('invalid');
      }
    });
    
    $('#wrapper').on('focusin', '.validate', function(e){
      $(this).removeClass('valid');
      $(this).removeClass('invalid');
    });
  }
  
  helper.listen();
  
})();