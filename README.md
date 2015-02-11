# Windrose [![Build Status](https://secure.travis-ci.org/rogeriopvl/windrose.png?branch=master)](http://travis-ci.org/rogeriopvl/windrose)

## Info

Windrose is a javascript browser/node module that converts compass degrees into compass points and vice versa.

## Getting Started

### NPM

    npm install windrose --save

### Bower

    bower install windrose --save

## Usage

### Node

    var Windrose = require('windrose');

    Windrose.getPoint(225);       /* returns { symbol: 'SW', name: 'South West' } */
    Windrose.getPoint(236.25);    /* returns { symbol: SWbW, name: 'South West by West' } */

    Windrose.getDegrees('S');     /* returns 90 */
    Windrose.getDegrees('South'); /* returns 90 */

### Browser

Just include it in your html:

    <script type="text/javascript" src="windrose.js">

The `Windrose` object will be available in your global scope.

It also supports AMD.

## API

### Windrose.getPoint(degrees, opts)

* `degrees` (number) the degrees to convert to point (only valid if >= 0 or <= 360)
* `opts` (object) options hash [optional]
    * `depth` (integer) the depth of search it can be a value between 0 and 3.

    With value `0`, it only returns the 4 main compass points (N, E, S, W).

    With value `1` returns the main 8 compass points (N, NE, E, SE, S, SW, W, NW).

    With value `2` returns the main 16 compass points (N, NNE, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW).

    With value `3` returns the 32 points of the compass.

    Any other value will return `undefined`.

### Windrose.getDegrees(name, opts)

* `name` (string) the name or symbol of the compass point to convert to degrees

## License
Copyright (c) 2015 Rogério Vicente. Licensed under the MIT license.
