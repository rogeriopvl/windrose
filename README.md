# Windrose [![Build Status](https://secure.travis-ci.org/rogeriopvl/windrose.png?branch=master)](http://travis-ci.org/rogeriopvl/windrose)

## Getting Started

    npm install windrose --save

## Usage

    var Windrose = require('windrose');

    Windrose.getPoint(225); // returns { symbol: 'SW', name: 'South West' }
    Windrose.getPoint(236.25); // returns { symbol: null, name: 'South West by West' }

    Windrose.getDegrees('S'); // returns 90
    Windrose.getDegrees('South'); // returns 90

## License
Copyright (c) 2015 Rogério Vicente. Licensed under the MIT license.
