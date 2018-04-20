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

    private String message;

    private Integer pageNo;

    private Integer pageSize;

    private Integer totalSize;

    private List<Map<String, Object>> rowData;

    public JsonResponse(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public JsonResponse(ResultCode resultCode) {
        this.code = resultCode.getCode();
        this.message = resultCode.getMsg();
    }

    public JsonResponse(Integer code, String message, Integer totalSize, List<Map<String, Object>> rowData) {
        this.code = code;
        this.message = message;
        this.totalSize = totalSize;
        this.rowData = rowData;
    }

    public JsonResponse(Integer code, String message, Integer pageNo, Integer pageSize, Integer totalSize, List<Map<String, Object>> rowData) {
        this.code = code;
        this.message = message;
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

        if (null == message) {
            map.put(Constants.RESULT_MESSAGE, ResultCode.FAILED.getMsg());
        } else {
            map.put(Constants.RESULT_MESSAGE, message);
        }

        //如果请求失败直接返回map，不设置分页信息
        if ((Integer) map.get(Constants.RESULT_CODE) != ResultCode.SUCCESS.getCode()) {
            return map;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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
