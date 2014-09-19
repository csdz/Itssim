window.onload=function(){
	var curIndex=0;  
	var timeInterval=1000; 
	var img_num=6;
	setInterval(changeImg,timeInterval); 
	function changeImg() 
	{ 
		var obj=document.getElementById("showpic"); 
		if (curIndex==img_num-1) 
		{ 
			curIndex=0; 
		} 
		else 
		{ 
			curIndex+=1; 
		} 
		obj.style.backgroundPosition=parseInt(-curIndex*450)+"px"+" "+0;
	} 	
};