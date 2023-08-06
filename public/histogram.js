var margin = {top: 100, right: 30, bottom: 30, left: 100},
    width = 760 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var svg = d3.select("#histogram")
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./sort_by_tempmax.csv", function(dataset) {

        // define count object that holds count for each city
    var countObj = {};

    // count how much each city occurs in list and store in countObj
    dataset.forEach(function(d) {
        var year = d.datetime;
        if(countObj[year] === undefined) {
            countObj[year] = 0;
        } else {
            countObj[year] = countObj[year] + 1;
        }
    });
    // now store the count in each data member
    dataset.forEach(function(d) {
        var year = d.datetime;
        d.count = countObj[year];
    });

    /////////////////////////////////////////////////////////
    var x = d3.scaleTime()
      .domain(d3.extent(dataset, function(d) { return d.datetime; }))
      .range([ 0, width ]);
    xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

      var y = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) { return +d.count; })])
      .range([ height, 0 ]);
    yAxis = svg.append("g")
      .call(d3.axisLeft(y));


    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ")")
        .call(xAxis);
    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 60)
        .attr('dy', '.71em')
        .style('text-anchor', 'end');
    //////////////////////////////////////////////
    
});
