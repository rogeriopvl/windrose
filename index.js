/**
 * Windrose
 *
 * This is a simple module that converts compass degress into compass points
 * and points to degrees. There are 32 points in the compass, and each one
 * has a length of 11.25 degrees. This is the value that is used to
 * calculate the points.
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
    var COMPASS_POINTS = [
        { symbol: 'N', name: 'North' },
        { symbol: 'NbE', name: 'North by East' },
        { symbol: 'NNE', name: 'North North East' },
        { symbol: 'NEbN', name: 'North East by North' },
        { symbol: 'NE', name: 'North East' },
        { symbol: 'NEbE', name: 'North East by East' },
        { symbol: 'ENE', name: 'East North East' },
        { symbol: 'EbN', name: 'East by North' },
        { symbol: 'E', name: 'East' },
        { symbol: 'EbS', name: 'East by South' },
        { symbol: 'ESE', name: 'East South East' },
        { symbol: 'SEbE', name: 'South East by East' },
        { symbol: 'SE', name: 'South East' },
        { symbol: 'SEbS', name: 'South East by South' },
        { symbol: 'SSE', name: 'South South East' },
        { symbol: 'SbE', name: 'South by East' },
        { symbol: 'S', name: 'South' },
        { symbol: 'SbW', name: 'South by West' },
        { symbol: 'SSW', name: 'South South West' },
        { symbol: 'SWbS', name: 'South West by South' },
        { symbol: 'SW', name: 'South West' },
        { symbol: 'SWbW', name: 'South West by West' },
        { symbol: 'WSW', name: 'West South West' },
        { symbol: 'WbS', name: 'West by South' },
        { symbol: 'W', name: 'West' },
        { symbol: 'WbN', name: 'West by North' },
        { symbol: 'WNW', name: 'West North West' },
        { symbol: 'NWbW', name: 'North West by West' },
        { symbol: 'NW', name: 'North West' },
        { symbol: 'NWbN', name: 'North West by North' },
        { symbol: 'NNW', name: 'North North West' },
        { symbol: 'NbW', name: 'North by West' }
    ];

    var Windrose = {
        /**
         * Returns a point of the compass, given the degrees
         * When the degrees do not match directly with a point,
         * the number is rounded first
         * @param {number} degrees - the degrees in the compass to convert
         * @return {object} the compass point of the given degrees. If degrees are
         *                  invalid (< 0 || > 360), then undefined is returned.
         */
        getPoint: function (degrees) {
            if (degrees < 0 || degrees > 360) { return; }

            var idx = Math.round(degrees / 11.25);

            // 360 === 0 aka North
            if (idx === COMPASS_POINTS.length) {
                idx = 0;
            }
            return COMPASS_POINTS[idx];
        },

        /**
         * Returns the degrees of a given compass point name or symbol
         * @param {string} name - the name or symbol of a compass point (case sensitive)
         * @return {number} the degrees of the given compass point
         */
        getDegrees: function (name) {
            var found;
            COMPASS_POINTS.forEach(function (item, idx) {
                if (name === item.name || name === item.symbol) {
                    found = idx * 11.25;
                    return;
                }
            });
            return found;
        }
    };
    return Windrose;
}));
