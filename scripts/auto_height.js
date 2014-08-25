

//如果用户的浏览器不支持iframe是否将iframe隐藏 yes 表示隐藏，no表示不隐藏

var iframehide="yes";
function dyniframesize(){
	if(document.getElementById){
		var iframe_obj=document.getElementById("detail_frame");
		if(iframe_obj && !window.opera){
			alert("ok");
			iframe_obj.style.display="block";
			alert(iframe_obj.contentWindow.scrollHeight);
			if(iframe_obj.contentDocument && iframe_obj.contentDocument.body.offsetHeight){    //NetScape浏览器
				iframe_obj.height = iframe_obj.contentDocument.body.offsetHeight;
			}
			else if(iframe_obj.Document && iframe_obj.Document.body.scrollHeight){       //IE浏览器
				iframe_obj.height = iframe_obj.Document.body.scrollHeight;
			}
		}
	}
	//根据设定的参数来处理不支持iframe的浏览器的显示情况 
	if((document.all || document.getElementById) && iframehide=="no"){
		var tempobj=document.all? document.all["detail_frame"] : document.getElementById("detail_frame");
		tempobj.style.display="block";
	}
}
if (window.addEventListener){
	window.addEventListener("load", dyniframesize, false);
}
else if (window.attachEvent){
	window.attachEvent("onload", dyniframesize);
}
else{
	window.onload=dyniframesize;
}
