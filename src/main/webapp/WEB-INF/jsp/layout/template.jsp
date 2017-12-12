<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" scope="request"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <link rel="stylesheet" href="css/bootstrap/bootstrap.css" type="text/css" />
    <link rel="stylesheet" href="css/confirm/jquery-confirm.min.css" type="text/css" />

    <script type="text/javascript" src="js/jquery/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/confirm/jquery-confirm.min.js"></script>
    <script type="text/javascript" src="js/jvalidate/jquery.validate.min.js"></script>
    <script type="text/javascript" src="js/jvalidate/additional-methods.min.js"></script>
    <script type="text/javascript" src="js/jvalidate/i18n/messages_zh.js"></script>
    <script type="text/javascript" src="js/util/common.js"></script>
</head>
<script type="text/javascript">
    var ctx = "<c:out value='${ctx}'/>";
</script>
<body>
    <div>
        <tiles:insertAttribute name="body" flush="true" ignore="true"/>
    </div>
</body>
</html>
