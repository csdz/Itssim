function isEmail(str){  
	var reg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/; 
	if(reg.test(str)){
	return true; 
	}else{
	return false; 
	}
}
function isName(str){
	var reg= /^[\u4e00-\u9fa5]{2,5}$/;  
	if (reg.test(str)) { 
	return true; 
	}else{ 
	return false; 
	} 	
}
function isComment(str){
	var reg=/[\u4e00-\u9fa5]{1}/g;
	var sum=0;
	while(reg.exec(str)){
		sum+=1;
	}
	if (sum>=10) { 
	return true; 
	}else{ 
	return false; 
	} 	
}
function findNext(node,tagName){
	while(1){
		if(node.nextSibling.nodeType==1 && node.nextSibling.nodeName==tagName){
			return node.nextSibling;
		}else{
			node=node.nextSibling;
		}
	}
}
function validate(event){
	event=EventUtil.getEvent(event);
	var target=EventUtil.getTarget(event);  //提交的表单对象
	var name=target.elements["name"];
	var career=target.elements["career"];
	var email=target.elements["email"];
	var comment=target.elements["comment"];
	if(!isName(name.value)){
		name.style.backgroundColor="#FCF";
		EventUtil.preventDefault(event);   //阻止表单提交到action的处理地址
		findNext(name,"LABEL").innerHTML="请输入正确的中文姓名！";

	}
	if(career.value=="0"||career.value==""){
		career.style.backgroundColor="#FCF";
		EventUtil.preventDefault(event);
		findNext(career,"LABEL").innerHTML="请选择您的职业！";
	}
	if(!isEmail(email.value)){
		email.style.backgroundColor="#FCF";
		EventUtil.preventDefault(event);
		findNext(email,"LABEL").innerHTML="请输入有效的邮箱地址！";
	}
	if(!isComment(comment.value)){
		comment.style.backgroundColor="#FCF";
		EventUtil.preventDefault(event);
		findNext(comment,"LABEL").style.display="inline";
		findNext(comment,"LABEL").innerHTML="请输入至少10个汉字的留言！";
	}
	//target.elements["submit"].disabled=true; 为防止表单重复提交，这个改加哪？
}
function recovery(event){
	event=EventUtil.getEvent(event);
	var target=EventUtil.getTarget(event);  //提交的表单对象
	var name=target.elements["name"];
	var career=target.elements["career"];
	var email=target.elements["email"];
	var comment=target.elements["comment"];
	name.focus();
	name.style.backgroundColor="";
	findNext(name,"LABEL").innerHTML="姓名";
	career.style.backgroundColor="";
	findNext(career,"LABEL").innerHTML="职业";
	email.style.backgroundColor="";
	findNext(email,"LABEL").innerHTML="Email";
	comment.style.backgroundColor="";
	findNext(comment,"LABEL").style.display="none";
}
window.onload=function(){
	if(document.getElementById){
		var form=document.getElementById("messageForm");
		for(var i=0; i<form.elements.length-2; i++){
			EventUtil.addHandler(form.elements[i],"focus",function(event){
				event=EventUtil.getEvent(event);
				var target=EventUtil.getTarget(event);
				target.style.backgroundColor="#F7F7F7";
			});
		}
		EventUtil.addHandler(form.elements["name"],"blur",function(event){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			if(target.value!=""){
				if(isName(target.value)){
					target.style.backgroundColor="";
					findNext(target,"LABEL").innerHTML="姓名";
				}else{
					target.style.backgroundColor="#FCF";
					findNext(target,"LABEL").innerHTML="请输入正确的中文姓名！";
				}
			}else{
				target.style.backgroundColor="";
				findNext(target,"LABEL").innerHTML="姓名";
			}
		});

		EventUtil.addHandler(form.elements["career"],"blur",function(event){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			target.style.backgroundColor="";
		});
		EventUtil.addHandler(form.elements["email"],"blur",function(event){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			if(target.value!=""){
				if(isEmail(target.value)){
					target.style.backgroundColor="";
					findNext(target,"LABEL").innerHTML="Email";
				}else{
					target.style.backgroundColor="#FCF";
					findNext(target,"LABEL").innerHTML="请输入有效的邮箱地址！";
				}
			}else{
				target.style.backgroundColor="";
				findNext(target,"LABEL").innerHTML="Email";
			}
		});
		EventUtil.addHandler(form.elements["comment"],"blur",function(event){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			if(target.value!=""){
				if(isComment(target.value)){
					target.style.backgroundColor="";
					findNext(target,"LABEL").style.display="none";
				}else{
					target.style.backgroundColor="#FCF";
					findNext(target,"LABEL").style.display="inline";
					findNext(target,"LABEL").innerHTML="请输入至少10个汉字的留言！";
				}
			}else{
				target.style.backgroundColor="";
				findNext(target,"LABEL").style.display="none";
			}
		});
		document.forms[0].elements[0].focus();     //页面加载完毕后，将焦点转移到表单中的第一个字段
		EventUtil.addHandler(form,"submit",validate);
		EventUtil.addHandler(form,"reset",recovery);
	}
};
