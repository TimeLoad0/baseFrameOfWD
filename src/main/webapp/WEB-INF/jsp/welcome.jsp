<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<body>
<div id="mainBody" class="container-fluid"></div>
</body>
<script type="text/javascript">
$(function(){
    var accountStatuss = [
        {"accessLevel":"1","dictEntry":"10118","dictPrompt":"正常","dictType":"1","organCode":"800000","subEntry":"0","tableColumn":"AccountStatus"},
        {"accessLevel":"1","dictEntry":"10118","dictPrompt":"冻结","dictType":"1","organCode":"800000","subEntry":"1","tableColumn":"AccountStatus"},
        {"accessLevel":"1","dictEntry":"10118","dictPrompt":"挂失","dictType":"1","organCode":"800000","subEntry":"2","tableColumn":"AccountStatus"},
        {"accessLevel":"1","dictEntry":"10118","dictPrompt":"销户","dictType":"1","organCode":"800000","subEntry":"3","tableColumn":"AccountStatus"}
    ];

    var assetProps = [
        {"accessLevel":"1","dictEntry":"10138","dictPrompt":"普通交易资金","dictType":"1","organCode":"800000","subEntry":"0","tableColumn":"AssetProp"},
        {"accessLevel":"1","dictEntry":"10138","dictPrompt":"信用交易资金","dictType":"1","organCode":"800000","subEntry":"7","tableColumn":"AssetProp"},
        {"accessLevel":"1","dictEntry":"10138","dictPrompt":"信用专户资金","dictType":"1","organCode":"800000","subEntry":"8","tableColumn":"AssetProp"},
        {"accessLevel":"1","dictEntry":"10138","dictPrompt":"期货交易资金","dictType":"1","organCode":"800000","subEntry":"9","tableColumn":"AssetProp"},
        {"accessLevel":"1","dictEntry":"10138","dictPrompt":"期权交易资金","dictType":"1","organCode":"800000","subEntry":"B","tableColumn":"AssetProp"},
        {"accessLevel":"1","dictEntry":"10138","dictPrompt":"黄金交易资金","dictType":"1","organCode":"800000","subEntry":"D","tableColumn":"AssetProp"}
    ];

    var orgs = [
        {"address":" ","contactPerson":" ","contactTel":" ","createdDate":"1502784646000","email":" ","modifiedDate":"1508981172000","operator":" ","organCode":"704041011","organName":"华泰证券","organType":"11","reMarks":"123"},
        {"address":" ","contactPerson":" ","contactTel":" ","createdDate":"1506494940000","email":" ","modifiedDate":"1506494940000","operator":" ","organCode":"123456789","organName":"测试","organType":"11","reMarks":""},
        {"address":" ","contactPerson":" ","contactTel":" ","createdDate":"1508743374000","email":" ","modifiedDate":"1508744766000","operator":" ","organCode":"704041012","organName":"测试12","organType":"10","reMarks":""},
        {"address":" ","contactPerson":" ","contactTel":" ","createdDate":"1508743490000","email":" ","modifiedDate":"1508744416000","operator":" ","organCode":"704041013","organName":"测试11","organType":"11","reMarks":"3"},
        {"address":"","contactPerson":"","contactTel":"","createdDate":"1510888178000","email":"","modifiedDate":"1510888178000","operator":"optimus1","organCode":"674362712","organName":"testo","organType":"11","reMarks":""},
        {"address":"","contactPerson":"","contactTel":"","createdDate":"1512026444000","email":"","modifiedDate":"1512026444000","operator":"optimus1","organCode":"700098832","organName":"测试公司","organType":"11","reMarks":""},
        {"address":"","contactPerson":"","contactTel":"","createdDate":"1512107086000","email":"","modifiedDate":"1512107086000","operator":"optimus1","organCode":"789192012","organName":"测试个人公司","organType":"10","reMarks":""},
        {"address":"","contactPerson":"","contactTel":"","createdDate":"1514272341000","email":"","modifiedDate":"1514272341000","operator":"optimus1","organCode":"123213212","organName":"test12321","organType":"10","reMarks":""},
        {"address":"","contactPerson":"","contactTel":"","createdDate":"1514272572000","email":"","modifiedDate":"1514272572000","operator":"masteradmin","organCode":"123321212","organName":"test0921oea","organType":"10","reMarks":""},
        {"address":"","contactPerson":"","contactTel":"","createdDate":"1514274378000","email":"","modifiedDate":"1514274378000","operator":"masteradmin","organCode":"123321123","organName":"test323","organType":"10","reMarks":""},
        {"address":"","contactPerson":"","contactTel":"","createdDate":"1514878178000","email":"","modifiedDate":"1514878178000","operator":"masteradmin","organCode":"098213212","organName":"测试机构","organType":"11","reMarks":""}
    ];

    var tradingAccountTypes = [{"accessLevel":"1","dictEntry":"10106","dictPrompt":"普通","dictType":"1","organCode":"800000","subEntry":"10","tableColumn":"TradingAccountType"}];

    var dataRows = [
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860012B","createdDate":"1505457055000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698825000","organCode":"704041011","productAccount":"860012","reMarks":"","registerDate":"1509698825000","tradingAccount":"860012B4","tradingAccountName":"组合B4","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860011A","createdDate":"1505459728000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698821000","organCode":"704041011","productAccount":"860011","reMarks":"","registerDate":"1509698821000","tradingAccount":"860011A2","tradingAccountName":"组合A2","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"1","actpermissionstr":"","actrestrictionstr":"","assetAccount":"assetAccount","createdDate":"1505956359000","investorAccount":"1","isEdit":"true","modifiedDate":"1505956359000","organCode":"704041011","productAccount":"productAccount","reMarks":"","registerDate":"1505956359000","tradingAccount":"123","tradingAccountName":"213213","tradingAccountType":"10"},
        {"AssetProp":"8","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"666","createdDate":"1505956384000","investorAccount":"1","isEdit":"true","modifiedDate":"1505956384000","organCode":"704041011","productAccount":"2","reMarks":"","registerDate":"1505956384000","tradingAccount":"as123","tradingAccountName":"21321","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860013C","createdDate":"1506316536000","investorAccount":"1","isEdit":"true","modifiedDate":"1507624966000","organCode":"704041011","productAccount":"860013","reMarks":"","registerDate":"1507624966000","tradingAccount":"test","tradingAccountName":"test","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"zccs003","createdDate":"1506579276000","investorAccount":"jgcs001","isEdit":"true","modifiedDate":"1510303964000","organCode":"123456789","productAccount":"cpcs002","reMarks":"12321","registerDate":"1510303964000","tradingAccount":"jycs004","tradingAccountName":"交易测试","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"bccs003","createdDate":"1507542985000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1508483367000","organCode":"704041011","productAccount":"bccs002","reMarks":"1213213","registerDate":"1508483367000","tradingAccount":"bccs004","tradingAccountName":"bccs004","tradingAccountType":"10"},
        {"AssetProp":"7","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"zccs05","createdDate":"1508723091000","investorAccount":"tzzcs05","isEdit":"true","modifiedDate":"1509066583000","organCode":"704041011","productAccount":"cpcs05","reMarks":"大12321","registerDate":"1509066583000","tradingAccount":"jycs05","tradingAccountName":"交易测试05","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"zccs05","createdDate":"1509503534000","investorAccount":"tzzcs05","isEdit":"true","modifiedDate":"1509503534000","organCode":"704041011","productAccount":"cpcs05","reMarks":"","registerDate":"1509503534000","tradingAccount":"jycs111","tradingAccountName":"交易测试111","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"83201","createdDate":"1509698759000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698818000","organCode":"704041011","productAccount":"830002","reMarks":"","registerDate":"1509698818000","tradingAccount":"3201a","tradingAccountName":"","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860011A","createdDate":"1509698773000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698822000","organCode":"704041011","productAccount":"860011","reMarks":"","registerDate":"1509698822000","tradingAccount":"860011A3","tradingAccountName":"组合A3","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860011A","createdDate":"1509698773000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698822000","organCode":"704041011","productAccount":"860011","reMarks":"","registerDate":"1509698822000","tradingAccount":"860011A4","tradingAccountName":"组合A4","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860012B","createdDate":"1509698797000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698824000","organCode":"704041011","productAccount":"860012","reMarks":"","registerDate":"1509698824000","tradingAccount":"860012B2","tradingAccountName":"组合B2","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860012B","createdDate":"1509698798000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698824000","organCode":"704041011","productAccount":"860012","reMarks":"","registerDate":"1509698824000","tradingAccount":"860012B3","tradingAccountName":"组合B3","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860013C","createdDate":"1509698800000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698826000","organCode":"704041011","productAccount":"860013","reMarks":"","registerDate":"1509698826000","tradingAccount":"860013C2","tradingAccountName":"组合C2","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860013C","createdDate":"fdasfdasfd","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698827000","organCode":"704041011","productAccount":"860013","reMarks":"","registerDate":"1509698827000","tradingAccount":"860013C3","tradingAccountName":"组合C3","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"860013C","createdDate":"1509698801000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698827000","organCode":"704041011","productAccount":"860013","reMarks":"","registerDate":"1509698827000","tradingAccount":"860013C4","tradingAccountName":"组合C4","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"8320100","createdDate":"1509698829000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698829000","organCode":"704041011","productAccount":"83201","reMarks":"","registerDate":"1509698829000","tradingAccount":"83201","tradingAccountName":"缺省组合","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"8320200","createdDate":"1509698830000","investorAccount":"bccs001","isEdit":"true","modifiedDate":"1509698830000","organCode":"704041011","productAccount":"83202","reMarks":"","registerDate":"1509698830000","tradingAccount":"83202","tradingAccountName":"缺省组合","tradingAccountType":"10"},
        {"AssetProp":"0","accountStatus":"0","actpermissionstr":"","actrestrictionstr":"","assetAccount":"8320300","createdDate":"1509698830000","investorAccount":"bccs001", "isEdit":"true","modifiedDate":"1509698830000","organCode":"704041011","productAccount":"83203","reMarks":"","registerDate":"1509698830000", "tradingAccount":"83203","tradingAccountName":"缺省组合","tradingAccountType":"10"}
    ];

    var tableOptions = {
        combineSearch:true,
        add:true,
        exportData:true,
        cells:[
            {text:"账户编号",field:"tradingAccount",type:"text",search:true,click:"cellClick"},
            {text:"账户名称",field:"tradingAccountName",type:"text",search:true,display:false},
            {text:"组织机构",field:"organCode",type:"select",search:true,selectOptions:orgs,key:"organCode",view:"organName"},
            {text:"投资者账户",field:"investorAccount",type:"text",search:true},
            {text:"产品账户",field:"productAccount",type:"text",search:true},
            {text:"资产账户",field:"assetAccount",type:"text",search:true},
            {text:"账户类型",field:"tradingAccountType",type:"select",search:true,selectOptions:tradingAccountTypes,key:"subEntry",view:"dictPrompt"},
            {text:"资产属性",field:"AssetProp",type:"select",search:true,selectOptions:assetProps,key:"subEntry",view:"dictPrompt"},
            {text:"账户状态",field:"accountStatus",type:"select",search:true,selectOptions:accountStatuss,key:"subEntry",view:"dictPrompt"},
            {text:"创建时间",field:"createdDate",type:"datetime",format:"datetime",search:true}
        ]};

    var data = {
        success:true,
        message:"success",
        pageSize:20,
        pageNo:1,
        totalSize:23,
        dataRows:dataRows
    };

    createPage(tableOptions,data);
});

function cellClick(src){
    alert(JSON.stringify($(src).parent().attr("rowData")));
}

function search_onclick(){
    showAlert($('#search_form').serializeArray(),null,null,"info");
}
</script>
</html>