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
    var DEFAULT_DEPTH = 3;
    var DEPTHS_AREA = [ 90, 45, 22.5, 11.25, 5.625, 2.8125 ];
    var COMPASS_POINTS = [
        { symbol: 'N', name: 'North', depth: 0 },
        { symbol: 'N¼E', name: 'North quarter East', depth: 5 },
        { symbol: 'N½E', name: 'North half East', depth: 4 },
        { symbol: 'N¾E', name: 'North three quarters East', depth: 5 },
        { symbol: 'NbE', name: 'North by East', depth: 3 },
        { symbol: 'NbE¼E', name: 'North by East quarter East', depth: 5 },
        { symbol: 'NbE½E', name: 'North by East half East', depth: 4 },
        { symbol: 'NbE¾E', name: 'North by East three quarters East', depth: 5 },
        { symbol: 'NNE', name: 'North North East', depth: 2 },
        { symbol: 'NNE¼E', name: 'North North East quarter East', depth: 5 },
        { symbol: 'NNE½E', name: 'North North East half East', depth: 4 },
        { symbol: 'NNE¾E', name: 'North North East three quarters East', depth: 5 },
        { symbol: 'NEbN', name: 'North East by North', depth: 3 },
        { symbol: 'NEbN¾N', name: 'North East by North three quarters North', depth: 5 },
        { symbol: 'NEbN½N', name: 'North East ny North half North', depth: 4 },
        { symbol: 'NEbN¼N', name: 'North East by North quarter North', depth: 5 },
        { symbol: 'NE', name: 'North East', depth: 1 },
        { symbol: 'NE¼E', name: 'North East quarter East', depth: 5 },
        { symbol: 'NE½E', name: 'North East half East', depth: 4 },
        { symbol: 'NE¾E', name: 'North East three quarters East', depth: 5 },
        { symbol: 'NEbE', name: 'North East by East', depth: 3 },
        { symbol: 'NEbE¼E', name: 'North East by East quarter East', depth: 5 },
        { symbol: 'NEbE½E', name: 'North East by East half East', depth: 4 },
        { symbol: 'NEbE¾E', name: 'North East by East three quarters East', depth: 5 },
        { symbol: 'ENE', name: 'East North East', depth: 2 },
        { symbol: 'ENE¼E', name: 'East North East quarter East', depth: 5 },
        { symbol: 'ENE½E', name: 'East North East half East', depth: 4 },
        { symbol: 'ENE¾E', name: 'East North East three quarter East', depth: 5 },
        { symbol: 'EbN', name: 'East by North', depth: 3 },
        { symbol: 'E¾N', name: 'East three quarters North', depth: 5 },
        { symbol: 'E½N', name: 'East half North', depth: 4 },
        { symbol: 'E¼N', name: 'East quarter North', depth: 5 },
        { symbol: 'E', name: 'East', depth: 0 },
        { symbol: 'E¼S', name: 'East quarter South', depth: 5 },
        { symbol: 'E½S', name: 'East half South', depth: 4 },
        { symbol: 'E¾S', name: 'East three quarters South', depth: 5 },
        { symbol: 'EbS', name: 'East by South', depth: 3 },
        { symbol: 'ESE¾E', name: 'East South East three quarters East', depth: 5 },
        { symbol: 'ESE½E', name: 'East South East half East', depth: 4 },
        { symbol: 'ESE¼E', name: 'East South East quarter East', depth: 5 },
        { symbol: 'ESE', name: 'East South East', depth: 2 },
        { symbol: 'SEbE¾E', name: 'South East by East three quarters East', depth: 5 },
        { symbol: 'SEbE½E', name: 'South East by East half East', depth: 4 },
        { symbol: 'SEbE¼E', name: 'South East by East quarter East', depth: 5 },
        { symbol: 'SEbE', name: 'South East by East', depth: 3 },
        { symbol: 'SE¾E', name: 'South East three quarters East', depth: 5 },
        { symbol: 'SE½E', name: 'South East half East', depth: 4 },
        { symbol: 'SE¼E', name: 'South East quarter East', depth: 5 },
        { symbol: 'SE', name: 'South East', depth: 1 },
        { symbol: 'SE¼S', name: 'South East quarter South', depth: 5 },
        { symbol: 'SE½S', name: 'South East half South', depth: 4 },
        { symbol: 'SE¾S', name: 'South East three quartersSouth', depth: 5 },
        { symbol: 'SEbS', name: 'South East by South', depth: 3 },
        { symbol: 'SSE¾E', name: 'South South East three quarters East', depth: 5 },
        { symbol: 'SSE½E', name: 'South South East half East', depth: 4 },
        { symbol: 'SSE¼E', name: 'South South East quarter East', depth: 5 },
        { symbol: 'SSE', name: 'South South East', depth: 2 },
        { symbol: 'SbE¾E', name: 'South by East three quarters East', depth: 5 },
        { symbol: 'SbE½E', name: 'South by East half East', depth: 4 },
        { symbol: 'SbE¼E', name: 'South by East quarter East', depth: 5 },
        { symbol: 'SbE', name: 'South by East', depth: 3 },
        { symbol: 'S¾E', name: 'South three quarters East', depth: 5 },
        { symbol: 'S½E', name: 'South half East', depth: 4 },
        { symbol: 'S¼E', name: 'South quarter East', depth: 5 },
        { symbol: 'S', name: 'South', depth: 0 },
        { symbol: 'S¼W', name: 'South quarter West', depth: 5 },
        { symbol: 'S½W', name: 'South half West', depth: 4 },
        { symbol: 'S¾W', name: 'South three quarters West', depth: 5 },
        { symbol: 'SbW', name: 'South by West', depth: 3 },
        { symbol: 'SbW¼W', name: 'South by West quarter West', depth: 5 },
        { symbol: 'SbW½W', name: 'South by West half West', depth: 4 },
        { symbol: 'SbW¾W', name: 'South by West three quarters West', depth: 5 },
        { symbol: 'SSW', name: 'South South West', depth: 2 },
        { symbol: 'SSW¼W', name: 'South South West quarter West', depth: 5 },
        { symbol: 'SSW½W', name: 'South South West half West', depth: 4 },
        { symbol: 'SSW¾W', name: 'South South West three quarters West', depth: 5 },
        { symbol: 'SWbS', name: 'South West by South', depth: 3 },
        { symbol: 'SW¾S', name: 'South West three quarters South', depth: 5 },
        { symbol: 'SW½S', name: 'South West half South', depth: 4 },
        { symbol: 'SW¼S', name: 'South West quarter South', depth: 5 },
        { symbol: 'SW', name: 'South West', depth: 1 },
        { symbol: 'SW¼W', name: 'South West quarter West', depth: 5 },
        { symbol: 'SW½W', name: 'South West half West', depth: 4 },
        { symbol: 'SW¾W', name: 'South West three quarters West', depth: 5 },
        { symbol: 'SWbW', name: 'South West by West', depth: 3 },
        { symbol: 'SWbW¼W', name: 'South West by West quarter West', depth: 5 },
        { symbol: 'SWbW½W', name: 'South West by West half West', depth: 4 },
        { symbol: 'SWbW¾W', name: 'South West by West three quarters West', depth: 5 },
        { symbol: 'WSW', name: 'West South West', depth: 2 },
        { symbol: 'WSW¼W', name: 'West South West quarter West', depth: 5 },
        { symbol: 'WSW½W', name: 'West South West half West', depth: 4 },
        { symbol: 'WSW¾W', name: 'West South West three quarters West', depth: 5 },
        { symbol: 'WbS', name: 'West by South', depth: 3 },
        { symbol: 'W¾S', name: 'West three quarters South', depth: 5 },
        { symbol: 'W½S', name: 'West half South', depth: 4 },
        { symbol: 'W¼S', name: 'West quarter South', depth: 5 },
        { symbol: 'W', name: 'West', depth: 0 },
        { symbol: 'W¼N', name: 'West quarter North', depth: 5 },
        { symbol: 'W½N', name: 'West half North', depth: 4 },
        { symbol: 'W¾N', name: 'West three quarters North', depth: 5 },
        { symbol: 'WbN', name: 'West by North', depth: 3 },
        { symbol: 'WNW¾W', name: 'West North West three quarters West', depth: 5 },
        { symbol: 'WNW½W', name: 'West North West half West', depth: 4 },
        { symbol: 'WNW¼W', name: 'West North West quarter West', depth: 5 },
        { symbol: 'WNW', name: 'West North West', depth: 2 },
        { symbol: 'NWbW¾W', name: 'North West by West three quarters West', depth: 5 },
        { symbol: 'NWbW½W', name: 'North West by West half West', depth: 4 },
        { symbol: 'NWbW¼W', name: 'North West by West quarter West', depth: 5 },
        { symbol: 'NWbW', name: 'North West by West', depth: 3 },
        { symbol: 'NW¾W', name: 'North West three quarters West', depth: 5 },
        { symbol: 'NW½W', name: 'North West half West', depth: 4 },
        { symbol: 'NW¼W', name: 'North West quarter West', depth: 5 },
        { symbol: 'NW', name: 'North West', depth: 1 },
        { symbol: 'NW¼N', name: 'North West quarter North', depth: 5 },
        { symbol: 'NW½N', name: 'North West half North', depth: 4 },
        { symbol: 'NW¾N', name: 'North West three quarters North', depth: 5 },
        { symbol: 'NWbN', name: 'North West by North', depth: 3 },
        { symbol: 'NNW¾W', name: 'North North West three quarters West', depth: 5 },
        { symbol: 'NNW½W', name: 'North North West half West', depth: 4 },
        { symbol: 'NNW¼W', name: 'North North West quarter West', depth: 5 },
        { symbol: 'NNW', name: 'North North West', depth: 2 },
        { symbol: 'NbW¾W', name: 'North by West three quarters West', depth: 5 },
        { symbol: 'NbW½W', name: 'North by West half West', depth: 4 },
        { symbol: 'NbW¼W', name: 'North by West quarter West', depth: 5 },
        { symbol: 'NbW', name: 'North by West', depth: 3 },
        { symbol: 'N¾W', name: 'North three quarters West', depth: 5 },
        { symbol: 'N½W', name: 'North half West', depth: 4 },
        { symbol: 'N¼W', name: 'North quarter West', depth: 5 }
    ];

    var Windrose = {
        /**
         * Returns a point of the compass, given the degrees
         * When the degrees do not match directly with a point,
         * the number is rounded first
         * @param {number} degrees - the degrees in the compass to convert
         * @param {object} opts - (optional) hash containing options
         *                 opts.depth - valid from 0 to 5
         * @return {object} the compass point of the given degrees. If degrees are
         *                  invalid (< 0 || > 360), then undefined is returned.
         */
        getPoint: function (degrees, opts) {
            if (degrees < 0 || degrees > 360) { return; }

            opts = opts || {};
            opts.depth = opts.hasOwnProperty('depth') ? opts.depth : DEFAULT_DEPTH;

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
         *                 opts.depth - valid from 0 to 5
         * @return {object} the degrees and range of the given compass point
         *                  (according to the given depth)
         */
        getDegrees: function (name, opts) {
            var found, min, max;
            opts = opts || {};
            opts.depth = opts.hasOwnProperty('depth') ? opts.depth : DEFAULT_DEPTH;

            if (opts.depth < 0 || opts.depth > 5) { return; }

            COMPASS_POINTS.forEach(function (item, idx) {
                if (name === item.name || name === item.symbol) {
                    found = idx * DEPTHS_AREA[DEPTHS_AREA.length - 1];
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

