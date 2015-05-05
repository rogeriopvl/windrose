/**
 * Windrose
 *
 * This is a simple module that converts compass degress into compass points
 * and points to degrees.
 *
 * You can pass an { depth: ... } hash to the methods.
 *
 * Passing a depth: 0 will limit the search to the 4
 * main compass points: N, E, S, W.
 *
 * Passing a depth: 1 will limit the search to the 8
 * main compass points: N, NE, E, SE, S, SW, W, NW
 *
 * Passing a depth: 2 will limit the search to the 16
 * main compass points: N, NNE, NE, ENE, E, ESE, SE, SSE,
 * S, SSW, SW, WSW, W, WNW, NW, NNW.
 *
 * Passing a depth: 3 (default) will do the search for the
 * 32 points of the compass.
 *
 * @author rogeriopvl <http://github.com/rogeriopvl>
 * @license MIT
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Windrose = factory();
    }
} (this, function () {
    var DEPTHS_AREA = [ 90, 45, 22.5, 11.25 ];
    var COMPASS_POINTS = [
        { symbol: 'N', name: 'North', depth: 0 },
        { symbol: 'NbE', name: 'North by East', depth: 3 },
        { symbol: 'NNE', name: 'North North East', depth: 2 },
        { symbol: 'NEbN', name: 'North East by North', depth: 3 },
        { symbol: 'NE', name: 'North East', depth: 1 },
        { symbol: 'NEbE', name: 'North East by East', depth: 3 },
        { symbol: 'ENE', name: 'East North East', depth: 2 },
        { symbol: 'EbN', name: 'East by North', depth: 3 },
        { symbol: 'E', name: 'East', depth: 0 },
        { symbol: 'EbS', name: 'East by South', depth: 3 },
        { symbol: 'ESE', name: 'East South East', depth: 2 },
        { symbol: 'SEbE', name: 'South East by East', depth: 3 },
        { symbol: 'SE', name: 'South East', depth: 1 },
        { symbol: 'SEbS', name: 'South East by South', depth: 3 },
        { symbol: 'SSE', name: 'South South East', depth: 2 },
        { symbol: 'SbE', name: 'South by East', depth: 3 },
        { symbol: 'S', name: 'South', depth: 0 },
        { symbol: 'SbW', name: 'South by West', depth: 3 },
        { symbol: 'SSW', name: 'South South West', depth: 2 },
        { symbol: 'SWbS', name: 'South West by South', depth: 3 },
        { symbol: 'SW', name: 'South West', depth: 1 },
        { symbol: 'SWbW', name: 'South West by West', depth: 3 },
        { symbol: 'WSW', name: 'West South West', depth: 2 },
        { symbol: 'WbS', name: 'West by South', depth: 3 },
        { symbol: 'W', name: 'West', depth: 0 },
        { symbol: 'WbN', name: 'West by North', depth: 3 },
        { symbol: 'WNW', name: 'West North West', depth: 2 },
        { symbol: 'NWbW', name: 'North West by West', depth: 3 },
        { symbol: 'NW', name: 'North West', depth: 1 },
        { symbol: 'NWbN', name: 'North West by North', depth: 3 },
        { symbol: 'NNW', name: 'North North West', depth: 2 },
        { symbol: 'NbW', name: 'North by West', depth: 3 }
    ];

    var Windrose = {
        /**
         * Returns a point of the compass, given the degrees
         * When the degrees do not match directly with a point,
         * the number is rounded first
         * @param {number} degrees - the degrees in the compass to convert
         * @param {object} opts - (optional) hash containing options
         *                 opts.depth - valid from 0 to 3
         * @return {object} the compass point of the given degrees. If degrees are
         *                  invalid (< 0 || > 360), then undefined is returned.
         */
        getPoint: function (degrees, opts) {
            if (degrees < 0 || degrees > 360) { return; }

            opts = opts || {};
            opts.depth = opts.hasOwnProperty('depth') ? opts.depth : 3;

            var idx = Math.round(degrees / DEPTHS_AREA[opts.depth]);
            var _compass_points = COMPASS_POINTS.filter(function (pt) {
                return pt.depth <= opts.depth;
            });

            // 360 === 0 aka North
            if (idx === _compass_points.length) {
                idx = 0;
            }
            return _compass_points[idx];
        },

        /**
         * Returns the degrees of a given compass point name or symbol
         * @param {string} name - the name or symbol of a compass point (case sensitive)
         * @param {object} opts - (optional) hash containing options
         *                 opts.depth - valid from 0 to 3
         * @return {object} the degrees and range of the given compass point
         *                  (according to the given depth)
         */
        getDegrees: function (name, opts) {
            var found, min, max;
            opts = opts || {};
            opts.depth = opts.hasOwnProperty('depth') ? opts.depth : 3;

            if (opts.depth < 0 || opts.depth > 3) { return; }

            COMPASS_POINTS.forEach(function (item, idx) {
                if (name === item.name || name === item.symbol) {
                    found = idx * DEPTHS_AREA[3];
                    return;
                }
            });

            min = found - (DEPTHS_AREA[opts.depth] / 2);
            max = found + (DEPTHS_AREA[opts.depth] / 2);

            if (typeof found === 'undefined') { return; }

            return {
              min: min >= 0 ? min : (360 + min),
              value: found,
              max: max <= 360 ? max : (max - 360)
            };
        }
    };
    return Windrose;
}));
