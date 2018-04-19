package com.base.web;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * springBoot 启动类
 * @author wd
 */
@SpringBootApplication
@MapperScan("com.base.web.dao")
public class Starter extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Starter.class);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(Starter.class, args);
	}
}
