﻿
var AlarmCenterContext = {

    projectName: "AlarmCenter",
    //单个设备实时状态
    getYCStatus: function (equipno, ycno) {
        return this.get("/api/DataCenter/YCStatus?equipno="+equipno+"&ycno="+ycno);
    },
     //获取指定设备所有状态
    getAllYCStatus: function (equipno) {
        return this.get("/api/DataCenter/YCStatus?equipno="+equipno)
    },
     //获取设备的当前状态
    getEquipById: function (equipno) {
        return this.get("/api/DataCenter/EquipStatus?equipno="+equipno);
    },
     //设置命令
    setCommand: function (equipno,set_no) {
        return this.post("/api/DataCenter/SetParmControl",{equipno: equipno,set_no: set_no});
    }, 
     //设置命令-需要传值
    setCommandValue: function (equipno,set_no,value) {
        return this.post("/api/DataCenter/SetParmControl",{data:{equipno: equipno,set_no: set_no,value:value}});
    }, 
    /*获取设备列表*/
    getEquipList:function (){
  		return this.post("/GWService.asmx/EquipItemList",{},null);
    },
    /*获取设备事件*/
    getEquipEvent:function(equipno,start,end){
    	
    },
    /*获取设置事件*/
    getSetEvent:function(equipno,start,end){
    	
    },
    /*获取系统事件*/
    getSysEvent:function(start,end){
    	
    },
    /*获取系统配置*/
    getSysSet:function(tabType,equipno){
   	
    },
    /*获取资产列表*/
    getAccess:function(){
    	return this.post("/api/GWServiceWebAPI/get_GWZiChanTableData",{getDataTable:""},null);
    },
    /*获取预案号列表*/
    getPlan:function(){
    	return this.post("/api/GWServiceWebAPI/get_PlanData",{getDataTable:""});
    },
    /*获取报警方式列表*/
    getAlarmWay:function(){
    	return this.post("/api/GWServiceWebAPI/get_AlarmProcData",{getDataTable:""});
    },
    /*获取关联视频列表*/
    getLinkVideo:function(){
    	return this.post("/api/GWServiceWebAPI/get_VideoInfoData",{getDataTable:""});
    },
    /*设备配置多个*/
    setEquipConfig:function(data){
    	return this.post("/api/real/get_equip",{equip_nos:data},null);
    },
    /*遥测配置多个*/
    setYcConfig:function(data){
    	return this.post("/api/real/get_ycp",{equip_nos:data});
    },
    /*遥信配置多个*/
    setYxConfig:function(data){
    	return this.post("/api/real/get_yxp",{equip_nos:data});
    },
 	/*设置配置多个*/
 	setSetConfig:function(data){
    	return this.post("/api/real/get_setparm",{equip_nos:data });
    },
    setYcConfigSingle:function(equipNo,ycpNo){
//  	console.log(equipNo,ycpNo)
    	return this.post("/api/real/get_ycp_single",{equip_no:equipNo,ycp_no:ycpNo });
    },
    setYxConfigSingle:function(equipNo,yxpNo){
    	return this.post("/api/real/get_yxp_single",{equip_no:equipNo,yxp_no:yxpNo });
    },
    setSetConfigSingle:function(equipNo,setNo){
    	return this.post("/api/real/get_setparm_single",{equip_no:equipNo,set_no:setNo });
    },
    updEquipConfig:function(data){
    	return this.post("/api/real/update_equip",{update:data});
    },
    updYcConfig:function(data){
    	return this.post("/api/real/update_ycp",{update:data});
    },
    updYxConfig:function(data){
    	return this.post("/api/real/update_yxp",{update:data});
    },
    updSetConfig:function(data){
    	return this.post("/api/real/update_setparm",{update:data});
    },
    
    
    get: function (url, data) {
        var i = $.Deferred();
        $.ajax({
            url: url,
            data: data,
            type: "GET",
            // headers: headers,
            // contentType: "application/json; charset=UTF-8",
            dataType: "JSON",
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
            },             
            timeout: 3e4,
            success: function (e) {
                i.resolveWith(this, [e])
            },
            error: function (e, n) {
                i.rejectWith(this, ["网络异常，请稍候重试"])
                    
            }
        });
        return i.promise()
    },
    post: function (url, data) {
        var i = $.Deferred();
        return $.ajax({
            url: url,
            data: data,
            type: "POST",
            headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey,
            },              
			//contentType: "application/json;charset=UTF-8",
            timeout: 3e4,
            success: function (e) {
                i.resolveWith(this, [e])
            },
            error: function (e, n) {
                i.rejectWith(this, ["网络异常，请稍候重试"])
                 
            }
        }), i.promise();
    }
}

// 示例
// $.when(AlarmCenterContext.getYCStatus(1,1)).done(function(n,l){
//   console.log(n);
// }).fail(function(e){

// });
