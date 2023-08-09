/*
    小雨：1d（或24h）降雨量小于10mm者。
　　中雨：1d（或24h）降雨量10～25mm者。
　　大雨：1d（或24h）降雨量25～50mm者。
　　暴雨：1d（或24h）降雨量50～100mm者。
　　大暴雨：1d（或24h）降雨量100～200mm者。
　　特大暴雨：1d（或24h）降雨量在200mm以上者。
*/

// set the dimensions and margins of the graph
var margin = {top: 60, right: 230, bottom: 50, left: 50},
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#Precip")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("./Beijing.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { precip : +d.precip, snow : +d.snow, year : d3.timeParse("%Y-%m-%d")(d.datetime) }
  },

  // Now I can use this dataset:
  function(data) {
    console.log(data);  
    
    // List of groups = header of the csv files
    var keys = ['precip', 'snow'];
    console.log(keys);

    // color palette
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeCategory20);
    console.log(color);

    //stack the data?
    var stackedData = d3.stack()
        .keys(keys)
        (data)
    console.log(stackedData);

    // Add X axis
    var x = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.year; }))
        .range([ 0, width ]);
    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.precip+d.snow; })])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y))

    //////////
    // BRUSHING AND CHART //
    //////////

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Add brushing
    var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the scatter variable: where both the circles and the brush take place
    var areaChart = svg.append('g')
        .attr("clip-path", "url(#clip)")

    // Area generator
    var area = d3.area()
        .x(function(d) { return x(d.data.year); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })

    // Show the areas
    areaChart
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", function(d) { return "myArea " + d.key })
        .style("fill", function(d) { return color(d.key); })
        .attr("d", area)

    // Add the brushing
    areaChart
        .append("g")
        .attr("class", "brush")
        .call(brush);

    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }

    // A function that update the chart for given boundaries
    function updateChart() {

        extent = d3.event.selection

        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if(!extent){
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
            x.domain(d3.extent(data, function(d) { return d.year; }))
        }else{
            x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
            areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        }

        // Update axis and area position
        xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
        areaChart
            .selectAll("path")
            .transition().duration(1000)
            .attr("d", area)
        }

        //////////
        // HIGHLIGHT GROUP //
        //////////

        // What to do when one group is hovered
        var highlight = function(d){
            console.log(d)
            // reduce opacity of all groups
            d3.selectAll(".myArea").style("opacity", .1)
            // expect the one that is hovered
            d3.select("."+d).style("opacity", 1)
        }

        // And when it is not hovered anymore
        var noHighlight = function(d){
            d3.selectAll(".myArea").style("opacity", 1)
        }

        //////////
        // LEGEND //
        //////////

        // Add one dot in the legend for each name.
        var size = 20
        svg.selectAll("myrect")
            .data(keys)
            .enter()
            .append("rect")
                .attr("x", 400)
                .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
                .attr("width", size)
                .attr("height", size)
                .style("fill", function(d){ return color(d)})
                .on("mouseover", highlight)
                .on("mouseleave", noHighlight)

        // Add one dot in the legend for each name.
        svg.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
            .attr("x", 400 + size*1.2)
            .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d){ return color(d)})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)

    // add y-axis-label
    svg.append("g")
        .append("text")
        .attr("class","axisText")
        .attr("x",25)
        .attr("y",-5) 
        .attr("text-anchor", "end") // 文本定位锚点在尾部
        .attr("font-size","12px")
        .text("总降水量/mm");
    // add x-axis-label
    svg.append("g")
        .append("text")
        .attr("class","axisText")
        .attr("x",404)
        .attr("y",307) 
        .attr("text-anchor", "end") // 文本定位锚点在尾部
        .attr("font-size","12px")
        .text("时间");

    // add a title
    svg.append("g")
        .append("text")
        .text("2013-2023年北京总降水量变化")
        .attr("class","middle-mainText")
        .attr("x",185)
        .attr("y",-20)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle");
});

