import React, { useRef, useEffect } from "react";
import * as d3 from 'd3' 

const Histogram = (props) => {
    const svgRef = useRef(null);

    useEffect(() => {

        ////////////////basic layout//////////////////
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

        var filtered_data = dataset.filter(function(d, i){return i < THRESHOLD_RATIO * length;})

        filtered_data.forEach(function(d) {
            var year = d.datetime;
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
        return a.count - b.count;
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


        //////////////////////////////////////////////
        d3.select("#mySlider").on("change", function(d) {
            update(this.value)
        })

        function update(threshold){
            var countObj = {};

            filtered_data = dataset.filter(function(d, i){return i < threshold * length / 1000;})

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
                return a.count - b.count;
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
        }
        });

     }, [props.Data, svgRef.current]);

    return <svg ref={svgRef} />;

};

export default Histogram;
