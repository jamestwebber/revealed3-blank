/* global d3 */

/*
 * adapted from code by ptamarit:
 * https://github.com/ptamarit/slides-data-viz-web-d3/
 */

var pt = pt || {};

pt.slideIdToFunctions = {
  'drug-data-plot': {
    '-1': function() {
      'use strict';
      pt.erl.updateGraph(
        pt.erl.cgpIC50Fn,
        pt.erl.ccleIC50Fn,
        function(d) { return 3.5 }
      );
    },
    0: function() {
      'use strict';
      pt.erl.updateGraph(
        pt.erl.cgpIC50Fn,
        pt.erl.ccleIC50Fn,
        function(d) {
          return (d.cgp_filter && d.ccle_filter) ? 7.5 : 0
        }
      );
    },
    1: function() {
      'use strict';
      pt.erl.updateGraph(
        pt.erl.cgpIC50Fn,
        pt.erl.ccleIC50Fn,
        function(d) { return 3.5 }
      );
    },
    2: function() {
      pt.erl.updateGraph(
        pt.erl.cgpAUCFn,
        pt.erl.ccleAUCFn,
        function(d) { return 3.5 }
      );
    }
  },
  'spearman-plot': {
    '-1': function() {
      'use strict';
      pt.sp.updateGraph(pt.sp.ic50Fn);
    },
    0: function() {
      'use strict';
      pt.sp.updateGraph(pt.sp.aucFn);
    }
  }
};