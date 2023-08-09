/*
分类：
大暴雨（>100）：2/3867=0.05%——0.05%
暴雨（50-100）：8/3867=0.2%——0.25%
大雨（25-50）：34/3867=0.88%——1.13%
中雨（10-25）：81/3867=2.1%——3.24%
小雨（<10）：rest——10%
（不包含关系）

近年来，北京地区的降雨量呈现明显的下降趋势，这引起了人们的关注和疑问。为什么北京降雨越来越少？这个问题涉及到多个因素。

气候变化是导致北京降雨减少的主要原因之一。随着全球气候变暖的趋势，北京地区的气温不断上升，这会导致大气层中水蒸气的含量减少。水蒸气是降雨的主要来源，当水蒸气减少时，降雨量也会相应减少。

人类活动对北京的降雨影响也不可忽视。随着城市化的加速发展，北京的土地利用发生了巨大变化，大量的土地被城市建设所占用，导致地表的蒸发和植被的蒸腾减少，进而影响了水循环和降雨的形成。工业排放和机动车尾气等大量的污染物也对大气环境产生了负面影响，可能导致云和降水的形成受阻。

北京地区的自然环境也对降雨量的减少起到一定的影响。北京地处于中国北方干旱地区，本身就属于降雨较少的地区。再加上地表的不均匀性和地形的复杂性，使得北京的降雨分布不均匀，某些地区可能会出现降雨较少的情况。
*/

////////////////basic layout//////////////////
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#Precip")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./sort_by_precip.csv", function(dataset) {

    //////////preprocess the dataset////////////
    const length = 3867;
    var THRESHOLD_RATIO = 0.05;
    var countObj = {};

    filtered_data = dataset.filter(function(d, i){return i < THRESHOLD_RATIO * length;})

    // 把datetime换成年份并记录每年的次数
    filtered_data.forEach(function(d) {
        var year = d.datetime.slice(0,4);
        d.datetime = year;
        if(countObj[year] === undefined) {
            countObj[year] = 0;
        } else {
            countObj[year] = countObj[year] + 1;
        }
    });
 
    filtered_data.forEach(function(d) {
        var year = d.datetime;
        d.count = countObj[year];
    });

    // sort data
    filtered_data.sort(function(b, a) {
        return b.datetime - a.datetime;
    });
    console.log(filtered_data);


    // X axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(filtered_data.map(function(d) { return d.datetime; }))
        .padding(0.2);
    xAxis = svg.append("g");
        xAxis.attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(filtered_data, function(d) {return d.count;})])
        .range([ height, 0]);
    yAxis = svg.append("g");
        yAxis.call(d3.axisLeft(y));

    // 设置初始状态
    // Bars
    svg.selectAll("rect")
        .data(filtered_data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.datetime); })
        .attr("y", function(d) { return y(d.count); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.count); })
        .attr("fill", "#424eff")
    
    
    // 从Slider中拿到数值后更新
    d3.select("#mySlider").on("change", function(d) {
        update(this.value)
    })

    function update(threshold){
        var countObj = {};

        filtered_data = dataset.filter(function(d, i){return i < threshold * length / 1000;})
        console.log(threshold + "%: " + filtered_data[filtered_data.length-1].precip);

        filtered_data.forEach(function(d) {
            var year = d.datetime.slice(0,4);
            d.datetime = year;
            if(countObj[year] === undefined) {
                countObj[year] = 0;
            } else {
                countObj[year] = countObj[year] + 1;
            }
        });

        filtered_data.forEach(function(d) {
            var year = d.datetime;
            d.count = countObj[year];
        });

        // sort data
        filtered_data.sort(function(b, a) {
            return b.datetime - a.datetime;
        });


        // Update X axis
        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(filtered_data.map(function(d) { return d.datetime; }))
            .padding(0.2);
        xAxis.transition()
            .duration(1000)
            .call(d3.axisBottom(x));

        // Update Y axis
        y.domain([0, d3.max(filtered_data, function(d) {return d.count;})]);
        yAxis.transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        // Bars
        tmp = svg.selectAll("rect")
            .data(filtered_data);

        tmp.exit().remove()
        
        tmp.enter()
            .append("rect")
            .merge(tmp)
            .transition()
            .duration(1000)
            .attr("x", function(d) { return x(d.datetime); })
            .attr("y", function(d) { return y(d.count); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.count); })
            .attr("fill", "#424eff")
    }

    // add x-axis-label
    svg.append("g")
        .append("text")
        .attr("class","axisText")
        .attr("x",2)
        .attr("y",-5) 
        .attr("text-anchor", "end") // 文本定位锚点在尾部
        .attr("font-size","12px")
        .text("天数/天");
    // add y-axis-label
    svg.append("g")
        .append("text")
        .attr("class","axisText")
        .attr("x",395)
        .attr("y",317) 
        .attr("text-anchor", "end") // 文本定位锚点在尾部
        .attr("font-size","12px")
        .text("年份");

    // add a title
    svg.append("g")
        .append("text")
        .text("2013-2023年北京Top降水量分布年份")
        .attr("class","middle-mainText")
        .attr("x",170)
        .attr("y",-10)
        .attr("font-size", "18px")
        .attr("text-anchor", "middle");
});
