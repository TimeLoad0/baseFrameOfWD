<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<body>
    <div id="mainBody" class="container-fluid"></div>
</body>
<script type="text/javascript">
$(function(){
    var tableOptions = {
        cells:[
            {text:"列1",field:"c1",click:"cellClick"},
            {text:"列2",field:"c2",display:false},
            {text:"列3",field:"c3"}
        ]};

    var data = {
        success:true,
        message:"success",
        pageSize:10,
        pageNo:1,
        totalSize:3,
        dataRows:[
            {"c1":"aa1","c2":"bb1","c3":"cc1"},
            {"c1":"aa2","c2":"bb2","c3":"cc2"},
            {"c1":"aa2","c2":"bb2","c3":"cc2"},
            {"c1":"aa2","c2":"bb2","c3":"cc2"},
            {"c1":"afdasfdasfdsafdsafdsafa3111","c2":"bb1fdasfdasfdsaidsafdaskfhk skf113","c3":"cc311333dsfdsfdsfdsa11"}
        ]};

    createPage(tableOptions,data);

    function cellClick(src,data){
        alert(JSON.stringify(data));
    }
});
</script>
</html>