<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
	<form action="api/Import/in" method="post"
		enctype="multipart/form-data">
		文件：<input type="file" name="uploadFile" /> 
		<input type="text" name="plantCode" value="HNHM" /> 
		<input type="text" name="importType" value="YB" /> 
		<input type="text" name="dateType" value="M"/>
		<input type="text" name="storeDate" value="2018-02"/>
		<br></br> 
		<input type="submit" value="导入" />
	</form>
	<form action="api/OriginalType/queryAll" method="get">
	<input type="text" name="plantCode" value="HNHM"/>
	<input type="text" name="dataType" value="RB"/>
	<input type="text" name="storeDate" value="2018-01"/>
	<br></br> <input type="submit"
			value="录入查询" />
	</form>
</body>
</html>