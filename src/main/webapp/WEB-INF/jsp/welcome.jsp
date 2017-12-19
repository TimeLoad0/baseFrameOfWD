<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<body>
    <div id="mainBody" class="container-fluid"></div>
</body>
<script type="text/javascript">
$(function(){
    var tests = [{"key":"1","view":"test"},{"key":"2","view":"while"},{"key":"3","view":"victory"}];

    var tableOptions = {
        combineSearch:true,
        add:true,
        exportData:true,
        cells:[
            {text:"列1",field:"c1",type:"text",search:true,click:"cellClick"},
            {text:"列2",field:"c2",type:"datetime",search:true,display:false},
            {text:"列3",field:"c3",type:"select",search:true,selectOptions:tests,key:"key",view:"view"},
            {text:"列4",field:"c4",type:"text",search:true},
            {text:"列4",field:"c4",type:"text",search:true},
            {text:"列4",field:"c4",type:"text",search:true},
            {text:"列4",field:"c4",type:"text",search:true},
            {text:"列5",field:"c5",type:"text",search:true}
        ]};

    var data = {
        success:true,
        message:"success",
        pageSize:10,
        pageNo:1,
        totalSize:3,
        dataRows:[
            {"c1":"aa1","c2":"bb1","c3":"1","c4":"1","c5":"1"},
            {"c1":"aa2","c2":"bb2","c3":"2"},
            {"c1":"aa2","c2":"bb2","c3":"3"},
            {"c1":"aa2","c2":"bb2","c3":"3"},
            {"c1":"afdasfdasfdsafdsafdsafa3111","c2":"bb1fdasfdasfdsaidsafdaskfhk skf113","c3":"4","view":"viewtest"}
        ]};

    createPage(tableOptions,data);

    function cellClick(src,data){
        alert(JSON.stringify(data));
    }
});
</script>
</html>