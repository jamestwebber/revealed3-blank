/*
 * Function to display force-directed-layout networks.
 * adapted from Mike Bostock: http://bl.ocks.org/mbostock/4062045
 */
'use strict';

function network(selection) {
  var margin = { top: 40, right: 40, bottom: 50, left: 60 },
      width = 700, // default width
      height = 700, // default height
      charge = -80,
      distance = 20,
      idValue = function(d) { return d.name; }, // node name
      nValue = function(d) { return +d.value; }, // node value
      rValue = function(d) { return 5; }, // node radius
      eValue = function(d) { return 1; }, // edge value
      colorRange = ["blue", "lightgreen"],
      color = d3.scale.linear().range(colorRange),
      force = d3.layout.force();

  function chart(selection) {
    selection.each(function(graph) {

      // Convert data to standard representation
      graph.nodes = graph.nodes.map(function(d, i) {
        return {"name": idValue.call(graph.nodes, d, i),
                "value": nValue.call(graph.nodes, d, i),
                "radius": rValue.call(graph.nodes, d, i)};
      });

      graph.links = graph.links.map(function(d, i) {
        return {"source": d.source,
                "target": d.target,
                "value": eValue.call(graph.links, d, i)};
      });

      // update the color range
      color.domain(d3.extent(graph.nodes, function(n) { return n.value; }));

      // select the svg element if it exists
      var svg = d3.select(this).selectAll("svg").data([graph]);

      // otherwise create the chart
      var gEnter = svg.enter().append("svg").append("g");

      // update the outer dimensions
      svg.attr("width", width)
        .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // update force
      force.charge(charge)
        .linkDistance(distance)
        .size([width - margin.left - margin.right,
               height - margin.top - margin.bottom]);

      force.nodes(graph.nodes)
        .links(graph.links)
        .start();

      // update links
      var link = g.selectAll(".link")
        .data(graph.links);

      // create links
      link.enter().append("line")
        .attr("class", "link");

      // remove any old links
      link.exit().remove();

      // update nodes
      var node = g.selectAll(".node")
        .data(graph.nodes)

      // transition existing nodes
      node.transition()
        .style("fill", function(n) { return color(n.value); })
        .attr("r", function(n) { return n.radius; });

      // create new nodes
      node.enter().append("circle")
          .attr("class", "node")
          .style("fill", function(n) { return color(n.value); })
            .attr("r", function(n) { return n.radius; })
            .call(force.drag);

      // set node titles
      node.append("title")
        .text(function(n) { return n.name + ": " + n.value; });

      // remove old nodes
      node.exit()
        .transition()
          .attr("r", 0)
          .remove();

      // set the forcing update function
      force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
      });
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

  chart.charge = function(_) {
    if (!arguments.length) return charge;
    charge = _;
    return chart;
  };

  chart.distance = function(_) {
    if (!arguments.length) return distance;
    distance = _;
    return chart;
  };

  chart.id = function(_) {
    if (!arguments.length) return idValue;
    idValue = _;
    return chart;
  };

  chart.n = function(_) {
    if (!arguments.length) return nValue;
    nValue = _;
    return chart;
  }

  chart.r = function(_) {
    if (!arguments.length) return rValue;
    rValue = _;
    return chart;
  }

  chart.e = function(_) {
    if (!arguments.length) return eValue;
    eValue = _;
    return chart;
  }

  chart.colorRange = function(_) {
    if (!arguments.length) return colorRange;
    colorRange = _;
    return chart;
  };

  chart.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    return chart;
  };

  chart.force = function(_) {
    if (!arguments.length) return force;
    force = _;
    return chart;
  }

  return chart;
}