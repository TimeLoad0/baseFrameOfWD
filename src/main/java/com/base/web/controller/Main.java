package com.base.web.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
public class Main {
	@Value("${application.message:Hello World}")
	private String message = "Hello World";

	@RequestMapping("/")
	public String welcome(Map<String, Object> model) {
		return "welcome.page";
	}

	@RequestMapping("/layout")
	public String layout(Map<String, Object> model) {
		return "layout.layout";
	}

	@RequestMapping("/layout_top")
	public String layoutTop(Map<String, Object> model) {
		return "layout.top";
	}
	@RequestMapping("/layout_left")
	public String layoutLeft(Map<String, Object> model) {
		return "layout.left";
	}
	@RequestMapping("/layout_right")
	public String layoutRight(Map<String, Object> model) {
		return "layout.right";
	}

	@RequestMapping("/index")
	public String index(Map<String, Object> model) {
		return "index";
	}

	@RequestMapping("/index1")
	public String index1(Map<String, Object> model) {
		return "index1";
	}

	@RequestMapping("/test")
	public String test(Map<String, Object> model) {
		return "test";
	}

	@RequestMapping("/foo")
	public String foo(Map<String, Object> model) {
		throw new RuntimeException("Foo");
	}
}
