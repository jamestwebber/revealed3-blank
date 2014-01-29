/*
 * Function to create scatter plots in a consistent manner
 * adapted from Mike Bostock: http://bost.ocks.org/mike/chart/
 */
'use strict';

function barchart(selection) {
  var margin = { top: 40, right: 40, bottom: 80, left: 60 },
      width = 700, // default width
      height = 700, // default height
      xValue = function(d) { return d[0]; }, // x is categorical
      yValue = function(d) { return +d[1]; },
      xScale = d3.scale.ordinal(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
      yAxis = d3.svg.axis().scale(yScale).orient("left"),
      yLabel = "";

  function chart(selection) {
    selection.each(function(data) {

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i),
                yValue.call(data, d, i)];
      });

      // Update the x-scale.
      xScale.domain(data.map(function (d) { return d[0]; }))
        .rangeRoundBands([0, width - margin.left - margin.right], 0.4);

      // Update the y-scale.
      yScale.domain([0, 1])
        .range([height - margin.top - margin.bottom, 0])
        .clamp(true);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg")
        .attr("class", "d3")
        .append("g");

      // Add axes and axes labels
      gEnter.append("g").attr("class", "d3 x axis")

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

      // Update the bar chart
      var bars = g.selectAll(".bar")
        .data(data, function(d) { return d[0]; });

      // transition existing points
      bars.transition()
        .delay(function(d, i) { return i * 25; })
        .duration(data.length * 25)
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("height", function(d) {
          return height - margin.top - margin.bottom - yScale(d[1]);
        });

      // create any new ones
      bars.enter()
        .append("rect")
          .attr("class", "d3 bar")
          .attr("x", function(d) { return xScale(d[0]); })
          .attr("width", xScale.rangeBand())
          .attr("y", height - margin.top - margin.bottom)
          .attr("height", 0)
        .transition()
          .delay(function(d, i) { return i * 25; })
          .duration(data.length * 25)
          .attr("y", function(d) { return yScale(d[1]); })
          .attr("height", function(d) {
            return height - margin.top - margin.bottom - yScale(d[1]);
          });

      // remove any old ones
      bars.exit()
        .transition()
          .attr("y", height - margin.top - margin.bottom)
          .attr("height", 0)
          .remove();

      g.select("g.x.axis")
        .attr("transform", "translate(0," + yScale.range()[0] + ")")
        .call(xAxis)
        .selectAll("text")
          .style("font-size", "80%")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)");

      // Update the y-axis.
      g.select("g.y.axis")
        .call(yAxis);
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

  chart.yLabel = function(_) {
    if (!arguments.length) return yLabel;
    yLabel = _;
    return chart;
  };

  return chart;
}
