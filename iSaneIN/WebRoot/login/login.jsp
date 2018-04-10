<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=emulateIE7" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/login/css/style.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/login/css/skin_/login.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/login/js/jquery.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/login/js/jquery.select.js"></script>

<title>数字化管理平台_后台登录</title>
</head>

<body>
<div id="container">
    <div id="bd">
    	<div id="main">
        	<div class="login-box">
        		<!-- 
                <div id="logo"></div>
        		 -->
                <h1></h1>
                <form action="${pageContext.request.contextPath}/loginSubmitExt" method="post">
	                <div class="input username" id="username">
	                    <label for="userName">用户名</label>
	                    <span></span>
	                    <input type="text" id="userName" name="userCode" value="${user.userCode}"/>
	                </div>
	                <div class="input psw" id="psw">
	                    <label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;码</label>
	                    <span></span>
	                    <input type="password" id="password" name="password"/>
	                </div>							
	                <%-- <div class="styleArea">
	                    <div class="styleWrap">
	                        <select name="plantCode">
	                        	<c:forEach items="${deptList}" var="dept">
	                        		<option value="${dept.deptCode}">${dept.deptShortName}</option>
	                        	</c:forEach>
	                        </select>
	                    </div>
	                </div> --%>
					<!--submit button-->
	                <div id="btn" class="loginButton" >
	                    <input type="submit" class="button" value="登录" />
	                </div>
	                <!-- 验证信息 显示区-->
	                <div class="validateArea">
	                	<span>
							<c:if test="${userCodeNull != null}">
								*${userCodeNull}
							</c:if>  
							<c:if test="${passWordNull != null}">
								*${passWordNull}
							</c:if>  
							<c:if test="${userError != null}">
								*${userError}
							</c:if>  
							<c:if test="${passWordError != null}">
								*${passWordError}
							</c:if>  
							<c:if test="${userStatusError != null}">
								*${userStatusError}
							</c:if>  
							<c:if test="${userValidDateError != null}">
								*${userValidDateError}
							</c:if> 
							<c:if test="${sessionNull != null}">
								*${sessionNull}
							</c:if> 
	                	</span>
	                </div>
                </form>
            </div>
        </div>
        <div id="ft">CopyRight&nbsp;2017&nbsp;&nbsp;版权所有&nbsp;&nbsp;南京依盛信息技术有限公司&nbsp;&nbsp;</div>
    </div>
   
</div>
</body>

<script type="text/javascript">
	var height = $(window).height() > 445 ? $(window).height() : 445;
	$("#container").height(height);
	var bdheight = ($(window).height() - $('#bd').height()) / 2 - 20;
	$('#bd').css('padding-top', bdheight);
	$(window).resize(function(e) {
        var height = $(window).height() > 445 ? $(window).height() : 445;
		$("#container").height(height);
		var bdheight = ($(window).height() - $('#bd').height()) / 2 - 20;
		$('#bd').css('padding-top', bdheight);
    });

	$('select').select();
	<!--
	$('.loginButton').click(function(e) {
        document.location.href = "main.html";
    });
	-->
</script>

</html>
