import React, { useRef, useEffect } from "react";
import * as d3 from 'd3' 

const LineChart = (props) => {
  const svgRef = useRef(null);

  useEffect(() => {
    //////year range selection : pass in the props to re-render//////
    var start_year = 2013, end_year = 2023;
    ////////////////////////////////////////////////////////////////


        //edit the variable below to try different layouts
    var margin = {top: 100, right: 30, bottom: 30, left: 100},
        width = 760 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#root")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


    d3.csv("/Beijing.csv").then(
    /*
      function(d){
        return { datetime : d3.timeParse("%Y-%m-%d")(d.datetime), temp : d.temp }
      },
    */
      

      (data) => {
        
        data.forEach(
          function (d) {
            d.date = d3.timeParse("%Y-%m-%d")(d.datetime)
          }
        )

        var filtered_data = data.filter(function(d) {return d.date >= new Date(`${start_year}-01-01`) && d.date <= new Date(`${end_year}-01-01`)})

        var x = d3.scaleTime()
          .domain((d3.extent(filtered_data, function(d) { return d.date; })))
          .range([ 0, width ]);
        var xAxis = svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));
        
        const max = d3.max(filtered_data, d=>d.tempmax)

        var y = d3.scaleLinear()
          .domain([-15, 42])
          .range([ height, 0 ]);
        var yAxis = svg.append("g")
          .call(d3.axisLeft(y));

        svg
          .append("text")
          .attr("text-anchor", "start")
          .attr("y", -5)
          .attr("x", -50)
          .text(function(d) { return('Temperature(°C)')})

          
        svg.append("linearGradient")
          .attr("id", "line-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", 0)
          .attr("y1", y(0))
          .attr("x2", 0)
          .attr("y2", y(30))
          .selectAll("stop")
            .data([
              {offset: "0%", color: "blue"},
              {offset: "100%", color: "red"}
            ])
          .enter()
          .append("stop")
            .attr("offset", function(d) { return d.offset; })
            .attr("stop-color", function(d) { return d.color; });
            


        var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width )
            .attr("height", height )
            .attr("x", 0)
            .attr("y", 0);


        var brush = d3.brushX()                  
            .extent( [ [0,0], [width,height] ] )  
            .on("end", updateChart)               

        var line = svg.append('g')
          .attr("clip-path", "url(#clip)")


        line.append("path")
          .datum(filtered_data)
          .attr("class", "line")  
          .attr("fill", "none")
          .attr("stroke", "url(#line-gradient)")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.tempmax) })
            )

        line
          .append("g")
            .attr("class", "brush")
            .call(brush);


        var idleTimeout
        function idled() { idleTimeout = null; }

        function updateChart(event) {


          var extent = event.selection


          if(!extent){
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); 
            x.domain([ 4,8])
          }else{
            x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
            line.select(".brush").call(brush.move, null) 
          }


          xAxis.transition().duration(1000).call(d3.axisBottom(x))
          line
              .select('.line')
              .transition()
              .duration(1000)
              .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.tempmax) })
              )
        }

        svg.on("dblclick",function(){
          x.domain(d3.extent(filtered_data, function(d) { return d.date; }))
          xAxis.transition().call(d3.axisBottom(x))
          line
            .select('.line')
            .transition()
            .attr("d", d3.line()
              .x(function(d) { return x(d.date) })
              .y(function(d) { return y(d.tempmax) })
          )
        });
    });

  }, [props.Data, svgRef.current]);

  return <svg ref={svgRef} />;
};

export default LineChart;
