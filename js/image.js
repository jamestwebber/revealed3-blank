/**
 * Created by james on 6/6/15.
 *
 * This is just a function to let me put giant SVGs into a presentation
 * without pasting the whole thing in there.
 */
'use strict';

// parent is the node to stick the image on,
// url is the location of the image
function load_image(parent, url) {
  d3.xml(url).then(function(data) {
    parent.node().appendChild(d3.select(data).select("svg").node());
  });
}
