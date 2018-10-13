﻿//首页事件
function onHomePage() {
	//实时快照
    snashotData();

    authorizationName();
    
    switchToolbar("homeTool");
     myApp.router.navigate("/equipLinkage/")
    //图表
    // $("#purchase_Bar").width(window.screen.width*0.96-20);
    snapshotChart("purchase_Bar");
    equipsChart("purchase_ring");
    ycpChart("purchase_circular");  
    //场景按钮
    commonlyUsedFun("commonlyUsed","25",commonlyUsed);//常用
    VideoBaner("KOvm_container","swiper-paginationTrailer-KOvm",KOvm);//场景
    commonlyUsedFun("pptPattern_container ol","50",pptPattern);//PPT
    commonlyUsedFun("jjPattern_container ol","50",jjPattern);//讲解

}
//界面尺寸变化事件
function onResizeCustomized() {
    if ($(".view-main").attr("data-page") == "Voice") {
        var heightWindow = $(".page-content").height();
        if (heightWindow < 500) {
            $(".voiceDivs").css("height", "100%");
            $(".voiceDivs").css("bottom", "40px");
            $(".voiceDivs").css("position", "relative");
        } else {
            $(".voiceDivs").css("height", "300px");
            $(".voiceDivs").css("bottom", "60px");
            $(".voiceDivs").css("position", "absolute");
        }
    }
}


//授权名称
function authorizationName(){
    var ajaxVar = $.ajax({
        type: "POST",
        url: "/GWService.asmx/GetName2SFService",
        timeout: 5000,
        data: {
            userName: window.localStorage.userName,
        },
        success: function(data) {
            var dt = $(data).find('string').text();
            if(dt) {
                $(".auth_name_get").text(dt);
                window.localStorage.auth_name_title = dt;
            } else {
               tipsInformtion("获取授权名失败,是否退出登陆界面?",exitLogin);
            }
        },
        error: function(e){
            tipsInformtion("获取授权名失败,是否退出登陆界面?",exitLogin);
        }
    });
  
}

//提示窗口
function tipsInformtion(tipsStr,tipsEvent){
        myApp.dialog.create({
        title: "信息提示",
        text: tipsStr,
        buttons: [{
            text: '取消'
        }, {
            text: '确定',
            onClick: function() {
                tipsEvent();
            }
        }]
    }).open();
}


//轮播
function VideoBaner(className,slistName,jsonString) {
    var countTrailer = jsonString.length;
    var xhTrailer = 0;
    for (var i = 0; i < countTrailer; i++) {
        var htmlTrailerChild = "<li class=\"col-25\">" + "<a href=\"#\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\""+jsonString[i].equipNo+"\" set_no=\""+jsonString[i].setNo+"\" onclick=\"setCommand_1(this,"+jsonString[i].value+")\">" + "<i class=\""+jsonString[i].icon+"\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\""+jsonString[i].icon+"\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<img src=\"#\" style=\"display:none;\"></li>";
        if (i % 8 == 0 || i == 0) {
            xhTrailer++;
            var htmlTrailer = "<div class=\"swiper-slide\" dataID='" + xhTrailer + "'>" + "<ul class=\"row\" >" + htmlTrailerChild + "</ul></div>";
            $("."+className+" .swiper-wrapper").append(htmlTrailer);
        } else {
            $("."+className+" .swiper-wrapper .swiper-slide[dataID=" + xhTrailer + "] ul").append(htmlTrailerChild);
        }
    }
     var swiper = new Swiper('.'+className, {
      pagination: {
        el: '.'+slistName,
      },
    });
}


//常用
function commonlyUsedFun(className,classListName,jsonString) {
    $("."+className).html("");
    var countTrailer = jsonString.length;
    var htmlTrailerChild="",xhTrailer = 0;
    for (var i = 0; i < countTrailer; i++) {
        htmlTrailerChild += "<li class=\"col-"+classListName+"\">" + "<a href=\""+jsonString[i].href+"\"  id=\"homeBtn" + (i + 1) + "\" class=\"homeBtn\" set_equip=\""+jsonString[i].equipNo+"\" set_no=\""+jsonString[i].setNo+"\" onclick=\"setCommand_1(this,"+jsonString[i].value+")\">" + "<i class=\""+jsonString[i].icon+"\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>" + "<a href=\"#\"  class=\"homeBtn displayNone\">" + "<i class=\""+jsonString[i].icon+"\"></i>" + "<p class=\"p-ellipsis1\">" + jsonString[i].name + "</p>" + "</a>"+"</li>";
    }
    $("."+className).append(htmlTrailerChild);
}

//实时快照

function snashotData() {
    var event_Level_list_home,btnInfoNames_home=[],btnInfoLevels_home=[];
    $.ajax({
        type: 'post', 
        url: '/api/event/alarm_config',
        headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
            },
        data: {},
        success: function(dt) {
            if(dt.HttpStatus == 200 && dt.HttpData.data) {
                var resultData = dt.HttpData.data;
                var strData = "";
                for(var i = 0; i < resultData.length; i++) {
                    if(resultData[i].IsShow == 1) {
                        var btnStatus = resultData[i].IsShow == 1 ? true : false;
                        var btnValue = [];
                        for(var j = resultData[i].SnapshotLevelMin; j <= resultData[i].SnapshotLevelMax; j++) {
                            btnValue += j + ",";
                        }
                        event_Level_list_home += btnValue;
                        btnValue = btnValue.substring(0, btnValue.length - 1);
                        btnInfoNames_home.push(resultData[i].SnapshotName)
                        btnInfoLevels_home.push(btnValue);
                    }
                }snashotCount(btnInfoLevels_home);
                // event_Level_list_home = event_Level_list_home.substring(0, event_Level_list_home.length - 1);
                // getRealTimeEventCount();
            }
        }
    });
}
function snashotCount(btnInfoLevels_home){
    var strBtnInfoLevels = "";
    for(var i = 0; i < btnInfoLevels_home.length; i++) {
        strBtnInfoLevels += btnInfoLevels_home[i] + ";";
    }
    if(strBtnInfoLevels.length > 0) {
        strBtnInfoLevels = strBtnInfoLevels.substring(0, strBtnInfoLevels.length - 1);
        $.ajax({
            type: 'post',
            url: '/api/event/real_evt_count',
             headers: {
                Authorization: window.localStorage.ac_appkey + '-' + window.localStorage.ac_infokey //签名由getkey接口获取
            },
            data: {
                levels: strBtnInfoLevels
            },
            success: function(dt) {
                if(dt.HttpStatus == 200 && dt.HttpData.data) {
                    var resultData = dt.HttpData.data;
                    var resultDataArr = resultData.toString().split(",");
                    for(var i = 0;i<resultDataArr.length;i++)
                     $(".statisticsTable span:eq("+i+")").find("p").text(resultDataArr[i]);
                }
            }
        });
    }
}