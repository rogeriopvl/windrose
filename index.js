/**
 * Windrose
 *
 * This is a simple module that converts compass degress into compass points
 * and points to degrees. There are 32 points in the compass, and each one
 * has a length of 11.25 degrees. This is the value that is used to
 * calculate the degrees.
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
        { symbol: null, name: 'North by East' },
        { symbol: 'NNE', name: 'North North East' },
        { symbol: null, name: 'North East by North' },
        { symbol: 'NE', name: 'North East' },
        { symbol: null, name: 'North East by East' },
        { symbol: 'ENE', name: 'East North East' },
        { symbol: null, name: 'East by North' },
        { symbol: 'E', name: 'East' },
        { symbol: null, name: 'East by South' },
        { symbol: 'ESE', name: 'East South East' },
        { symbol: null, name: 'South East by East' },
        { symbol: 'SE', name: 'South East' },
        { symbol: null, name: 'South East by South' },
        { symbol: 'SSE', name: 'South South East' },
        { symbol: null, name: 'South by East' },
        { symbol: 'S', name: 'South' },
        { symbol: null, name: 'South by West' },
        { symbol: 'SSW', name: 'South South West' },
        { symbol: null, name: 'South West by South' },
        { symbol: 'SW', name: 'South West' },
        { symbol: null, name: 'South West by West' },
        { symbol: 'WSW', name: 'West South West' },
        { symbol: null, name: 'West by South' },
        { symbol: 'W', name: 'West' },
        { symbol: null, name: 'West by North' },
        { symbol: 'WNW', name: 'West North West' },
        { symbol: null, name: 'North West by West' },
        { symbol: 'NW', name: 'North West' },
        { symbol: null, name: 'North West by North' },
        { symbol: 'NNW', name: 'North North West' },
        { symbol: null, name: 'North by West' }
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
         * @param {string} name - the name or symbol of a compass point
         * @return {number} the degrees of the given compass point
         */
        getDegrees: function (name) {
            var found;
            COMPASS_POINTS.forEach(function (item, idx) {
                if (name === item.name || (item.symbol && name === item.symbol)) {
                    found = idx * 11.25;
                    return;
                }
            });
            return found;
        }
    };
    return Windrose;
}));
