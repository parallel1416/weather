import React, { useRef, useEffect } from "react";
import * as d3 from 'd3' 
import { Box } from "@mui/system";

const Histogram_and_Piechart = (props) => {
    const svgRef = useRef(null);
    useEffect(() => {
        //////year range selection : pass in the props to re-render//////
        var start_year = 2013, end_year = 2023;
        ////////////////////////////////////////////////////////////////

        ////////////////basic layout : edit this for better design//////////////////
        var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        var svg = d3.select("#root")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("sort_by_tempmax.csv").then(dataset => { //This line is IMPORTANT!!! converts the data to a PROMISE

        //////////preprocess the dataset////////////
        const length = 3867;
        var THRESHOLD_RATIO = 0.1;
        var countObj = {};

        var filtered_data_by_year = dataset.filter(function(d) {return d.datetime >= start_year && d.datetime <= end_year})

        var filtered_data = filtered_data_by_year.filter(function(d, i){return i < THRESHOLD_RATIO * length;})

        filtered_data.forEach(function(d) {
            var year = d.datetime;
            if(countObj[year] === undefined) {
                countObj[year] = 1;
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
        return a.datetime - b.datetime;
        });

        // X axis
        var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(filtered_data.map(function(d) { return d.datetime; }))
        .padding(0.2);
        var xAxis = svg.append("g");
        xAxis.attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, d3.max(filtered_data, function(d) {return d.count;})])
        .range([ height, 0]);
        var yAxis = svg.append("g");
        yAxis.call(d3.axisLeft(y));

        // Bars
        svg.selectAll("rect")
        .data(filtered_data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.datetime); })
        .attr("y", function(d) { return y(d.count); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.count); })
        .attr("fill", "#08def1")

        svg
        .append("text")
        .attr("text-anchor", "start")
        .attr("y", -10)
        .attr("x", -30)
        .text(function(d){ return('Days')})

        /////////////
        //Try PieChart
        //////////////
        var width2 = 450,
        height2 = 450,
        margin2 = 40;
        var radius = Math.min(width2, height2) / 2 - margin2

        var svg2 = d3.select("#root")
        .append("svg")
        .attr("width", width2)
        .attr("height", height2)
        .append("g")
        .attr("transform",
        `translate(${width2/2}, ${height2/2})`);

        
        var color = d3.scaleOrdinal()
                        .domain([2013,2023])
                        .range(d3.schemeSpectral[11]);

        var pie = d3.pie()
        .value(function(d) {return d[1]; })
        .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) 
        var data_ready = pie(Object.entries(countObj))
    
        // map to data
        var u = svg2.selectAll("path")
        .data(data_ready)
    
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

        u
        .join('path')
        .transition()
        .duration(1000)
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data[0])) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 1)

        ///add labels
        svg2
        .selectAll('mySlices')
        .data(data_ready)
        .join('text')
        .text(function(d){ return d.data[0]})
        .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
        .attr("id","time")
        .style("text-anchor", "middle")
        .style("font-size", 17)


        //////////////////////////////////////////////
        d3.select("#slider").on("change", function(d) {
            update(this.value)
        })
        //////////////////////////////////////////////
        function update(threshold){
            var countObj = {};

            var filtered_data_by_year = dataset.filter(function(d) {return d.datetime >= start_year && d.datetime <= end_year})

            filtered_data = filtered_data_by_year.filter(function(d, i){return i < threshold * length / 1000;})

            filtered_data.forEach(function(d) {
            var year = d.datetime;
            if (countObj[year] === undefined) {
                countObj[year] = 1;
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
                return a.datetime - b.datetime;
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
            var tmp = svg.selectAll("rect")
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
            .attr("fill", "#08def1")    

            var color = d3.scaleOrdinal()
                        .domain([2013,2023])
                        .range(d3.schemeSpectral[11]);

        var pie = d3.pie()
        .value(function(d) {return d[1]; })
        .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) 
        var data_ready = pie(Object.entries(countObj))
    
        // map to data
        var u = svg2.selectAll("path")
        .data(data_ready)
        
        svg2.selectAll('#time').remove();
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        
        u
        .join('path')
        .transition()
        .duration(1000)
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data[0])) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 1)


        svg2
        .selectAll('mySlices')
        .data(data_ready)
        .join('text')
        .transition()
        .duration(1000)
        .text(function(d){ return d.data[0]})
        .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
        .attr("id","time")
        .style("text-anchor", "middle")
        .style("font-size", 17)
        }
        });

     }, [props.Data, svgRef.current]);

    return <Box><
        svg ref={svgRef} 
        />;</Box>

};

export default Histogram_and_Piechart;