//  ┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  │ ├─┤├┤ │││├┤
//  ┴ ┴ ┴└─┘┴ ┴└─┘
// Set theme based on Configurations and Preferences

const bilibili_danmu_btnToggle = document.querySelector('#bilibili_danmu_btn');
// var tencent_url = document.getElementById("#tencent_url_txt").value;
// var tencent_url = document.getElementById("tencent_url_txt").value;
// var url_name = $("#tencent_url_txt").val();
var roomid = '';

bilibili_danmu_btnToggle.addEventListener('click', () => {
    roomid = document.getElementById("bilibili_roomid_txt").value;
    // var url_name = document.getElementById("tencent_url_txt").value;
    console.log(roomid);
    find();
    an6();
    an5();
    listIdF();
    an4();
    an2();
    an3();
    an1();
    setInterval(find,30000);//1000表示1秒
    setInterval(an6,20000);//1000表示1秒
    setInterval(an5,70000);//1000表示1秒
    setInterval(listIdF,20000);//1000表示1秒
    setInterval(an4,70000);//1000表示1秒
    setInterval(an2,70000);//1000表示1秒
    setInterval(an3,60000);//1000表示1秒
    setInterval(an1,60000);//1000表示1秒
});
//<!--词云-->
function find(){
    //var roomid = $("#roomid").val();
    $.ajax({
        type: 'GET',
        data:{"roomid":roomid},
        url: "http://127.0.0.1:5000/find",
        dataType: 'json',
        success: function(data){
            if (data['picpath'].length>5){
            //var findId=document.getElementById("findId");
            ///findId.style.background="url(../"+data['picpath']+") ";
            $(".amiddboxttop_map").css("background-image","url(http://127.0.0.1/static/roomidimg/"+data['picpath']+")");
            }
            
        }
    });
}


//<!--爬取弹幕-->

function an6(){
    //var roomid = $("#roomid").val();
    $.ajax({
        type: 'GET',
        data:{"roomid":roomid},
        url: "http://127.0.0.1:5000/analyze6",
        dataType: 'json',
        success: function(data){
        
        }
    });
}



//<!--数字信息-->

function an5(){
    //var roomid = $("#roomid").val();
    $.ajax({
        type: 'GET',
        data:{"roomid":roomid},
        url: "http://127.0.0.1:5000/analyze5",
        dataType: 'json',
        success: function(data){
        
        document.getElementById("d51").innerHTML=''+data['d51'];
        document.getElementById("d52").innerHTML=''+data['d52'];
        document.getElementById("d53").innerHTML=''+data['d53'];
        document.getElementById("d54").innerHTML=''+data['d54'];
        document.getElementById("uid").innerHTML='UP主数据(uid:'+data['uid']+")";
        }
    });
}



//<!--弹幕列表-->

function listIdF(){
        //var roomid = $("#roomid").val();
        var listId = document.getElementById("listId");
    $.ajax({
        type: 'GET',
        data:{"roomid":roomid},
        url: "http://127.0.0.1:5000/alldata",
        dataType: 'json',
        success: function(data){
        document.getElementById("listDateId").innerHTML='时间段：'+data['d1'];
        var text ='';
        
        for(var i=0;i<data['d2'].length;i++){
                tem_list = data['d2'][i].split("*");
                text=text+'<li class="bg">'
                +'<p class="fl"><b>'+tem_list[1]+'</b><br>'+tem_list[2]+'<br>'
                +'</p>'
                +'<p class="fr pt17">'+tem_list[0]+'</p>'
                +'</li>';
        }
        listId.innerHTML=text;
        
        } 
    });
}



//<!--关键字抽取-->

function an4(){
    //var roomid = $("#roomid").val();
    var listId = document.getElementById("listId");
    $.ajax({
    type: 'GET',
    data:{"roomid":roomid},
    url: "http://127.0.0.1:5000/analyze4",
    dataType: 'json',
    success: function(data){
        
        document.getElementById("d4").innerHTML='时间：'+data['d1'];
    var myChart = echarts.init(document.getElementById('aleftboxtmidd'));
    option = {
        color:['#76c4bf','#e5ffc7','#508097','#4d72d9'],
        backgroundColor: 'rgba(1,202,217,.2)',
        grid: {
                                        left:10,
                                        right:40,
                                        top:20,
                                        bottom:0,
                    containLabel: true
                                    },
                    // legend: {
                    //     x : 'center',
                    //     y : '70%',
                    //     textStyle:{
                    //       fontSize: 10,
                    //       color:'rgba(255,255,255,.7)'
                    //     },
                    //     data:['康定市','丹巴县','甘孜县','理塘县']
                    // },
                    calculable : true,
                    series : [

                        {
                            name:'面积模式',
                            type:'pie',
                            radius : [5, 60],
                            center : ['50%', '55%'],
                            roseType : 'area',
                            data:data['d2']

                        }
                    ]
                };
                myChart.setOption(option);
        } 
    });
}



//<!--情感判断分析-->

function an2(){
//var roomid = $("#roomid").val();
$.ajax({
    type: 'GET',
    data:{"roomid":roomid},
    url: "http://127.0.0.1:5000/analyze2",
    dataType: 'json',
    success: function(data){
    
    document.getElementById("d2").innerHTML='时间：'+data['d1'];
    var myChart = echarts.init(document.getElementById('aleftboxtbott'));
    option = {
        color:['#7ecef4'],
        backgroundColor: 'rgba(1,202,217,.2)',
        grid: {
                                        left:20,
                                        right:20,
                                        top:13,
                                        bottom:6,
                    containLabel: true
                                    },

                xAxis: {
                    type: 'value',
                    axisLine:{
                    lineStyle:{
                        color:'rgba(255,255,255,.2)'
                    }
                    },
                    splitLine:{
                    lineStyle:{
                        color:'rgba(255,255,255,0)'
                    }
                    },
                    axisLabel:{
                        color:"rgba(255,255,255,0)"
                    },
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    axisLine:{
                    lineStyle:{
                        color:'rgba(255,255,255,.5)'
                    }
                    },
                    splitLine:{
                    lineStyle:{
                        color:'rgba(255,255,255,.1)'
                    }
                    },
                    axisLabel:{
                        color:"rgba(255,255,255,.5)"
                    },
                    data: ['正面情绪','负面情绪']
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        barWidth :30,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    1, 0, 0, 1,
                                    [
                                        {offset: 0, color: 'rgba(230,253,139,.7)'},
                                        {offset: 1, color: 'rgba(41,220,205,.7)'}
                                    ]
                                )
                            }
                        },
                        data: data['d2']
                    }
                ]
            };
    myChart.setOption(option);
    } 
    });
}



//<!--高频词统计分析-->
function an3(){
    //var roomid = $("#roomid").val();
    $.ajax({
    type: 'GET',
    data:{"roomid":roomid},
    url: "http://127.0.0.1:5000/analyze3",
    dataType: 'json',
    success: function(data){
        var myChart = echarts.init(document.getElementById('pleftbox2bott_cont'));
        option = {
        color:['#7ecef4'],
            backgroundColor: 'rgba(1,202,217,.2)',
            grid: {
                                            left:40,
                                            right:20,
                                            top:30,
                                            bottom:0,
                    containLabel: true
                                        },

                xAxis: {
                    type: 'value',
                    axisLine:{
                        lineStyle:{
                        color:'rgba(255,255,255,0)'
                        }
                    },
                    splitLine:{
                        lineStyle:{
                        color:'rgba(255,255,255,0)'
                        }
                    },
                    axisLabel:{
                        color:"rgba(255,255,255,0)"
                    },
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    axisLine:{
                        lineStyle:{
                        color:'rgba(255,255,255,.5)'
                        }
                    },
                    splitLine:{
                        lineStyle:{
                        color:'rgba(255,255,255,.1)'
                        }
                    },
                    axisLabel:{
                        color:"rgba(255,255,255,.5)"
                    },
                    data: data[0]
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        barWidth :20,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    1, 0, 0, 1,
                                    [
                                        {offset: 0, color: 'rgba(230,253,139,.7)'},
                                        {offset: 1, color: 'rgba(41,220,205,.7)'}
                                    ]
                                )
                            }
                        },
                        data: data[1]
                    }
                ]
            };
        myChart.setOption(option);
        } 
        });
    }



//<!--不同时间点评论数分析-->

function an1(){
//var roomid = $("#roomid").val();
$.ajax({
    type: 'GET',
    data:{"roomid":roomid},
    url: "http://127.0.0.1:5000/analyze1",
    dataType: 'json',
    success: function(data){
    
    document.getElementById("d1").innerHTML='时间：'+data['d1'];
        var myChart = echarts.init(document.getElementById('arightboxbott'));
option = {
    color:['#7de494','#7fd7b1', '#5578cf', '#5ebbeb', '#d16ad8','#f8e19a',  '#00b7ee', '#81dabe','#5fc5ce'],
    backgroundColor: 'rgba(1,202,217,.2)',

    grid: {
        left: '5%',
        right: '8%',
        bottom: '7%',
        top:'8%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine:{
            lineStyle:{
            color:'rgba(255,255,255,.2)'
            }
        },
        splitLine:{
            lineStyle:{
            color:'rgba(255,255,255,.1)'
            }
        },
        axisLabel:{
            color:"rgba(255,255,255,.7)"
        },
        data: data['name']
    },
    yAxis: {
        type: 'value',
        axisLine:{
            lineStyle:{
            color:'rgba(255,255,255,.2)'
            }
        },
        splitLine:{
            lineStyle:{
            color:'rgba(255,255,255,.1)'
            }
        },
        axisLabel:{
            color:"rgba(255,255,255,.7)"
        },
    },
    series: [
        {
            name:'2014年',
            type:'line',
            stack: '总量',
                areaStyle: {normal: {}},
            data:data['value']
        }

    ]
    };
myChart.setOption(option);
    
    } 
});
}

