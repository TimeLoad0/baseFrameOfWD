package com.base.web.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 主控制器
 * @author wd
 */
@Controller
public class Main {
	@Value("${application.message:Hello World}")
	private String message = "Hello World";

	@RequestMapping("/")
	public String welcome() {
		return "welcome.page";
	}

	@RequestMapping("/layout")
	public String layout() {
		return "layout.layout";
	}

	@RequestMapping("/layout_top")
	public String layoutTop() {
		return "layout.top";
	}
	@RequestMapping("/layout_left")
	public String layoutLeft() {
		return "layout.left";
	}
	@RequestMapping("/layout_right")
	public String layoutRight() {
		return "layout.right";
	}

	@RequestMapping("/index")
	public String index() {
		return "index";
	}

	@RequestMapping("/index1")
	public String index1() {
		return "index1";
	}

	@RequestMapping("/test")
	public String test() {
		return "test";
	}

	@RequestMapping("/foo")
	public String foo() {
		throw new RuntimeException("Foo");
	}
}
