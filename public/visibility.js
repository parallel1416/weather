// set the dimensions and margins of the graph
var margin = {top: 100, right: 30, bottom: 30, left: 100},
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#Vis")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("./Beijing.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { datetime : d3.timeParse("%Y-%m-%d")(d.datetime), temp : d.visibility }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.datetime; }))
      .range([ 0, width ]);
    xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    

    const max = d3.max(data, function(d) { return +d.value; })

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return +d.temp; }), d3.max(data, function(d) { return +d.temp; })])
      .range([ height, 0 ]);
    yAxis = svg.append("g")
      .call(d3.axisLeft(y));

    // Add linearGradient
    svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(0))
      .attr("x2", 0)
      .attr("y2", y(max))
      .selectAll("stop")
        .data([
          {offset: "0%", color: "#2f3149"},
          {offset: "100%", color: "#c7caf4"}
        ])
      .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Add brushing
    var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line = svg.append('g')
      .attr("clip-path", "url(#clip)")

    // Add the line
    line.append("path")
      .datum(data)
      .attr("class", "line")  // I add the class line to be able to modify this line later on.
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.datetime) })
        .y(function(d) { return y(d.temp) })
        )

    // Add the brushing
    line
      .append("g")
        .attr("class", "brush")
        .call(brush);

    // A function that set idleTimeOut to null
    var idleTimeout
    function idled() { idleTimeout = null; }

    // A function that update the chart for given boundaries
    function updateChart() {

      // What are the selected boundaries?
      extent = d3.event.selection

      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if(!extent){
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain([ 4,8])
      }else{
        x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
        line.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }

      // Update axis and line position
      xAxis.transition().duration(1000).call(d3.axisBottom(x))
      line
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.datetime) })
            .y(function(d) { return y(d.temp) })
          )
    }

    // If user double click, reinitialize the chart
    svg.on("dblclick",function(){
      x.domain(d3.extent(data, function(d) { return d.datetime; }))
      xAxis
        .transition()
        .call(d3.axisBottom(x))
      line
        .select('.line')
        .transition()
        .duration(1000)
        .style("opacity",1)
        .attr("d", d3.line()
          .x(function(d) { return x(d.datetime) })
          .y(function(d) { return y(d.temp) })
      )
    });

    // add x-axis-label
    svg.append("g")
        .append("text")
        .attr("class","axisText")
        .attr("x",15)
        .attr("y",-10) 
        .attr("text-anchor", "end") // 文本定位锚点在尾部
        .attr("font-size","12px")
        .text("能见度/千米");

    // add a title
    svg.append("g")
        .append("text")
        .text("2013-2023年北京能见度变化")
        .attr("class","middle-mainText")
        .attr("x",300)
        .attr("y",-20)
        .attr("font-size", "24px")
        .attr("text-anchor", "middle");
});