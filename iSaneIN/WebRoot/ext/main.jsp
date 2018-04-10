<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=8" /> 
<link rel="Shortcut Icon" href="favicon.ico" >
<title>u3d后台管理v1.0</title>
<!--Ext Base files -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/ext-4/resources/css/ext-all.css">
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/ext-4/ext-all-debug.js"></script>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/ext/app.js"></script>
<!-- ext other utils-->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/ext-4/resources/css/example.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/ext-4/examples.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/ext-4/MonthField.js"></script>
<script type="text/javascript" charset="UTF-8" src="${pageContext.request.contextPath}/ext-4/ext-lang-zh_CN.js"></script>
<!--other files -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/md5.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.6.4.min.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/iconCls.css">
<!-- cache -->
<script type="text/javascript" src="${pageContext.request.contextPath}/ext/app/util/GetDateMap.js"></script>

</head>
<body>

<div id="top_div_id">
	<input id = "top_div_userCode" width="300" value="${sessionScope.USER.userCode}"/> 
	<input id = "top_div_userName" width="300" value="${sessionScope.USER.userName}"/> 
	<input id = "top_div_plantCode" width="300" value="${sessionScope.USER.plantCode}"/> 
	<input id = "top_div_password" width="300" value="${sessionScope.USER.password}"/> 
	<input id = "top_div_userId" width="300" value="${sessionScope.USER.id}"/> 
</div>
</body>
<!--
<style type="text/css">
	#top_div_id {
		background-repeat: no-repeat;
		background-position: left;
		background-image: url("img/menu_icon/main_top.png");
		width: 100%;
		height: 100%;
	}
	#top_div_id input{
		display: none;
	}
</style>
  -->
</html>