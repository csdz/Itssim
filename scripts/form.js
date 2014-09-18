function isEmail(str){
  var reg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
  return reg.test(str);
}
function isName(str){
	var reg= /^[\u4e00-\u9fa5]{2,5}$/;
	return reg.test(str);
}
function isComment(str) {
	var reg = /[\u4e00-\u9fa5]{1}/g;
	var sum = 0;
	while (reg.exec(str)) {
		sum += 1;
	}
	return sum>=10
}
$(document).ready(function(){
	var $form=$("form#messageForm");
	var $name=$("input#name");          
	var $career=$("select#career");     
	var $email= $("input#email");       
	var $comment=$("textarea#comment");
	var $submit=$("input#submit");
	$submit.attr("disabled",false);
	$submit.val("提交留言");
	$name.focus();
	$name.val("");
	$career.val("");
	$email.val("");
	$comment.val("");
	$name.focus(function(){
		$(this).css("backgroundColor","#F7F7F7");
	});
	$career.focus(function(){
		$(this).css("backgroundColor","#F7F7F7");
	});
	$email.focus(function(){
		$(this).css("backgroundColor","#F7F7F7");
	});
	$comment.focus(function(){
		$(this).css("backgroundColor","#F7F7F7");
	});
	$name.blur(function() {
		if ($(this).val() != "" && !isName($(this).val())) {
			$(this).css("backgroundColor", "#FCF");
			$(this).next("label").html("请输入正确的中文姓名！");
		} else {
			$(this).css("backgroundColor", "");
			$(this).next("label").html("姓名");
		}
	});
	$career.blur(function(){
		$(this).css("backgroundColor","");
	});
	$email.blur(function(){
		if($(this).val()!="" && !isEmail($(this).val())){
			$(this).css("backgroundColor","#FCF");
			$(this).next("label").html("请输入有效的邮箱地址！" );
		}else{
			$(this).css("backgroundColor","");
			$(this).next("label").html("Email" );
		}
	});
	$comment.blur(function(){
		if($(this).val()!="" && !isComment($(this).val())){
			$(this).css("backgroundColor","#FCF");
			$(this).next("label").css("display","inline");
			$(this).next("label").html("请输入至少10个汉字的留言！" );
		}else{
			$(this).css("backgroundColor","");
			$(this).next("label").css("display","none");
		}
	});
	$form[0].onreset=function(){
		$submit.attr("disabled",false);
		$submit.val("提交留言");
		$name.focus();
		$name.css("backgroundColor","");
		$name.next("label").html("姓名" );
		$career.css("backgroundColor","");
		$career.next("label").html("职业" );
		$email.css("backgroundColor","");
		$email.next("label").html("Email" );
		$comment.css("backgroundColor","");
		$comment.next("label").css("display","none");
	};
	var options={          
		beforeSubmit:validate,
		success:showResponse,
		dataType:null,
		clearForm:true,
		resetForm:true,
		timeout:3000
	};
	function validate(formData,jqForm,options) {
		if (!isName($name.val())) {
			$name.css("backgroundColor", "#FCF");
			$name.next("label").html("请输入正确的中文姓名！");
			return false;
		}
		if ($career.val() == "0" || $career.val() == "") {
			$career.css("backgroundColor", "#FCF");
			$career.next("label").html("请选择您的职业！");
			return false;
		}
		if (!isEmail($email.val())) {
			$email.css("backgroundColor", "#FCF");
			$email.next("label").html("请输入有效的邮箱地址！");
			return false;
		}
		if (!isComment($comment.val())) {
			$comment.css("backgroundColor", "#FCF");
			$comment.next("label").css("display", "inline");
			$comment.next("label").html("请输入至少10个汉字的留言！");
			return false;
		}
		$submit.val("已提交");
		$submit.attr("disabled",true);
		var queryString=$.param(formData);
		return true;
	}
	function showResponse(responseText){       
		$submit.val("提交留言");
		$submit.attr("disabled",false);
		alert(responseText);
	   $name.focus();
	}
	$form.submit(function(){
		$(this).ajaxSubmit(options);
		return false;
	})
}); 
