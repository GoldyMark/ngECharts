angular.module('ngECharts', [])
.constant('defaultId', 'echart')
.service('ec', ['defaultId','$http', function (defId,$http) {
    this.charts = {};
    this.getInstance = function (id) {
        var chart = this.charts[id ? id : defId];
        return chart ? chart.instance : undefined;
    };
    this.getOption = function(id){
        var chart = this.charts[id ? id : defId];
        return chart ? chart.option : undefined;
    };
    this.clear = function(){
        angular.forEach(this.charts, function(obj,id){
            obj.instance.dispose();
        });
        this.charts = {};
    };
    this.showLoading = function(ids,text,effects){
        if(!arguments.length){
            return;
        }
        var ids = angular.isString(ids) ? [ids] : ids;

        for (var i = 0,len = ids.length; i < len; i++) {
            var chart = this.getInstance(ids[i]);
            if(chart){
                chart.showLoading({
                    text : text || "我奋力Load，Load到没法Load……",
                    textStyle : {fontSize : 24},
                    effect:(function(){
                        var effects = effects || ['spin' , 'bar' , 'whirling' , 'dynamicLine' , 'bubble'],
                            index = parseInt(Math.random()*(effects.length-1));
                        return effects[index];
                    })()
                });
            }
        }
    };
    this.hideLoading = function(ids){
        if(!arguments.length){
            return;
        }
        var ids = angular.isString(ids) ? [ids] : ids;
        for (var i = 0,len = ids.length; i < len; i++) {
            var chart = this.getInstance(ids[i]);
            if(chart){
                chart.hideLoading();
            }
        }
    };
    this.connect = function(){
        if(angular.isArray(arguments[0]) && arguments[0].length < 2){
            return;
        }
        if(!angular.isArray(arguments[0]) && arguments.length < 2){
            return;
        }
        var ids = angular.isArray(arguments[0]) ? arguments[0] : arguments,
            charts = [];
        for (var i = 0,len = ids.length; i < len ; i++){
            charts.push(this.getInstance(ids[i]));
        }

        //将各个chart互相关联
        for (var i = 0,len = charts.length; i < len; i++) {
            var others = [];
            for (var j = 0; j < len; j++){
                if(i != j){
                    others.push(charts[j]);
                }
            }
            charts[i].connect(others);
        }
    };
    this.addMap = function(mapName,mapPath,specialArea){
        echarts.util.mapData.params.params[mapName] = {
            getGeoJson: function (callback) {
                $http.get(mapPath)
                .success(function(data){
                    callback(data);
                });
            }
        };
        if(specialArea){
            chart.util.mapData.params.params[mapName].specialArea = specialArea;
        }
    };
}])
.directive('echarts', ['ec', 'defaultId', function (ec, defId) {
    return {
        restrict: 'EA',
        template:'<div ng-style={height:height,width:width}></div>',
        replace: true,
        scope:{
            option:'=',
            width:'@',
            height:'@'
        },
        link: function(scope, iElement, iAttrs) {
            var ele = iElement[0],
                id = iAttrs.id || defId;
            if(scope.height){
                ele.style.height = scope.height;
            }
            if(scope.width){
                ele.style.width = scope.width;
            }

            function init(){
                if(!ec.charts[id]){
                    ec.charts[id] = {"instance": echarts.init(ele)};
                }
            };

            function update(newOption){
                if(newOption){
                    var option = angular.copy(newOption);
                    option.id = id;

                    ec.charts[id].option = option;
                    // echarts作者@林峰 原话：默认setOption时保存dataZoom状态
                    // 作者语：故update之前需要先clear一下
                    ec.getInstance(id).clear();
                    ec.getInstance(id).setOption(option,true);
                }
            };

            init();

            scope.$watch("option",function(newVal,oldVal){
                update(newVal);
            },true);

            // ng-switch,ng-if会销毁$scope，销毁时需要清空ec
            scope.$on("$destroy",function(){
                ec.clear();
            });
        }
    }
}]);