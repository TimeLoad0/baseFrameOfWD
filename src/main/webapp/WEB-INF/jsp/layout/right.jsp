<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<base href="<%=request.getRequestURI()%>">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title></title>
	<link rel="stylesheet" href="../../../css/bootstrap/bootstrap.css">

	<style type="text/css">
		body,div,ol,ul,li,dl,dt,dd,h1,h2,h3,h4,h5,h6,p,form,fieldset,legend,input{margin:0; padding:0;}
		html,body{height:100%;}
		body{overflow: hidden;background-color: #F5F5F5;}

		.nav > li > a{position: relative;display: block;padding: 1px 15px;}

		.closeTab{display:inline;margin-left: 5px;margin-bottom: 3px;background-image:url(../../../images/close.png)}
		.closeTab:hover{background-image:url(../../../images/close_active.png)}
	</style>

	<script src="../../../js/jquery/jquery-3.1.1.min.js"></script>
	<script src="../../../js/bootstrap/bootstrap.min.js"></script>
	<script src="../../../js/layout/right.js"></script>

	<script type="application/javascript">
		/*
        **
        * 获取顶层页面
        * @param 获取的页面对象
        * @returns
        */
        function getTopPage(page)
        {
            if ( isEmpty(page) )
            {
                page = this;
            }

            var cnt = 0;

            while ( !isEmpty(page) && isEmpty(page.document.getElementById("base")) && cnt < 10 )
            {
                page = page.parent;

                if ( isEmpty(page) )
                {
                    return null;
                }

                cnt++;
            }

            if ( cnt >= 10 )
            {
                page = this;

                return page;
            }

            return page;
        }

        /**
         * 判断对象是否为空
         * @param 元素对象
         * @returns
         */
        function isEmpty(src)
        {
            //判断是不是Jquery对象
            if(src instanceof jQuery){
                if(src.length == 0){
                    return true;
                }
            }
            else{
                if ( src == undefined || src == null )
                {
                    return true;
                }
            }

            return false;
        }
        /**
         * 判断是否为IE浏览器
         * @returns
         */
        function isIE()
        {
            if ( isEmpty(window) )
            {
                return false;
            }

            //判断是否为IE浏览器
            if ( navigator.userAgent.indexOf("MSIE") > 0 )
            {
                //判断IE版本如果为5.5，设置正确的xmlHttp名称
                if ( navigator.appVersion.indexOf("MSIE 5.5") >= 0 )
                {
                    return true;
                }
                else
                {
                    return true;
                }
            }
            else if ( "ActiveXObject" in window )
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        /**
         * 获取事件
         * @returns {*}
         */
        function getEvent()
        {
            var e;

            if ( !isIE() )
            {
                if ( arguments.callee.caller == undefined || arguments.callee.caller == null )
                {
                    e = arguments.callee.arguments[0];
                }
                else
                {
                    e = arguments.callee.caller.arguments[0];
                }
            }
            else
            {
                e = window.event;
            }

            return e;
        }

        /**
         * 阻止父级事件触发
         * @param e
         */
        function preventTopEvent(e){
            e = getEvent();

            if(isIE()){
                e.cancelBubble = true;
            }
            else{
                e.stopPropagation();
            }

            e = null;
        }

	</script>
</head>
<body>
	<div style="width:98%;height:25px;line-height: 24px;margin:1px auto;margin-bottom:0;font-size: 16px;">
		<ul id="tabs" class="nav nav-tabs">
			<li id="li_lastTab" >
				<a onclick="showTabs(this)">...</a>
				<div id="hidTabs" style="background-color:#F5F5F5;min-width: 100px;border: 1px solid #dddddd;position: fixed;display: none"></div>
			</li>
		</ul>
	</div>
	<div id="frames" style="width:98%;height:93%;margin:0 auto;border:1px solid #D6D7D7;background-color: white;border-radius: 0 4px 4px 4px;    box-shadow: -5px 5px 10px #888888;"></div>
</body>
</html>