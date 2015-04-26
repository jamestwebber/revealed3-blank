/**
 * Created by james on 4/23/15.
 */
'use strict';

function load_icon(defs, url, name) {
    d3.xml(url, function(error, data) {
        if (error) {
            console.log(error);
            return;
        }
        var xml = d3.select(data); // get the svg element

        xml.select("use").attr("xlink:href", "#" + name + "-outline"); // make sure this id is right

        // add the defs, changing ids to conform to the expected specification
        defs.node().appendChild(xml.select("path")
            .attr("id", name + "-outline").node());
        defs.node().appendChild(xml.select("clipPath")
            .attr("id", name + "-clip").node());
    });
}

function svgicon(selection) {
    var iconname = "",
        color = "none",
        width = 0,
        height = 0,
        duration = 500,
        delay = 500,
        xyFunc = function(d) { return [0, 0]; },
        scaleFunc = function(d) { return 1.0; },
        rotateFunc = function(d) { return 0.0; },
        transform = function(d) {
            var s = scaleFunc(d);
            return "matrix(" + [(s * Math.cos(rotateFunc(d))),
                    (-s * Math.sin(rotateFunc(d))),
                    (s * Math.sin(rotateFunc(d))),
                    (s * Math.cos(rotateFunc(d)))]
                + "," + xyFunc(d) + ")";
        };

    var _make = function(d) {
            d.append("rect")
                .attr("width", width).attr("height", height)
                .attr("fill", color)
                .attr("clip-path", "url(#" + iconname + "-clip)");
            d.append("use")
                .attr("xlink:href", "#" + iconname + "-outline")
                .attr("stroke", "black")
                .attr("fill", "none");
        },
        _init = function(d) {
            return "matrix(0,0,0,0," + [
                    xyFunc(d)[0] + scaleFunc(d) * width / 2,
                    xyFunc(d)[1] + scaleFunc(d) * height / 2]
                + ")";
        },
        _trans = function(s) {
            s.delay(delay).duration(duration);
        };

    function icon(selection) {
        selection.each(function(data) {
            var g = d3.select(this).selectAll("g." + iconname)
                .data(data, function(d) { return d; });

            // create the enclosing g node if it doesn't exist
            g.enter().append("g")
                .attr("class", iconname)
                .attr("transform", _init)
                .call(_make).transition().call(_trans)
                .attr("transform", transform);

            // update position, dimensions, and color
            g.transition().call(_trans)
                .attr("transform", transform)
                .select("rect").attr("fill", color);

            g.exit().transition().call(_trans)
                .attr("transform", _init).remove();
        });
    }

    icon.iname = function(_) {
        if (!arguments.length) return iconname ;
        iconname  = _;
        return icon;
    };

    icon.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return icon;
    };

    icon.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return icon;
    };

    icon.delay = function(_) {
        if (!arguments.length) return delay;
        delay = _;
        return icon;
    };

    icon.duration = function(_) {
        if (!arguments.length) return duration;
        duration = _;
        return icon;
    };

    icon.xy = function(_) {
        if (!arguments.length) return xyFunc;
        xyFunc = _;
        return icon;
    };

    icon.scale = function(_) {
        if (!arguments.length) return scaleFunc;
        scaleFunc = _;
        return icon;
    };

    icon.rotate = function(_) {
        if (!arguments.length) return rotateFunc;
        rotateFunc = _;
        return icon;
    };

    icon.color = function(_) {
        if (!arguments.length) return color;
        color = _;
        return icon;
    };

    return icon;
}
