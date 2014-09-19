$(document).ready(function(){ 
      $("#detail_frame").load(function(){ 
      $(this).height(0); //用于每次刷新时控制IFRAME高度初始化 
      var height = $(this).contents().height() + 30; 
      $(this).height( height < 800 ? 800 : height ); 
    }); 
});