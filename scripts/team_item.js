$(document).ready(function(){
        var $links=$("#column a");
		var $item_1=$("#breadcrumb li.item_1");
		var $item_2=$("#breadcrumb li.item_2");
		$links.each(function(){
            $(this).click(function(){
				if($(this).attr("class")=="level_1"){
					$item_1.text($(this).text());
					var text=$(this).next("ul").find("a:first").text();
					$item_2.text(text);
				}else if($(this).attr("class")=="level_2"){
					var text=$(this).parent("li").parent("ul").prev("a").text();
					$item_1.text(text);
					$item_2.text($(this).text());
				}
			});
       });		
});