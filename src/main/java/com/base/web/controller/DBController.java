package com.base.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.base.web.dao.UserMapper;
import com.base.web.entity.User;
import com.base.web.entity.UserExample;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class DBController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UserMapper userDao;

    @RequestMapping("createUser")
    @ResponseBody
    public String createUser(String username,Integer age){
        jdbcTemplate.execute("insert into user(name,age) values('"+username+"',"+age+")");
        return "success";
    }

    @RequestMapping("queryUser")
    @ResponseBody
    public String queryUser(String username){
        List<Map<String,Object>> list = new ArrayList<>();
        list = jdbcTemplate.queryForList("select * from user where name = '"+username+"'");
        return JSONObject.toJSONString(list);
    }

    @RequestMapping("queryUsers")
    @ResponseBody
    public String queryUsers(String username){
        List<User> list = new ArrayList<>();
        UserExample example = new UserExample();
        example.or().andNameEqualTo(username);
        list = userDao.selectByExample(example);
        return JSONObject.toJSONString(list);
    }
}
