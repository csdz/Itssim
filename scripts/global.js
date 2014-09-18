function navigatorHide(){
	if(document.getElementById){
		var element=document.getElementById("header");
		var parentElement=element.parentNode;
		var top = document.body.scrollTop + document.documentElement.scrollTop;
		var heightControl=1;  //设个小点的值
		if(top >= heightControl){
			try{
				parentElement.style.opacity=0.6;
			}
			catch(error){
				alert("ok");
				parentElement.style.filter='alpha(opacity:60)';  //老版IE????
			}
		}else{
			try{
				parentElement.style.opacity=1;
			}
			catch(error){
				alert("ok");
				parentElement.style.filter='alpha(opacity:100)';  //老版IE???? 
			}
		}
	}
}
window.onscroll=navigatorHide;
