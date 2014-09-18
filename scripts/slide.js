$(document).ready(function(){
	$("#fruit a.head_a:first").next("div").show();
	$("#fruit a.head_a:not(:first)").next("div").hide();
	$("#fruit a.head_a").click(function(){
		$(this).parent("li").siblings("li").children("div").slideUp("5000");
		$(this).next("div").slideToggle("5000");
		$("#breadcrumb").find("li:last").text($(this).find("h2").text());
		event.stopPropagation();
	});
});