<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String ctx = request.getContextPath();
%>
<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<base href="<%=request.getRequestURI()%>">
	<title>baseFrame系统</title>
	<link rel="stylesheet" href="../../css/bootstrap/bootstrap.min.css">
	<link rel="stylesheet" href="../../css/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="../../css/waves/waves.min.css">
	<link rel="stylesheet" href="../../css/common.css">
	<style type="text/css">
		/*顶部框架*/
		#header{background:	#008080;background:	var(--bgColor);width: 100%;height: 70px;height: var(--headerHeight);padding: 0 20px;position: fixed;z-index: 2;z-index: calc(var(--zIndex) + 2);left: 0;top: 0;box-shadow: 0 1px 4px rgba(0,0,0,.3);  }
		/*顶部整体内容*/
		.header_content {position: relative;list-style: none;padding: 11px 0;padding: calc((var(--headerHeight) - var(--systemTitleHeight))/2) 0;margin-bottom: 0;}
		/*顶部左侧内容*/
		.header_content>li{float: left;}
		/*顶部logo*/
		.header_logo a img {vertical-align: top;}
		/*顶部文字*/
		.system_title {color: #fff;height: 48px;height: var(--systemTitleHeight);line-height: 48px;line-height: var(--systemTitleHeight);font-size: 20px;}

		/*顶部右侧内容*/
		.header_right{float: right!important;}
		.header_right>ul{list-style: none;}
		.header_right>ul>li{display: inline-block;margin: 0 1px;vertical-align: top;min-width: 36px;min-height: 36px;}
		.header_right>ul>li>a {color: #fff;display: block;text-align: center;position: relative;-webkit-transition: background-color;-o-transition: background-color;transition: background-color;-webkit-transition-duration: 250ms;transition-duration: 250ms;border-radius: 2px;}
		.header_right>ul>li>a {color: white;font-size: 18px;padding: 15px 0;}
		.header_right>ul>li>ul{right:auto;left: auto;box-shadow: 0 2px 10px rgba(0,0,0,.2);border: none;float: right!important;position:fixed;display: none;min-width: 160px;padding: 5px 0;margin: 2px 0 0;font-size: 14px;text-align: left;list-style: none;background-color: #fff;border-radius: 4px;}
		.header_right>ul>li>ul>li>a{display: block;clear: both;font-weight: 400;color: #333;padding: 10px 20px;font-size: 16px;-webkit-transition: background-color;-o-transition: background-color;transition: background-color;-webkit-transition-duration: .3s;transition-duration: .3s;}
		.header_right_img{width:50px;height:50px;line-height: 50px;background-image:url(../../images/tx.jpg);border-radius:50%;  }

		/*内容*/
		#body{height: calc(100% - 70px);height: calc(100% - var(--headerHeight));padding-top: 70px;padding-top: var(--headerHeight);padding-bottom: 0;}
		.sidebar {position: fixed;width: 190px;width: var(--sidebarWidth);background: #fff;height: 100%;top: 70px;top: var(--headerHeight);transition: all;-webkit-transition-duration: .3s;transition-duration: .3s;overflow-y: auto;box-shadow: 1px 0 4px rgba(0,0,0,.3);z-index: 4;z-index: calc(var(--zIndex) + 4);}
		.menu{position: relative;overflow: hidden;height: 100%;max-width: 100%;outline: 0;direction: ltr;}
		.main-menu,.main-menu-extend {display:none;list-style: none;padding-left: 0;height:calc(100% - 70px - 48px);height:calc(100% - var(--headerHeight) - var(--tabHeight));overflow-y: auto;}

		.main-menu li>a {padding: 14px 0px 14px 15px;display: block;font-weight: 500;position: relative;color: #4C4C4C;}
		.main-menu-extend li>a {padding: 10px;display: block;font-weight: 500;position: relative;color: #4C4C4C;}

		.sub-menu ul{list-style: none;display: none;padding: 0;}
		.sub-menu ul>li>a{padding: 8px 0px 8px 30px;font-weight: 500;display: block;color: #4C4C4C;}
		.sub-menu ul>li>ul>li>a{padding: 8px 0px 8px 55px;font-weight: 500;display: block;color: #4C4C4C;}
		.sub-menu ul>li>ul>li>ul>li>a{padding: 8px 0px 8px 70px;font-weight: 500;display: block;color: #4C4C4C;}
		.sub-menu ul>li>ul>li>ul>li>ul>li>a{padding: 8px 0px 8px 85px;font-weight: 500;display: block;color: #4C4C4C;}

		.sub-menu-extend ul{list-style: none;display: none;padding: 0}
		.sub-menu-extend-ul{position: fixed;background-color: #fff;box-shadow: 1px 0 4px rgba(0,0,0,.3);overflow-y: auto;}
		.sub-menu-extend-ul>a{padding: 8px 30px 8px 30px;font-weight: 900;display: block;color: #4C4C4C;}
		.sub-menu-extend ul>li>a{padding: 8px 0px 8px 30px;font-weight: 500;display: block;color: #4C4C4C;}
		.sub-menu-extend ul>li>ul>li>a{padding: 8px 30px 8px 55px;font-weight: 500;display: block;color: #4C4C4C;}
		.sub-menu-extend ul>li>ul>li>ul>li>a{padding: 8px 30px 8px 70px;font-weight: 500;display: block;color: #4C4C4C;}
		.sub-menu-extend ul>li>ul>li>ul>li>ul>li>a{padding: 8px 30px 8px 85px;font-weight: 500;display: block;color: #4C4C4C;}

		.right{float: right;}
		.active{display:block;}
		.active-a{opacity: 1;box-shadow: inset 5px 0 #008080;}
		.main-menu a,.main-menu-extend a{opacity: 0.85;}
		.main-menu a:hover,.main-menu-extend a:hover{opacity: 1;box-shadow: inset 5px 0 #008080;}

		.content {height: 100%;width: 100%;transition: all;padding-left: 190px;padding-left: var(--sidebarWidth);padding-right: 0;top: 70px;top: var(--headerHeight);position: fixed;}
		.tabs{background:	#008080;background:	var(--bgColor);position: relative;width: 100%;height: 48px;height: var(--tabHeight);overflow: hidden;}
        .scroll>.tab_left, .scroll>.tab_right {display: block;}
        .tab_left, .tab_right {  width: 48px;width: var(--tabHeight);height: 48px;height: var(--tabHeight);line-height: 48px;  line-height: var(--tabHeight);color: #fff;text-align: center;display: none;}
        .tab_left {float: left;margin-right: -40px;}
        .tab_right {float: right;margin-left: -40px;}
        .tab_left>a, .tab_right>a {display: block;width: 100%;color: #fff;font-size: 22px;padding: 13px 0;}
        .scroll>ul { margin: 0 40px;}
        .tabs>ul {padding: 0;font-size: 0;display: block;white-space: nowrap;-webkit-overflow-scrolling: touch;overflow-x: scroll;}
        .tabs>ul>li {display: inline-block;height: 48px;height: var(--tabHeight);line-height: 48px;line-height: var(--tabHeight);margin: 0;font-size: 14px;}
        .tabs>ul>li>a {display: block;height: 48px;height: var(--tabHeight);line-height: 48px;line-height: var(--tabHeight);color: #fff;padding: 0 28px;transition: background-color .35s cubic-bezier(.35,0,.25,1);border-bottom: none;position: relative;text-decoration: none;}
        .tabs>ul>.cur>a {color: #fff;}
        .tabs>ul>.cur>a:after {left: 0;bottom: 1px;width: 100%;opacity: 1;transition: all linear .2s;}
        .tabs>ul>li>a:after {content: "";position: absolute;bottom: 0;left: 50%;right: 50%;width: 0;border-bottom: 3px solid #FFEB3B;transition: all linear .2s;}

		.iframes{height: calc(100% - 70px - 48px);}
		.iframe {height: 100%;display: none;}
		.iframes>.cur {display: block;}

		.fa{padding-right:10px;}

		.rightBar{position: fixed;width:10px; height:100%;z-index: 3;z-index: calc(var(--zIndex) + 3);left:190px;left:var(--sidebarWidth)}
		.right_btn{width:10px; height:100px; position: absolute; right:0; top:45%; margin-top:-50px; background-image: url(../../images/1_07.png); display:none; cursor:pointer;}
		.right_btn_style{background-image: url(../../images/1_08.png);}

	</style>

	<script src="../../js/jquery/jquery-3.1.1.min.js"></script>
	<script src="../../js/bootstrap/bootstrap.min.js"></script>
	<script src="../../js/bootstrap/BootstrapMenu.min.js"></script>
	<script src="../../plugins/fullPage/jquery.fullPage.js"></script>
	<script src="../../plugins/fullPage/jquery.jdirk.min.js"></script>
	<script src="../../js/waves/waves.min.js"></script>
	<script src="../../js/laydate/laydate.js"></script>
	<script src="../../js/util/common.js"></script>
	<script src="../../js/index.js"></script>
	<script type="application/javascript">
        var path = '<%=ctx %>';
        $(function() {



        });

	</script>
</head>

<body>
	<!-- 顶部内容 -->
	<div id="header">
		<ul class="header_content">
			<li class="header_logo">
				<a href="javascript:;">
					<img src="../../images/logo.png">
				</a>
				<span class="system_title">baseFrame系统</span>
			</li>
			<li class="header_right">
				<ul>
					<li>
						<a class="waves-effect waves-light" href="javascript:;">
							<span class="glyphicon glyphicon-search"></span>
						</a>
						<ul>
							<li>
								<a class="waves-effect waves-light" href="javascript:;">
									<span class="glyphicon glyphicon-search">搜索</span>
								</a>
							</li>
							<li>
								<a class="waves-effect waves-light" href="javascript:;">
									<span class="glyphicon glyphicon-star">收藏内容</span>
								</a>
							</li>
						</ul>
					</li>
					<li>
						<a class="waves-effect waves-light" href="javascript:;">
							<span class="glyphicon glyphicon-star"></span>
						</a>
						<ul>
							<li>
								<a class="waves-effect waves-light" href="javascript:;">
									<span class="glyphicon glyphicon-search">搜索1</span>
								</a>
							</li>
							<li>
								<a class="waves-effect waves-light" href="javascript:;">
									<span class="glyphicon glyphicon-star">收藏内容1</span>
								</a>
							</li>
						</ul>
					</li>
					<li>
						<a class="waves-effect waves-light" href="javascript:;">
							<span class="glyphicon glyphicon-option-vertical"></span>
						</a>
						<ul>
							<li>
								<a class="waves-effect waves-light" href="javascript:;fullPage()">
									<span class="glyphicon glyphicon-search">全屏</span>
								</a>
							</li>
						</ul>
					</li>
					<li>
						<div class="header_right_img" class="waves-effect waves-light" onclick="showMenu(this)"></div>
						<ul>
							<li>
								<a class="waves-effect waves-light" href="javascript:;">
									<span class="glyphicon glyphicon-search">个人资料</span>
								</a>
							</li>
							<li>
								<a class="waves-effect waves-light" href="javascript:;">
									<span class="glyphicon glyphicon-star">修改密码</span>
								</a>
							</li>
						</ul>
					</li>
				</ul>

			</li>
		</ul>
	</div>

	<!-- 显示内容 -->
	<div id="body">

		<!-- 菜单 -->
		<div class="sidebar">
			<div class="menu">
				<a class="waves-effect waves-light" style="width:100%;height:48px;text-decoration: none;background: url(../../images/bg.png) left top no-repeat;" href="javascript:;">
					<div style="width:100%;height:48px;line-height: 48px;font-size: 20px;background: rgba(0,0,0,.37);padding: 0px 14px;color: #fff;position: relative;">

					</div>
				</a>

				<ul class="main-menu active"></ul>

				<ul class="main-menu-extend"></ul>
			</div>
		</div>

		<div class="rightBar"><div class="right_btn"></div></div>

		<!-- 功能模块 -->
		<div class="content">
			<div class="tabs">
                <div class="tab_left">
                    <a class="waves-effect waves-light" href="javascript:;"><span class="glyphicon glyphicon-chevron-left"></span></a>
                </div>

                <div class="tab_right">
                    <a class="waves-effect waves-light" href="javascript:;"><span class="glyphicon glyphicon-chevron-right"></span></a>
                </div>

                <ul id="tabs"></ul>
            </div>

			<div class="iframes"></div>
		</div>
	</div>
</body>
</html>