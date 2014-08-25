
//跨浏览器的事件对象EventUtil
var EventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	getEvent:function(event){
		return event ? event : window.event;
	},
	getTarget: function(event){
		return event.target||event.srcElement;
	},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
};
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
				parentElement.filter.alpha.opacity=60;  //老版IE????
			}
		}else{
			try{
				parentElement.style.opacity=1;
			}
			catch(error){
				parentElement.filter.alpha.opacity=100;  //老版IE???? 
			}
		}
	}
}
window.onscroll=navigatorHide;