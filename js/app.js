'use strict';

angular.module('myApp', ['ngECharts'])
.controller('myCtrl', ['$scope','$timeout', 'ec', function($scope,$timeout,ec){
    $scope.option1 = {
        tooltip: {show: true},
        legend: {data:['销量']},
        xAxis : [{
            type : 'category',
            data : ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        }],
        yAxis : [{type : 'value'}],
        series : [{
            "name":"销量",
            "type":"bar",
            "data":[5, 20, 40, 10, 10, 20]
        }]
    };

    $scope.option2 = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        calculable : true,
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', 225],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            }
        ]
    };

    $scope.option3 = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {type: 'shadow'}
        },
        legend: {
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        toolbox: {
            show : true,
            orient : 'vertical',
            y : 'center',
            feature : {
                mark : {show: true},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [{
            type : 'category',
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }],
        yAxis : [{
            type : 'value',
            splitArea : {show : true}
        }],
        grid: {x2:40},
        series : [{
            name:'直接访问',
            type:'bar',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },{
            name:'邮件营销',
            type:'bar',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },{
            name:'联盟广告',
            type:'bar',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },{
            name:'视频广告',
            type:'bar',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },{
            name:'搜索引擎',
            type:'bar',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }]
    };

    $scope.option4 = {
        title: {
            text:'广东省佛山市能见度',
            subtext:'模拟数据',
            x:'center'
        },
        toolbox:{
            show:true,
            orient:"vertical",
            x:"right",
            y:"center",
            feature:{
                mark:{show:true},
                dataView:{show:false},
                dataZoom:{show:false},
                magicType:{show:false},
                restore:{show:true},
                saveAsImage:{show:true}
            }
        },
        tooltip : {
            trigger: 'item',
            formatter:function(params){
                var res = params.name;
                var _value = params.value;
                if(angular.isNumber(_value)){
                    res += '：' + _value.toFixed(1) + ' KM';
                }
                return res;
            }
        },
        legend:{
            show:true,
            y:50,
            data:["禅城","南海","三水","顺德","高明"]
        },
        dataRange: {
            min : 0,
            max: 15,
            text:["高","低"],
            calculable : true,
            color: ["lightgreen","yellow","orange","red"],
            formatter:function(value){
                if(value == 15 || value == 0){
                    return parseInt(value);
                }
                return parseFloat(value).toFixed(1);
            }
        },
        roamController:{
            show:true,
            x:"right",
            mapTypeControl:{"FS":true}
        },
        series : [{
            name:"佛山",
            type:"map",
            mapType:"FS",
            showLegendSymbol:false,
            hoverable:false,
            mapLocation:{"y":90},
            tooltip:{"show":false},
            itemStyle:{
                normal:{
                    label:{"show":true},
                    color:"#CCC",
                    borderWidth:1,
                    borderColor:"#CCC"
                },
                emphasis:{label:{"show":true}}
            },
            data:[]
        },{
            name:"禅城",
            type:"map",
            mapType:"FS",
            showLegendSymbol:false,
            mapValuePrecision:1,
            itemStyle:{
                normal:{
                    label:{"show":true},
                    color:"#FFCCCC",
                    borderWidth:1,
                    borderColor:"#CCC"
                },
                emphasis:{label:{"show":true}}
            },
            markPoint:{
                symbolSize:15,
                itemStyle:{
                    normal:{
                        borderColor: "#87CEFA",
                        borderWidth: 1,
                        label:{
                            show:true,
                            textStyle:{"color":"#666"}
                        }
                    },
                    emphasis:{
                        borderColor: "#1E90FF",
                        borderWidth:2,
                        label:{"show":true}
                    }
                },
                data:[{name:"禅城",value:12.0}]
            },
            data:[{"name":"禅城区","value":"-"}],
            geoCoord:{"禅城":{x:113.06,y:23.01}}
        },{
            name:"南海",
            type:"map",
            mapType:"FS",
            showLegendSymbol:false,
            itemStyle:{
                normal:{
                    label:{"show":true},
                    color:"#CCFFFF",
                    borderWidth:1,
                    borderColor:"#CCC"
                },
                emphasis:{
                    label:{"show":true}
                }
            },
            markPoint:{
                symbolSize:20,
                itemStyle:{
                    normal:{
                        borderColor: "#87CEFA",
                        borderWidth: 1,
                        label:{
                            show:true,
                            textStyle:{"color":"#666"}
                        }
                    },
                    emphasis:{
                        borderColor: "#1E90FF",
                        borderWidth:2,
                        label:{"show":true}
                    }
                },
                data:[{name:"南海",value:8.5}]
            },
            data:[{"name":"南海区","value":"-"}],
            geoCoord:{"南海":{x:113.04,y:23.11}}
        },{
            name:"三水",
            type:"map",
            mapType:"FS",
            showLegendSymbol:false,
            itemStyle:{
                normal:{
                    label:{"show":true},
                    color:"#CCFF99",
                    borderWidth:1,
                    borderColor:"#CCC"
                },
                emphasis:{
                    label:{"show":true}
                }
            },
            markPoint:{
                symbolSize:20,
                itemStyle:{
                    normal:{
                        borderColor: "#87CEFA",
                        borderWidth: 1,
                        label:{
                            show:true,
                            textStyle:{"color":"#666"}
                        }
                    },
                    emphasis:{
                        borderColor: "#1E90FF",
                        borderWidth:2,
                        label:{"show":true}
                    }
                },
                data:[{name:"三水",value:5.9}]
            },
            data:[{"name":"三水区","value":"-"}],
            geoCoord:{"三水":{x:112.92,y:23.31}}
        },{
            name:"顺德",
            type:"map",
            mapType:"FS",
            showLegendSymbol:false,
            itemStyle:{
                normal:{
                    label:{"show":true},
                    color:"#FFCCFF",
                    borderWidth:1,
                    borderColor:"#CCC"
                },
                emphasis:{
                    label:{"show":true}
                }
            },
            markPoint:{
                symbolSize:15,
                itemStyle:{
                    normal:{
                        borderColor: "#87CEFA",
                        borderWidth: 1,
                        label:{
                            show:true,
                            textStyle:{"color":"#666"}
                        }
                    },
                    emphasis:{
                        borderColor: "#1E90FF",
                        borderWidth:2,
                        label:{"show":true}
                    }
                },
                data:[{name:"顺德",value:15.0}]
            },
            data:[{"name":"顺德区","value":"-"}],
            geoCoord:{"顺德":{x:113.19,y:22.81}}
        },{
            name:"高明",
            type:"map",
            mapType:"FS",
            showLegendSymbol:false,
            itemStyle:{
                normal:{
                    label:{"show":true},
                    color:"#FFCC99",
                    borderWidth:1,
                    borderColor:"#CCC"
                },
                emphasis:{
                    label:{"show":true}
                }
            },
            markPoint:{
                symbolSize:25,
                itemStyle:{
                    normal:{
                        borderColor: "#87CEFA",
                        borderWidth: 1,
                        label:{
                            show:true,
                            textStyle:{"color":"#666"}
                        }
                    },
                    emphasis:{
                        borderColor: "#1E90FF",
                        borderWidth:2,
                        label:{"show":true}
                    }
                },
                data:[{name:"高明",value:2.7}]
            },
            data:[{"name":"高明区","value":"-"}],
            geoCoord:{"高明":{x:112.73,y:22.84}}
        }]
    };

    $timeout(function(){
        ec.showLoading(['chart1','chart2','chart3','chart4']);
        ec.connect(['chart2','chart3']);
    });

    $timeout(function(){
        ec.hideLoading('chart1');
    },1000);

    $timeout(function(){
        ec.hideLoading(['chart2','chart3']);
    },2500);

    $timeout(function(){
        ec.hideLoading('chart4');
    },3500);

    ec.addMap("FS","data/fs.json");
}]);