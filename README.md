#ngECharts

Baidu ECharts(http://echarts.baidu.com) 的AngularJS封装包。

## 说明：
1. 本插件受https://github.com/violet-day/angular-echarts 启发，本着学习AngularJS而写；
2. 封装了echarts的**showLoading**, **hideLoading**, **connect**和**添加自定义地图的方法**；

## 其他Baidu ECharts的AngularJS插件，以供参考（收录日期：2015年2月26日）
- https://github.com/wangshijun/angular-echarts
- https://github.com/violet-day/angular-echarts
- https://github.com/zuiyuexuan/angularjs-requirejs-echarts
- https://github.com/xuhuan/angular-echarts
- https://github.com/liekkas/ng-echarts

## Demo:
http://goldymark.github.io/ngECharts/

## 许可证:
Apache License 2.0

## 依赖库:
- Angularjs (开发时使用1.2.16版本，没有做兼容性测试，其他版本应该没问题)；
- [Baidu ECharts](http://echarts.baidu.com)；

## 安装:
引入ngECharts的js文件：

**JS:**
```html
<script src="lib/angular.min.js"></script>
<script src="lib/echarts-all.js"></script>
<script src="dist/ngECharts.min.js"></script>
```

## 使用:
1、 加载ngECharts模块：
**JS:**
```javascript
angular.module('myApp', ['ngECharts'])
```

2、 使用echarts指令：
**HTML:**
```html
<echarts id="chart1" option="option" width="1000px" height="400px"></echarts>
```

3、 Controller代码:
**JS:**
```javascript
angular.module('myApp', ['ngECharts'])
.controller('myCtrl', ['$scope','ec', function($scope,ec){
    $scope.option = ...
}]);
```

## directive参数：
### [可选][类型:string] id:
#### 说明：ECharts的id，当需要多图联动的时候必须设置，且**唯一**，不设置的情况下默认为echart，建议设置并互不相同；
#### 默认值：echart
<br/>

### [必须][类型:object] option:
#### 说明：ECharts的图表选项，[详情](http://echarts.baidu.com/doc/doc.html)；
<br/>

### [可选][类型:string] width:
#### 说明：图表宽度，同css；
#### 默认值：同父元素宽度
<br/>

### [可选][类型:string] height:
#### 说明：图表高度，同css；
#### 默认值：同父元素高度
<br/>

## Service：
### 名称：ec
#### 示例代码：
```javascript
angular.module('myApp', ['ngECharts'])
.controller('myCtrl', ['$scope','$timeout', 'ec', function($scope,$timeout,ec){
    $timeout(function(){
    	ec.showLoading('chart1');
    	ec.connect(['chart2','chart3']);
    });
    
    $timeout(function(){
        ec.hideLoading('chart1');
    },1000);

    ec.addMap("FS","data/fs.json");
}]);
```
### 方法说明：
### getInstance(id)
#### 说明：获取对应id的echarts实例化对象，等同于获取echarts.init(element)后的对象;
#### 示例代码：
```javascript
var chart1 = ec.getInstance('chart1');
```

### getOption(id)
#### 说明：获取对应id的echarts图表选项，与官方的getOption()不同的是，这里多了一个扩展的id参数;
#### 示例代码：
```javascript
var option1 = ec.getOption('chart1');
```

### clear()
#### 说明：清空所有echarts实例化对象和图表选项，会执行官方的dispose()方法，一般无需显式调用;
#### 示例代码：
```javascript
ec.clear();
```

### showLoading(ids,text,effects)
#### 说明：过渡控制，显示Loading（读取中），[详情](http://echarts.baidu.com/doc/doc.html#Loadingoption)；
#### [必须][类型:array of string | string] ids : echarts对应的id；
#### [可选][类型:string] text : 自定义显示的语句，'\n'指定换行；
#### [可选][类型:array of string] effects : loading效果，可选为：'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'，支持外部装载；默认随机显示，没有ring效果（不好看）；
#### 示例代码：
```javascript
$timeout(function(){
	// chart1显示Loading
	ec.showLoading('chart1','拼命加载中……',['spin','whirling','bar']);
	// chart2,chart3都显示Loading
	ec.showLoading(['chart2','chart3'],'拼命加载中……',['spin','whirling','bar','bubble']);
});
```

### hideLoading(ids)
#### 说明：过渡控制，隐藏Loading（读取中）；
#### [必须][类型:array of string | string] ids : echarts对应的id；
#### 示例代码：
```javascript
$timeout(function(){
	ec.hideLoading(['chart1','chart2','chart3']);
},2500);
```

### connect(ids)
#### 说明：多图联动，传入echarts对应的id，支持可变参数和数组，[详情](http://echarts.baidu.com/doc/doc.html#实例方法)；
#### 注意：此处实现的connect是双向绑定，而非官方的单项绑定；
#### [必须][类型:string... | array of string] ids : echarts对应的id；
#### 示例代码：
```javascript
$timeout(function(){
	// 写法1
	ec.connect('chart1','chart2');
	// 写法2
	ec.connect(['chart1','chart2']);
});
```

### addMap(mapName,mapPath,specialArea)
#### 说明：扩展使用自定义地图，[详情](http://echarts.baidu.com/doc/doc.html#附录地图扩展)；
#### [必须][类型:string] mapName : 自定义地图名称；
#### [必须][类型:string] mapPath : 自定义地图的geoJson文件所在路径；
#### [可选][类型:object] specialArea : 请看官方文档解释；
#### 示例代码：
```javascript
$timeout(function(){
	ec.addMap("FS","data/fs.json");
});
```