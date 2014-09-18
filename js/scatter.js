/*
 * Function to create scatter plots in a consistent manner
 * adapted from Mike Bostock: http://bost.ocks.org/mike/chart/
 */
'use strict';

function scatter(selection) {
  var margin = { top: 40, right: 40, bottom: 50, left: 60 },
      width = 800, // default width
      height = 600, // default height
      idValue = function(d) { return d.name; }, // name function
      xValue = function(d) { return +d[0]; },
      yValue = function(d) { return +d[1]; },
      rValue = function(d) { return 3.5; }, // default radius
      xScale = d3.scale.linear(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
      yAxis = d3.svg.axis().scale(yScale).orient("left"),
      xLabel = "", // default is no labels
      yLabel = "";

  function chart(selection) {
    selection.each(function(data) {

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i),
                yValue.call(data, d, i),
                rValue.call(data, d, i),
                idValue.call(data, d, i)];
      });

      // Update the x-scale.
      xScale.domain(d3.extent(data, function(d) { return d[0]; }))
        .range([0, width - margin.left - margin.right])
        .nice();

      // Update the y-scale.
      yScale.domain(d3.extent(data, function(d) { return d[1]; }))
        .range([height - margin.top - margin.bottom, 0])
        .nice();

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");

      // Add axes and axes labels
      gEnter.append("g").attr("class", "d3 x axis")
        .append("text")
          .attr("class", "label")
          .attr("x", width - margin.left - margin.right)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text(xLabel);

      gEnter.append("g").attr("class", "d3 y axis")
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(yLabel);

      // Update the outer dimensions.
      svg.attr("width", width)
        .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the scatter plot
      var circles = g.selectAll(".dot")
        .data(data, function(d) { return d[3]; });

      // transition existing points
      circles.transition()
        .attr("r", function(d) { return d[2]; })
        .transition()
          .delay(function(d, i) { return 250 + i * 10; })
          .duration(250 + data.length * 10)
          .attr("cx", function(d) { return xScale(d[0]); })
          .attr("cy", function(d) { return yScale(d[1]); });

      // create any new ones
      circles.enter()
        .append("circle")
          .attr("class", "d3 dot")
          .attr("r", 0)
          .attr("cx", function(d) { return xScale(d[0]); })
          .attr("cy", function(d) { return yScale(d[1]); })
        .transition()
          .duration(750)
          .attr("r", function(d) {return d[2]; });

      // remove any old ones
      circles.exit()
        .transition()
          .attr("r", 0)
          .remove();

      // Update the x-axis.
      g.select(".d3.x.axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis)
        .select("text")
        .text(xLabel);

      // Update the y-axis.
      g.select(".d3.y.axis")
        .call(yAxis)
        .select("text")
        .text(yLabel);
    });
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return idValue;
    idValue = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.r = function(_) {
    if (!arguments.length) return rValue;
    rValue = _;
    return chart;
  }

  chart.xLabel = function(_) {
    if (!arguments.length) return xLabel;
    xLabel = _;
    return chart;
  };

  chart.yLabel = function(_) {
    if (!arguments.length) return yLabel;
    yLabel = _;
    return chart;
  };

  return chart;
}
