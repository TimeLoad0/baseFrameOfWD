package com.base.web.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.Map;

@Controller
public class Main {
	@Value("${application.message:Hello World}")
	private String message = "Hello World";

	@RequestMapping({"/","index","baseweb"})
	public String index(Map<String, Object> model) {
		model.put("time", new Date());
		model.put("message", this.message);
		return "index";
	}

	@RequestMapping("/welcome")
	public String welcome(Map<String, Object> model) {
		model.put("time", new Date());
		model.put("message","index");
		return "welcome.page";
	}

	@RequestMapping("/foo")
	public String foo(Map<String, Object> model) {
		throw new RuntimeException("Foo");
	}
}
