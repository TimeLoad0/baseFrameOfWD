package com.base.web;

import com.alibaba.fastjson.JSONObject;

public class test {
    public static void main(String[] args){
        JSONObject json = JSONObject.parseObject("{\"entitytoId\":{1:'123'}}");
        System.out.println(json.get("entitytoId"));
    }
}
