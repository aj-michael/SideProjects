var plot = null;
var convplot = null;
var myApp = angular.module("myApp", []);
x1 = [-1, -2, -3, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
x2 = [1, 2, 3, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6];
myApp.controller("MyController", ["$scope", function($scope) {
  $scope.x1 = x1;
  $scope.x2 = x2;
}]);
myApp.filter('flatten', function() {
  return function(input,num) {
    var arr = input.map(function(x) { return parseFloat(x); });
    var pts = _.zip(_.range(arr.length),arr);
    if (plot != null) {
      updatePlot(pts,num);
    }
    return arr;
  };
});

function updatePlot(pts,num) {
  var data = plot.getData();
  data[num].data = pts;
  plot.setData(data);
  plot.setupGrid();
  plot.draw();
  updateConv();
}

function updateConv() {
  var in1 = plot.getData()[0].data;
  var in2 = plot.getData()[1].data;
  var data = convplot.getData();
  data[0].data = conv(in1,in2);
  convplot.setData(data);
  convplot.setupGrid();
  convplot.draw();
}

function conv(in1,in2) {
  var N = _.min(_.map(in1,function(x) { return x[0] }));
  var M = _.min(_.map(in2,function(x) { return x[0] }));
  var max = _.max(_.map(_.union(in1,in2),function(x) { return x[0] }));
  var map1 = {};
  var map2 = {};
  _.map(in1, function(x) { map1[x[0]] = x[1] });
  _.map(in2, function(x) { map2[x[0]] = x[1] });
  var conv = [];
  for (var n = 0; n <= 2*max; n++) {
    var res = 0;
    if (n >= M + N) {
      for (var i = -max; i <= max; i++) {
        try {
          x1n = map1[i];
          if (isNaN(parseFloat(x1n))) x1n = 0;
        } catch (e) {
          x1n = 0;
        }
        try {
          x2n = map2[n-i];
          if (isNaN(parseFloat(x2n))) x2n = 0;
        } catch (e) {
          x2n = 0;
        }
        res += x1n * x2n;
      }
    }
    conv.push([n,res]);
  }
  printConv(conv);
  return conv;
}

function printConv(conv) {
  var str = "["
  _.map(conv,function(x) { str = str + x[1] + "," });
  str = str.slice(0,-1) + "]";
  $("#result").html(str);
}

function initGraphs() {
  in1 = _.zip(_.range(x1.length),x1);
  in2 = _.zip(_.range(x2.length),x2);
  plot = $.plot($("#inputplot"), [{
      data: in1,
      color: 'black',
      label: "x1"
    }, {
      data: in2,
      color: 'red',
      label: 'x2' 
    }], {
      series: {
        points: { show: true }
      },
      bars: {
        show: true,
        barWidth: 0,
        align: "center",
      },
      grid: {
        markings: [
          { xaxis: { from: 0, to: 0 }, color: "gray" },
          { yaxis: { from: 0, to: 0 }, color: "gray" }
        ]
      }
    })
  convplot = $.plot($("#convplot"), [{
    data: conv(in1, in2),
    color: 'green',
    label: 'x1 * x2'
  }], {
    series: {
      points: { show: true }
    },
    bars : {
      show: true,
      barWidth: 0,
      align: "center"
    },
    grid: {
      markings: [
        { xaxis: { from: 0, to: 0 }, color: "gray" },
        { yaxis: { from: 0, to: 0 }, color: "gray" }
      ]
    }
  });
}

$(function() {
  initGraphs();
});
