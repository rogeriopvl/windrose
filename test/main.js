var expect = require('chai').expect;
var Windrose = require('../windrose.js');

describe('Windrose', function() {
  it('should have method getPoint', function(done) {
    expect(typeof Windrose.getPoint).to.equal('function');
    done();
  });

  it('should have method getDegrees', function(done) {
    expect(typeof Windrose.getDegrees).to.equal('function');
    done();
  });

  describe('getPoint', function() {
    it('should return north when passing 0 degrees', function(done) {
      var res = Windrose.getPoint(0);
      expect(res).to.be.an('object');
      expect(res.symbol).to.equal('N');
      done();
    });

    it('should return North when passing 360 degrees', function(done) {
      var res = Windrose.getPoint(359.8);
      expect(res).to.be.an('object');
      expect(res.symbol).to.equal('N');
      done();
    });

    it('should return undefined when passing -1 degrees', function(done) {
      var res = Windrose.getPoint(-1);
      expect(res).to.be.an('undefined');
      done();
    });

    it('should return undefined when passing 361 degrees', function(done) {
      var res = Windrose.getPoint(361);
      expect(res).to.be.an('undefined');
      done();
    });

    it('should return N when passing 15 degrees with 0 depth', function(done) {
      var res = Windrose.getPoint(15, { depth: 0 });
      expect(res).to.be.an('object');
      expect(res.symbol).to.equal('N');

      done();
    });

    it('should return S when passing 200 degrees with 0 depth', function(done) {
      var res = Windrose.getPoint(200, { depth: 0 });
      expect(res).to.be.an('object');
      expect(res.symbol).to.equal('S');

      done();
    });

    it('should return SW when passing 220 degrees with 1 depth', function(done) {
      var res = Windrose.getPoint(220, { depth: 1 });
      expect(res).to.be.an('object');
      expect(res.symbol).to.equal('SW');

      done();
    });

    it('should return WNW when passing 293 degrees with 2 depth', function(done) {
      var res = Windrose.getPoint(293, { depth: 2 });
      expect(res).to.be.an('object');
      expect(res.symbol).to.equal('WNW');

      done();
    });

    it('should return N when passing 359 degrees with 2 depth', function(done) {
      var res = Windrose.getPoint(359, { depth: 2 });
      expect(res).to.be.an('object');
      expect(res.symbol).to.equal('N');

      done();
    });

    it('should return undefined when passing invalid depth', function(done) {
      var res = Windrose.getPoint(15, { depth: 0 });
      expect(res).to.be.an('object');
      expect(res.symbol).to.equal('N');

      done();
    });
  });

  describe('getDegrees', function() {
    it('should return 0 when passing North or N', function(done) {
      var res = Windrose.getDegrees('North');
      expect(res).to.be.an('object');
      expect(res.value).to.equal(0);

      var res2 = Windrose.getDegrees('N');
      expect(res2).to.be.an('object');
      expect(res2.value).to.equal(0);
      expect(res2.min).to.equal(354.375);
      expect(res2.max).to.equal(5.625);

      done();
    });

    it('should return undefined when passing unknown point name', function(done) {
      var res = Windrose.getDegrees('LOL');
      expect(res).to.be.an('undefined');

      done();
    });

    it('should return 270 when passing W point with 0 depth', function(done) {
      var res = Windrose.getDegrees('W', { depth: 0 });
      expect(res).to.be.an('object');
      expect(res.value).to.equal(270);
      expect(res.min).to.equal(225);
      expect(res.max).to.equal(315);

      done();
    });

    it('should return 225 when passing SW point with 1 depth', function(done) {
      var res = Windrose.getDegrees('SW', { depth: 1 });
      expect(res).to.be.an('object');
      expect(res.value).to.equal(225);
      expect(res.min).to.equal(202.5);
      expect(res.max).to.equal(247.5);

      done();
    });

    it('should return 292.5 when passing WNW point with 2 depth', function(done) {
      var res = Windrose.getDegrees('WNW', { depth: 2 });
      expect(res).to.be.an('object');
      expect(res.value).to.equal(292.5);
      expect(res.min).to.equal(281.25);
      expect(res.max).to.equal(303.75);

      done();
    });

    it('should return 33.75 when passing NEbN point with 3 depth', function(done) {
      var res = Windrose.getDegrees('NEbN', { depth: 3 });
      expect(res).to.be.an('object');
      expect(res.value).to.equal(33.75);
      expect(res.min).to.equal(28.125);
      expect(res.max).to.equal(39.375);

      done();
    });

    it('should return 343.125 when passing NbW½W point with 4 depth', function(done) {
      var res = Windrose.getDegrees('NbW½W', { depth: 4 });
      expect(res).to.be.an('object');
      expect(res.value).to.equal(343.125);
      expect(res.min).to.equal(340.3125);
      expect(res.max).to.equal(345.9375);

      done();
    });

    it('should return 351.5625 when passing N¾W point with 5 depth', function(done) {
      var res = Windrose.getDegrees('N¾W', { depth: 5 });
      expect(res).to.be.an('object');
      expect(res.value).to.equal(351.5625);
      expect(res.min).to.equal(350.15625);
      expect(res.max).to.equal(352.96875);

      done();
    });

    it('should return undefined when passing invalid depth', function(done) {
      var res = Windrose.getDegrees('WNW', { depth: 9 });
      expect(res).to.be.an('undefined');

      done();
    });
  });
});
