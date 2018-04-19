package com.base.web.common;

import com.alibaba.fastjson.JSON;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 返回数据封装
 *
 * @author wj
 * @date 2018-4-11 17:09:54
 */
public class JsonResponse {
    private Integer code;

    private String msg;

    private Integer pageNo;

    private Integer pageSize;

    private Integer totalSize;

    private List<Map<String, Object>> rowData;

    public JsonResponse(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public JsonResponse(ResultCode resultCode) {
        this.code = resultCode.getCode();
        this.msg = resultCode.getMsg();
    }

    public JsonResponse(Integer code, String msg, Integer totalSize, List<Map<String, Object>> rowData) {
        this.code = code;
        this.msg = msg;
        this.totalSize = totalSize;
        this.rowData = rowData;
    }

    public JsonResponse(Integer code, String msg, Integer pageNo, Integer pageSize, Integer totalSize, List<Map<String, Object>> rowData) {
        this.code = code;
        this.msg = msg;
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.totalSize = totalSize;
        this.rowData = rowData;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>(Constants.DEFAULT_HASHMAP_LENGTH);

        if (StringUtils.isEmpty(code)) {
            map.put(Constants.RESULT_CODE, ResultCode.FAILED.getCode());
        } else {
            map.put(Constants.RESULT_CODE, code);
        }

        if (null == msg) {
            map.put(Constants.RESULT_MSG, ResultCode.FAILED.getMsg());
        } else {
            map.put(Constants.RESULT_MSG, msg);
        }

        if (null == pageNo) {
            map.put(Constants.RESULT_PAGENO, Constants.DEFAULT_PAGENO);
        } else {
            map.put(Constants.RESULT_PAGENO, pageNo);
        }

        if (null == pageSize) {
            map.put(Constants.RESULT_PAGESIZE, Constants.DEFAULT_PAGESIZE);
        } else {
            map.put(Constants.RESULT_PAGESIZE, pageSize);
        }

        if (null == totalSize) {
            map.put(Constants.RESULT_TOTALSIZE, Constants.DEFAULT_TOTALSIZE);
        } else {
            map.put(Constants.RESULT_TOTALSIZE, totalSize);
        }

        if (null == rowData) {
            map.put(Constants.RESULT_ROWDATA, new ArrayList<Map<String, Object>>());
        } else {
            map.put(Constants.RESULT_ROWDATA, rowData);
        }

        return map;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(toMap());
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(Integer totalSize) {
        this.totalSize = totalSize;
    }

    public List<Map<String, Object>> getRowData() {
        return rowData;
    }

    public void setRowData(List<Map<String, Object>> rowData) {
        this.rowData = rowData;
    }
}
